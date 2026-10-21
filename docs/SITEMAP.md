# Sitemap and navigation

**Status:** Agreed long-term information architecture. Not every route belongs in the initial build.

## Primary navigation

Header: **Writing** (`/writing`) · **Work** (`/work`) · **About** (`/about`). Logo/name links to `/`.

Other destinations should be discoverable from the homepage's **Around here** area, contextual links and footer rather than crowding the header.

## Routes

| Route | Purpose | Phase |
|---|---|---|
| `/` | Homepage | 1 |
| `/writing` | Writing archive | 2 |
| `/writing/[slug]` | Article | 2 |
| `/work` | Projects archive | 2 |
| `/work/[slug]` | Project detail | 2 |
| `/about` | Personal story, photography | 2 |
| `/collections` | Collection index | 3 |
| `/music` | Music collection | 3 |
| `/books` | Reading collection | 3 |
| `/films` | Films and TV | 3 |
| `/games` | Games | 3 |
| `/travel` | Travel archive | 3 |
| `/travel/[slug]` | Travel journal | 3 |
| `/bookmarks` | Curated links | 3 |
| `/now` | Current focus and interests | 4 |
| `/uses` | Tools and gear | 4 |
| `/stats` | Personal stats and integrations | 4 |
| `/building` | Experiments and projects in progress | 4 |
| `/changelog` | Website updates | 4 |
| `/colophon` | How this site was made | 4 |

`[slug]` is a route parameter, not a literal URL segment.

## Build phases

**Phase 1 — Milestone 03:** Astro foundation, shared layout/navigation/footer, homepage sections, responsive and accessible implementation, initial deployment.

**Phase 2 — Core publishing:** Writing and project archives/details, About page.

**Phase 3 — Personal collections:** Music, books, films, games, travel, bookmarks and their overview.

**Phase 4 — Living website:** Now, Uses, Stats, Building, Changelog, Colophon, selective integrations and experiments.

## Architecture notes

Use short top-level collection URLs (`/music`, not `/collections/music`). `/collections` serves as an index. `/now` and `/uses` remain standalone pages even when linked from About. Treat this sitemap as a direction for future work, not an instruction to generate empty placeholder pages immediately.

**Placeholder pages (decided in Milestone 03, Phase 2):** every destination linked from the homepage or header has a minimal placeholder page so navigation never breaks. This covers `/writing`, `/work`, `/about`, each homepage project (`/work/[slug]`) and writing entry (`/writing/[slug]`), and the six collections (`/music`, `/books`, `/films`, `/games`, `/travel`, `/bookmarks`). Placeholders use the shared layout and state that content is coming later. Routes not linked from the site (e.g. `/collections`, Phase 4 pages) are still not created until they are built.
