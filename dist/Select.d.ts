import type { ReactNode } from "react";
import { type Key, type SelectProps as AriaSelectProps } from "react-aria-components";
export interface SelectOption {
    /** What the choice is, as the app knows it. */
    id: Key;
    /** What it says. */
    name: string;
}
export interface SelectProps extends Omit<AriaSelectProps<SelectOption>, "children" | "className" | "style" | "value" | "onChange" | "items"> {
    /** The choices, in order. */
    options: SelectOption[];
    /** The choice made. */
    value: Key | null;
    /** Called with the choice taken. */
    onChange: (value: Key) => void;
    /** A label shown before the button; or `aria-label` alone. */
    label?: ReactNode;
    className?: string;
}
export declare function Select({ options, value, onChange, label, className, ...props }: SelectProps): import("react").JSX.Element;
