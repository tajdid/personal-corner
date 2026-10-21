# Claude Code project instructions

This repository is Taj's handcrafted, content-first personal website. The implementation agent is Claude Code; design/product decisions are human-led.

## Read first

- `docs/DESIGN.md` — confirmed visual identity, homepage structure, approved screenshot
- `docs/CONTENT.md` — content model, editorial voice, factual accuracy
- `docs/SITEMAP.md` — routes, navigation, and phased scope
- `README.md` — setup and development workflow

If a request conflicts with a confirmed decision, flag the conflict rather than silently redesigning. Distinguish confirmed decisions from future ideas.

## Technical baseline

- Astro, TypeScript strict, Tailwind CSS plus custom CSS, Astro Content Collections, Markdown/MDX.
- Static output by default. Use Astro components for static UI; introduce React islands only for interactions that require them.
- Vercel deployment and GitHub version control.
- Follow current official Astro/Tailwind integration guidance for installed versions; do not assume an outdated package setup.
- Keep dependencies lean, content separate from presentation, components pragmatic.

## Working agreement

1. Inspect relevant files before changes.
2. Implement the smallest useful increment; avoid unrelated refactors.
3. Follow approved Figma screenshot and design tokens rather than inventing a new visual direction.
4. Do not invent personal biography, article titles, current activities, project outcomes, or photographs. Use clearly labelled placeholders or omit unknowns.
5. Ensure semantic HTML, accessible focus states, responsive layout, alt text, and reduced-motion support.
6. Run available checks/build and report what changed, what was tested, and what remains uncertain.
7. Do not overwrite existing work without checking.

## Current scope

Milestone 03: establish the project foundation, then build the homepage. Do not implement all future pages or integrations yet. Polaroid photography is reserved for About, not Home.
