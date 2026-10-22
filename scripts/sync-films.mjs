#!/usr/bin/env node
/**
 * Sync the Films page from Letterboxd (run: npm run sync:films).
 *
 * - Reads the public diary RSS once, server-side. Visitors never fetch it.
 * - Keeps diary entries only (watches and reviews); lists and other activity are dropped.
 * - Orders by watched date, newest first. Ties: later log time, then larger entry ID.
 * - Keeps every entry (with its rewatch flag) in the snapshot, and derives a
 *   de-duplicated "latest viewing per film" list for display.
 * - Enriches the featured film from its Letterboxd film page, but only if the
 *   page's TMDb ID matches the diary entry's. Trailers are checked via YouTube oEmbed.
 * - Downloads posters and the backdrop into src/assets/films/.
 * - Writes src/data/films.json only when the result validates. On any feed
 *   failure the existing snapshot is left untouched and the script exits non-zero.
 *
 * The RSS is a recent snapshot, not a complete viewing history.
 */

import { mkdir, readFile, writeFile, readdir, unlink, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import path from 'node:path';

const PROFILE = 'https://letterboxd.com/tajdid/';
const RSS = process.env.LETTERBOXD_RSS ?? 'https://letterboxd.com/tajdid/rss/'; // override only for testing
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SNAPSHOT = path.join(ROOT, 'src/data/films.json');
const NOTES = path.join(ROOT, 'src/data/film-notes.json');
const POSTERS = path.join(ROOT, 'src/assets/films/posters');
const BACKDROPS = path.join(ROOT, 'src/assets/films/backdrops');
const RECENT_LIMIT = 16;
const UA = 'Mozilla/5.0 (compatible; personal-site film sync; +https://www.tajdidrahman.co.uk)';

const fail = (message) => {
  console.error(`✗ ${message}`);
  console.error('  Existing snapshot left unchanged.');
  process.exit(1);
};

const decode = (text = '') =>
  text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();

const tag = (xml, name) => {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return match ? decode(match[1]) : undefined;
};

async function fetchText(url, attempts = 2) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!res.ok) throw new Error(`${url} responded ${res.status}`);
      return await res.text();
    } catch (error) {
      if (attempt >= attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // one retry for transient network errors
    }
  }
}

async function download(url, file) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length < 1000) throw new Error(`${url} returned too little data`);
  await writeFile(file, buffer);
}

function parseFeed(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  const entries = [];
  for (const item of items) {
    const guid = tag(item, 'guid') ?? '';
    const kind = guid.replace(/-\d+$/, '');
    const watchedDate = tag(item, 'letterboxd:watchedDate');
    // Diary entries are watches and reviews with a watched date; skip lists etc.
    if (!['letterboxd-watch', 'letterboxd-review'].includes(kind) || !watchedDate) continue;
    const link = tag(item, 'link');
    const description = tag(item, 'description') ?? '';
    const slug = link?.match(/\/film\/([^/]+)\//)?.[1];
    entries.push({
      id: guid,
      entryNumber: Number(guid.match(/(\d+)$/)?.[1] ?? 0),
      title: tag(item, 'letterboxd:filmTitle'),
      year: Number(tag(item, 'letterboxd:filmYear')) || undefined,
      watchedDate,
      loggedAt: new Date(tag(item, 'pubDate') ?? 0).toISOString(),
      rewatch: tag(item, 'letterboxd:rewatch') === 'Yes',
      tmdbId: tag(item, 'tmdb:movieId'),
      slug,
      entryUrl: link,
      filmUrl: slug ? `https://letterboxd.com/film/${slug}/` : undefined,
      posterUrl: description.match(/<img src="([^"]+)"/)?.[1],
    });
  }
  return entries;
}

function validEntry(entry) {
  return (
    entry.title &&
    entry.slug &&
    entry.entryUrl?.startsWith('https://letterboxd.com/') &&
    /^\d{4}-\d{2}-\d{2}$/.test(entry.watchedDate)
  );
}

// Newest first by watched date; ties by later log time, then larger entry ID.
const byWatched = (a, b) =>
  b.watchedDate.localeCompare(a.watchedDate) ||
  b.loggedAt.localeCompare(a.loggedAt) ||
  b.entryNumber - a.entryNumber;

