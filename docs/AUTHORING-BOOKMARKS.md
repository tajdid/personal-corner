# Updating the Bookmarks page

The Bookmarks page (`/bookmarks`) is built from `src/data/bookmarks.ts`, and the layout lives in `src/pages/bookmarks.astro`. It's maintained by hand.

## Add a bookmark

Add an entry to the `bookmarks` list:

```ts
{ id: 'are-na', title: 'Are.na', url: 'https://www.are.na/',
  description: 'One short, factual sentence about the site.',
  category: 'Inspiration', order: 2 },
```

- `id` is a short, unique, lowercase identifier.
- `url` must be the full address. The muted domain under each entry (e.g. `are.na`) is worked out from it automatically, without `www.`.
- `order` sets its position within the category (lowest first).
- Links always open in a new tab.

## Change or rename a category

- **Move a bookmark:** change its `category`.
- **Categories and their order:** set by the `categories` list at the top of the file. Rename a category there and in the entries that use it; TypeScript flags any entry left with an old name.
- **Empty categories:** not shown, so you can keep a category in the list before it has any bookmarks.

## Replace the samples

The current 12 entries are a sample collection to show the layout, marked `sample: true`. Every URL was checked to load, but they aren't personal recommendations.

1. Replace or delete the sample entries with your own.
2. Remove `sample: true` from any you keep.

The "Sample collection — personal bookmarks coming soon." note disappears once no entry is marked as a sample.

Run `npm run check` and `npm run build` before committing.
