/**
 * All property values are in `px` unless otherwise stated
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
  LabelProperties &
  PlaceholderProperties;

export type ButtonStyles = ColorProperties &
  BorderProperties &
  LayoutProperties &
  FontProperties;

export class DimensionalProperty<T = number> {
  left: T;
  right: T;
  top: T;
  bottom: T;
  constructor(left: T, right: T, top: T, bottom: T) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }
  setAll(value: T) {
    this.left = value;
    this.right = value;
    this.top = value;
    this.bottom = value;
  }
}

export interface PlaceholderProperties {
  placeholderFontSize: number;
  placeholderFontColor: string;
}

export interface LabelProperties {
  labelFontSize: number;
  labelFontColor: string;
}

export interface LayoutProperties {
  isBlock?: boolean;
  height: number;
  padding: DimensionalProperty;
}

export interface FontProperties {
  fontSize: number;
  fontColor: string;
}

export interface BorderProperties {
  borderWidth: number;
  borderColor: string;
}

export interface ColorProperties {
  backgroundColor: string;
  textColor: string;
}
