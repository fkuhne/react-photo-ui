// The tokens, from the W3C Design Tokens format 2025.10 to CSS variables (record 0006): reads
// `tokens/photo-ui.resolver.json`, takes its base set and each theme context in the resolution
// order, merges them, resolves each alias, checks the contrast of each pair of text and background
// the tokens name, and writes `dist/tokens.css` and `dist/tokens.json`. `scripts/make.mjs` runs it.
//
// The format's rules followed, from its Format, Color and Resolver modules (read on 2026-11-27):
// a token is an object with `$value`; `$type` is the token's own, else its nearest group's;
// `{a.b}` refers to a whole token, never a group; a colour is `{colorSpace, components, alpha?,
// hex?}`; a dimension `{value, unit}`, in px or rem; sources merge in order, the later winning.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

/** A problem with the tokens, said by name. */
export class TokenError extends Error {}

/** `b` merged into `a`, deeply, `b` winning; neither changed. */
function merge(a, b) {
  if (!isObject(a) || !isObject(b) || "$value" in b) return structuredClone(b);
  const out = structuredClone(a);
  for (const [key, value] of Object.entries(b)) out[key] = key in out ? merge(out[key], value) : structuredClone(value);
  return out;
}

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

/** Every token in `tree`, by its dotted path, with its `$type` inherited from its groups. */
export function flatten(tree, origin, found = new Map(), path = [], inherited) {
  const type = tree.$type ?? inherited;
  for (const [name, node] of Object.entries(tree)) {
    if (name.startsWith("$")) continue;
    if (/[{}.]/.test(name)) throw new TokenError(`${[...path, name].join(".")}: a name can't hold "{", "}" or "."`);
    if (!isObject(node)) throw new TokenError(`${[...path, name].join(".")}: neither a token nor a group`);
    const here = [...path, name];
    if ("$value" in node) {
      const own = node.$type ?? type;
      if (!own) throw new TokenError(`${here.join(".")}: no $type, its own or a group's`);
      found.set(here.join("."), { path: here, type: own, value: node.$value, description: node.$description, extensions: node.$extensions, groupExtensions: tree.$extensions, origin: node.$origin ?? origin });
    } else flatten(node, origin, found, here, type);
  }
  return found;
}

/** Each source's tokens marked with where they came from, so that a theme's are told apart. */
function marked(tree, origin) {
  if (!isObject(tree)) return tree;
  if ("$value" in tree) return { ...tree, $origin: origin };
  return Object.fromEntries(Object.entries(tree).map(([k, v]) => [k, k.startsWith("$") ? v : marked(v, origin)]));
}

/** `value` with every reference to another token replaced by that token's resolved value. */
function resolve(value, tokens, seen = []) {
  if (typeof value === "string") {
    const ref = /^\{([^{}]+)\}$/.exec(value);
    if (!ref) return value;
    const name = ref[1];
    if (seen.includes(name)) throw new TokenError(`a circular reference: ${[...seen, name].join(" → ")}`);
    const target = tokens.get(name);
    if (!target) throw new TokenError(`${seen.at(-1) ?? "?"}: {${name}} is no token${[...tokens.keys()].some((k) => k.startsWith(name + ".")) ? ", but a group" : ""}`);
    return resolve(target.value, tokens, [...seen, name]);
  }
  if (Array.isArray(value)) return value.map((v) => resolve(v, tokens, seen));
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, tokens, seen)]));
  return value;
}

/** A colour's sRGB components, 0 to 255, and its alpha. */
function rgba(color, name) {
  if (!isObject(color) || color.colorSpace !== "srgb" || !Array.isArray(color.components) || color.components.length !== 3) throw new TokenError(`${name}: only sRGB colours are made into CSS here`);
  const [r, g, b] = color.components.map((c) => Math.round(c * 255));
  return { r, g, b, a: color.alpha ?? 1 };
}

const hex2 = (n) => n.toString(16).padStart(2, "0");

/** A resolved value as CSS. */
export function css(type, value, name) {
  switch (type) {
    case "color": {
      const { r, g, b, a } = rgba(value, name);
      return a === 1 ? `#${hex2(r)}${hex2(g)}${hex2(b)}` : `rgb(${r} ${g} ${b} / ${Math.round(a * 1000) / 1000})`;
    }
    case "dimension":
      if (!isObject(value) || typeof value.value !== "number" || !["px", "rem"].includes(value.unit)) throw new TokenError(`${name}: a dimension is {value, unit}, in px or rem`);
      return `${value.value}${value.unit}`;
    case "fontFamily":
      return (Array.isArray(value) ? value : [value]).map((f) => (/^[a-z-]+$/i.test(f) && !/\s/.test(f) ? f : `"${f}"`)).join(", ");
    case "fontWeight":
    case "number":
      return String(value);
    case "shadow":
      return (Array.isArray(value) ? value : [value])
        .map((s) => [s.inset ? "inset" : "", css("dimension", s.offsetX, name), css("dimension", s.offsetY, name), css("dimension", s.blur, name), css("dimension", s.spread, name), css("color", s.color, name)].filter(Boolean).join(" "))
        .join(", ");
    default:
      throw new TokenError(`${name}: the type ${type} isn't made into CSS yet`);
  }
}

