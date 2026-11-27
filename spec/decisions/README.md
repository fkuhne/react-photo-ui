# Decision records

This folder records every decision that shapes the project, one file per decision. Each record states:
- the context;
- what we chose;
- the alternatives, and why we rejected them;
- the consequences;
- the assumptions we still have to verify.

**Statuses**
- **Proposed**: planned, but not yet confirmed by the owner or proven by an implementation. The commit that implements it flips it to Accepted, amending it if the implementation taught us something.
- **Accepted**: in force.
- **Superseded**: replaced by a later record, which it links to. It's kept for history.

**Adding a record**
1. Copy [`decision-template.md`](decision-template.md) to the next free number, e.g. `0002-short-title.md`.
2. Fill it in and add a row to the table below.
3. Commit it on its own, before or together with the change it justifies.

Don't rewrite a record to change its decision. Write a new record and mark the old one superseded. Ticking assumptions and adding evidence is fine. Never renumber: commits and other records cite records by number.

| # | Decision | Status | Date |
|---|---|---|---|
| [0001](0001-work-from-a-spec-and-record-every-decision.md) | Work from a spec and record every decision | Accepted | 2026-11-27 |
| [0002](0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md) | One package of tokens, icons and controls, in its own repository, pinned by each app | Accepted | 2026-11-27 |
| [0003](0003-open-from-the-start-under-mit-or-apache-2-0.md) | Open from the start, under MIT OR Apache-2.0 | Accepted | 2026-11-27 |
| [0004](0004-the-controls-built-on-react-aria-components.md) | The controls built on React Aria Components | Accepted | 2026-11-27 |
| [0005](0005-lucide-s-icons-those-used-copied-as-svg-files.md) | Lucide's icons, those used, copied as SVG files | Accepted | 2026-11-27 |
| [0006](0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md) | Tokens in the W3C format, made into CSS variables by a script of our own | Accepted | 2026-11-27 |
| [0007](0007-shared-controls-each-app-its-own-palette.md) | Shared controls, each app its own palette | Accepted | 2026-11-27 |
| [0008](0008-a-site-of-its-own-to-browse-the-design-system.md) | A site of its own to browse the design system | Accepted | 2026-11-27 |
| [0009](0009-the-site-on-github-pages-published-by-hand.md) | The site on GitHub Pages, published by hand | Accepted | 2026-11-27 |
| [0010](0010-two-more-type-sizes-space-24-and-32-a-round-corner-and-colours-for-photos-and-errors.md) | Two more type sizes, space 24 and 32, a round corner, and colours for photos and errors | Accepted | 2026-11-27 |
| [0011](0011-a-knob-colour-for-switches-and-sliders.md) | A knob colour for switches and sliders | Accepted | 2026-11-27 |
