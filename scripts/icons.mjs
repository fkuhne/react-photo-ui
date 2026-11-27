// The icons (record 0005): Lucide's SVG files in `icons/lucide/`, copied unchanged, read into
// `src/icon-data.ts`, the shapes `Icon` draws. Only the shapes Lucide's icons use, with their
// geometry, are let through, so that no file can bring a script, a style or an image in.
// `scripts/make.mjs` runs it.
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

/** A problem with an icon's file, said by name. */
export class IconError extends Error {}

/** The shapes, and the attributes of each that are kept. */
const SHAPES = {
  path: ["d", "fill"],
  circle: ["cx", "cy", "r", "fill"],
  line: ["x1", "y1", "x2", "y2"],
  rect: ["x", "y", "width", "height", "rx", "ry"],
  polyline: ["points"],
  polygon: ["points"],
  ellipse: ["cx", "cy", "rx", "ry"],
};

/** What the root `<svg>` of every Lucide icon says, which `Icon` draws itself. */
const ROOT = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" };

const attributes = (text, file) => {
  const found = {};
  for (const m of text.matchAll(/([a-zA-Z][a-zA-Z0-9:-]*)="([^"]*)"/g)) found[m[1]] = m[2];
  const rest = text.replace(/([a-zA-Z][a-zA-Z0-9:-]*)="([^"]*)"/g, "").trim();
  if (rest) throw new IconError(`${file}: something besides attributes: ${rest.slice(0, 40)}`);
  return found;
};

/** One icon's shapes, from its SVG's text: `[tag, attributes]` for each. */
export function parse(text, file = "an icon") {
  const svg = /<svg\b([^>]*)>([\s\S]*)<\/svg>\s*$/.exec(text.replace(/<!--[\s\S]*?-->/g, "").trim());
  if (!svg) throw new IconError(`${file}: no <svg> root`);
  const root = attributes(svg[1], file);
  for (const [name, value] of Object.entries(ROOT)) if (root[name] !== value) throw new IconError(`${file}: its root's ${name} isn't "${value}", as Lucide's are`);
  const shapes = [];
  let body = svg[2];
  for (const m of body.matchAll(/<([a-z]+)\b([^>]*?)\/>/g)) {
    const [whole, tag, attrs] = m;
    const allowed = SHAPES[tag];
    if (!allowed) throw new IconError(`${file}: <${tag}> isn't a shape an icon may hold`);
    const found = attributes(attrs, file);
    for (const name of Object.keys(found)) if (!allowed.includes(name)) throw new IconError(`${file}: <${tag}>'s ${name} isn't kept`);
    if (found.fill !== undefined && found.fill !== "currentColor") throw new IconError(`${file}: a fill other than the text's colour`);
    shapes.push([tag, found]);
    body = body.replace(whole, "");
  }
  if (body.trim()) throw new IconError(`${file}: something besides shapes: ${body.trim().slice(0, 40)}`);
  if (!shapes.length) throw new IconError(`${file}: no shapes`);
  return shapes;
}

/** Every icon in `folder`, by its file's name. */
export function readIcons(folder) {
  return Object.fromEntries(
    readdirSync(folder)
      .filter((f) => f.endsWith(".svg"))
      .sort()
      .map((f) => [basename(f, ".svg"), parse(readFileSync(join(folder, f), "utf8"), f)]),
  );
}

/** `src/icon-data.ts`'s text: the icons' names and shapes, with Lucide's version. */
export function iconModule(icons, version) {
  const lines = [
    `// Lucide's icons ${version}, read from icons/lucide/ by scripts/icons.mjs: don't edit (record 0005).`,
    `// Lucide is under the ISC licence, some icons derived from Feather under MIT: icons/lucide/LICENSE.`,
    "",
    `/** Lucide's version the icons were copied from. */`,
    `export const LUCIDE_VERSION = ${JSON.stringify(version)};`,
    "",
    "/** Each icon's shapes, on a 24-unit grid: a tag and its attributes. */",
    "export const ICON_SHAPES = {",
    ...Object.entries(icons).map(([name, shapes]) => `  ${JSON.stringify(name)}: ${JSON.stringify(shapes)},`),
    "} as const satisfies Record<string, readonly (readonly [string, Record<string, string>])[]>;",
    "",
    "/** An icon's name, as its file in icons/lucide/ is named. */",
    "export type IconName = keyof typeof ICON_SHAPES;",
    "",
    "/** Every icon's name, in order. */",
    "export const ICON_NAMES = Object.keys(ICON_SHAPES) as IconName[];",
    "",
  ];
  return lines.join("\n");
}
