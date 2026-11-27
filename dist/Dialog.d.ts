import type { ReactNode } from "react";
export interface DialogProps {
    /** Called when the scrim is clicked, or Esc pressed unless the app keeps Esc. */
    onClose: () => void;
    /** What it's called, for a screen reader, when no `DialogTitle` names it. */
    "aria-label"?: string;
    /** The app keeps Esc: its own keys close the dialog. */
    isKeyboardDismissDisabled?: boolean;
    /** Classes on the dialog itself, the element named `dialog`, for the app's layout: its size, its
     * padding, its grid. The box around it, its edge, corners, ground and shadow, is ours. */
    className?: string;
    children: ReactNode;
}
/** A dialog over the app, open while it's shown: an app shows it, and takes it away in `onClose`. */
export declare function Dialog({ onClose, className, children, isKeyboardDismissDisabled, ...aria }: DialogProps): import("react").JSX.Element;
/** A dialog's title, which names it for a screen reader too. */
export declare function DialogTitle({ children, className }: {
    children: ReactNode;
    className?: string;
}): import("react").JSX.Element;
