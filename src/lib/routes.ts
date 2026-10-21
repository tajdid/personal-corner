/** Single source of truth for internal URLs (see docs/SITEMAP.md). */
export const routes = {
  home: '/',
  writing: '/writing',
  work: '/work',
  about: '/about',
  note: (slug: string) => `/writing/${slug}`,
  project: (slug: string) => `/work/${slug}`,
  /** Collections use short top-level URLs, e.g. /music. */
  collection: (slug: string) => `/${slug}`,
};
