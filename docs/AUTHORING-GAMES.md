# Updating the Games page

The Games page (`/games`) is built from `src/data/games.ts`, and the layout lives in `src/pages/games.astro`. Everything is maintained by hand. Nothing is fetched from Backloggd or anywhere else.

## Current games

Games with `section: 'current'` appear under "Currently playing" as wide cards, sorted by `order`. Each card uses the cover, blurred, as its background:

```ts
{ id: 'pokemon-pokopia', title: 'Pokémon Pokopia', section: 'current', order: 3,
  artwork: { src: pokemonPokopia, alt: 'Pokémon Pokopia box art' },
  playingOn: 'Nintendo Switch 2',   // shown as "Console"
  released: '2026-03',              // first release month, shown as "March 2026"
  note: 'Optional one or two sentences in your own words.' }
```

- `playingOn` is the device you're playing on. It isn't the game's original platform.
- `released` is the game's first release month anywhere (FireRed: January 2004, Japan).
- `note` is optional; leave it out and nothing extra shows.
- When you finish a game, change its `section` to `'collection'` and give it an `order` there, or remove it.

## Collection entries

Games with `section: 'collection'` appear under "From my collection", grouped by `platform` and sorted by `order` within each group. Only covers are shown, four to a row; each cover's `alt` text names the game. This is a list of played games, not a ranking.

- `platform` is the console you played it on: one of `platforms` in `src/data/games.ts` (Nintendo Switch, Game Boy Advance, Game Boy, PlayStation, Xbox 360). Groups appear in that order, and empty groups are hidden. Add a value to `platforms` to create a new group.
- A collection game with no `platform` doesn't appear.
- `year` is optional and only kept in the data to tell editions apart, e.g. Tomb Raider (2013).
- `url` makes the title a link that opens in a new tab. Only add a verified page.

## Artwork

1. Save the cover in `src/assets/games/` named after the entry's `id`, e.g. `mario-kart-8-deluxe.jpg`. Keep its real proportions; don't crop or pad it.
2. Import it at the top of `src/data/games.ts` and set `artwork: { src: …, alt: '…' }`.
3. Leave `artwork` out until you have the right edition's cover. A placeholder shows instead.

Covers are fitted into a shared portrait area without cropping and sit on a common baseline, so square Game Boy boxes and tall modern boxes line up.

### Current artwork sources

Each cover was matched to the exact title and edition before use, and saved once.

- **Wikipedia** (English article infobox covers, via the page-summary API): The Last of Us Part I, Assassin's Creed (2007), Tomb Raider (2013), Ghost of Tsushima, Pokémon Emerald, Persona 3 Reload, The Legend of Zelda: Breath of the Wild, Marvel's Spider-Man: Miles Morales, Super Mario Odyssey and Pokémon Pokopia.
- **Wikipedia, cropped from combined cover images:**
  - Pokémon FireRed (left half of "FireRed and LeafGreen")
  - Pokémon Ruby and Pokémon Sapphire (halves of "Ruby and Sapphire")
  - Pokémon Sword (left half of "Sword and Shield")
  - Pokémon Red and Pokémon Yellow (first and third of the "Red, Blue and Yellow" covers)
- **Steam** (official 600 × 900 library art; store names confirmed): Persona 4 Golden (app 1113000) and Persona 5 Royal (app 1687950). Wikipedia only had the original Persona 4 and Persona 5 covers.
- **Missing:** Mario Kart 8 Deluxe. Wikipedia only has the Wii U *Mario Kart 8* cover, so it shows a placeholder until the Deluxe cover is added.

## Consoles

Consoles live in `consoleFamilies` in the same file, separate from games. Add or reorder entries within a family. Set `current: true` to show the "Currently using" label and highlight it.

Run `npm run check` and `npm run build` before committing.
