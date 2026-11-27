#!/bin/zsh
# The site, on GitHub Pages (record 0009): builds it as static files from this commit, with the
# package's own built files, and pushes them alone to the repository's gh-pages branch, which
# GitHub Pages serves at https://fkuhne.github.io/react-photo-ui/. Turns Pages on the first time.
# Run by hand, by the owner or at the owner's word; no workflow runs it. Uses gh and git as the
# owner, as PhotoMatch's publish-site.sh does.
# Usage: scripts/publish-site.sh [--out <folder>]
#   --out writes the site to <folder> instead, to look at, and pushes nothing.
set -eu
out=""
if [[ ${1:-} == --out ]]; then out=${2:?a folder after --out}; fi

repository=fkuhne/react-photo-ui
site=https://fkuhne.github.io/react-photo-ui/
here=${0:A:h}
root=${here:h}
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

cd "$root"
if [[ -n $(git status --porcelain) ]]; then
  print -u2 "publish-site: the working tree has changes; commit them first, so that the site is a commit's."
  exit 1
fi
commit=$(git rev-parse --short HEAD)
version=$(node -p 'require("./package.json").version')

# The package's files first, as the site reads them, then the site, its paths relative so that it
# works under /react-photo-ui/.
npm run make > /dev/null
if [[ -n $(git status --porcelain) ]]; then
  print -u2 "publish-site: npm run make changed the built files; commit them first."
  exit 1
fi
npx vite build --base ./ --outDir "$work/site" --emptyOutDir > /dev/null
touch "$work/site/.nojekyll"   # serve the files as they are, without GitHub's Jekyll

if [[ -n $out ]]; then
  mkdir -p "$out"
  cp -R "$work/site/." "$out/"
  print "Written to $out"
  exit 0
fi

# The gh-pages branch holds the site alone.
repo=$work/repo
if ! git clone -q --depth 1 --branch gh-pages "git@github.com:$repository.git" "$repo" 2>/dev/null; then
  git init -q -b gh-pages "$repo"
  git -C "$repo" remote add origin "git@github.com:$repository.git"
fi
find "$repo" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$work/site/." "$repo/"
git -C "$repo" add -A
if git -C "$repo" diff --cached --quiet; then
  print "The site is already as it is at $commit."
else
  git -C "$repo" commit -q -m "The site of photo-ui $version, at $commit"
  GIT_TERMINAL_PROMPT=0 git -C "$repo" push -q origin gh-pages
fi

# GitHub turns Pages on by itself when a gh-pages branch first arrives, as PhotoMatch's releases
# repository found on 2026-11-18; this asks only if it didn't.
if ! gh api "repos/$repository/pages" > /dev/null 2>&1; then
  gh api -X POST "repos/$repository/pages" -f 'source[branch]=gh-pages' -f 'source[path]=/' > /dev/null 2>&1 ||
    gh api "repos/$repository/pages" > /dev/null
  print "GitHub Pages turned on for $repository."
fi
print "Published: $site (GitHub Pages takes a minute or so to update)"