/** WCAG 2's contrast of two opaque sRGB colours, 1 to 21. */
export function contrast(a, b) {
  const lum = ({ r, g, b }) => {
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  };
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/** A document `$ref` names: a file beside the resolver, or a pointer into the resolver itself. */
function load(ref, folder, resolver) {
  if (ref.startsWith("#/")) return ref.slice(2).split("/").map((p) => p.replace(/~1/g, "/").replace(/~0/g, "~")).reduce((node, key) => node?.[key], resolver);
  return JSON.parse(readFileSync(join(folder, ref), "utf8"));
}

/** Every theme context's tokens, resolved, from the resolver at `file`. */
export function build(file) {
  const folder = dirname(file);
  const resolver = JSON.parse(readFileSync(file, "utf8"));
  if (resolver.version !== "2025.10") throw new TokenError(`${file}: a resolver of version 2025.10 is read here`);
  const options = resolver.$extensions?.["org.photo-ui"] ?? {};
  const sources = (list, origin) => list.map((s) => marked(s.$ref ? load(s.$ref, folder, resolver) : s, origin));
  const modifiers = Object.entries(resolver.modifiers ?? {});
  if (modifiers.length !== 1) throw new TokenError("one modifier, the theme, is read here");
  const [modifierName, modifier] = modifiers[0];
  const themes = {};
  for (const [context, contextSources] of Object.entries(modifier.contexts)) {
    let tree = {};
    for (const step of resolver.resolutionOrder) {
      const target = load(step.$ref, folder, resolver);
      const isModifier = step.$ref === `#/modifiers/${modifierName}`;
      for (const source of isModifier ? sources(contextSources, "theme") : sources(target.sources, "base")) tree = merge(tree, source);
    }
    const tokens = flatten(tree, "base");
    const resolved = new Map();
    for (const [name, token] of tokens) resolved.set(name, { ...token, value: resolve(token.value, tokens, [name]) });
    themes[context] = resolved;
  }
  return { themes, options, defaultContext: modifier.default };
}

/** The contrast of each pair the tokens name, in one theme: what fails under its least. */
export function checkContrast(resolved) {
  const pairs = [];
  for (const [name, token] of resolved) {
    const want = token.extensions?.["org.photo-ui"];
    if (!want?.contrastOn) continue;
    for (const on of want.contrastOn) {
      const ground = resolved.get(on);
      if (!ground) throw new TokenError(`${name}: its contrast is checked on ${on}, which is no token`);
      const [fg, bg] = [rgba(token.value, name), rgba(ground.value, on)];
      if (fg.a !== 1 || bg.a !== 1) throw new TokenError(`${name} on ${on}: contrast is checked on opaque colours only`);
      const ratio = contrast(fg, bg);
      pairs.push({ text: name, on, ratio, ok: ratio >= want.least });
    }
  }
  return pairs;
}

/** A token's CSS variable: the prefix and its path, `--pu-color-text-quiet`. */
const variable = (prefix, path) => `--${prefix}-${path.join("-")}`;

/** The CSS for every theme: the shared tokens once under `:root`, each theme's colours and shadows
 * under its selector, and the theme that follows the system's under `prefers-color-scheme`. A font
 * size or line height marked `scaled` follows `--pu-text-scale`, Settings' text size. */
export function stylesheet({ themes, options, defaultContext }) {
  const prefix = options.prefix ?? "pu";
  const shown = (token) => token.path[0] !== "palette";
  const declare = (token) => {
    const value = css(token.type, token.value, token.path.join("."));
    const scaled = token.groupExtensions?.["org.photo-ui"]?.scaled;
    return `  ${variable(prefix, token.path)}: ${scaled ? `calc(${value} * var(--${prefix}-text-scale, 1))` : value};`;
  };
  const lines = ["/* photo-ui's tokens, made by scripts/tokens.mjs from tokens/*.tokens.json: don't edit. */", ""];
  const base = [...themes[defaultContext].values()].filter((t) => shown(t) && t.origin === "base");
  lines.push(":root {", `  --${prefix}-text-scale: 1;`, ...base.map(declare), "}", "");
  for (const [context, resolved] of Object.entries(themes)) {
    const how = options.css?.[context];
    if (!how) throw new TokenError(`the theme ${context} has no selector in the resolver's $extensions`);
    const own = [...resolved.values()].filter((t) => shown(t) && t.origin === "theme");
    const block = (selector) => [`${selector} {`, `  color-scheme: ${how.scheme};`, ...own.map(declare), "}"];
    lines.push(...block(how.selector), "");
    if (how.system) lines.push(`@media (prefers-color-scheme: ${how.scheme}) {`, ...block(':root:not([data-theme]), [data-theme="system"]').map((l) => "  " + l), "}", "");
  }
  return lines.join("\n");
}

/** Every theme's tokens by CSS variable, with their values as CSS, for the gallery page and the
 * apps' code. */
export function table({ themes, options }) {
  const prefix = options.prefix ?? "pu";
  return Object.fromEntries(
    Object.entries(themes).map(([context, resolved]) => [
      context,
      Object.fromEntries(
        [...resolved.values()]
          .filter((t) => t.path[0] !== "palette")
          .map((t) => [variable(prefix, t.path), { type: t.type, value: css(t.type, t.value, t.path.join(".")), shared: t.origin === "base", ...(t.description ? { description: t.description } : {}) }]),
      ),
    ]),
  );
}
