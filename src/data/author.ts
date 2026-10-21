/** Author details shown beneath each article (AuthorCard). Edit here only. */

import portrait from '../assets/about/me.png';
import { routes } from '../lib/routes';

export const author = {
  name: 'Tajdid Rahman',
  bio: 'I’m a product designer from Ireland, currently living in Dubai. I’ve been making things for the internet since I was about 15.',
  aboutHref: routes.about,
  /** Verified photo of Taj (docs/photos/me.png); cropped to a small circle. */
  portrait,
  /** Keeps the face in frame when cropped to a circle. */
  portraitPosition: '66% 30%',
  /** Set once a working feed exists; the RSS link is omitted until then. */
  rssHref: undefined as string | undefined,
};
