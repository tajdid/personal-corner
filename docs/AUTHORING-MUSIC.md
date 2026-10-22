# Authoring the Music page

The Music page (`/music`) is built from `src/data/music.ts`; the layout lives in `src/pages/music.astro`. Edit the data file only.

## Update an entry

Each playlist or album is an object in `playlists` or `albums`:

```ts
{
  id: 'am',                    // stable, lowercase, hyphenated
  title: 'AM',
  artist: 'Arctic Monkeys',    // albums only
  // description: '…',         // playlists only
  order: 4,                    // position in the list (ascending)
  artwork: { src: am, alt: 'AM by Arctic Monkeys album cover' },
  url: 'https://open.spotify.com/album/…',
}
```

- **Order:** change `order` to reorder. Lists are sorted by it, not by position in the file.
- **URL:** only add one you have checked opens the exact album or playlist. Don't use search links. Without a `url`, the entry is shown as plain text with no link or arrow.
- **Removing:** delete the object, and its import if the artwork is no longer used.

## Add or replace artwork

1. Save a square image (ideally 640 × 640 or larger) in `src/assets/music/`, named after the entry's `id`, e.g. `am.jpg`.
2. Import it at the top of `src/data/music.ts` and set `artwork: { src: …, alt: '…' }`.
3. Leave `artwork` out entirely if you don't have an image yet. A labelled square placeholder is shown instead.

Astro resizes and converts the artwork at build time. Covers sit beside their titles, so they're treated as decorative; the `alt` text is kept for any future use where the image stands alone.

The current covers are Spotify's official artwork, saved once from Spotify's public oEmbed service. The site makes no Spotify requests at runtime.

Run `npm run check` and `npm run build` before committing.
