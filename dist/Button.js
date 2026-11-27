import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// A button (plan step 2.1, record 0004): React Aria's `Button`, in Graphite's four kinds, drawn by
// `controls.css` from the tokens alone. The accented one is the first choice, a dialog's default; the
// plain one every other; the quiet one, text in the accent, for what goes with the text around it;
// any of them with an icon alone, named for a screen reader by its `aria-label`.
import { useCallback } from "react";
import { Button as AriaButton } from "react-aria-components";
import { Icon } from "./Icon";
export function Button({ variant = "plain", size = "normal", icon, title, className, children, ref, ...props }) {
    // The title on the element itself, which React then leaves alone; and the caller's ref with it.
    const element = useCallback((button) => {
        if (button) {
            if (title)
                button.title = title;
            else
                button.removeAttribute("title");
        }
        if (typeof ref === "function")
            ref(button);
        else if (ref)
            ref.current = button;
    }, [title, ref]);
    const iconOnly = icon !== undefined && (children === undefined || children === null);
    const classes = ["pu-button", `pu-button--${variant}`, size === "large" && "pu-button--large", iconOnly && "pu-button--icon", className].filter(Boolean).join(" ");
    return (_jsxs(AriaButton, { ...props, ref: element, className: classes, children: [icon && _jsx(Icon, { name: icon }), children] }));
}
