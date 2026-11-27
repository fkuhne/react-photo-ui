import { type ReactNode, type Ref } from "react";
import { type CheckboxProps as AriaCheckboxProps, type Key, type SwitchProps as AriaSwitchProps, type ToggleButtonProps as AriaToggleButtonProps } from "react-aria-components";
import type { IconName } from "./icon-data";
export interface ToggleButtonProps extends Omit<AriaToggleButtonProps, "children" | "className" | "style"> {
    /** `plain`, a bordered button, until set; `quiet`, none until hovered or pressed. */
    variant?: "plain" | "quiet";
    icon?: IconName;
    title?: string;
    className?: string;
    children?: ReactNode;
    ref?: Ref<HTMLButtonElement>;
}
/** A button that stays pressed while its setting is on: `isSelected` and `onChange`. */
export declare function ToggleButton({ variant, icon, title, className, children, ref, ...props }: ToggleButtonProps): import("react").JSX.Element;
export interface SegmentOption {
    id: Key;
    /** What the segment shows. */
    name: ReactNode;
    /** What it's called, when `name` isn't text, such as ≤. */
    label?: string;
    title?: string;
    /** Attributes for the app's own checks, such as `{ "data-check": "grid-shape" }`. */
    data?: Record<`data-${string}`, string>;
}
export interface SegmentedProps {
    options: SegmentOption[];
    value: Key;
    onChange: (value: Key) => void;
    /** `joined`, one control, until set; `apart`, each choice a button of its own, as colours are. */
    look?: "joined" | "apart";
    "aria-label"?: string;
    "aria-labelledby"?: string;
    className?: string;
}
/** One of a few choices, side by side, one always on: React Aria's ToggleButtonGroup, a radio group. */
export declare function Segmented({ options, value, onChange, look, className, ...aria }: SegmentedProps): import("react").JSX.Element;
export interface SwitchProps extends Omit<AriaSwitchProps, "children" | "className" | "style"> {
    /** What it turns on, beside it. */
    children?: ReactNode;
    className?: string;
}
/** A setting on or off, taking effect at once. */
export declare function Switch({ children, className, ...props }: SwitchProps): import("react").JSX.Element;
export interface CheckboxProps extends Omit<AriaCheckboxProps, "children" | "className" | "style"> {
    /** What it ticks, beside it: text, or the parts of a row. */
    children?: ReactNode;
    className?: string;
}
/** One of a list, ticked or not; any of them at once. */
export declare function Checkbox({ children, className, ...props }: CheckboxProps): import("react").JSX.Element;
export interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    minValue?: number;
    maxValue?: number;
    step?: number;
    /** How the value reads beside it, such as "150%". */
    format?: (value: number) => string;
    label?: ReactNode;
    "aria-label"?: string;
    isDisabled?: boolean;
    /** Attributes for the app's own checks, on the slider's root. */
    data?: Record<`data-${string}`, string>;
    className?: string;
}
/** A value along a track, its reading beside it, as both Apple's and Microsoft's guidelines suggest. */
export declare function Slider({ value, onChange, minValue, maxValue, step, format, label, className, data, ...props }: SliderProps): import("react").JSX.Element;
export interface RadioOption {
    id: string;
    /** What it says, beside its circle. */
    name: ReactNode;
    data?: Record<`data-${string}`, string>;
}
export interface RadioGroupProps {
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    /** Shown before the choices; or `aria-label` alone. */
    label?: ReactNode;
    "aria-label"?: string;
    className?: string;
}
/** One of a few choices, each said in words, as Apple's guidelines prefer for exclusive ones. */
export declare function RadioGroup({ options, value, onChange, label, className, ...aria }: RadioGroupProps): import("react").JSX.Element;
