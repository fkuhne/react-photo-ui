// The gallery page (plan steps 1.1 and 1.2): every token, icon and control of the design system,
// in each theme side by side, as each step adds them. Its styles name only the tokens.
import { StrictMode, type CSSProperties, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { PHOTO_UI_VERSION } from "../src";
import "../dist/tokens.css";
import table from "../dist/tokens.json";

/** Each theme, as an element of the page sets it: Graphite's two by `data-theme`, PhotoBook's draft
 * by `data-palette` (record 0007). */
const THEMES: { context: keyof typeof table; name: string; attributes: Record<string, string> }[] = [
  { context: "graphite-dark", name: "Graphite, dark", attributes: { "data-theme": "dark" } },
  { context: "graphite-light", name: "Graphite, light", attributes: { "data-theme": "light" } },
  { context: "paper-light", name: "Paper, light: a draft of PhotoBook's", attributes: { "data-palette": "paper" } },
];

/** The surfaces, and the texts shown on each. */
const SURFACES = ["canvas", "panel", "caption", "control", "field", "popover", "chip", "pressed"];
const v = (name: string) => `var(--pu-${name})`;
const value = (context: keyof typeof table, name: string) => (table[context] as Record<string, { value: string }>)[`--pu-${name}`]?.value ?? "";

const label: CSSProperties = { fontSize: v("font-size-caption"), lineHeight: v("font-line-caption"), fontWeight: v("font-weight-strong"), letterSpacing: v("font-tracking-label"), textTransform: "uppercase", color: v("color-text-quiet") };

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: v("space-8") }}>
      <h3 style={{ ...label, margin: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

function Theme({ context, name, attributes }: (typeof THEMES)[number]) {
  return (
    <div {...attributes} style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: v("space-20"), padding: v("space-16"), borderRadius: v("radius-dialog"), background: v("color-canvas"), color: v("color-text") }}>
      <h2 style={{ margin: 0, fontSize: v("font-size-title"), lineHeight: v("font-line-title"), fontWeight: v("font-weight-strong") }}>{name}</h2>

      <Part title="Surfaces, with their text">
        {SURFACES.map((surface) => (
          <div key={surface} style={{ display: "flex", alignItems: "center", gap: v("space-8"), padding: `${v("space-6")} ${v("space-8")}`, borderRadius: v("radius-control"), background: v(`color-${surface}`), boxShadow: `inset 0 0 0 1px ${v("color-line")}` }}>
            <span style={{ flex: "0 0 64px" }}>{surface}</span>
            <span style={{ color: v("color-text-quiet") }}>Quieter</span>
            <span style={{ color: v("color-accent-text") }}>Accent</span>
            <span style={{ marginLeft: "auto", color: v("color-text-quiet"), fontVariantNumeric: "tabular-nums" }}>{value(context, `color-${surface}`)}</span>
          </div>
        ))}
      </Part>

      <Part title="The accent, lines and labels">
        <div style={{ display: "flex", flexWrap: "wrap", gap: v("space-6"), alignItems: "center" }}>
          <span style={{ padding: `0 ${v("space-12")}`, height: v("size-control"), display: "inline-flex", alignItems: "center", borderRadius: v("radius-control"), background: v("color-accent"), color: v("color-on-accent"), fontWeight: v("font-weight-strong") }}>On the accent</span>
          <span style={{ padding: `0 ${v("space-12")}`, height: v("size-control"), display: "inline-flex", alignItems: "center", borderRadius: v("radius-control"), background: v("color-selected") }}>Selected, softly</span>
          <span style={{ padding: `0 ${v("space-12")}`, height: v("size-control"), display: "inline-flex", alignItems: "center", borderRadius: v("radius-control"), background: v("color-control"), boxShadow: `inset 0 0 0 1px ${v("color-edge")}` }}>An edge</span>
          {["red", "yellow", "green", "blue"].map((hue) => (
            <span key={hue} title={hue} style={{ width: 14, height: 14, borderRadius: "50%", background: v(`color-label-${hue}`) }} />
          ))}
        </div>
      </Part>

      <Part title="Type">
        <div style={{ display: "flex", flexDirection: "column", gap: v("space-4"), padding: v("space-12"), borderRadius: v("radius-control"), background: v("color-panel") }}>
          <span style={{ fontSize: v("font-size-title"), lineHeight: v("font-line-title"), fontWeight: v("font-weight-strong") }}>A dialog's title, 13 px</span>
          <span style={{ fontSize: v("font-size-text"), lineHeight: v("font-line-text") }}>Text and controls, 12 px: Capture Time, Oldest first</span>
          <span style={{ fontSize: v("font-size-caption"), lineHeight: v("font-line-caption"), color: v("color-text-quiet") }}>A caption, 11 px: DSC01311.ARW · 1/250 · f/2.8</span>
          <span style={label}>A section's name</span>
        </div>
      </Part>

      <Part title="Corners, space and depth">
        <div style={{ display: "flex", gap: v("space-8"), alignItems: "flex-end", flexWrap: "wrap" }}>
          {["control", "popover", "dialog"].map((r) => (
            <span key={r} style={{ width: 56, height: 40, display: "grid", placeItems: "center", borderRadius: v(`radius-${r}`), background: v("color-control"), boxShadow: `inset 0 0 0 1px ${v("color-edge")}`, fontSize: v("font-size-caption") }}>
              {r}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: v("space-4"), alignItems: "flex-end" }}>
          {["2", "4", "6", "8", "10", "12", "16", "20"].map((s) => (
            <span key={s} title={`${s} px`} style={{ width: v(`space-${s}`), height: v(`space-${s}`), background: v("color-accent") }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: v("space-16"), padding: v("space-12") }}>
          {["popover", "dialog"].map((s) => (
            <span key={s} style={{ flex: 1, height: 48, display: "grid", placeItems: "center", borderRadius: v(`radius-${s}`), background: v("color-popover"), boxShadow: v(`shadow-${s}`) }}>
              {s}
            </span>
          ))}
        </div>
      </Part>
    </div>
  );
}

function Gallery() {
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: `${v("space-20")} ${v("space-16")}`, display: "flex", flexDirection: "column", gap: v("space-20"), fontFamily: v("font-family"), fontSize: v("font-size-text"), lineHeight: v("font-line-text"), color: v("color-text") }}>
      <header>
        <h1 style={{ margin: 0, fontSize: v("font-size-title"), lineHeight: v("font-line-title") }}>photo-ui {PHOTO_UI_VERSION}</h1>
        <p style={{ margin: 0, color: v("color-text-quiet") }}>The design system of PhotoMatch, PhotoDev and PhotoBook. Icons arrive in plan step 1.3, the controls in phase 2.</p>
      </header>
      <div style={{ display: "flex", flexWrap: "wrap", gap: v("space-16") }}>
        {THEMES.map((theme) => (
          <Theme key={theme.context} {...theme} />
        ))}
      </div>
    </main>
  );
}

document.body.style.margin = "0";
document.body.style.background = v("color-canvas");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Gallery />
  </StrictMode>,
);
