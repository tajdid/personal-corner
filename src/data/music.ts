/**
 * Music page content (/music). Curated by hand; see docs/AUTHORING-MUSIC.md.
 * URLs are only set once verified against the exact Spotify page.
 */

import type { ImageMetadata } from 'astro';
import archangelMix from '../assets/music/archangel-mix.jpg';
import backToTheFuture from '../assets/music/back-to-the-future.jpg';
import analogDreams from '../assets/music/analog-dreams.jpg';
import bicep from '../assets/music/bicep.jpg';
import untrue from '../assets/music/untrue.jpg';
import foresthills from '../assets/music/2014-forest-hills-drive.jpg';
import am from '../assets/music/am.jpg';
import noMoreIdols from '../assets/music/no-more-idols.jpg';
import goodKid from '../assets/music/good-kid-maad-city.jpg';

export interface Artwork {
  src: ImageMetadata;
  /** Used only when no adjacent text names the item; covers next to their titles are decorative. */
  alt: string;
}

interface MusicEntry {
  /** Stable identifier, e.g. for future anchors. */
  id: string;
  title: string;
  /** Position in its list (ascending). */
  order: number;
  artwork?: Artwork;
  /** Verified external URL; omit if unconfirmed. */
  url?: string;
}

export interface Playlist extends MusicEntry {
  description: string;
}

export interface Album extends MusicEntry {
  artist: string;
}

const byOrder = <T extends MusicEntry>(entries: T[]) => [...entries].sort((a, b) => a.order - b.order);

export const playlists: Playlist[] = byOrder([
  {
    id: 'archangel-mix',
    title: 'Archangel Mix',
    description: 'Hazy electronics, ghostly vocals and late-night atmosphere.',
    order: 1,
    artwork: { src: archangelMix, alt: 'Archangel Mix playlist cover collage' },
    url: 'https://open.spotify.com/playlist/4oEvDEdEy9wAtkgmpr5HMx',
  },
  {
    id: 'back-to-the-future',
    title: 'Back to the Future',
    description: 'Warm melodies, restless rhythms and a little dance-floor escapism.',
    order: 2,
    artwork: { src: backToTheFuture, alt: 'Back to the Future playlist cover collage' },
    url: 'https://open.spotify.com/playlist/04m6Qk3iMZgf55SO1ta9uo',
  },
  {
    id: 'analog-dreams',
    title: 'Analog Dreams',
    description: 'Deep grooves, textured synths and tracks that take their time.',
    order: 3,
    artwork: { src: analogDreams, alt: 'Analog Dreams playlist cover collage' },
    url: 'https://open.spotify.com/playlist/1LvuH7dy0rodvx28Bvjx0w',
  },
]);

export const albums: Album[] = byOrder([
  {
    id: 'bicep',
    title: 'Bicep',
    artist: 'Bicep',
    order: 1,
    artwork: { src: bicep, alt: 'Bicep by Bicep album cover' },
    url: 'https://open.spotify.com/album/4psDRFbIlUM1KUb1omccXo',
  },
  {
    id: 'untrue',
    title: 'Untrue',
    artist: 'Burial',
    order: 2,
    artwork: { src: untrue, alt: 'Untrue by Burial album cover' },
    url: 'https://open.spotify.com/album/1C30LhZB9I48LdpVCRRYvq',
  },
  {
    id: '2014-forest-hills-drive',
    title: '2014 Forest Hills Drive',
    artist: 'J. Cole',
    order: 3,
    artwork: { src: foresthills, alt: '2014 Forest Hills Drive by J. Cole album cover' },
    url: 'https://open.spotify.com/album/0UMMIkurRUmkruZ3KGBLtG',
  },
  {
    id: 'am',
    title: 'AM',
    artist: 'Arctic Monkeys',
    order: 4,
    artwork: { src: am, alt: 'AM by Arctic Monkeys album cover' },
    url: 'https://open.spotify.com/album/78bpIziExqiI9qztvNFlQu',
  },
  {
    id: 'no-more-idols',
    title: 'No More Idols',
    artist: 'Chase & Status',
    order: 5,
    artwork: { src: noMoreIdols, alt: 'No More Idols by Chase & Status album cover' },
    url: 'https://open.spotify.com/album/245j9BaZFuEso2vfLRVnQr',
  },
  {
    id: 'good-kid-maad-city',
    title: 'good kid, m.A.A.d city',
    artist: 'Kendrick Lamar',
    order: 6,
    artwork: { src: goodKid, alt: 'good kid, m.A.A.d city by Kendrick Lamar album cover' },
    url: 'https://open.spotify.com/album/6PBZN8cbwkqm1ERj2BGXJ1',
  },
]);
