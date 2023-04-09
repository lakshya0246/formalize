import { FormConfig, FormField } from '../global-types';
import { InputStyles } from '../global-types/styles';
import { CommandBuilder, EditorCommands } from './commands.types';
import { KeyOfInputStylesWithState } from './editor.types';

/**
 * Shies away from deep cloning to avoid unnecessary re-renders
 */
export const processCommand = new CommandBuilder()
  .appendCommand<{
    type: EditorCommands.ADD_FIELD;
    newField: FormField;
  }>()
  .appendCommand<{
    type: EditorCommands.ADD_FIELD;
    newField: FormField;
  }>()
  .appendCommand<{
    type: EditorCommands.UPDATE_STYLE_FIELD_VALUE;
    payload: {
      inputState: KeyOfInputStylesWithState;
      propertyKey: keyof InputStyles;
      value: any;
    };
  }>()
  .buildCommandProcessor<FormConfig>((state, command) => {
    switch (command.type) {
      case EditorCommands.ADD_FIELD: {
        return { ...state, fields: [...state.fields, command.newField] };
      }
      case EditorCommands.UPDATE_STYLE_FIELD_VALUE: {
        state.styles.input[command.payload.inputState] = {
          ...state.styles.input[command.payload.inputState],
          [command.payload.propertyKey]: command.payload.value,
        };
        return state;
      }

      default: {
        return state;
      }
    }
  });
