// The site's pages (plan step 1.4): the overview, the foundations, the icons, and the controls to
// come. Each reads the built tokens, contrast and icons, so that it shows what the package holds.
import { useState, type ReactNode } from "react";
import { ICON_NAMES, Icon, LUCIDE_VERSION, PHOTO_UI_VERSION, type IconName } from "../src";
import tokenTable from "../dist/tokens.json";
import contrastTable from "../dist/contrast.json";

type Entry = { type: string; value: string; shared: boolean; description?: string };
type Context = keyof typeof tokenTable;
const CONTEXTS: { id: Context; name: string }[] = [
  { id: "graphite-dark", name: "Graphite dark" },
  { id: "graphite-light", name: "Graphite light" },
  { id: "paper-light", name: "Paper (draft)" },
];
const tokens = (context: Context) => tokenTable[context] as Record<string, Entry>;
const names = (prefix: string) => Object.keys(tokens("graphite-dark")).filter((n) => n.startsWith(prefix));
const v = (name: string) => `var(${name})`;

function Page({ title, lead, children }: { title: string; lead: ReactNode; children?: ReactNode }) {
  return (
    <article className="page">
      <header style={{ display: "flex", flexDirection: "column", gap: "var(--pu-space-6)" }}>
        <h1>{title}</h1>
        <p className="quiet">{lead}</p>
      </header>
      {children}
    </article>
  );
}

function Code({ children }: { children: string }) {
  return <pre className="code">{children.trim()}</pre>;
}

export function Overview() {
  return (
    <Page title="photo-ui" lead={`The design system of PhotoMatch, PhotoDev and PhotoBook, desktop apps for photographers built with Tauri and React. Version ${PHOTO_UI_VERSION}.`}>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--pu-space-8)" }}>
        <h2 style={{ margin: 0 }}>What's in it</h2>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>
            <strong>Tokens:</strong> colour, type, space, corners and depth, in the W3C Design Tokens format, made into CSS variables. Graphite, dark and light, is the first palette; every text is checked at 4.5:1 contrast or more.
          </li>
          <li>
            <strong>Icons:</strong> {ICON_NAMES.length} of Lucide's, {LUCIDE_VERSION}, drawn by one component at the tokens' size and line.
          </li>
          <li>
            <strong>Controls:</strong> buttons, fields, choices, popovers, panels and lists, on React Aria Components, accessible and with a desktop app's keys. They come in the plan's phase 2.
          </li>
        </ul>
      </div>
      <h2>Taking it into an app</h2>
      <p>An app depends on it by its git address, pinned to a commit; its built files are committed, so the commit is exactly what the app gets.</p>
      <Code>{`
"dependencies": {
  "photo-ui": "git+https://github.com/fkuhne/react-photo-ui.git#<commit>"
}`}</Code>
      <Code>{`
import "photo-ui/tokens.css";
import { Icon } from "photo-ui";

<button><Icon name="layers" /> Open Burst</button>`}</Code>
      <h2>Themes</h2>
      <p>
        The tokens follow the system's dark or light appearance until an element says otherwise: <code>data-theme="dark"</code>, <code>"light"</code> or <code>"system"</code> on the root or any element, and <code>data-palette="paper"</code> for PhotoBook's draft palette. Text sizes follow <code>--pu-text-scale</code>, an app's text size setting.
      </p>
      <h2>Licence</h2>
      <p>MIT OR Apache-2.0, at your option. Lucide's icons keep their ISC licence, some derived from Feather under MIT, in <code>LICENSE-LUCIDE</code> beside the built files.</p>
    </Page>
  );
}

