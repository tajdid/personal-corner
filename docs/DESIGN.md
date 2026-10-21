# Design guidelines

**Status:** Confirmed creative direction, with implementation details to be resolved as needed.  
**Reference:** [`references/homepage-desktop.png`](references/homepage-desktop.png) — selected homepage concept; follow its structure rather than copying placeholder content.

## Intent

A handcrafted personal corner of the internet, **not a conventional designer portfolio**. Approximately 80% restrained editorial design and 20% playful, personal details. The site should feel warm, legible, intentional and human.

## Principles

1. **Typography first** — hierarchy through type, weight and spacing.
2. **Content over decoration** — substance and readability lead.
3. **A little personality** — small details, not spectacle.
4. **Different layouts for different content** — writing, projects, travel and collections need not look identical.
5. **Genuinely handcrafted** — AI can help implement, but should not invent creative decisions.

## Type

Use **Archivo exclusively**. Establish hierarchy with size, weight, line-height and spacing. Aim for comfortable reading lengths (roughly 680–720px for long-form text), not tiny metadata or overblown headings. Exact responsive type scale remains an implementation choice.

## Colour tokens

| Token | Hex | Use |
|---|---|---|
| Background | `#F3F0E9` | Warm paper base |
| Ink | `#171A17` | Primary text |
| Muted | `#6D706A` | Secondary text and metadata |
| Border | `#DAD8D0` | Restrained dividers |
| Accent | `#123E30` | Forest green, used sparingly |

Check contrast and focus visibility in actual implementation. Photography and project imagery may introduce their own colours; do not add arbitrary global palette colours.

## Global layout

- Editorial, predominantly left-aligned, with generous whitespace and subtle rules.
- Narrow reading columns for prose; wider areas for project imagery and collections.
- Prefer spacing and typography over boxed cards and heavy shadows.
- Design mobile layouts intentionally rather than mechanically squeezing desktop columns.
- Simple navigation and discoverable text links.

## Approved homepage structure

1. Minimal header: wordmark/name and **Writing / Work / About**.
2. Introduction: **“Hey, I'm Taj.”**, short conversational bio, optional small location detail.
3. **01 / Things I've made** — selected projects in consistent **horizontal rows**, image left and description right. No masonry, staggering or alternating image positions. Initial candidates: StakeOne, AutoInvest, Ink & Pixel.
4. **02 / Notes from the internet** — straightforward dated writing list with understated dividers.
5. **03 / Life lately** — genuine small updates about interests; no fabricated current activity.
6. **04 / Around here** — two-column collection of links to Music, Books, Films, Games, Travel and Bookmarks.
7. Simple footer.

Use a **narrow section-label column and wider content column** for the main sections, as in the approved screenshot. Maintain a clear mobile reading order.

## Photography

**Polaroid-style personal photographs belong on the About page only.** There they may support storytelling about memories, places and upbringing, with subtle rotations, restrained off-white frames and understated Archivo captions. Do not apply Polaroid framing to professional project images.

## Interaction and accessibility

- Meaningful hover/focus states, semantic navigation, keyboard support.
- Respect `prefers-reduced-motion`.
- Use motion only when it helps orientation or feedback.
- Optimise images and font loading.

## Avoid

Generic SaaS/dashboard aesthetics, glassmorphism, decorative gradients, excessive cards, masonry project layouts, gratuitous animation, AI-generated fake personal content, and unapproved visual reinventions.

## Future page character

Writing should feel like a publication; work should foreground imagery; travel can feel like a photo journal; collections like a personal library; stats may be more experimental. These are directional, not yet page-level specifications.
