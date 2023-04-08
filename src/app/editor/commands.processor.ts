import { FormConfig, FormField } from '../global-types';
import { CommandBuilder, EditorCommands } from './commands.types';

/**
 * Shies away from deep cloning to avoid unnecessary re-renders
 */
export const processCommand = new CommandBuilder()
  .appendCommand<{
    type: EditorCommands.ADD_FIELD;
    newField: FormField;
  }>()
  .buildCommandProcessor<FormConfig>((state, command) => {
    switch (command.type) {
      case EditorCommands.ADD_FIELD: {
        return { ...state, fields: [...state.fields, command.newField] };
      }

      default: {
        return state;
      }
    }
  });
