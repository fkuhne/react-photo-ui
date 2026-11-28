# 0012. An app's tree keeps its behaviour; the design system draws its rows

- Status: Accepted
- Date: 2026-11-27

## Context

Plan step 2.6: the folder tree, the field that suggests as one types and the tags field on React Aria's `Tree`, `ComboBox` and `TagGroup`, as record 0004 planned. On 2026-11-27 the field and the tags moved: `ComboBox`, the app holding its text and parsing it, and `Tags`, on `TagGroup`, each passing PhotoMatch's self-check. PhotoMatch's folder tree is already the W3C tree pattern, its roles, its keys, ↑ ↓ ← → and Enter; and its behaviour is its own: subfolders read as they open, three levels opened by themselves, a folder springing open under photos dragged onto it, photos dropped on a row, a click leaving the keys with the photos. React Aria's `Tree` is a tree grid, whose rows take the focus on a click, with drag and drop of its own (its docs and 1.22.1 code, read that day). The owner, that day: "don't wait for my approvals as I agree with all your suggestions"; then "continue".

## Decision

**An app's tree keeps its own behaviour; the design system draws its rows: `.pu-tree-row`, `.pu-tree-twisty`, `.pu-tree-name` and `.pu-tree-count`, the current row by `data-current`, a quiet one by `data-quiet`, a row things are dragged onto by `data-drop-target`.**

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| React Aria's `Tree` in PhotoMatch | A click would keep the keys in the tree, its own drag and drop beside PhotoMatch's, its rows a grid's; the W3C tree pattern PhotoMatch's already has, with its self-check |
| The rows left to each app | PhotoDev's and PhotoBook's trees would drift, as the copies did |

## Consequences

- **Record 0004's plan for the tree** changes: its look is the design system's, its behaviour the app's.
- **A tree in PhotoDev or PhotoBook** takes the same rows; a `Tree` of the design system's may come when an app needs one without PhotoMatch's drops.

## Sources

- React Aria's Tree page and its 1.22.1 code, read on 2026-11-27; PhotoMatch's `FoldersPanel.tsx` and its self-check.
- The owner, on 2026-11-27.
