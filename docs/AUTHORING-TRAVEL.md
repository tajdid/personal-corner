# Updating the Travel page

The Travel page (`/travel`) is built from `src/data/travel.ts`, and the layout lives in `src/pages/travel.astro`. It's maintained by hand. Don't add dates, booking details, addresses, costs or travel companions.

## Add a country

Add an entry to the country list:

```ts
{ id: 'it', name: 'Italy', flag: '🇮🇹', continent: 'Europe', destinations: [] },
```

- `id` is the country's two-letter code in lowercase, and must be unique (the build fails on duplicates).
- `continent` is one of Europe, Asia, North America or Africa. Add a new value to `Continent` if needed.
- Countries are sorted alphabetically on the page automatically.
- An empty `destinations` list shows "Places to be added".

Belfast and the other UK places belong under United Kingdom (`gb`). Ireland (`ie`) is a separate country.

## Add a destination

Add it to the country's `destinations`, in the order you want it shown:

```ts
place('florence', 'Florence'),
place('belfast', 'Belfast', { home: true }),        // shows a "Home" marker
place('lisbon', 'Lisbon', { caption: 'A short line in your own words.' }),
```

Destinations can be cities, regions or islands (Cornwall, New Jersey, Musandam). Nothing labels them as cities.

## Add a personal photograph

Only use photos you took, and only where you're sure where they were taken.

1. Save the photo in `src/assets/` (e.g. `src/assets/travel/florence.jpg`).
2. Import it at the top of `src/data/travel.ts`.
3. Add it to the destination:

```ts
place('florence', 'Florence', { image: { src: florencePhoto, alt: 'Describe what the photo shows.' } }),
```

Photographed destinations appear in the "Snapshots" strip above the country list, at 4:3, cropped from the centre and captioned with the place and country. Every destination also appears in its country's list.

The current photos are Paris (the Louvre's inverted pyramid, so the location is visible in the photo) and Warsaw. Warsaw's location comes only from the photo's original filename, `warsaw-poland.png`, so confirm it's right.

## How the stats are calculated

"Countries" counts the unique country `id`s, and "continents" counts the unique `continent` values, both from the list. "Cities, regions & islands" counts every destination across all countries (cities, districts, regions, states and islands together). The per-continent line below the stats (e.g. "Europe 10") is counted the same way. None of these is typed in separately, so adding a country updates them automatically.

Run `npm run check` and `npm run build` before committing.
