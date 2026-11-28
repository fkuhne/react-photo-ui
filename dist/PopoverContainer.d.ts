import { type ReactNode } from "react";
/** Popovers of the controls inside open in `container`, which carries their theme. */
export declare function PopoverContainer({ container, children }: {
    container: Element | null;
    children: ReactNode;
}): import("react").JSX.Element;
export declare const usePopoverContainer: () => Element | undefined;
