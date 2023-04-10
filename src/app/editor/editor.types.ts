import { EventEmitter } from '@angular/core';
import {
  ButtonStyles,
  ButtonStylesWithState,
  InputStyles,
  InputStylesWithState,
} from '../global-types/styles';

// TODO: Move to `styles.ts`
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

export enum StyleInputs {
  UNIT = 'UNIT',
  SPACING = 'SPACING',
  COLOR = 'COLOR',
}

export interface StyleEditor<T = any> {
  value: T;
  valueChange: EventEmitter<T>;
}
