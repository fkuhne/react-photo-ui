import { type ReactNode, type Ref } from "react";
import { type ButtonProps as AriaButtonProps } from "react-aria-components";
import type { IconName } from "./icon-data";
export interface ButtonProps extends Omit<AriaButtonProps, "children" | "className" | "style"> {
    /** `accent`, the first choice; `plain`, until set; `quiet`, text in the accent. */
    variant?: "accent" | "plain" | "quiet";
    /** `large`, 26 px high, for a dialog's foot; else a control's 24. */
    size?: "normal" | "large";
    /** An icon before the text, or alone: then `aria-label` names the button. */
    icon?: IconName;
    /** The system's tooltip. React Aria passes no `title` through, so it's set on the button here,
     * until the overlays' step draws tooltips of our own. */
    title?: string;
    className?: string;
    children?: ReactNode;
    ref?: Ref<HTMLButtonElement>;
}
export declare function Button({ variant, size, icon, title, className, children, ref, ...props }: ButtonProps): import("react").JSX.Element;
