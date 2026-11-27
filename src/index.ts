// photo-ui, the design system of the owner's photo apps (spec/product.md): its tokens' CSS is
// `photo-ui/tokens.css`, its controls' `photo-ui/controls.css`, loaded after it; its icons and
// controls are here.

/** The package's version, as `package.json` gives it; `npm run make` checks the two agree. */
export const PHOTO_UI_VERSION = "0.1.0";

export { Icon, type IconProps } from "./Icon";
export { ICON_NAMES, LUCIDE_VERSION, type IconName } from "./icon-data";
export { Button, type ButtonProps } from "./Button";
export { Select, type SelectOption, type SelectProps } from "./Select";
