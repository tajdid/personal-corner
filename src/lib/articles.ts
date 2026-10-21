/**
 * Article discovery. Each article lives in its own folder under
 * src/pages/writing/ (index.mdx + images/); this module reads their frontmatter
 * and owns ordering and "more writing" navigation so every listing agrees.
 * See docs/AUTHORING-WRITING.md.
 */

import type { ImageMetadata } from 'astro';

/** Frontmatter fields an index.mdx article may set. */
export interface ArticleFrontmatter {
  title: string;
  summary: string;
  /** Real publication date (YYYY-MM-DD). Omit until the article is published. */
  publishedAt?: string | Date;
  category?: string;
  /** Fallback position for undated articles (ascending); ties after dated ones. */
  order: number;
  placeholder?: boolean;
  /** Include in the homepage "Notes from the internet" list, in this order. */
  homepageOrder?: number;
}

export interface Article extends Omit<ArticleFrontmatter, 'publishedAt'> {
  slug: string;
  href: string;
  publishedAt?: Date;
}

// Literal patterns so Vite can resolve every article and image at build time.
const pages = import.meta.glob<{ frontmatter: ArticleFrontmatter }>(
  '/src/pages/writing/*/index.mdx',
  { eager: true },
);
const images = import.meta.glob<ImageMetadata>(
  '/src/pages/writing/*/images/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, import: 'default' },
);

const slugFromPath = (path: string) => path.replace(/\\/g, '/').split('/').at(-2) ?? path;

/** Slug from an article's index.mdx file path. */
export const slugFromFile = slugFromPath;

/** Resolves a folder-relative image path (./images/x.png) for an article slug. */
export function resolveArticleImage(slug: string, relativePath: string): ImageMetadata | undefined {
  return images[`/src/pages/writing/${slug}/${relativePath.replace(/^\.\//, '')}`];
}

function parseDate(path: string, value: ArticleFrontmatter['publishedAt']) {
  if (value === undefined) return undefined;
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${path}: "publishedAt" must be a date in YYYY-MM-DD format.`);
  }
  return date;
}

function toArticle(path: string, frontmatter: ArticleFrontmatter): Article {
  if (typeof frontmatter.order !== 'number') {
    throw new Error(`${path}: frontmatter "order" must be a number.`);
  }
  const slug = slugFromPath(path);
  return { ...frontmatter, slug, href: `/writing/${slug}`, publishedAt: parseDate(path, frontmatter.publishedAt) };
}

/**
 * Newest first: dated articles by date (newest first), then undated articles
 * by `order`. "Previous" is the next entry in this sequence.
 */
function compare(a: Article, b: Article) {
  if (a.publishedAt && b.publishedAt) {
    return b.publishedAt.getTime() - a.publishedAt.getTime() || a.order - b.order;
  }
  if (a.publishedAt) return -1;
  if (b.publishedAt) return 1;
  return a.order - b.order;
}

// Computed on first use, not at import: article pages import ArticleLayout, which
// imports this module, so reading frontmatter during import would hit a cycle.
let cache: Article[] | undefined;

/** All articles in index order. */
export function getArticles(): Article[] {
  cache ??= Object.entries(pages)
    .map(([path, mod]) => toArticle(path, mod.frontmatter))
    .sort(compare);
  return cache;
}

export const getHomepageArticles = () =>
  getArticles()
    .filter((article) => article.homepageOrder !== undefined)
    .sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0));

/** The immediately older article and up to three other recent ones, without repeats. */
export function moreWriting(slug: string, recentLimit = 3) {
  const articles = getArticles();
  const index = articles.findIndex((article) => article.slug === slug);
  const previous = index >= 0 ? articles[index + 1] : undefined;
  const recently = articles
    .filter((article) => article.slug !== slug && article.slug !== previous?.slug)
    .slice(0, recentLimit);
  return { previous, recently };
}

/** e.g. "12 Oct 2026", matching the homepage list. */
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
