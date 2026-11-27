// A button (plan step 2.1, record 0004): React Aria's `Button`, in Graphite's four kinds, drawn by
// `controls.css` from the tokens alone. The accented one is the first choice, a dialog's default; the
// plain one every other; the quiet one, text in the accent, for what goes with the text around it;
// any of them with an icon alone, named for a screen reader by its `aria-label`.
import { useCallback, type ReactNode, type Ref } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { Icon } from "./Icon";
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

export function Button({ variant = "plain", size = "normal", icon, title, className, children, ref, ...props }: ButtonProps) {
  // The title on the element itself, which React then leaves alone; and the caller's ref with it.
  const element = useCallback(
    (button: HTMLButtonElement | null) => {
      if (button) {
        if (title) button.title = title;
        else button.removeAttribute("title");
      }
      if (typeof ref === "function") ref(button);
      else if (ref) ref.current = button;
    },
    [title, ref],
  );
  const iconOnly = icon !== undefined && (children === undefined || children === null);
  const classes = ["pu-button", `pu-button--${variant}`, size === "large" && "pu-button--large", iconOnly && "pu-button--icon", className].filter(Boolean).join(" ");
  return (
    <AriaButton {...props} ref={element} className={classes}>
      {icon && <Icon name={icon} />}
      {children}
    </AriaButton>
  );
}
