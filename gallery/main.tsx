// The gallery page (plan step 1.1): every token, icon and control of the design system, dark and
// light, as each step adds them. It shows the source in `src/`, as the apps will get it built.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PHOTO_UI_VERSION } from "../src";

/** What each part of the page will show, and the plan step that brings it. */
const PARTS = [
  { name: "Tokens", what: "Colour, type, spacing, corners and depth, dark and light", step: "1.2" },
  { name: "Icons", what: "Lucide's icons the apps use", step: "1.3" },
  { name: "Controls", what: "Buttons, fields, choices, popovers, panels and lists", step: "phase 2" },
];

function Gallery() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Text', 'Segoe UI', system-ui, sans-serif", fontSize: 12, lineHeight: "16px" }}>
      <h1 style={{ fontSize: 13, margin: "0 0 4px" }}>photo-ui {PHOTO_UI_VERSION}</h1>
      <p style={{ margin: "0 0 24px" }}>The design system of PhotoMatch, PhotoDev and PhotoBook.</p>
      {PARTS.map((part) => (
        <section key={part.name} style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>{part.name}</h2>
          <p style={{ margin: 0 }}>
            {part.what}: from plan step {part.step}.
          </p>
        </section>
      ))}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Gallery />
  </StrictMode>,
);
