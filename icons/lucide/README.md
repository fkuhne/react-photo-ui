# Lucide's icons

The icons the owner's apps use, from [Lucide](https://lucide.dev), copied unchanged from the npm package `lucide-static`, at the version in [`version.json`](version.json), with its licence, [`LICENSE`](LICENSE): ISC, some icons derived from Feather under MIT (record [0005](../../spec/decisions/0005-lucide-s-icons-those-used-copied-as-svg-files.md)).

**To add one:** copy its file from the same version's `icons/` folder, unchanged, then `npm run make`, which reads it into `src/icon-data.ts`, refusing anything but shapes and their geometry. A newer version of Lucide replaces every file and `version.json` together.
