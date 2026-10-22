# Updating the Films page

The Films page (`/films`) shows a snapshot of the Letterboxd diary. Nothing is fetched by visitors or during a normal build. The page only changes when you sync and then rebuild/deploy.

## Sync

```sh
npm run sync:films
```

This reads `https://letterboxd.com/tajdid/rss/` once and:

1. **Keeps diary entries only:** watches and reviews with a watched date. Lists and other activity are ignored.
2. **Orders them by watched date,** newest first. On the same date, the later-logged entry comes first.
3. **Picks the featured film:** the newest film becomes "Last watched", and the next 16 different films fill "Recently watched". Each film appears once, using its latest viewing. Every diary entry, including rewatch flags, is still kept in the snapshot.
4. **Adds the featured film's details** from its Letterboxd film page: director and writer credits, runtime, backdrop and trailer. This only happens if the page's TMDb ID matches the diary entry. The trailer is kept only if YouTube confirms it's a trailer for that film.
5. **Downloads images:** posters and the backdrop go into `src/assets/films/`, and unused ones are removed.
6. **Writes `src/data/films.json`.**

If the feed can't be fetched or contains no diary entries, the existing snapshot is left untouched and the command exits with an error. If no snapshot exists at all, the page shows a short message with a link to the Letterboxd profile instead of the films.

The feed only covers recent activity, so the page shows a recent snapshot, not a complete viewing history.

Commit the updated `src/data/films.json` and `src/assets/films/` after syncing, then deploy as usual.

## Synopsis for the featured film

Synopses are never copied automatically, and reviews never appear on the page. When a new film becomes "Last watched", the sync prints a reminder if it has no synopsis. Add a short one in your own words to `src/data/film-notes.json`, keyed by the film's Letterboxd slug (the part of its URL after `/film/`):

```json
{
  "your-name": {
    "synopsis": "Two high-school strangers, Mitsuha and Taki, start waking up in each other’s bodies at random…"
  }
}
```

Then run the sync again. Without a synopsis, the feature simply omits that line.

## Credits

The feature says "Written and directed by" only when Letterboxd lists the same people as both director and writer. Otherwise it says "Directed by".
