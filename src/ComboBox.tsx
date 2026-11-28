// A field that suggests as one types (plan step 2.6, record 0004): React Aria's `ComboBox`, the app
// holding its text and its suggestions, and taking what's typed as it understands it: a date, an
// ISO speed, a tag. Its list opens as the field takes the keys, the arrows move in it, Enter or a
// click takes a suggestion; React Aria leaves Enter on typed text, Esc and leaving the field to the
// app, by `onKeyDown` and `onBlur`, as nothing is selected in it: the choice is the app's to keep.
import type { FocusEvent, KeyboardEvent, ReactNode, Ref } from "react";
import { ComboBox as AriaComboBox, ButtonContext, Input, ListBox, ListBoxItem, Popover } from "react-aria-components";
import { Icon } from "./Icon";
import { usePopoverContainer } from "./PopoverContainer";

export interface ComboBoxItem {
  /** What the app knows it by, as text. */
  id: string;
  /** What it says. */
  name: string;
}

export interface ComboBoxProps {
  "aria-label": string;
  /** The suggestions shown, as the app filters them. */
  items: ComboBoxItem[];
  /** The text in the field, the app's. */
  inputValue: string;
  onInputChange: (text: string) => void;
  /** A suggestion taken, by Enter or a click. */
  onChoose: (id: string) => void;
  /** The field's keys, after React Aria's: Enter on typed text, Esc. */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** The system's tooltip, on the field. */
  title?: string;
  /** The list opens as the field takes the keys, until set false: then as one types. */
  opensOnFocus?: boolean;
  isInvalid?: boolean;
  /** At the field's end, inside it: an app's own button; the list's chevron until set. */
  end?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  /** Attributes for the app's checks, on the field itself. */
  data?: Record<`data-${string}`, string>;
  className?: string;
}

export function ComboBox({ items, inputValue, onInputChange, onChoose, onKeyDown, onFocus, onBlur, placeholder, title, opensOnFocus = true, isInvalid, end, inputRef, data, className, ...aria }: ComboBoxProps) {
  return (
    <AriaComboBox
      {...aria}
      items={items}
      inputValue={inputValue}
      onInputChange={onInputChange}
      selectedKey={null}
      onSelectionChange={(key) => {
        if (key != null) onChoose(String(key));
      }}
      allowsCustomValue
      menuTrigger={opensOnFocus ? "focus" : "input"}
      isInvalid={isInvalid}
      className={["pu-combobox", className].filter(Boolean).join(" ")}
    >
      <div className="pu-combobox-field">
        <Input ref={inputRef} className="pu-field" placeholder={placeholder} title={title} spellCheck={false} autoComplete="off" onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} {...data} />
        {/* The app's own button there is its own: out of the button context React Aria's combo box
            gives its trigger, which would open the list and take the keys with it. */}
        <ButtonContext.Provider value={null}>
          <span className="pu-combobox-end">{end ?? <Icon name="chevron-down" className="pu-combobox-chevron" />}</span>
        </ButtonContext.Provider>
      </div>
      <Popover className="pu-popover pu-combobox-popover" offset={2} placement="bottom start" UNSTABLE_portalContainer={usePopoverContainer()}>
        <ListBox className="pu-listbox" items={items}>
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name} className="pu-listbox-item">
              <span className="pu-listbox-item-name">{item.name}</span>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}
