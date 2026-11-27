import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// The choices (plan step 2.3, record 0004): a button that stays pressed, a segmented choice, a
// switch, a checkbox, radio buttons and a slider, each on React Aria's, drawn by `controls.css`. A switch turns a
// setting on or off at once, as Microsoft's guidelines ask; a checkbox ticks any of a list, as both
// Apple's and Microsoft's do.
import { useCallback } from "react";
import { Checkbox as AriaCheckbox, Label, Radio, RadioGroup as AriaRadioGroup, Slider as AriaSlider, SliderOutput, SliderThumb, SliderTrack, Switch as AriaSwitch, ToggleButton as AriaToggleButton, ToggleButtonGroup, } from "react-aria-components";
import { Icon } from "./Icon";
/** React Aria passes no `title`: set on the element itself, the system's tooltip, as `Button` does. */
function useTitle(title, ref) {
    return useCallback((element) => {
        if (element) {
            if (title)
                element.title = title;
            else
                element.removeAttribute("title");
        }
        if (typeof ref === "function")
            ref(element);
        else if (ref)
            ref.current = element;
    }, [title, ref]);
}
/** A button that stays pressed while its setting is on: `isSelected` and `onChange`. */
export function ToggleButton({ variant = "plain", icon, title, className, children, ref, ...props }) {
    const element = useTitle(title, ref);
    const iconOnly = icon !== undefined && (children === undefined || children === null);
    const classes = ["pu-toggle", `pu-toggle--${variant}`, iconOnly && "pu-toggle--icon", className].filter(Boolean).join(" ");
    return (_jsxs(AriaToggleButton, { ...props, ref: element, className: classes, children: [icon && _jsx(Icon, { name: icon }), children] }));
}
function Segment({ option }) {
    const element = useTitle(option.title);
    return (_jsx(AriaToggleButton, { id: option.id, ref: element, "aria-label": option.label, className: "pu-segment", ...option.data, children: option.name }));
}
/** One of a few choices, side by side, one always on: React Aria's ToggleButtonGroup, a radio group. */
export function Segmented({ options, value, onChange, look = "joined", className, ...aria }) {
    return (_jsx(ToggleButtonGroup, { ...aria, selectionMode: "single", disallowEmptySelection: true, selectedKeys: [value], onSelectionChange: (keys) => {
            const [key] = keys;
            if (key !== undefined && key !== value)
                onChange(key);
        }, className: ["pu-segmented", `pu-segmented--${look}`, className].filter(Boolean).join(" "), children: options.map((option) => (_jsx(Segment, { option: option }, String(option.id)))) }));
}
/** A setting on or off, taking effect at once. */
export function Switch({ children, className, ...props }) {
    return (_jsxs(AriaSwitch, { ...props, className: ["pu-switch", className].filter(Boolean).join(" "), children: [_jsx("span", { className: "pu-switch-track", "aria-hidden": "true", children: _jsx("span", { className: "pu-switch-knob" }) }), children] }));
}
/** One of a list, ticked or not; any of them at once. */
export function Checkbox({ children, className, ...props }) {
    return (_jsx(AriaCheckbox, { ...props, className: ["pu-checkbox", className].filter(Boolean).join(" "), children: ({ isSelected, isIndeterminate }) => (_jsxs(_Fragment, { children: [_jsx("span", { className: "pu-checkbox-box", "aria-hidden": "true", children: isIndeterminate ? _jsx(Icon, { name: "minus" }) : isSelected ? _jsx(Icon, { name: "check" }) : null }), children] })) }));
}
/** A value along a track, its reading beside it, as both Apple's and Microsoft's guidelines suggest. */
export function Slider({ value, onChange, minValue = 0, maxValue = 100, step = 1, format, label, className, data, ...props }) {
    return (_jsxs(AriaSlider, { ...props, ...data, value: value, onChange: (v) => onChange(v), minValue: minValue, maxValue: maxValue, step: step, className: ["pu-slider", className].filter(Boolean).join(" "), children: [label !== undefined && _jsx(Label, { className: "pu-slider-label", children: label }), _jsx(SliderTrack, { className: "pu-slider-track", children: ({ state }) => (_jsxs(_Fragment, { children: [_jsx("span", { className: "pu-slider-fill", style: { width: `${state.getThumbPercent(0) * 100}%` } }), _jsx(SliderThumb, { className: "pu-slider-thumb" })] })) }), _jsx(SliderOutput, { className: "pu-slider-output", children: ({ state }) => (format ? format(state.getThumbValue(0)) : state.getThumbValueLabel(0)) })] }));
}
/** One of a few choices, each said in words, as Apple's guidelines prefer for exclusive ones. */
export function RadioGroup({ options, value, onChange, label, className, ...aria }) {
    return (_jsxs(AriaRadioGroup, { ...aria, value: value, onChange: onChange, orientation: "horizontal", className: ["pu-radio-group", className].filter(Boolean).join(" "), children: [label !== undefined && _jsx(Label, { className: "pu-radio-group-label", children: label }), options.map((option) => (_jsxs(Radio, { value: option.id, className: "pu-radio", ...option.data, children: [_jsx("span", { className: "pu-radio-circle", "aria-hidden": "true" }), option.name] }, option.id)))] }));
}
