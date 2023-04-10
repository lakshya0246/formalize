import { Injectable } from '@angular/core';
import {
  BUTTON_STATES,
  INPUT_STATES,
  STYLE_FIELD_INPUT_MAP,
} from './editor.constants';
import { StyleInputs } from './editor.types';

@Injectable()
export class EditorConstants {
  readonly INPUT_STATES = INPUT_STATES;
  readonly BUTTON_STATES = BUTTON_STATES;
  readonly STYLE_FIELD_INPUT_MAP = STYLE_FIELD_INPUT_MAP;
  readonly STYLE_INPUTS = StyleInputs;
  constructor() {}
}
