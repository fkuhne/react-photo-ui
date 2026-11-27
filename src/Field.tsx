// A text field (plan step 2.2, record 0004): React Aria's `Input`, which passes every property to its
// `<input>`, a ref and an app's keys among them, drawn by `controls.css`: 24 px high, the field's
// ground, an edge that takes the accent while typed in, the error's colour while `aria-invalid`.
import type { Ref } from "react";
import { Input, type InputProps } from "react-aria-components";

export interface FieldProps extends Omit<InputProps, "className" | "style"> {
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

export function Field({ className, ...props }: FieldProps) {
  return <Input {...props} className={["pu-field", className].filter(Boolean).join(" ")} />;
}
