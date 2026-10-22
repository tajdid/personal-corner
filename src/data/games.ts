/**
 * Games page content (/games). Maintained by hand; see docs/AUTHORING-GAMES.md.
 * Games and consoles are kept separate. Nothing here is fetched from Backloggd.
 */

import type { ImageMetadata } from 'astro';
import pokemonFireRed from '../assets/games/pokemon-firered.jpg';
import pokemonPokopia from '../assets/games/pokemon-pokopia.jpg';
import assassinsCreed from '../assets/games/assassins-creed.jpg';
import tombRaider2013 from '../assets/games/tomb-raider-2013.jpg';
import ghostOfTsushima from '../assets/games/ghost-of-tsushima.jpg';
import pokemonEmerald from '../assets/games/pokemon-emerald.jpg';
import pokemonSapphire from '../assets/games/pokemon-sapphire.jpg';
import pokemonRuby from '../assets/games/pokemon-ruby.jpg';
import pokemonYellow from '../assets/games/pokemon-yellow.jpg';
import pokemonRed from '../assets/games/pokemon-red.jpg';
import persona4Golden from '../assets/games/persona-4-golden.jpg';
import persona3Reload from '../assets/games/persona-3-reload.jpg';
import persona5Royal from '../assets/games/persona-5-royal.jpg';
import pokemonSword from '../assets/games/pokemon-sword.jpg';
import zeldaBotw from '../assets/games/zelda-botw.jpg';
import milesMorales from '../assets/games/spider-man-miles-morales.jpg';
import superMarioOdyssey from '../assets/games/super-mario-odyssey.jpg';

export const BACKLOGGD_URL = 'https://backloggd.com/u/tajio';

export interface Artwork {
  src: ImageMetadata;
  /** Used only where no adjacent text names the game; covers beside titles are decorative. */
  alt: string;
}

export interface Game {
  /** Stable identifier. */
  id: string;
  title: string;
  /** Release year, only where needed to tell editions apart. */
  year?: number;
  section: 'current' | 'collection';
  /** Position within its section (ascending). */
  order: number;
  artwork?: Artwork;
  /** Device I'm playing it on (current games), as I've stated it. */
  playingOn?: string;
  /** Platform, only when confirmed. */
  platform?: string;
  /** Optional short note in my own words. */
  note?: string;
  /** Verified external page; omit unless confirmed. */
  url?: string;
}

const games: Game[] = [
  { id: 'pokemon-firered', title: 'Pokémon FireRed', section: 'current', order: 1, artwork: { src: pokemonFireRed, alt: 'Pokémon FireRed box art' }, playingOn: 'Nintendo Switch 2' },
  { id: 'pokemon-pokopia', title: 'Pokémon Pokopia', section: 'current', order: 2, artwork: { src: pokemonPokopia, alt: 'Pokémon Pokopia box art' }, playingOn: 'Nintendo Switch 2' },

  { id: 'assassins-creed', title: 'Assassin’s Creed', section: 'collection', order: 1, artwork: { src: assassinsCreed, alt: 'Assassin’s Creed box art' } },
  { id: 'tomb-raider-2013', title: 'Tomb Raider', year: 2013, section: 'collection', order: 2, artwork: { src: tombRaider2013, alt: 'Tomb Raider (2013) box art' } },
  // Edition-correct artwork not found yet; shows a placeholder.
  { id: 'mario-kart-8-deluxe', title: 'Mario Kart 8 Deluxe', section: 'collection', order: 3 },
  { id: 'ghost-of-tsushima', title: 'Ghost of Tsushima', section: 'collection', order: 4, artwork: { src: ghostOfTsushima, alt: 'Ghost of Tsushima box art' } },
  { id: 'pokemon-emerald', title: 'Pokémon Emerald', section: 'collection', order: 5, artwork: { src: pokemonEmerald, alt: 'Pokémon Emerald box art' } },
  { id: 'pokemon-sapphire', title: 'Pokémon Sapphire', section: 'collection', order: 6, artwork: { src: pokemonSapphire, alt: 'Pokémon Sapphire box art' } },
  { id: 'pokemon-ruby', title: 'Pokémon Ruby', section: 'collection', order: 7, artwork: { src: pokemonRuby, alt: 'Pokémon Ruby box art' } },
  { id: 'pokemon-yellow', title: 'Pokémon Yellow', section: 'collection', order: 8, artwork: { src: pokemonYellow, alt: 'Pokémon Yellow box art' } },
  { id: 'pokemon-red', title: 'Pokémon Red', section: 'collection', order: 9, artwork: { src: pokemonRed, alt: 'Pokémon Red box art' } },
  { id: 'persona-4-golden', title: 'Persona 4 Golden', section: 'collection', order: 10, artwork: { src: persona4Golden, alt: 'Persona 4 Golden cover art' } },
  { id: 'persona-3-reload', title: 'Persona 3 Reload', section: 'collection', order: 11, artwork: { src: persona3Reload, alt: 'Persona 3 Reload box art' } },
  { id: 'persona-5-royal', title: 'Persona 5 Royal', section: 'collection', order: 12, artwork: { src: persona5Royal, alt: 'Persona 5 Royal cover art' } },
  { id: 'pokemon-sword', title: 'Pokémon Sword', section: 'collection', order: 13, artwork: { src: pokemonSword, alt: 'Pokémon Sword key art' } },
  { id: 'zelda-botw', title: 'The Legend of Zelda: Breath of the Wild', section: 'collection', order: 14, artwork: { src: zeldaBotw, alt: 'The Legend of Zelda: Breath of the Wild box art' } },
  { id: 'spider-man-miles-morales', title: 'Marvel’s Spider-Man: Miles Morales', section: 'collection', order: 15, artwork: { src: milesMorales, alt: 'Marvel’s Spider-Man: Miles Morales box art' } },
  { id: 'super-mario-odyssey', title: 'Super Mario Odyssey', section: 'collection', order: 16, artwork: { src: superMarioOdyssey, alt: 'Super Mario Odyssey box art' } },
];

const inSection = (section: Game['section']) =>
  games.filter((game) => game.section === section).sort((a, b) => a.order - b.order);

export const currentlyPlaying = inSection('current');
export const collection = inSection('collection');

export interface ConsoleFamily {
  name: string;
  consoles: { name: string; current?: boolean }[];
}

export const consoleFamilies: ConsoleFamily[] = [
  {
    name: 'Nintendo',
    consoles: [
      { name: 'Nintendo Switch 2', current: true },
      { name: 'Nintendo Switch' },
      { name: 'Nintendo 3DS' },
      { name: 'Wii' },
      { name: 'Nintendo DS' },
      { name: 'Game Boy Advance' },
      { name: 'Game Boy Color' },
      { name: 'Game Boy' },
      { name: 'SNES' },
    ],
  },
  {
    name: 'PlayStation',
    consoles: [
      { name: 'PS5', current: true },
      { name: 'PS4' },
      { name: 'PS3' },
      { name: 'PS2' },
      { name: 'PlayStation' },
      { name: 'PS Vita' },
      { name: 'PSP' },
    ],
  },
  {
    name: 'Xbox',
    consoles: [{ name: 'Xbox 360' }],
  },
];
