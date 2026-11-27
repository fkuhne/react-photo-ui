import type { Ref } from "react";
import { type InputProps } from "react-aria-components";
export interface FieldProps extends Omit<InputProps, "className" | "style"> {
    className?: string;
    ref?: Ref<HTMLInputElement>;
}
export declare function Field({ className, ...props }: FieldProps): import("react").JSX.Element;
