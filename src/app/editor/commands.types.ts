export enum EditorCommands {
  DEFAULT = 'DEFAULT',
  REPLACE_FIELDS = 'REPLACE_FIELDS',
  ADD_FIELD = 'ADD_FIELD',
  REMOVE_FIELD = 'REMOVE_FIELD',
  UPDATE_FIELD = 'UPDATE_FIELD',
  UPDATE_INPUT_STYLE_FIELD_VALUE = 'UPDATE_INPUT_STYLE_FIELD_VALUE',
  UPDATE_BUTTON_STYLE_FIELD_VALUE = 'UPDATE_BUTTON_STYLE_FIELD_VALUE',
  UPDATE_GLOBAL_BORDER_RADIUS = 'UPDATE_GLOBAL_BORDER_RADIUS',
  CHANGE_CONFIG = 'CHANGE_CONFIG',
}

/**
 * Builds a typesafe command processor while alowing the possiblity of distributing
 * the commands to different files by sharing a common CommandBuilder instance across the project
 */
export class CommandBuilder<T = { type: EditorCommands.DEFAULT }> {
  constructor() {}

  appendCommand<U>() {
    return new CommandBuilder<T | U>();
  }

  /**
   * @returns the `processor` cast to the appended (union of) commands
   */
  buildCommandProcessor<S>(processor: (state: S, command: T) => S) {
    return function (state: S, action: T) {
      return processor(state, action);
    };
  }
}
