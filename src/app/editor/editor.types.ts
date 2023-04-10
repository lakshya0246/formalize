import { EventEmitter } from '@angular/core';
import {
  KeyOfButtonStyles,
  KeyOfInputStyles,
  NonStandardKeyOfInputStyles,
  NonStandardValueOfInputStyles,
  ValueOfButtonStyles,
  ValueOfInputStyles,
} from '../global-types/styles';

export enum StyleInputs {
  UNIT = 'UNIT',
  SPACING = 'SPACING',
  COLOR = 'COLOR',
}

export interface Editor<T = any> {
  value: T;
  valueChange: EventEmitter<T>;
}

export type InputStyleEditorProperty = {
  key: KeyOfInputStyles;
  value: ValueOfInputStyles;
};

export type NonStandardInputStyleEditorProperty = {
  key: NonStandardKeyOfInputStyles;
  value: NonStandardValueOfInputStyles;
};

export type ButtonStyleEditorProperty = {
  key: KeyOfButtonStyles;
  value: ValueOfButtonStyles;
};

export type StyleEditorProperty =
  | InputStyleEditorProperty
  | ButtonStyleEditorProperty;
