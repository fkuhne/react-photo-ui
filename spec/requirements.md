# Requirements

Each row comes from [`product.md`](product.md) and says how it will be met and how we'll know. A row isn't traded away for convenience. If one has to change, change `product.md` first.

"How it's met" names the plan step or the decision while the row is still to build. Once built, it names the code.

| # | Requirement | How it's met | How it's verified |
|---|---|---|---|
| R1 | One set of tokens for colour, type, spacing, corners and depth, dark and light | The W3C format, made into CSS variables by our script: step 1.2, [0006](decisions/0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md) | The site shows every token in every theme; the app's styles name only tokens |
| R2 | Each app can set its own palette over the shared controls | Palettes as themes over one set of controls: [0007](decisions/0007-shared-controls-each-app-its-own-palette.md) | A second palette switched on the site changes the colours and nothing else |
| R3 | Controls built once, accessible, with the keys of a desktop app | React Aria Components: phase 2, [0004](decisions/0004-the-controls-built-on-react-aria-components.md) | Each control used with the keys alone on its page of the site; PhotoMatch's self-check passes |
| R4 | Text meets 4.5:1 contrast | The tokens' pairs, checked by the script: step 1.2 | The script prints each pair's contrast and fails under 4.5:1 |
| R5 | One icon set | Lucide's SVGs, those used: step 1.3, [0005](decisions/0005-lucide-s-icons-those-used-copied-as-svg-files.md) | Every icon PhotoMatch shows is drawn by the `Icon` component |
| R6 | Each system's own font, at the same sizes | The font stack token: step 1.2, PhotoMatch's record 0070 | The site in SF Pro on a Mac and Segoe UI Variable on Windows |
| R7 | Each app takes it at a pinned commit, nothing built on install | Built files committed, a git URL over HTTPS: step 1.1, [0002](decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md) | An app's lockfile names the commit; `npm ci` runs no script of ours |
| R8 | Open, every licence allowing MIT or Apache 2.0, each credited | [0003](decisions/0003-open-from-the-start-under-mit-or-apache-2-0.md) | Each dependency's and icon's licence listed in `docs/foundations.md`; the licence files in the repository |
| R9 | A site to browse the tokens, icons and controls, each in every theme | Our own site in `gallery/`, hash-routed: step 1.4, [0008](decisions/0008-a-site-of-its-own-to-browse-the-design-system.md) | Each page drawn in WebKit by `scripts/snapshot.swift`; each family of controls gets its page as it's built |
| R10 | Every claim in the notes names its source | `docs/` cites the source and the date. A computed number is marked "computed", and a claim from memory "unchecked" | Reviewed at the end of each phase |
| R11 | Every measurement is written down with how it was run | The step's notes in `docs/` | Each number in `docs/` names its command, its settings and the machine |
| R12 | No money is spent without a record | A record for each purchase, rental or paid API | Each cost appears in a record |
| R13 | Every decision has a record | `spec/decisions/` ([0001](decisions/0001-work-from-a-spec-and-record-every-decision.md)) | Reviewed at the end of each phase |
| R14 | Any coding agent can pick the work up | `AGENTS.md`, which `CLAUDE.md` and `GEMINI.md` import; the `next-step` and `decide` skills | A new session finds the next step and its context from the repository alone |
