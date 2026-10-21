# Taj's personal website

A handcrafted, editorial personal website for work, writing, interests and life beyond work.

## Status

**Milestone 03 — Homepage design and implementation (in progress).** This ZIP contains **project documentation and an approved homepage visual reference**, not a scaffolded Astro application.

## Confirmed stack

- Astro + strict TypeScript
- Tailwind CSS + custom CSS
- Astro Content Collections + Markdown/MDX
- React islands only if needed
- GitHub + Vercel
- Archivo and the Paper & forest palette

## Documentation

- [`CLAUDE.md`](CLAUDE.md) — instructions for Claude Code
- [`docs/DESIGN.md`](docs/DESIGN.md) — visual identity and approved layout
- [`docs/CONTENT.md`](docs/CONTENT.md) — editorial/content guidance
- [`docs/SITEMAP.md`](docs/SITEMAP.md) — routes and build phases
- [`docs/AUTHORING-PROJECTS.md`](docs/AUTHORING-PROJECTS.md) — adding and editing case studies and side projects
- [`docs/references/homepage-desktop.png`](docs/references/homepage-desktop.png) — selected Figma concept screenshot

## Getting started in Cursor with Claude Code

1. Extract these files **into the root of the empty GitHub repository**.
2. Open the repository folder in Cursor and start Claude Code.
3. Ask Claude to read `CLAUDE.md` and the linked docs.
4. Ask it to initialise Astro **in the existing repository root** using current official setup guidance, configure TypeScript, Tailwind and MDX, and create only a placeholder homepage first.
5. Have it run checks and a production build, then review the diff before committing.
6. Next, implement the approved homepage in small reviewable stages.

Suggested initial instruction:

> Read CLAUDE.md, docs/DESIGN.md, docs/CONTENT.md, docs/SITEMAP.md and the homepage screenshot. This is an empty repo. Set up the agreed Astro stack directly in this directory, without nesting another project or building the full homepage yet. Use the latest recommended integrations for the installed Astro version. Explain your plan, then implement the foundation, run checks and summarise results. Preserve all supplied documentation.

## Ownership

Creative decisions and content are human-led. Claude Code handles implementation. Obsidian remains the private design journal; only confirmed requirements are copied into this repository.
