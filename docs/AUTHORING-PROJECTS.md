# Authoring projects

Every case study and side project is a folder under `src/pages/work/`. The folder name is the URL: `src/pages/work/stakeone/` is served at `/work/stakeone`.

```
src/pages/work/
  index.astro              ← Work overview (built from each page's frontmatter)
  stakeone/
    index.mdx              ← the page: frontmatter + content
    images/                ← images used by this project only
```

The Work page and the homepage read each `index.mdx` frontmatter automatically (`src/lib/projects.ts`). There is no central list to update.

## 1. Add a project folder

1. Copy an existing folder: a case study such as `stakeone/` or a side project such as `side-project-01/`.
2. Rename it to a short, lowercase, hyphenated slug, e.g. `travel-planner`. This becomes `/work/travel-planner`, so avoid renaming it after publishing.
3. Keep the `images/` folder; `.gitkeep` only keeps it in Git while it's empty.

## 2. Set the type and listing order

Frontmatter sits between the `---` lines at the top of `index.mdx`:

```yaml
---
layout: '../../../layouts/CaseStudyLayout.astro'   # or SideProjectLayout.astro
title: 'Designing transparent FX withdrawals'
summary: 'One or two sentences shown on the Work page and under the title.'
type: 'case-study'          # 'case-study' or 'side-project'
order: 3                    # position within its section, lowest first
disciplines:                # optional
  - 'Product design'
year: 2025                  # optional
cover: './images/cover.png' # optional; see step 4
coverAlt: 'Describe what the cover shows'
liveUrl: 'https://example.com'      # optional live project (opens in a new tab)
sourceUrl: 'https://github.com/…'   # optional source code (opens in a new tab)
placeholder: false          # true while the page is still placeholder copy
---
```

- **Case studies** (`type: 'case-study'`) fill the 2 × 2 grid on Work, in `order`. Use `CaseStudyLayout.astro`.
- **Side projects** (`type: 'side-project'`) appear as compact rows below, in `order`. Use `SideProjectLayout.astro`.
- Optional case-study fields: `name` (short name shown above the title and on homepage rows), `scope`, and `collaborators` (a list).
- `homepageOrder: 1` adds the project to the homepage "Things I've made" rows, in that order.
- `listed: false` keeps a page reachable but hides it from the Work page.

Leave optional fields out entirely rather than empty; nothing renders for a missing field.

## 3. Write the MDX content

Below the frontmatter, import the building blocks you need and write the story:

```mdx
import Section from '../../../components/project/Section.astro';
import Figure from '../../../components/project/Figure.astro';
import ImagePair from '../../../components/project/ImagePair.astro';

<Section title="Context">

Normal **Markdown** paragraphs, lists and [links](https://example.com) go here.

</Section>
```

- **Case studies:** the usual sections are `Context`, `Approach` and `Outcome`, but any title works.
- **Side projects:** `About this project`, plus an optional `What I explored`.
- Leave a blank line after `<Section …>` and before `</Section>` so the Markdown inside is parsed.

## 4. Add and reference colocated images

1. Put the file in the project's `images/` folder, e.g. `images/checkout-flow.png`.
2. **Cover / lead image:** set `cover: './images/checkout-flow.png'` and `coverAlt` in the frontmatter. It's used on the Work page, the homepage row (if listed there) and as the page's lead image. The build fails with a clear message if the path is wrong.
3. **Images in the story:** import the file and pass it to a component:

```mdx
import checkout from './images/checkout-flow.png';
import receipt from './images/receipt.png';

<Figure src={checkout} alt="Describe the image" caption="Optional caption." />

<ImagePair
  first={{ src: checkout, alt: 'Describe the first image' }}
  second={{ src: receipt, alt: 'Describe the second image' }}
  caption="Optional shared caption."
/>
```

Astro resizes and converts these images at build time. Supported formats: PNG, JPG, WebP, AVIF, GIF and SVG.

## 5. Replace placeholders

- Delete each `<Placeholder />` label together with the sample copy beneath it, then write the real paragraph.
- Swap `placeholder="…"` on `<Figure>` / `<ImagePair>` for `src={…}` and `alt="…"` (step 4).
- Replace "to confirm" values (`disciplines`, `scope`) or remove them.
- Set `placeholder: false` once the page is real.
- Remove the `Placeholder` import when no longer used.

Run `npm run check` and `npm run build` before committing.
