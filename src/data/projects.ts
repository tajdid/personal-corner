/**
 * Projects for the homepage, the Work page and /work/[slug].
 * - `caseStudies`: the four featured case studies on Work.
 * - `otherProjects`: entries with detail pages that aren't (yet) on Work.
 * - `sideProjects`: the lighter list at the bottom of Work.
 * Everything here is placeholder until Taj supplies real copy and imagery
 * (docs/CONTENT.md: never fabricate clients, metrics, results or collaborators).
 * All detail fields are optional; the template omits anything not provided.
 * Move to a Content Collection once genuine write-ups exist.
 */

import type { ImageMetadata } from 'astro';

/** A real image, or a labelled placeholder until imagery is supplied. */
export type ProjectImage =
  | { src: ImageMetadata; alt: string }
  | { placeholder: string };

export type StoryBlock =
  | { kind: 'text'; heading: string; paragraphs: string[]; placeholder?: boolean }
  | { kind: 'image'; image: ProjectImage; caption?: string }
  | { kind: 'pair'; images: [ProjectImage, ProjectImage]; caption?: string };

export interface Project {
  slug: string;
  /** Short project name, used on homepage rows. */
  title: string;
  /** Case-study title; used on Work and as the detail page heading when set. */
  headline?: string;
  summary: string;
  /** Role or discipline, shown in row metadata and the detail header. */
  role?: string;
  year?: number;
  /** Listing image; falls back to a labelled placeholder. */
  image?: ProjectImage;
  scope?: string;
  collaborators?: string[];
  leadImage?: ProjectImage;
  story?: StoryBlock[];
}

const placeholderParagraph = (topic: string) =>
  `A short paragraph on ${topic} will go here once the write-up is ready.`;

export const caseStudies: Project[] = [
  {
    slug: 'stakeone',
    title: 'StakeOne',
    headline: 'Taking StakeOne from concept to mobile experience',
    summary: 'Short project description to come.',
    role: 'Role to confirm',
    image: { placeholder: 'StakeOne — selected screens' },
    scope: 'Scope to confirm',
    leadImage: { placeholder: 'StakeOne — lead image' },
    // Sample structure demonstrating the template; replace with the real story.
    story: [
      {
        kind: 'text',
        heading: 'Context',
        placeholder: true,
        paragraphs: [placeholderParagraph('the problem and where the project started')],
      },
      {
        kind: 'text',
        heading: 'Approach',
        placeholder: true,
        paragraphs: [
          placeholderParagraph('how the work was approached'),
          placeholderParagraph('the key decisions along the way'),
        ],
      },
      {
        kind: 'image',
        image: { placeholder: 'StakeOne — full-width image' },
        caption: 'Caption to come.',
      },
      {
        kind: 'pair',
        images: [
          { placeholder: 'StakeOne — detail one' },
          { placeholder: 'StakeOne — detail two' },
        ],
        caption: 'Caption to come.',
      },
      {
        kind: 'text',
        heading: 'Outcome',
        placeholder: true,
        paragraphs: [placeholderParagraph('where the project ended up')],
      },
    ],
  },
  {
    slug: 'ai-native-design-system',
    title: 'Leading the vision for an AI-native design system',
    summary: 'Short description to come.',
    role: 'Role to confirm',
    image: { placeholder: 'AI-native design system — cover image' },
  },
  {
    slug: 'fx-withdrawals',
    title: 'Designing transparent FX withdrawals',
    summary: 'Short description to come.',
    role: 'Role to confirm',
    image: { placeholder: 'FX withdrawals — cover image' },
  },
  {
    slug: 'kyc-platform-redesign',
    title: 'Redesigning a complex KYC platform in four weeks',
    summary: 'Short description to come.',
    role: 'Role to confirm',
    image: { placeholder: 'KYC platform — cover image' },
  },
];

// Category (case study or side project) still to confirm; linked from the homepage.
export const otherProjects: Project[] = [
  {
    slug: 'autoinvest',
    title: 'AutoInvest',
    summary: 'Short project description to come.',
    role: 'Role to confirm',
    image: { placeholder: 'AutoInvest — selected screens' },
  },
  {
    slug: 'ink-and-pixel',
    title: 'Ink & Pixel',
    summary: 'Short project description to come.',
    role: 'Role to confirm',
    image: { placeholder: 'Ink & Pixel — selected screens' },
  },
];

/** Every project with a detail page. */
export const projects: Project[] = [...caseStudies, ...otherProjects];

const bySlug = (slug: string) => {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
};

/** Homepage "Things I've made" rows, in order. */
export const homepageProjects: Project[] = ['stakeone', 'autoinvest', 'ink-and-pixel'].map(bySlug);

export interface SideProject {
  title: string;
  description: string;
  year?: number;
  status?: string;
  thumbnail?: ProjectImage;
  /** Internal path or external URL; omit until a real destination exists. */
  href?: string;
}

// Sample entries demonstrating the layout; replace with real side projects.
export const sideProjects: SideProject[] = [
  { title: 'Sample side project one', description: 'A one-line description of the side project will sit here.' },
  { title: 'Sample side project two', description: 'A one-line description of the side project will sit here.' },
  { title: 'Sample side project three', description: 'A one-line description of the side project will sit here.' },
];
