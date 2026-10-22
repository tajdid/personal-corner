/**
 * Films page data: the Letterboxd snapshot written by scripts/sync-films.mjs,
 * plus locally downloaded posters and backdrops. Nothing is fetched at build
 * or view time; if no snapshot exists yet, `getFilms()` returns undefined.
 */

import type { ImageMetadata } from 'astro';

export interface DiaryEntry {
  id: string;
  title: string;
  year?: number;
  watchedDate: string;
  rewatch: boolean;
  tmdbId?: string;
  slug: string;
  entryUrl: string;
  filmUrl?: string;
  poster?: string;
}

export interface FeaturedFilm extends DiaryEntry {
  synopsis?: string;
  details?: {
    directors: string[];
    writers: string[];
    runtime?: number;
    backdrop?: string;
    trailer?: { url: string; title: string; channel: string };
  };
}

export interface FilmsSnapshot {
  profile: string;
  syncedAt: string;
  featured: FeaturedFilm;
  recent: DiaryEntry[];
  diary: DiaryEntry[];
}

// Optional at build time: missing snapshot or images degrade gracefully.
const snapshots = import.meta.glob<FilmsSnapshot>('/src/data/films.json', { eager: true, import: 'default' });
const posters = import.meta.glob<ImageMetadata>('/src/assets/films/posters/*.jpg', { eager: true, import: 'default' });
const backdrops = import.meta.glob<ImageMetadata>('/src/assets/films/backdrops/*.jpg', { eager: true, import: 'default' });

export const PROFILE_URL = 'https://letterboxd.com/tajdid/';

export function getFilms(): FilmsSnapshot | undefined {
  const snapshot = snapshots['/src/data/films.json'];
  return snapshot?.featured?.title ? snapshot : undefined;
}

export const posterFor = (file?: string) => (file ? posters[`/src/assets/films/posters/${file}`] : undefined);
export const backdropFor = (file?: string) =>
  file ? backdrops[`/src/assets/films/backdrops/${file}`] : undefined;

/** "1h 46m" */
export const formatRuntime = (minutes: number) =>
  `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`.replace(/^0h /, '');

/** "19 Oct 2026" */
export const formatWatched = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** "Written and directed by" only when the same people hold both credits. */
export function creditLabel(directors: string[], writers: string[]) {
  const same =
    directors.length > 0 &&
    directors.length === writers.length &&
    directors.every((name) => writers.includes(name));
  return same ? 'Written and directed by' : 'Directed by';
}
