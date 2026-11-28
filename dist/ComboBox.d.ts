import type { FocusEvent, KeyboardEvent, ReactNode, Ref } from "react";
export interface ComboBoxItem {
    /** What the app knows it by, as text. */
    id: string;
    /** What it says. */
    name: string;
}
export interface ComboBoxProps {
    "aria-label": string;
    /** The suggestions shown, as the app filters them. */
    items: ComboBoxItem[];
    /** The text in the field, the app's. */
    inputValue: string;
    onInputChange: (text: string) => void;
    /** A suggestion taken, by Enter or a click. */
    onChoose: (id: string) => void;
    /** The field's keys, after React Aria's: Enter on typed text, Esc. */
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    /** The system's tooltip, on the field. */
    title?: string;
    /** The list opens as the field takes the keys, until set false: then as one types. */
    opensOnFocus?: boolean;
    isInvalid?: boolean;
    /** At the field's end, inside it: an app's own button; the list's chevron until set. */
    end?: ReactNode;
    inputRef?: Ref<HTMLInputElement>;
    /** Attributes for the app's checks, on the field itself. */
    data?: Record<`data-${string}`, string>;
    className?: string;
}
export declare function ComboBox({ items, inputValue, onInputChange, onChoose, onKeyDown, onFocus, onBlur, placeholder, title, opensOnFocus, isInvalid, end, inputRef, data, className, ...aria }: ComboBoxProps): import("react").JSX.Element;
