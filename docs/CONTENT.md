# Content and editorial guidelines

## Purpose and voice

This is Taj's personal space for work, writing, things being built, interests and life beyond work. Write in **British English**, with conversational, unpretentious copy and **sentence-case headings**. Be specific, curious and personal without sounding like marketing copy.

The homepage opening is **“Hey, I'm Taj.”** The approved working introduction is:

> I'm a product designer from Ireland, currently living in Dubai. I've been making things for the internet since I was about 15. This is my little corner of it. A place for my work, writing, things I'm building and whatever else I find interesting.

This is working copy, not an instruction to embellish the biography. Any changes to personal claims should be checked with the site owner.

## Accuracy rules

- **Never fabricate** article titles, publication dates, reviews, travel stories, listening activity, project metrics, employers' confidential details or case-study outcomes.
- For missing content, use explicitly labelled placeholders in development, or hide the entry until genuine content exists.
- Use real personal photography only with permission/appropriate rights.
- Avoid generic AI prose, exaggerated achievements and unsubstantiated statistics.
- Preserve Taj's voice; prioritise editing genuine notes over generating invented experiences.

## Initial content types

### Projects

Suggested fields: `title`, `slug`, `summary`, `year?`, `category?`, `coverImage?`, `featured`, `externalUrl?`, `draft?`, `body`. Initial candidates: **StakeOne**, **AutoInvest**, **Ink & Pixel**. Project copy and imagery require owner review.

### Writing

Suggested fields: `title`, `description`, `publishedAt`, `updatedAt?`, `tags?`, `draft`, `coverImage?`, `body`. Publish from Markdown/MDX using Astro Content Collections.

### Collections

Eventually music, books, films & TV, games, travel and bookmarks. Start with manually curated entries. Consider integrations later only when they add real value.

### Life lately

Short, verifiable updates or links about what is being read, listened to, built or enjoyed. It is better to show fewer genuine items than invented live activity.

## Obsidian relationship

Obsidian is the **journal and research archive**: milestones, exploration, rejected directions, reflections. Repository documentation is the **current implementation brief**. Do not ingest the whole vault or treat exploratory notes as requirements. Selected finished writing may be exported as Markdown/MDX; automatic sync is not a launch dependency.

## Content publishing

Prefer repository-based Markdown/MDX first, with a simple schema and explicit draft state. Do not add a CMS until editing needs justify it.
