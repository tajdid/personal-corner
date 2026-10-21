/**
 * Online profiles shown in About → Elsewhere, in display order.
 * Add each `url` once confirmed; entries without one render as "Link to add".
 * Never guess usernames or link to a platform's homepage.
 */

export interface Profile {
  name: string;
  url?: string;
}

export const profiles: Profile[] = [
  { name: 'LinkedIn' },
  { name: 'Dribbble' },
  { name: 'Instagram' },
  { name: 'X / Twitter' },
  { name: 'Threads' },
  { name: 'Letterboxd' },
  { name: 'Last.fm' },
];
