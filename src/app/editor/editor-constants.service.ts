import { Injectable } from '@angular/core';
import {
  BUTTON_STATES,
  INPUT_STATES,
  STYLE_FIELD_INPUT_MAP,
  THEMES,
} from './editor.constants';
import { StyleInputs } from './editor.types';
import { FormFields } from '../global-types/config';

@Injectable()
export class EditorConstants {
  readonly INPUT_STATES = INPUT_STATES;
  readonly FORM_FIELDS = FormFields;
  readonly BUTTON_STATES = BUTTON_STATES;
  readonly STYLE_FIELD_INPUT_MAP = STYLE_FIELD_INPUT_MAP;
  readonly STYLE_INPUTS = StyleInputs;
  readonly THEMES = THEMES;
  constructor() {}
}
