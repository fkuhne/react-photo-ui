// The choices (plan step 2.3, record 0004): a button that stays pressed, a segmented choice, a
// switch, a checkbox, radio buttons and a slider, each on React Aria's, drawn by `controls.css`. A switch turns a
// setting on or off at once, as Microsoft's guidelines ask; a checkbox ticks any of a list, as both
// Apple's and Microsoft's do.
import { useCallback, type ReactNode, type Ref } from "react";
import {
  Checkbox as AriaCheckbox,
  Label,
  Radio,
  RadioGroup as AriaRadioGroup,
  Slider as AriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  Switch as AriaSwitch,
  ToggleButton as AriaToggleButton,
  ToggleButtonGroup,
  type CheckboxProps as AriaCheckboxProps,
  type Key,
  type SwitchProps as AriaSwitchProps,
  type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";
import { Icon } from "./Icon";
import type { IconName } from "./icon-data";

/** React Aria passes no `title`: set on the element itself, the system's tooltip, as `Button` does. */
function useTitle<T extends HTMLElement>(title: string | undefined, ref?: Ref<T>) {
  return useCallback(
    (element: T | null) => {
      if (element) {
        if (title) element.title = title;
        else element.removeAttribute("title");
      }
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [title, ref],
  );
}

export interface ToggleButtonProps extends Omit<AriaToggleButtonProps, "children" | "className" | "style"> {
  /** `plain`, a bordered button, until set; `quiet`, none until hovered or pressed. */
  variant?: "plain" | "quiet";
  icon?: IconName;
  title?: string;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

/** A button that stays pressed while its setting is on: `isSelected` and `onChange`. */
export function ToggleButton({ variant = "plain", icon, title, className, children, ref, ...props }: ToggleButtonProps) {
  const element = useTitle(title, ref);
  const iconOnly = icon !== undefined && (children === undefined || children === null);
  const classes = ["pu-toggle", `pu-toggle--${variant}`, iconOnly && "pu-toggle--icon", className].filter(Boolean).join(" ");
  return (
    <AriaToggleButton {...props} ref={element} className={classes}>
      {icon && <Icon name={icon} />}
      {children}
    </AriaToggleButton>
  );
}

export interface SegmentOption {
  id: Key;
  /** What the segment shows. */
  name: ReactNode;
  /** What it's called, when `name` isn't text, such as ≤. */
  label?: string;
  title?: string;
  /** Attributes for the app's own checks, such as `{ "data-check": "grid-shape" }`. */
  data?: Record<`data-${string}`, string>;
}

export interface SegmentedProps {
  options: SegmentOption[];
  value: Key;
  onChange: (value: Key) => void;
  /** `joined`, one control, until set; `apart`, each choice a button of its own, as colours are. */
  look?: "joined" | "apart";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}

function Segment({ option }: { option: SegmentOption }) {
  const element = useTitle<HTMLButtonElement>(option.title);
  return (
    <AriaToggleButton id={option.id} ref={element} aria-label={option.label} className="pu-segment" {...option.data}>
      {option.name}
    </AriaToggleButton>
  );
}

/** One of a few choices, side by side, one always on: React Aria's ToggleButtonGroup, a radio group. */
export function Segmented({ options, value, onChange, look = "joined", className, ...aria }: SegmentedProps) {
  return (
    <ToggleButtonGroup
      {...aria}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[value]}
      onSelectionChange={(keys) => {
        const [key] = keys;
        if (key !== undefined && key !== value) onChange(key);
      }}
      className={["pu-segmented", `pu-segmented--${look}`, className].filter(Boolean).join(" ")}
    >
      {options.map((option) => (
        <Segment key={String(option.id)} option={option} />
      ))}
    </ToggleButtonGroup>
  );
}

export interface SwitchProps extends Omit<AriaSwitchProps, "children" | "className" | "style"> {
  /** What it turns on, beside it. */
  children?: ReactNode;
  className?: string;
}

/** A setting on or off, taking effect at once. */
export function Switch({ children, className, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={["pu-switch", className].filter(Boolean).join(" ")}>
      <span className="pu-switch-track" aria-hidden="true">
        <span className="pu-switch-knob" />
      </span>
      {children}
    </AriaSwitch>
  );
}

export interface CheckboxProps extends Omit<AriaCheckboxProps, "children" | "className" | "style"> {
  /** What it ticks, beside it: text, or the parts of a row. */
  children?: ReactNode;
  className?: string;
}

/** One of a list, ticked or not; any of them at once. */
export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className={["pu-checkbox", className].filter(Boolean).join(" ")}>
      {({ isSelected, isIndeterminate }) => (
        <>
          <span className="pu-checkbox-box" aria-hidden="true">
            {isIndeterminate ? <Icon name="minus" /> : isSelected ? <Icon name="check" /> : null}
          </span>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  /** How the value reads beside it, such as "150%". */
  format?: (value: number) => string;
  label?: ReactNode;
  "aria-label"?: string;
  isDisabled?: boolean;
  /** Attributes for the app's own checks, on the slider's root. */
  data?: Record<`data-${string}`, string>;
  className?: string;
}

/** A value along a track, its reading beside it, as both Apple's and Microsoft's guidelines suggest. */
export function Slider({ value, onChange, minValue = 0, maxValue = 100, step = 1, format, label, className, data, ...props }: SliderProps) {
  return (
    <AriaSlider
      {...props}
      {...data}
      value={value}
      onChange={(v) => onChange(v)}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      className={["pu-slider", className].filter(Boolean).join(" ")}
    >
      {label !== undefined && <Label className="pu-slider-label">{label}</Label>}
      <SliderTrack className="pu-slider-track">
        {({ state }) => (
          <>
            <span className="pu-slider-fill" style={{ width: `${state.getThumbPercent(0) * 100}%` }} />
            <SliderThumb className="pu-slider-thumb" />
          </>
        )}
      </SliderTrack>
      <SliderOutput className="pu-slider-output">{({ state }) => (format ? format(state.getThumbValue(0)) : state.getThumbValueLabel(0))}</SliderOutput>
    </AriaSlider>
  );
}

export interface RadioOption {
  id: string;
  /** What it says, beside its circle. */
  name: ReactNode;
  data?: Record<`data-${string}`, string>;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  /** Shown before the choices; or `aria-label` alone. */
  label?: ReactNode;
  "aria-label"?: string;
  className?: string;
}

/** One of a few choices, each said in words, as Apple's guidelines prefer for exclusive ones. */
export function RadioGroup({ options, value, onChange, label, className, ...aria }: RadioGroupProps) {
  return (
    <AriaRadioGroup {...aria} value={value} onChange={onChange} orientation="horizontal" className={["pu-radio-group", className].filter(Boolean).join(" ")}>
      {label !== undefined && <Label className="pu-radio-group-label">{label}</Label>}
      {options.map((option) => (
        <Radio key={option.id} value={option.id} className="pu-radio" {...option.data}>
          <span className="pu-radio-circle" aria-hidden="true" />
          {option.name}
        </Radio>
      ))}
    </AriaRadioGroup>
  );
}
