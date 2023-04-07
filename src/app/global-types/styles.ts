/**
 * All property values are in `px` unless otherwise stated
 * Any non-standard properties should follow the nomenclature - `ns<Namespace>`.
 * Example - nsPlaceholder
 * This helps in processing such properties predictably
 */
export interface FormStyles {
  borderRadius: number;
  horizontalGap: number;
  verticalGap: number;
  /**
   * Ideally the order should represent the order of buttons in the form,
   * but to be safe each object also has the `id` of the corresponding button object
   */
  buttons: ButtonStylesWithState[];
  input: InputStylesWithState;
}

export interface InputStylesWithState<T = InputStyles> {
  inputId: string;
  defaultStyles: T;
  hoverStyles: T;
  focusStyles: T;
  invalidStyles: T;
  validStyles: T;
}

export interface ButtonStylesWithState<T = ButtonStyles> {
  buttonId: string;
  defaultStyles: T;
  hoverStyles: T;
  focusStyles: T;
  activeStyles: T;
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

export class DimensionalProperty<T = number> {
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
  padding: DimensionalProperty;
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
