// A dropdown (plan step 2.1, record 0004): React Aria's `Select`, its button showing the choice and
// a chevron, its list in a popover as wide as the button at least, drawn by `controls.css`. The keys
// are React Aria's: Space, Enter or the arrows open it, the arrows move, typing jumps to a choice,
// Enter takes it and Esc closes it. Named by `label`, shown, or by `aria-label`.
import type { ReactNode } from "react";
import { Button, Label, ListBox, ListBoxItem, Popover, Select as AriaSelect, SelectValue, type Key, type SelectProps as AriaSelectProps } from "react-aria-components";
import { Icon } from "./Icon";

export interface SelectOption {
  /** What the choice is, as the app knows it. */
  id: Key;
  /** What it says. */
  name: string;
}

export interface SelectProps extends Omit<AriaSelectProps<SelectOption>, "children" | "className" | "style" | "value" | "onChange" | "items"> {
  /** The choices, in order. */
  options: SelectOption[];
  /** The choice made. */
  value: Key | null;
  /** Called with the choice taken. */
  onChange: (value: Key) => void;
  /** A label shown before the button; or `aria-label` alone. */
  label?: ReactNode;
  className?: string;
}

export function Select({ options, value, onChange, label, className, ...props }: SelectProps) {
  return (
    <AriaSelect
      {...props}
      value={value}
      onChange={(key) => {
        if (key !== null) onChange(key);
      }}
      className={["pu-select", className].filter(Boolean).join(" ")}
    >
      {label !== undefined && <Label className="pu-select-label">{label}</Label>}
      <Button className="pu-select-button">
        <SelectValue className="pu-select-value" />
        <Icon name="chevron-down" className="pu-select-chevron" />
      </Button>
      <Popover className="pu-popover pu-select-popover" offset={4}>
        <ListBox className="pu-listbox" items={options}>
          {(option) => (
            <ListBoxItem id={option.id} textValue={option.name} className="pu-listbox-item">
              <span className="pu-listbox-item-name">{option.name}</span>
              <Icon name="check" className="pu-listbox-item-check" />
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
