/**
 * Online profiles shown in About → Elsewhere, in display order.
 * Add each `url` once confirmed; entries without one render as "Link to add".
 * Never guess usernames or link to a platform's homepage.
 */

export interface Profile {
  name: string;
  /** Short, generic line about what the platform is for; confirm or rewrite in Taj's voice. */
  description: string;
  url?: string;
}

export const profiles: Profile[] = [
  {
    name: 'LinkedIn',
    description: 'Work history and professional connections.',
    url: 'https://linkedin.com/in/tajdid',
  },
  {
    name: 'Dribbble',
    description: 'Design shots and work in progress.',
    url: 'https://dribbble.com/tajdid',
  },
  {
    name: 'Instagram',
    description: 'Photos and small moments.',
    url: 'https://www.instagram.com/tajdidrahman',
  },
  {
    name: 'X / Twitter',
    description: 'Short thoughts and links.',
    url: 'https://x.com/tajdidr',
  },
  {
    name: 'Threads',
    description: 'Conversations and passing thoughts.',
    url: 'https://www.threads.com/@tajdidrahman',
  },
  {
    name: 'Letterboxd',
    description: 'Films watched and rated.',
    url: 'https://letterboxd.com/tajdid/',
  },
  {
    name: 'Last.fm',
    description: 'A running record of what I listen to.',
    url: 'https://www.last.fm/user/tajdid',
  },
];
