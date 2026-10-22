/**
 * Travel page content (/travel). Maintained by hand; see docs/AUTHORING-TRAVEL.md.
 * Country visits are confirmed; some destination details came from older notes,
 * so correct them freely. No dates, bookings or other private details belong here.
 */

import type { ImageMetadata } from 'astro';
import parisPhoto from '../assets/about/paris.png';
import warsawPhoto from '../assets/about/warsaw-poland.png';

export type Continent = 'Europe' | 'Asia' | 'North America' | 'Africa';

export interface Destination {
  /** Stable identifier. */
  id: string;
  /** Place name: a city, region or island. */
  name: string;
  /** Personal photograph, only where its location is verified. */
  image?: { src: ImageMetadata; alt: string };
  /** Optional short caption in my own words. */
  caption?: string;
  /** Marks a place I've lived. */
  home?: boolean;
  /** Optional, kept private for now (YYYY or YYYY-MM). */
  firstVisited?: string;
}

export interface Country {
  /** Stable identifier (ISO 3166-1 alpha-2, lowercase). */
  id: string;
  name: string;
  /** Flag emoji; decorative, the name is always shown as text. */
  flag: string;
  continent: Continent;
  /** In display order. Empty while destinations are still to be added. */
  destinations: Destination[];
}

const place = (id: string, name: string, extra: Partial<Destination> = {}): Destination => ({ id, name, ...extra });

const allCountries: Country[] = [
  { id: 'bd', name: 'Bangladesh', flag: '🇧🇩', continent: 'Asia', destinations: [place('sylhet', 'Sylhet'), place('dhaka', 'Dhaka'), place('chittagong', 'Chittagong')] },
  {
    id: 'fr', name: 'France', flag: '🇫🇷', continent: 'Europe',
    destinations: [place('paris', 'Paris', { image: { src: parisPhoto, alt: 'The inverted glass pyramid skylight above a busy concourse at the Louvre, Paris.' } })],
  },
  { id: 'de', name: 'Germany', flag: '🇩🇪', continent: 'Europe', destinations: [place('berlin', 'Berlin')] },
  { id: 'hu', name: 'Hungary', flag: '🇭🇺', continent: 'Europe', destinations: [place('budapest', 'Budapest')] },
  { id: 'in', name: 'India', flag: '🇮🇳', continent: 'Asia', destinations: [place('pune', 'Pune')] },
  { id: 'ie', name: 'Ireland', flag: '🇮🇪', continent: 'Europe', destinations: [] },
  { id: 'jp', name: 'Japan', flag: '🇯🇵', continent: 'Asia', destinations: [place('tokyo', 'Tokyo'), place('kyoto', 'Kyoto')] },
  { id: 'nl', name: 'Netherlands', flag: '🇳🇱', continent: 'Europe', destinations: [place('amsterdam', 'Amsterdam')] },
  { id: 'om', name: 'Oman', flag: '🇴🇲', continent: 'Asia', destinations: [place('musandam', 'Musandam')] },
  {
    id: 'pl', name: 'Poland', flag: '🇵🇱', continent: 'Europe',
    // Location taken from the photo's original filename (warsaw-poland.png); confirm.
    destinations: [place('warsaw', 'Warsaw', { image: { src: warsawPhoto, alt: 'A symmetrical classical building façade framed by reflective glass walls.' } })],
  },
  { id: 'pt', name: 'Portugal', flag: '🇵🇹', continent: 'Europe', destinations: [place('lisbon', 'Lisbon')] },
  { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', continent: 'Asia', destinations: [] },
  { id: 'kr', name: 'South Korea', flag: '🇰🇷', continent: 'Asia', destinations: [] },
  { id: 'es', name: 'Spain', flag: '🇪🇸', continent: 'Europe', destinations: [place('barcelona', 'Barcelona'), place('ibiza', 'Ibiza'), place('malaga', 'Málaga'), place('benalmadena', 'Benalmádena')] },
  { id: 'se', name: 'Sweden', flag: '🇸🇪', continent: 'Europe', destinations: [place('stockholm', 'Stockholm'), place('orebro', 'Örebro')] },
  { id: 'tz', name: 'Tanzania', flag: '🇹🇿', continent: 'Africa', destinations: [place('zanzibar', 'Zanzibar')] },
  { id: 'th', name: 'Thailand', flag: '🇹🇭', continent: 'Asia', destinations: [place('bangkok', 'Bangkok'), place('chiang-mai', 'Chiang Mai')] },
  { id: 'ae', name: 'United Arab Emirates', flag: '🇦🇪', continent: 'Asia', destinations: [place('dubai', 'Dubai', { home: true }), place('abu-dhabi', 'Abu Dhabi')] },
  {
    id: 'gb', name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe',
    destinations: [place('belfast', 'Belfast', { home: true }), place('edinburgh', 'Edinburgh'), place('london', 'London'), place('manchester', 'Manchester'), place('cornwall', 'Cornwall')],
  },
  { id: 'us', name: 'United States', flag: '🇺🇸', continent: 'North America', destinations: [place('austin', 'Austin'), place('new-york', 'New York'), place('new-jersey', 'New Jersey')] },
  { id: 'vn', name: 'Vietnam', flag: '🇻🇳', continent: 'Asia', destinations: [place('hanoi', 'Hanoi'), place('hoi-an', 'Hội An'), place('ho-chi-minh-city', 'Ho Chi Minh City')] },
];

// Fail the build on duplicate country IDs rather than silently miscounting.
const ids = new Set<string>();
for (const country of allCountries) {
  if (ids.has(country.id)) throw new Error(`Duplicate travel country id "${country.id}"`);
  ids.add(country.id);
}

/** Countries in alphabetical order. */
export const countries = [...allCountries].sort((a, b) => a.name.localeCompare(b.name, 'en-GB'));

/** Stats are derived from the data, never typed in separately. */
export const stats = {
  countries: new Set(countries.map((country) => country.id)).size,
  continents: new Set(countries.map((country) => country.continent)).size,
};
