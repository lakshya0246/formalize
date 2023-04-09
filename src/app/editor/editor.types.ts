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
