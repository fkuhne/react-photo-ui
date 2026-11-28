// Where popovers open (plan step 2.1, record 0004). React Aria opens a popover in `<body>`, outside
// whatever sets a theme on an element below it: a panel in `data-theme="light"` on a dark page got
// a dark popover in the dark page's accent. An app with one theme never needs this; the site, which
// shows each theme side by side, gives each panel its own, and an app that themes a region may too.
import { createContext, useContext, type ReactNode } from "react";

const PopoverContainerContext = createContext<Element | undefined>(undefined);

/** Popovers of the controls inside open in `container`, which carries their theme. */
export function PopoverContainer({ container, children }: { container: Element | null; children: ReactNode }) {
  return <PopoverContainerContext.Provider value={container ?? undefined}>{children}</PopoverContainerContext.Provider>;
}

export const usePopoverContainer = () => useContext(PopoverContainerContext);