export function Colour() {
  const colours = names("--pu-color-");
  return (
    <Page title="Colour" lead="Each colour named by its purpose, never by its hue. The controls name these alone; an app's palette gives them other values.">
      <table className="tokens">
        <thead>
          <tr>
            <th style={{ width: 44 }} />
            <th>Token</th>
            {CONTEXTS.map((c) => (
              <th key={c.id}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colours.map((name) => (
            <tr key={name}>
              <td>
                <span className="swatch" style={{ background: v(name) }} />
              </td>
              <td>
                <code>{name}</code>
                <div className="quiet">{tokens("graphite-dark")[name].description}</div>
              </td>
              {CONTEXTS.map((c) => (
                <td key={c.id}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--pu-space-6)" }}>
                    <span className="swatch" style={{ width: 14, height: 14, background: tokens(c.id)[name].value }} />
                    <code className="quiet">{tokens(c.id)[name].value}</code>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Contrast</h2>
      <p>Every pair of text and background the tokens name, as WCAG 2 measures it. The build fails under 4.5:1, Apple's least for text.</p>
      <table className="tokens">
        <thead>
          <tr>
            <th>Text</th>
            <th>On</th>
            {CONTEXTS.map((c) => (
              <th key={c.id}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contrastTable["graphite-dark"].map((pair, i) => (
            <tr key={i}>
              <td>
                <span style={{ color: v(`--pu-${pair.text.replace(".", "-")}`), background: v(`--pu-${pair.on.replace(".", "-")}`), padding: "2px 6px", borderRadius: 3 }}>{pair.text.replace("color.", "")}</span>
              </td>
              <td className="quiet">{pair.on.replace("color.", "")}</td>
              {CONTEXTS.map((c) => {
                const p = contrastTable[c.id][i];
                return (
                  <td key={c.id} className={p.ok ? "pass" : "fail"} style={{ fontVariantNumeric: "tabular-nums" }}>
                    {p.ratio.toFixed(2)}:1
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}

export function Type() {
  const [scale, setScale] = useState(1);
  const sizes = [
    { name: "title", what: "A dialog's title", text: "Move 2 Photos to “2026-08-10 Paris”" },
    { name: "text", what: "Text and controls", text: "Capture Time, Oldest first · 20 photos, 3 selected" },
    { name: "caption", what: "Captions and quieter labels", text: "DSC01311.ARW · 1/250 · f/2.8 · ISO 400" },
  ];
  return (
    <Page title="Type" lead="The system's own font, SF Pro on a Mac and Segoe UI Variable on Windows, at one scale on both. Every size follows --pu-text-scale, an app's text size setting.">
      <div style={{ display: "flex", alignItems: "center", gap: "var(--pu-space-12)" }}>
        <span className="quiet">Text size</span>
        <div className="choice" role="group" aria-label="Text size">
          {[1, 1.25, 1.5, 2].map((s) => (
            <button key={s} aria-pressed={scale === s} onClick={() => setScale(s)}>
              {s * 100}%
            </button>
          ))}
        </div>
      </div>
      <div className="card" style={{ ["--pu-text-scale" as string]: scale, display: "flex", flexDirection: "column", gap: "var(--pu-space-16)" }}>
        {sizes.map((s) => (
          <div key={s.name} style={{ display: "flex", flexDirection: "column", gap: "var(--pu-space-2)" }}>
            <span style={{ fontSize: v(`--pu-font-size-${s.name}`), lineHeight: v(`--pu-font-line-${s.name}`), fontWeight: s.name === "title" ? v("--pu-font-weight-strong") : undefined }}>{s.text}</span>
            <code className="quiet">
              --pu-font-size-{s.name}: {tokens("graphite-dark")[`--pu-font-size-${s.name}`].value} · {s.what}
            </code>
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--pu-space-2)" }}>
          <span style={{ fontSize: v("--pu-font-size-caption"), fontWeight: v("--pu-font-weight-strong"), letterSpacing: v("--pu-font-tracking-label"), textTransform: "uppercase", color: v("--pu-color-text-quiet") }}>A section's name</span>
          <code className="quiet">caption size, strong, --pu-font-tracking-label, in capitals</code>
        </div>
      </div>
      <Code>{`font-family: ${tokens("graphite-dark")["--pu-font-family"].value};`}</Code>
    </Page>
  );
}

export function Space() {
  return (
    <Page title="Space and size" lead="Steps of space, in px, and the heights of controls, rows and the bar.">
      <table className="tokens">
        <tbody>
          {names("--pu-space-").map((name) => (
            <tr key={name}>
              <td style={{ width: 200 }}>
                <code>{name}</code>
              </td>
              <td>
                <span style={{ display: "inline-block", width: v(name), height: 12, background: v("--pu-color-accent"), borderRadius: 1 }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Sizes</h2>
      <table className="tokens">
        <tbody>
          {names("--pu-size-").map((name) => (
            <tr key={name}>
              <td style={{ width: 200 }}>
                <code>{name}</code>
                <div className="quiet">{tokens("graphite-dark")[name].description}</div>
              </td>
              <td>
                <span style={{ display: "inline-flex", alignItems: "center", height: v(name), padding: "0 var(--pu-space-12)", background: v("--pu-color-control"), boxShadow: "inset 0 0 0 1px var(--pu-color-edge)", borderRadius: v("--pu-radius-control") }}>{tokens("graphite-dark")[name].value}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}

export function Depth() {
  return (
    <Page title="Corners and depth" lead="Tight corners for controls, rounder ones for what floats over them, and shadows for popovers and dialogs.">
      <div style={{ display: "flex", gap: "var(--pu-space-16)", flexWrap: "wrap" }}>
        {names("--pu-radius-").map((name) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: "var(--pu-space-6)" }}>
            <span style={{ width: 120, height: 72, background: v("--pu-color-control"), boxShadow: "inset 0 0 0 1px var(--pu-color-edge)", borderRadius: v(name) }} />
            <code>{name}</code>
            <span className="quiet">
              {tokens("graphite-dark")[name].value} · {tokens("graphite-dark")[name].description}
            </span>
          </div>
        ))}
      </div>
      <h2>Shadows</h2>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", padding: "var(--pu-space-20) 0" }}>
        {names("--pu-shadow-").map((name) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: "var(--pu-space-12)" }}>
            <span style={{ width: 180, height: 96, background: v("--pu-color-popover"), borderRadius: v(name.endsWith("dialog") ? "--pu-radius-dialog" : "--pu-radius-popover"), boxShadow: v(name) }} />
            <code>{name}</code>
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Icons({ query }: { query: string }) {
  const [size, setSize] = useState("var(--pu-icon-size)");
  const [copied, setCopied] = useState<IconName | null>(null);
  const shown = ICON_NAMES.filter((n) => n.includes(query.trim().toLowerCase()));
  const copy = (name: IconName) => {
    navigator.clipboard?.writeText(`<Icon name="${name}" />`).then(() => setCopied(name), () => setCopied(null));
  };
  return (
    <Page title="Icons" lead={`${ICON_NAMES.length} of Lucide's icons, ${LUCIDE_VERSION}, drawn in the text's colour at --pu-icon-size, their line --pu-icon-stroke wide at any size. Click one to copy its code.`}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--pu-space-12)" }}>
        <span className="quiet">Size</span>
        <div className="choice" role="group" aria-label="Size">
          {[
            ["var(--pu-icon-size)", "14 px"],
            ["20px", "20 px"],
            ["28px", "28 px"],
          ].map(([value, text]) => (
            <button key={value} aria-pressed={size === value} onClick={() => setSize(value)}>
              {text}
            </button>
          ))}
        </div>
        <span className="quiet" role="status">
          {copied ? `Copied <Icon name="${copied}" />` : query ? `${shown.length} of ${ICON_NAMES.length} match “${query}”` : ""}
        </span>
      </div>
      <div className="icon-grid">
        {shown.map((name) => (
          <button key={name} className="icon-cell" onClick={() => copy(name)} title={`<Icon name="${name}" />`}>
            <Icon name={name} size={size} />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </Page>
  );
}

/** A family of controls still to build, and the step that builds it. */
export function Planned({ title, what, step }: { title: string; what: string; step: string }) {
  return (
    <Page title={title} lead={what}>
      <div className="card" style={{ display: "flex", alignItems: "center", gap: "var(--pu-space-12)" }}>
        <Icon name="info" />
        <span>
          Built in plan step {step}, on React Aria Components: shown here, in each theme, with its keys and how to use it.
        </span>
      </div>
    </Page>
  );
}
