import { EventEmitter } from '@angular/core';
import {
  ButtonStylesWithState,
  InputStylesWithState,
} from '../global-types/styles';

export type KeyOfInputStylesWithState = keyof InputStylesWithState;
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