async function enrichFeatured(entry) {
  const html = await fetchText(entry.filmUrl);
  const pick = (re) => {
    const m = html.match(re);
    return m ? decode(m[1]) : undefined;
  };
  const pageTmdb = pick(/data-tmdb-id="(\d+)"/);
  if (!entry.tmdbId || pageTmdb !== entry.tmdbId) {
    throw new Error(`film page TMDb ID ${pageTmdb} does not match diary entry ${entry.tmdbId}`);
  }
  const people = (role) => [
    ...new Set([...html.matchAll(new RegExp(`href="/${role}/[^/"]+/"[^>]*>(?:<span[^>]*>)?([^<]+)`, 'g'))].map((m) => decode(m[1]))),
  ];
  const directors = people('director');
  const writers = people('writer');
  const runtime = Number(pick(/(\d+)(?:&nbsp;|\s)mins/)) || undefined;
  const backdropUrl = pick(/data-backdrop2x="([^"]+)"/) ?? pick(/data-backdrop="([^"]+)"/);
  const trailerId = pick(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/);

  let trailer;
  if (trailerId) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${trailerId}&format=json`);
      const data = res.ok ? await res.json() : undefined;
      // Accept only a video titled as a trailer for this film.
      const titleWord = entry.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ')[0];
      if (data && /trailer/i.test(data.title) && data.title.toLowerCase().includes(titleWord)) {
        trailer = { url: `https://www.youtube.com/watch?v=${trailerId}`, title: data.title, channel: data.author_name };
      }
    } catch {
      /* unverified trailers are omitted */
    }
  }

  return { directors, writers, runtime, backdropUrl, trailer };
}

async function main() {
  let xml;
  try {
    xml = await fetchText(RSS);
  } catch (error) {
    fail(`Could not fetch the Letterboxd RSS: ${error.message}`);
  }

  const diary = parseFeed(xml).filter(validEntry).sort(byWatched);
  if (diary.length === 0) fail('The feed contained no valid diary entries.');

  // Latest viewing per film (rewatches stay in `diary`).
  const seen = new Set();
  const latestPerFilm = diary.filter((entry) => {
    const key = entry.tmdbId ?? entry.slug;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const previous = existsSync(SNAPSHOT) ? JSON.parse(await readFile(SNAPSHOT, 'utf8')) : undefined;
  const notes = existsSync(NOTES) ? JSON.parse(await readFile(NOTES, 'utf8')) : {};

  const [featuredEntry, ...rest] = latestPerFilm;
  const recent = rest.slice(0, RECENT_LIMIT);

  // Enrich the featured film; reuse earlier details for the same film if this fails.
  let details;
  try {
    details = await enrichFeatured(featuredEntry);
  } catch (error) {
    console.warn(`! Featured film details unavailable: ${error.message}`);
    if (previous?.featured?.slug === featuredEntry.slug) details = previous.featured.details;
  }

  await mkdir(POSTERS, { recursive: true });
  await mkdir(BACKDROPS, { recursive: true });

  const keepPosters = new Set();
  for (const entry of [featuredEntry, ...recent]) {
    if (!entry.posterUrl) continue;
    const file = path.join(POSTERS, `${entry.slug}.jpg`);
    try {
      if (!existsSync(file)) await download(entry.posterUrl, file);
      entry.poster = `${entry.slug}.jpg`;
      keepPosters.add(entry.poster);
    } catch (error) {
      console.warn(`! Poster for ${entry.title} unavailable: ${error.message}`);
    }
  }

  if (details?.backdropUrl) {
    const file = path.join(BACKDROPS, `${featuredEntry.slug}.jpg`);
    try {
      if (!existsSync(file)) await download(details.backdropUrl, file);
      details.backdrop = `${featuredEntry.slug}.jpg`;
    } catch (error) {
      console.warn(`! Backdrop unavailable: ${error.message}`);
    }
  }

  const snapshot = {
    source: RSS,
    profile: PROFILE,
    syncedAt: new Date().toISOString(),
    note: 'Recent Letterboxd diary snapshot; not a complete viewing history.',
    featured: {
      ...featuredEntry,
      synopsis: notes[featuredEntry.slug]?.synopsis,
      details,
    },
    recent,
    diary,
  };

  // Validate before replacing the existing snapshot.
  if (!snapshot.featured.title || !Array.isArray(snapshot.recent)) fail('Snapshot failed validation.');

  const tmp = `${SNAPSHOT}.tmp`;
  await writeFile(tmp, `${JSON.stringify(snapshot, null, 2)}\n`);
  await rename(tmp, SNAPSHOT);

  // Remove images no longer referenced, so the repository doesn't grow indefinitely.
  for (const file of await readdir(POSTERS)) if (!keepPosters.has(file)) await unlink(path.join(POSTERS, file));
  for (const file of await readdir(BACKDROPS)) {
    if (file !== details?.backdrop) await unlink(path.join(BACKDROPS, file));
  }

  console.log(`✓ ${diary.length} diary entries (${latestPerFilm.length} films).`);
  console.log(`  Featured: ${featuredEntry.title} (${featuredEntry.year}), watched ${featuredEntry.watchedDate}${featuredEntry.rewatch ? ', rewatch' : ''}.`);
  console.log(`  Recently watched: ${recent.length} films.`);
  if (!snapshot.featured.synopsis) console.log(`  No synopsis yet: add one for "${featuredEntry.slug}" in src/data/film-notes.json.`);
}

main();
