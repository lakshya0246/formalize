import {
  InputStyles,
  KeyOfButtonStylesWithState,
  KeyOfInputStylesWithState,
} from '../global-types/styles';
import { StyleInputs } from './editor.types';

export const INPUT_STATES: Array<KeyOfInputStylesWithState> = [
  'default',
  'focus',
  'hover',
  'valid',
  'invalid',
];

export const BUTTON_STATES: Array<KeyOfButtonStylesWithState> = [
  'default',
  'hover',
  'focus',
  'active',
];

export const STYLE_FIELD_INPUT_MAP: Record<
  keyof InputStyles,
  StyleInputs | false
> = {
  width: StyleInputs.UNIT,
  backgroundColor: StyleInputs.COLOR,
  color: StyleInputs.COLOR,
  borderWidth: StyleInputs.UNIT,
  borderColor: StyleInputs.COLOR,
  fontSize: StyleInputs.UNIT,
  height: StyleInputs.UNIT,
  padding: StyleInputs.SPACING,
  nsLabel: false,
  nsPlaceholder: false,
};
