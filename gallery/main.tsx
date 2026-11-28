// The design system's site (plan step 1.4): its sections down the left, a page beside them, a
// search and the theme along the top. Each page has its own address, `#/foundations/colour`, so
// that it can be linked to and works as a static site anywhere.
import { StrictMode, useEffect, useMemo, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { Icon, PHOTO_UI_VERSION, type IconName } from "../src";
import { Buttons, Choices, Colour, Depth, Fields, Icons, Overview, Panels, Popovers, Space, Type } from "./pages";
import "../dist/tokens.css";
import "../dist/controls.css";
import "./site.css";

interface Route {
  path: string;
  title: string;
  icon: IconName;
  section: string;
  soon?: string;
  page: (query: string) => ReactNode;
}

const ROUTES: Route[] = [
  { path: "", title: "Overview", icon: "info", section: "photo-ui", page: () => <Overview /> },
  { path: "foundations/colour", title: "Colour", icon: "image", section: "Foundations", page: () => <Colour /> },
  { path: "foundations/type", title: "Type", icon: "sliders-horizontal", section: "Foundations", page: () => <Type /> },
  { path: "foundations/space", title: "Space and size", icon: "columns-2", section: "Foundations", page: () => <Space /> },
  { path: "foundations/depth", title: "Corners and depth", icon: "layers", section: "Foundations", page: () => <Depth /> },
  { path: "icons", title: "Icons", icon: "star", section: "Icons", page: (query) => <Icons query={query} /> },
  { path: "controls/buttons", title: "Buttons", icon: "plus", section: "Controls", page: () => <Buttons /> },
  { path: "controls/fields", title: "Fields and dropdowns", icon: "search", section: "Controls", page: () => <Fields /> },
  { path: "controls/choices", title: "Choices, sliders, switches", icon: "sliders-horizontal", section: "Controls", page: () => <Choices /> },
  { path: "controls/popovers", title: "Popovers and dialogs", icon: "chevron-down", section: "Controls", page: () => <Popovers /> },
  { path: "controls/panels", title: "Panels, tags and trees", icon: "panel-left", section: "Controls", page: () => <Panels /> },
];

type Theme = "system" | "dark" | "light" | "paper";
const THEMES: { id: Theme; name: string }[] = [
  { id: "system", name: "System" },
  { id: "dark", name: "Dark" },
  { id: "light", name: "Light" },
  { id: "paper", name: "Paper" },
];

/** The page the address names, `#/icons`; the overview when it names none. */
const current = () => window.location.hash.replace(/^#\/?/, "");

/** The theme the visitor chose last, kept in this browser only. */
function rememberedTheme(): Theme {
  try {
    const kept = localStorage.getItem("photo-ui-theme");
    return THEMES.some((t) => t.id === kept) ? (kept as Theme) : "system";
  } catch {
    return "system";
  }
}

function Site() {
  const [path, setPath] = useState(current);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(rememberedTheme);

  useEffect(() => {
    const onHash = () => setPath(current());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme === "paper" ? "light" : theme;
    if (theme === "paper") root.dataset.palette = "paper";
    else delete root.dataset.palette;
    try {
      localStorage.setItem("photo-ui-theme", theme);
    } catch {
      // A browser that keeps nothing starts at the system's again.
    }
  }, [theme]);

  const route = ROUTES.find((r) => r.path === path) ?? ROUTES[0];
  useEffect(() => {
    document.title = route.path ? `${route.title} · photo-ui` : "photo-ui";
    document.querySelector(".site-page")?.scrollTo(0, 0);
  }, [route]);

  const matching = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ROUTES.filter((r) => r.title.toLowerCase().includes(q) || r.section.toLowerCase().includes(q) || r.path === "icons") : ROUTES;
  }, [query]);
  const sections = [...new Set(matching.map((r) => r.section))];

  return (
    <div className="site">
      <header className="site-bar">
        <a className="site-name" href="#/">
          <Icon name="layers" />
          photo-ui <span className="site-version">{PHOTO_UI_VERSION}</span>
        </a>
        <label className="site-search">
          <Icon name="search" />
          <input type="search" placeholder="Search pages and icons" aria-label="Search pages and icons" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="choice" role="group" aria-label="Theme">
          {THEMES.map((t) => (
            <button key={t.id} aria-pressed={theme === t.id} onClick={() => setTheme(t.id)}>
              {t.name}
            </button>
          ))}
        </div>
        <a className="site-link" href="https://github.com/fkuhne/react-photo-ui">GitHub</a>
      </header>
      <div className="site-body">
        <nav className="site-nav" aria-label="Sections">
          {sections.map((section) => (
            <div key={section}>
              <h2>{section}</h2>
              <ul>
                {matching
                  .filter((r) => r.section === section)
                  .map((r) => (
                    <li key={r.path}>
                      <a href={`#/${r.path}`} aria-current={r === route ? "page" : undefined}>
                        <Icon name={r.icon} />
                        {r.title}
                        {r.soon && <span className="soon">{r.soon}</span>}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
        <main className="site-page">{route.page(query)}</main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Site />
  </StrictMode>,
);
