// One component for every icon (record 0005): Lucide's shapes, drawn in the text's colour, at the
// size and line width the tokens give, `--pu-icon-size` and `--pu-icon-stroke`. The line keeps its
// width at any size, as a stroke that doesn't scale, so that a small icon isn't thinner.
import type { CSSProperties, SVGProps } from "react";
import { ICON_SHAPES, type IconName } from "./icon-data";

export interface IconProps {
  /** The icon, by its Lucide name: "flag", "layers", "panel-left". */
  name: IconName;
  /** Its size, a CSS length; the tokens' `--pu-icon-size` until set. */
  size?: string;
  /** What it means, for a screen reader, when nothing beside it says so; left out, the icon is
   * decoration and hidden from it. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size, label, className, style }: IconProps) {
  const extent = size ?? "var(--pu-icon-size)";
  const named: SVGProps<SVGSVGElement> = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      focusable="false"
      data-icon={name}
      {...named}
      style={{ width: extent, height: extent, flex: "none", strokeWidth: "var(--pu-icon-stroke)", ...style }}
    >
      {ICON_SHAPES[name].map(([tag, attributes], i) => {
        const Shape = tag as "path";
        return <Shape key={i} {...(attributes as Record<string, string>)} vectorEffect="non-scaling-stroke" />;
      })}
    </svg>
  );
}
