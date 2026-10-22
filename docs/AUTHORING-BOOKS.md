# Authoring the Books page

The Books page (`/books`) is built from `src/data/books.ts`; the layout lives in `src/pages/books.astro`. Edit the data file only.

## Replace a sample entry

Each book is an object in `books`:

```ts
{
  id: 'thinking-with-type',          // stable, lowercase, hyphenated
  title: 'Thinking with Type',
  author: 'Ellen Lupton',
  order: 4,                          // position in the grid (ascending)
  cover: { src: thinkingWithType, alt: 'Thinking with Type by Ellen Lupton, book cover' },
  note: 'One or two sentences, in your own words.', // optional
  url: 'https://…',                  // optional, verified destination only
  placeholder: true,                 // remove once it's a real recommendation
}
```

- **Your own picks:** replace the title, author and cover, and remove `placeholder: true`. The "Sample selection" note under the introduction disappears automatically once no entry is marked as a placeholder.
- **Notes:** `note` is optional. When it's left out, nothing extra is shown.
- **Links:** `url` makes the title a link that opens in a new tab. Only add one you've checked. Without it, the entry stays as plain text.
- **Order:** change `order` to reorder; the grid is sorted by it.

## Add or replace a cover

1. Save the cover in `src/assets/books/`, named after the entry's `id` (e.g. `the-mom-test.jpg`). Use the cover's real proportions; don't crop or pad it.
2. Import it at the top of `src/data/books.ts` and set `cover: { src: …, alt: '…' }`.
3. Leave `cover` out entirely if you don't have one yet. A portrait placeholder is shown instead.

Covers are fitted, never cropped, into a consistent portrait area and aligned to the same baseline, so books of different shapes still line up. Astro resizes them at build time.

The sample covers came from Open Library's public covers service. Each was matched to its title and author first, and saved once; the site makes no requests to Open Library.

Run `npm run check` and `npm run build` before committing.
