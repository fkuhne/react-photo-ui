import type { CSSProperties } from "react";
import { type IconName } from "./icon-data";
export interface IconProps {
    /** The icon, by its Lucide name: "flag", "layers", "panel-left". */
    name: IconName;
    /** Its size, a CSS length; the tokens' `--pu-icon-size` until set. */
    size?: string;
    /** What it means, for a screen reader, when nothing beside it says so; left out, the icon is
     * decoration and hidden from it. */
    label?: string;
    className?: string;
    style?: CSSProperties;
}
export declare function Icon({ name, size, label, className, style }: IconProps): import("react").JSX.Element;
