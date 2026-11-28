import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ComboBox as AriaComboBox, ButtonContext, Input, ListBox, ListBoxItem, Popover } from "react-aria-components";
import { Icon } from "./Icon";
export function ComboBox({ items, inputValue, onInputChange, onChoose, onKeyDown, onFocus, onBlur, placeholder, title, opensOnFocus = true, isInvalid, end, inputRef, data, className, ...aria }) {
    return (_jsxs(AriaComboBox, { ...aria, items: items, inputValue: inputValue, onInputChange: onInputChange, selectedKey: null, onSelectionChange: (key) => {
            if (key != null)
                onChoose(String(key));
        }, allowsCustomValue: true, menuTrigger: opensOnFocus ? "focus" : "input", isInvalid: isInvalid, className: ["pu-combobox", className].filter(Boolean).join(" "), children: [_jsxs("div", { className: "pu-combobox-field", children: [_jsx(Input, { ref: inputRef, className: "pu-field", placeholder: placeholder, title: title, spellCheck: false, autoComplete: "off", onKeyDown: onKeyDown, onFocus: onFocus, onBlur: onBlur, ...data }), _jsx(ButtonContext.Provider, { value: null, children: _jsx("span", { className: "pu-combobox-end", children: end ?? _jsx(Icon, { name: "chevron-down", className: "pu-combobox-chevron" }) }) })] }), _jsx(Popover, { className: "pu-popover pu-combobox-popover", offset: 2, placement: "bottom start", children: _jsx(ListBox, { className: "pu-listbox", items: items, children: (item) => (_jsx(ListBoxItem, { id: item.id, textValue: item.name, className: "pu-listbox-item", children: _jsx("span", { className: "pu-listbox-item-name", children: item.name }) })) }) })] }));
}
