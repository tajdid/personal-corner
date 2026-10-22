/**
 * Project discovery. Each project lives in its own folder under src/pages/work/
 * (index.mdx + images/); this module reads their frontmatter so listings never
 * duplicate metadata. See docs/AUTHORING-PROJECTS.md.
 */

import type { ImageMetadata } from 'astro';

export type ProjectType = 'case-study' | 'side-project';

/** Frontmatter fields an index.mdx project page may set. */
export interface ProjectFrontmatter {
  title: string;
  summary: string;
  type: ProjectType;
  /** Position within its listing (ascending). */
  order: number;
  /** Short name shown above the case-study title and on homepage rows. */
  name?: string;
  /** My documented responsibility on the project, e.g. "Lead product designer". */
  role?: string;
  /** Explicit project timeframe from the source, e.g. "4 weeks". Omit if unknown. */
  duration?: string;
  disciplines?: string[];
  year?: number;
  scope?: string;
  collaborators?: string[];
  /** Path relative to the project folder, e.g. ./images/cover.png */
  cover?: string;
  coverAlt?: string;
  /** Live project URL (external). Not `url`: Astro sets that to the page's own URL. */
  liveUrl?: string;
  /** Source code URL (external). */
  sourceUrl?: string;
  /** Marks the page as placeholder content still to be written. */
  placeholder?: boolean;
  /** Set to false to keep a page reachable but out of the Work listings. */
  listed?: boolean;
  /** Include on the homepage "Things I've made" rows, in this order. */
  homepageOrder?: number;
}

/** A real image, or a labelled placeholder until imagery is supplied. */
export type ProjectImage = { src: ImageMetadata; alt: string } | { placeholder: string };

export interface Project extends ProjectFrontmatter {
  slug: string;
  href: string;
  /** Resolved cover, or a labelled placeholder when none is set. */
  image: ProjectImage;
}

// Literal patterns so Vite can resolve every page and image at build time.
const pages = import.meta.glob<{ frontmatter: ProjectFrontmatter }>(
  '/src/pages/work/*/index.mdx',
  { eager: true },
);
const images = import.meta.glob<ImageMetadata>(
  '/src/pages/work/*/images/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, import: 'default' },
);

const slugFromPath = (path: string) => path.split('/').at(-2) ?? path;

/** Resolves a folder-relative image path (./images/x.png) for a project slug. */
export function resolveProjectImage(slug: string, relativePath: string): ImageMetadata | undefined {
  const clean = relativePath.replace(/^\.\//, '');
  return images[`/src/pages/work/${slug}/${clean}`];
}

/** Slug from an index.mdx file path (absolute or project-root relative). */
export function slugFromFile(file: string) {
  return slugFromPath(file.replace(/\\/g, '/'));
}

function toProject(path: string, frontmatter: ProjectFrontmatter): Project {
  const slug = slugFromPath(path);
  if (frontmatter.type !== 'case-study' && frontmatter.type !== 'side-project') {
    throw new Error(`${path}: frontmatter "type" must be "case-study" or "side-project".`);
  }
  if (typeof frontmatter.order !== 'number') {
    throw new Error(`${path}: frontmatter "order" must be a number.`);
  }
  for (const field of ['role', 'duration', 'scope'] as const) {
    const value = frontmatter[field];
    if (value !== undefined && (typeof value !== 'string' || !value.trim())) {
      throw new Error(`${path}: frontmatter "${field}" must be a non-empty string when set.`);
    }
  }

  const coverSrc = frontmatter.cover ? resolveProjectImage(slug, frontmatter.cover) : undefined;
  if (frontmatter.cover && !coverSrc) {
    throw new Error(`${path}: cover "${frontmatter.cover}" was not found in its images folder.`);
  }

  return {
    ...frontmatter,
    slug,
    href: `/work/${slug}`,
    image: coverSrc
      ? { src: coverSrc, alt: frontmatter.coverAlt ?? '' }
      : { placeholder: `${frontmatter.name ?? frontmatter.title} — cover image` },
  };
}

// Computed on first use, not at import: project pages import their layout, which
// imports this module, so reading frontmatter during import would hit a cycle.
let cache: Project[] | undefined;

function getProjects(): Project[] {
  cache ??= Object.entries(pages)
    .map(([path, mod]) => toProject(path, mod.frontmatter))
    .sort((a, b) => a.order - b.order);
  return cache;
}

const listed = () => getProjects().filter((project) => project.listed !== false);

export const getCaseStudies = () => listed().filter((project) => project.type === 'case-study');
export const getSideProjects = () => listed().filter((project) => project.type === 'side-project');

export const getHomepageProjects = () =>
  getProjects()
    .filter((project) => project.homepageOrder !== undefined)
    .sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0));

/** Disciplines and year as one muted metadata line. */
export const metaLine = ({ disciplines, year }: Pick<ProjectFrontmatter, 'disciplines' | 'year'>) =>
  [disciplines?.join(', '), year].filter(Boolean).join(' · ');
