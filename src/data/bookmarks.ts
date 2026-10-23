/**
 * Bookmarks page content (/bookmarks). Maintained by hand; see docs/AUTHORING-BOOKMARKS.md.
 * The current entries are a sample collection to demonstrate the layout
 * (`sample: true`), not personal recommendations. Each URL was checked to load.
 */

/** Categories in display order. Rename freely; empty categories are hidden. */
export const categories = ['Design', 'Tools', 'Reading', 'Inspiration'] as const;
export type Category = (typeof categories)[number];

export interface Bookmark {
  /** Stable identifier. */
  id: string;
  title: string;
  url: string;
  /** One short, factual sentence. */
  description: string;
  category: Category;
  /** Position within its category (ascending). */
  order: number;
  /** True for sample entries rather than personal bookmarks. */
  sample?: boolean;
}

const bookmarks: Bookmark[] = [
  { id: 'laws-of-ux', title: 'Laws of UX', url: 'https://lawsofux.com/', description: 'A collection of psychology-based principles for designing user interfaces.', category: 'Design', order: 1, sample: true },
  { id: 'nngroup-articles', title: 'Nielsen Norman Group articles', url: 'https://www.nngroup.com/articles/', description: 'Research-based articles on usability and user experience.', category: 'Design', order: 2, sample: true },
  { id: 'refactoring-ui', title: 'Refactoring UI', url: 'https://www.refactoringui.com/', description: 'A book of practical visual design tactics for interfaces.', category: 'Design', order: 3, sample: true },

  { id: 'excalidraw', title: 'Excalidraw', url: 'https://excalidraw.com/', description: 'An open-source virtual whiteboard for hand-drawn-style diagrams.', category: 'Tools', order: 1, sample: true },
  { id: 'squoosh', title: 'Squoosh', url: 'https://squoosh.app/', description: 'A browser-based image compressor for comparing formats and quality settings.', category: 'Tools', order: 2, sample: true },
  { id: 'can-i-use', title: 'Can I use', url: 'https://caniuse.com/', description: 'Browser support tables for HTML, CSS and JavaScript features.', category: 'Tools', order: 3, sample: true },

  { id: 'smashing-magazine', title: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/', description: 'Articles and books on web design and front-end development.', category: 'Reading', order: 1, sample: true },
  { id: 'a-list-apart', title: 'A List Apart', url: 'https://alistapart.com/', description: 'A long-running publication about designing and building websites.', category: 'Reading', order: 2, sample: true },
  { id: 'the-pudding', title: 'The Pudding', url: 'https://pudding.cool/', description: 'Visual essays that explain ideas through data and interactive graphics.', category: 'Reading', order: 3, sample: true },

  { id: 'mobbin', title: 'Mobbin', url: 'https://mobbin.com/', description: 'A library of screens and flows from real mobile and web apps.', category: 'Inspiration', order: 1, sample: true },
  { id: 'are-na', title: 'Are.na', url: 'https://www.are.na/', description: 'A platform for collecting and connecting ideas, images and links.', category: 'Inspiration', order: 2, sample: true },
  { id: 'minimal-gallery', title: 'Minimal Gallery', url: 'https://minimal.gallery/', description: 'A hand-picked gallery of minimal website designs.', category: 'Inspiration', order: 3, sample: true },
];

/** "www.nngroup.com/articles/" → "nngroup.com" */
export const domainOf = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/** Categories with their bookmarks, in display order; empty categories are left out. */
export const bookmarksByCategory = categories
  .map((category) => ({
    category,
    bookmarks: bookmarks.filter((b) => b.category === category).sort((a, b) => a.order - b.order),
  }))
  .filter((group) => group.bookmarks.length > 0);

export const isSampleCollection = bookmarks.some((b) => b.sample);
