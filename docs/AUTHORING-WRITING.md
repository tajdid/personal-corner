# Authoring articles

Every article is a folder under `src/pages/writing/`. The folder name is the URL: `src/pages/writing/leaving-room/` is served at `/writing/leaving-room`.

```
src/pages/writing/
  index.astro              ← Writing index (built from each article's frontmatter)
  sample-note-one/
    index.mdx              ← the article: frontmatter + content
    images/                ← images used by this article only
```

The Writing index, the homepage list and each article's "Previous" / "Recently" links all read the frontmatter automatically (`src/lib/articles.ts`). There is no central list to update.

## 1. Create an article folder

1. Copy an existing folder, e.g. `sample-note-two/`.
2. Rename it to a short, lowercase, hyphenated slug. This becomes the URL, so avoid renaming it after publishing.
3. Keep the `images/` folder; `.gitkeep` only keeps it in Git while it's empty.

## 2. Set metadata and ordering

```yaml
---
layout: '../../../layouts/ArticleLayout.astro'
title: 'Leaving room for the unfinished'
summary: 'One sentence shown on the Writing index and under the title.'
publishedAt: 2026-09-28    # optional; the real publication date (YYYY-MM-DD)
category: 'Making'         # optional
order: 4                   # fallback position while undated
homepageOrder: 1           # optional; include on the homepage list, in this order
placeholder: false         # true while the article is still placeholder copy
---
```

- **Ordering:** dated articles come first, newest first. Undated articles follow, sorted by `order`. The same order drives the Writing index, "Previous" (the next-older article) and "Recently".
- **Optional fields:** leave them out rather than empty. A missing date or category simply doesn't render.
- **Dates:** only add `publishedAt` when the article is actually published. Never invent one.

## 3. Write the MDX content

Write normal Markdown below the frontmatter: `##` and `###` headings, paragraphs, links, lists, `> blockquotes`, inline `` `code` `` and fenced code blocks. `ArticleLayout` styles all of them, keeps text to a ~65-character line and adds the author section and "more writing" links at the end. Start body headings at `##`, because the title is the page's only `#`.

## 4. Add and reference colocated images

1. Put the file in the article's `images/` folder, e.g. `images/desk.jpg`.
2. Import it and use `ArticleFigure`, which can run wider than the text and takes an optional caption:

```mdx
import ArticleFigure from '../../../components/writing/ArticleFigure.astro';
import desk from './images/desk.jpg';

<ArticleFigure src={desk} alt="Describe what the image shows" caption="Optional caption." />
```

Astro resizes and converts images at build time. While an image doesn't exist yet, use `<ArticleFigure placeholder="What the image will show" />` instead of a fake file.

## 5. Replace placeholders and add a real publication date

- Delete the `Placeholder copy` line and the sample text, then write the article.
- Set `placeholder: false`.
- Add `publishedAt` with the real date when you publish. The "Sample entry" label disappears and the date takes its place everywhere.
- Replace `category: 'Category'` with a real category, or remove it.

Run `npm run check` and `npm run build` before committing.

Author details (name, bio, portrait and an RSS link once a feed exists) live in `src/data/author.ts`.
