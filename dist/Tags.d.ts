import { type ReactNode } from "react";
export interface TagItem {
    id: string;
    /** What the chip shows. */
    name: ReactNode;
    /** What it's called, for a screen reader and the keys' type-ahead. */
    label: string;
    /** The system's tooltip. */
    title?: string;
    /** Whether a click on it acts, by `onAction`. */
    acts?: boolean;
    /** Classes and attributes for the app's look and checks, on the chip and on its ×. */
    className?: string;
    data?: Record<`data-${string}`, string>;
    removeData?: Record<`data-${string}`, string>;
}
export interface TagsProps {
    "aria-label": string;
    items: TagItem[];
    onRemove: (id: string) => void;
    onAction?: (id: string) => void;
    /** The ×'s name for a screen reader: "Remove Travel". */
    removeLabel: (item: TagItem) => string;
    className?: string;
}
export declare function Tags({ items, onRemove, onAction, removeLabel, className, ...aria }: TagsProps): import("react").JSX.Element;
