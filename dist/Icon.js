import { jsx as _jsx } from "react/jsx-runtime";
import { ICON_SHAPES } from "./icon-data";
export function Icon({ name, size, label, className, style }) {
    const extent = size ?? "var(--pu-icon-size)";
    const named = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
    return (_jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", className: className, focusable: "false", "data-icon": name, ...named, style: { width: extent, height: extent, flex: "none", strokeWidth: "var(--pu-icon-stroke)", ...style }, children: ICON_SHAPES[name].map(([tag, attributes], i) => {
            const Shape = tag;
            return _jsx(Shape, { ...attributes, vectorEffect: "non-scaling-stroke" }, i);
        }) }));
}
