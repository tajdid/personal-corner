/**
 * Books page content (/books). Curated by hand; see docs/AUTHORING-BOOKS.md.
 * The current entries are a sample selection for layout, not confirmed
 * personal recommendations (`placeholder: true`).
 */

import type { ImageMetadata } from 'astro';
import inspired from '../assets/books/inspired.jpg';
import leanStartup from '../assets/books/the-lean-startup.jpg';
import designOfEverydayThings from '../assets/books/the-design-of-everyday-things.jpg';
import thinkingWithType from '../assets/books/thinking-with-type.jpg';
import goodStrategy from '../assets/books/good-strategy-bad-strategy.jpg';
import momTest from '../assets/books/the-mom-test.jpg';

export interface BookCover {
  src: ImageMetadata;
  /** Used only when no adjacent text names the book; covers beside their titles are decorative. */
  alt: string;
}

export interface Book {
  /** Stable identifier. */
  id: string;
  title: string;
  author: string;
  /** Position in the grid (ascending). */
  order: number;
  cover?: BookCover;
  /** Optional short recommendation, in Taj's words. */
  note?: string;
  /** Verified destination (publisher or shop); omit until supplied. */
  url?: string;
  /** True while the entry is sample content rather than a confirmed recommendation. */
  placeholder?: boolean;
}

const byOrder = (entries: Book[]) => [...entries].sort((a, b) => a.order - b.order);

export const books: Book[] = byOrder([
  {
    id: 'inspired',
    title: 'Inspired',
    author: 'Marty Cagan',
    order: 1,
    cover: { src: inspired, alt: 'Inspired by Marty Cagan, book cover' },
    placeholder: true,
  },
  {
    id: 'the-lean-startup',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    order: 2,
    cover: { src: leanStartup, alt: 'The Lean Startup by Eric Ries, book cover' },
    placeholder: true,
  },
  {
    id: 'the-design-of-everyday-things',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    order: 3,
    cover: { src: designOfEverydayThings, alt: 'The Design of Everyday Things by Don Norman, book cover' },
    placeholder: true,
  },
  {
    id: 'thinking-with-type',
    title: 'Thinking with Type',
    author: 'Ellen Lupton',
    order: 4,
    cover: { src: thinkingWithType, alt: 'Thinking with Type by Ellen Lupton, book cover' },
    placeholder: true,
  },
  {
    id: 'good-strategy-bad-strategy',
    title: 'Good Strategy Bad Strategy',
    author: 'Richard Rumelt',
    order: 5,
    cover: { src: goodStrategy, alt: 'Good Strategy Bad Strategy by Richard Rumelt, book cover' },
    placeholder: true,
  },
  {
    id: 'the-mom-test',
    title: 'The Mom Test',
    author: 'Rob Fitzpatrick',
    order: 6,
    cover: { src: momTest, alt: 'The Mom Test by Rob Fitzpatrick, book cover' },
    placeholder: true,
  },
]);

/** True while any entry is still sample content. */
export const isSampleSelection = books.some((book) => book.placeholder);
