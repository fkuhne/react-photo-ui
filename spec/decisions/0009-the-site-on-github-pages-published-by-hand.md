# 0009. The site on GitHub Pages, published by hand

- Status: Accepted
- Date: 2026-11-27

## Context

The site to browse the design system ([0008](0008-a-site-of-its-own-to-browse-the-design-system.md)) builds as static files, each page addressed after `#`, and record 0008 left putting it online to a decision of its own. The owner on 2026-11-27: "yes, commit and push, and publish it on GitHub Pages". The repository is public, for visitors to the owner's GitHub ([0003](0003-open-from-the-start-under-mit-or-apache-2-0.md)).

What was known that day:
- **PhotoMatch's landing page** is published the same way, by its `publish-site.sh`: the page's files pushed alone to a `gh-pages` branch, GitHub Pages serving it, turned on by itself when that branch first arrives, as PhotoMatch's releases repository found on 2026-11-18.
- **The owner's rule** in PhotoMatch: no workflow that runs on a push; builds cost money and run at the owner's word.

## Decision

**The site is published on GitHub Pages, at https://fkuhne.github.io/react-photo-ui/, by `scripts/publish-site.sh`, run by hand: it builds the site from a clean commit and pushes its files alone to the `gh-pages` branch.**

- **From a commit:** it refuses a working tree with changes, and a build that changes `dist/`, so that the site is exactly a commit's.
- **Relative paths,** `vite build --base ./`, as the site is served under `/react-photo-ui/`; `.nojekyll`, so that GitHub serves the files as they are.
- **No workflow:** run by the owner, or at the owner's word, after a step that changes what the site shows.
- **A link to the repository** in the site's bar, for visitors who arrive at the page first.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| A workflow publishing on each push | The owner's rule against workflows that run on a push |
| Pages from the `main` branch's folder | The built site would sit in `main` beside the package's own `dist/` |
| The site only locally, with `npm run dev` | Visitors would have to install it to see it |

## Consequences

- **The site lags `main`** until it's published again.
- **Anyone can browse the design system** without installing anything.

## Assumptions to verify

- [x] The site answers at its address, every page and the icons drawn: on 2026-11-27, published from commit `66300b6`; Pages built in about 25 s; the page, its script, 258,041 bytes, and its stylesheet, 9,352 bytes, answered `200`; the colour page drawn from the live address in WebKit, light, as designed.

## Sources

- The owner, on 2026-11-27.
- PhotoMatch's `app/scripts/publish-site.sh` and its record 0020.
