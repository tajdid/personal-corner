/**
 * Homepage content. Everything here is placeholder until Taj supplies real
 * copy (see docs/CONTENT.md: never fabricate titles, dates or activities).
 * Projects and writing move to Content Collections once genuine entries exist.
 * Slugs drive both the homepage links and the placeholder routes (src/lib/routes.ts).
 */

export interface ProjectPreview {
  slug: string;
  title: string;
  meta: string;
  summary: string;
  imageLabel: string;
}

export interface WritingPreview {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Omit for sample entries; they are labelled as such instead of dated. */
  publishedAt?: Date;
}

export interface LifeLatelyItem {
  label: string;
  title: string;
  note: string;
}

export interface CollectionPreview {
  slug: string;
  label: string;
  description: string;
}

/** Omit `href` until a real destination exists; it renders as plain text. */
export interface FooterLink {
  label: string;
  href?: string;
}

export const projects: ProjectPreview[] = [
  {
    slug: 'stakeone',
    title: 'StakeOne',
    meta: 'Category · Year (to confirm)',
    summary: 'Short project description to come.',
    imageLabel: 'StakeOne — selected screens',
  },
  {
    slug: 'autoinvest',
    title: 'AutoInvest',
    meta: 'Category · Year (to confirm)',
    summary: 'Short project description to come.',
    imageLabel: 'AutoInvest — selected screens',
  },
  {
    slug: 'ink-and-pixel',
    title: 'Ink & Pixel',
    meta: 'Category · Year (to confirm)',
    summary: 'Short project description to come.',
    imageLabel: 'Ink & Pixel — selected screens',
  },
];

export const writing: WritingPreview[] = [
  {
    slug: 'sample-note-one',
    title: 'Sample note one',
    description: 'A one-line summary of the note will sit here.',
    category: 'Category',
  },
  {
    slug: 'sample-note-two',
    title: 'Sample note two',
    description: 'A one-line summary of the note will sit here.',
    category: 'Category',
  },
  {
    slug: 'sample-note-three',
    title: 'Sample note three',
    description: 'A one-line summary of the note will sit here.',
    category: 'Category',
  },
];

export const lifeLately: LifeLatelyItem[] = [
  { label: 'Listening', title: 'To be added', note: 'Something genuinely on repeat.' },
  { label: 'Building', title: 'To be added', note: 'A side project in progress.' },
  { label: 'Reading', title: 'To be added', note: 'A book currently on the go.' },
];

export const collections: CollectionPreview[] = [
  { slug: 'music', label: 'Music', description: 'Albums on repeat & occasional playlists' },
  { slug: 'books', label: 'Books', description: 'A small, slowly growing bookshelf' },
  { slug: 'films', label: 'Films', description: 'Things that stayed with me' },
  { slug: 'games', label: 'Games', description: 'Worlds worth getting a little lost in' },
  { slug: 'travel', label: 'Travel', description: 'Notes from here, there & back home' },
  { slug: 'bookmarks', label: 'Bookmarks', description: 'Good corners of the internet' },
];

export const footerLinks: FooterLink[] = [
  { label: 'Email' },
  { label: 'Are.na' },
  { label: 'Instagram' },
  { label: 'RSS' },
];
