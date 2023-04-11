/**
 * All property values are in `px` unless otherwise stated.
 * Any non-standard properties should follow the nomenclature - `ns<Namespace>`.
 * For example - `nsPlaceholder`.
 * This helps in processing such properties predictably.
 */
export interface FormStyles {
  borderRadius: number;
  horizontalGap: number;
  verticalGap: number;
  /**
   * Ideally the order should represent the order of buttons in the form
   */
  buttons: ButtonStylesWithState[];
  input: InputStylesWithState;
}

export interface InputStylesWithState<T = InputStyles> {
  default: T;
  hover: T;
  focus: T;
  invalid: T;
}

export interface ButtonStylesWithState<T = ButtonStyles> {
  default: T;
  hover: T;
  focus: T;
  active: T;
}

export type InputStyles = ColorProperties &
  BorderProperties &
  LayoutProperties &
  FontProperties &
  NonStandardProperties;

// TODO: Make ns property names strictly typed
export interface NonStandardProperties {
  nsLabel: LabelProperties;
  nsPlaceholder: PlaceholderProperties;
}

export type ButtonStyles = ColorProperties &
  BorderProperties &
  LayoutProperties &
  FontProperties;

export const NON_STANDARD_PROPERTY_KEY_SELECTOR_MAP: Record<
  keyof Pick<InputStyles, 'nsLabel' | 'nsPlaceholder'>,
  string
> = {
  nsLabel: 'label',
  nsPlaceholder: 'input::placeholder',
};

export class SpacingProperty<T = number> {
  left!: T;
  right!: T;
  top!: T;
  bottom!: T;
  constructor(left: T, right?: T, top?: T, bottom?: T);
  constructor(left: T, right: T, top: T, bottom: T) {
    if (right === undefined && top === undefined && bottom === undefined) {
      this.setAll(left);
    } else {
      this.left = left;
      this.right = right;
      this.top = top;
      this.bottom = bottom;
    }
  }
  setAll(value: T) {
    this.left = value;
    this.right = value;
    this.top = value;
    this.bottom = value;
  }
}

export interface PlaceholderProperties {
  fontSize: number;
  color: string;
}

export interface LabelProperties {
  fontSize: number;
  color: string;
}

export interface LayoutProperties {
  // TODO: Add support for any string and add validators for sanitizing valid css dimensions
  width: number | '100%';
  height: number;
  padding: SpacingProperty;
}

export interface FontProperties {
  fontSize: number;
  color: string;
}

export interface BorderProperties {
  borderWidth: number;
  borderColor: string;
}

export interface ColorProperties {
  backgroundColor: string;
  color: string;
}

export type KeyOfInputStylesWithState = keyof InputStylesWithState;
export type KeyOfInputStyles = keyof InputStyles;
export type KeyOfButtonStyles = keyof ButtonStyles;
export type NonStandardKeyOfInputStyles = keyof Pick<
  InputStyles,
  'nsLabel' | 'nsPlaceholder'
>;
export type NonStandardValueOfInputStyles = Pick<
  InputStyles,
  'nsLabel' | 'nsPlaceholder'
>[NonStandardKeyOfInputStyles];
export type ValueOfInputStyles = InputStyles[KeyOfInputStyles];
export type ValueOfButtonStyles = ButtonStyles[KeyOfButtonStyles];
export type KeyOfButtonStylesWithState = keyof ButtonStylesWithState;
