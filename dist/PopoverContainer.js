import { jsx as _jsx } from "react/jsx-runtime";
// Where popovers open (plan step 2.1, record 0004). React Aria opens a popover in `<body>`, outside
// whatever sets a theme on an element below it: a panel in `data-theme="light"` on a dark page got
// a dark popover in the dark page's accent. An app with one theme never needs this; the site, which
// shows each theme side by side, gives each panel its own, and an app that themes a region may too.
import { createContext, useContext } from "react";
const PopoverContainerContext = createContext(undefined);
/** Popovers of the controls inside open in `container`, which carries their theme. */
export function PopoverContainer({ container, children }) {
    return _jsx(PopoverContainerContext.Provider, { value: container ?? undefined, children: children });
}
export const usePopoverContainer = () => useContext(PopoverContainerContext);
