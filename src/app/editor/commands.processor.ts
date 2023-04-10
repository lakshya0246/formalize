import { FormConfig, FormField } from '../global-types/config';
import {
  KeyOfButtonStyles,
  KeyOfButtonStylesWithState,
  KeyOfInputStyles,
  KeyOfInputStylesWithState,
  ValueOfButtonStyles,
} from '../global-types/styles';
import { CommandBuilder, EditorCommands } from './commands.types';
import {} from './editor.types';

/**
 * Shies away from deep cloning to avoid unnecessary re-renders
 */
export const processCommand = new CommandBuilder()
  .appendCommand<{
    type: EditorCommands.ADD_FIELD;
    newField: FormField;
  }>()
  .appendCommand<{
    type: EditorCommands.UPDATE_FIELD;
    payload: { fieldIndex: number; field: FormField };
  }>()
  .appendCommand<{
    type: EditorCommands.UPDATE_INPUT_STYLE_FIELD_VALUE;
    payload: {
      inputState: KeyOfInputStylesWithState;
      propertyKey: KeyOfInputStyles;
      value: any;
    };
  }>()
  .appendCommand<{
    type: EditorCommands.REPLACE_FIELDS;
    fields: FormField[];
  }>()
  .appendCommand<{
    type: EditorCommands.UPDATE_BUTTON_STYLE_FIELD_VALUE;
    payload: {
      buttonIndex: number;
      buttonState: KeyOfButtonStylesWithState;
      propertyKey: KeyOfButtonStyles;
      value: ValueOfButtonStyles;
    };
  }>()
  .buildCommandProcessor<FormConfig>((state, command) => {
    switch (command.type) {
      case EditorCommands.ADD_FIELD: {
        return { ...state, fields: [...state.fields, command.newField] };
      }
      case EditorCommands.UPDATE_FIELD: {
        state.fields[command.payload.fieldIndex] = command.payload.field;
        return state;
      }
      case EditorCommands.UPDATE_INPUT_STYLE_FIELD_VALUE: {
        state.styles.input[command.payload.inputState] = {
          ...state.styles.input[command.payload.inputState],
          [command.payload.propertyKey]: command.payload.value,
        };
        return state;
      }
      case EditorCommands.REPLACE_FIELDS: {
        state.fields = command.fields;
        return state;
      }
      case EditorCommands.UPDATE_BUTTON_STYLE_FIELD_VALUE: {
        state.styles.buttons[command.payload.buttonIndex][
          command.payload.buttonState
        ] = {
          ...state.styles.buttons[command.payload.buttonIndex][
            command.payload.buttonState
          ],
          [command.payload.propertyKey]: command.payload.value,
        };
        return state;
      }

      default: {
        return state;
      }
    }
  });
