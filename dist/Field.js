import { jsx as _jsx } from "react/jsx-runtime";
import { Input } from "react-aria-components";
export function Field({ className, ...props }) {
    return _jsx(Input, { ...props, className: ["pu-field", className].filter(Boolean).join(" ") });
}
