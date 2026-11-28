import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Label, ListBox, ListBoxItem, Popover, Select as AriaSelect, SelectValue } from "react-aria-components";
import { Icon } from "./Icon";
import { usePopoverContainer } from "./PopoverContainer";
export function Select({ options, value, onChange, label, className, ...props }) {
    return (_jsxs(AriaSelect, { ...props, value: value, onChange: (key) => {
            if (key !== null)
                onChange(key);
        }, className: ["pu-select", className].filter(Boolean).join(" "), children: [label !== undefined && _jsx(Label, { className: "pu-select-label", children: label }), _jsxs(Button, { className: "pu-select-button", children: [_jsx(SelectValue, { className: "pu-select-value" }), _jsx(Icon, { name: "chevron-down", className: "pu-select-chevron" })] }), _jsx(Popover, { className: "pu-popover pu-select-popover", offset: 4, UNSTABLE_portalContainer: usePopoverContainer(), children: _jsx(ListBox, { className: "pu-listbox", items: options, children: (option) => (_jsxs(ListBoxItem, { id: option.id, textValue: option.name, className: "pu-listbox-item", children: [_jsx("span", { className: "pu-listbox-item-name", children: option.name }), _jsx(Icon, { name: "check", className: "pu-listbox-item-check" })] })) }) })] }));
}
