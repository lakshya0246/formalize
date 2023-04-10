import { Component } from '@angular/core';
import { EditorConstants } from '../editor-constants.service';
import { EditorService } from '../editor.service';
import {
  KeyOfButtonStyles,
  KeyOfButtonStylesWithState,
  KeyOfInputStylesWithState,
} from '../editor.types';
import { EditorCommands } from '../commands.types';
import { InputStyles } from 'src/app/global-types/styles';

@Component({
  selector: 'fl-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.scss'],
})
export class StyleEditorComponent {
  activeTab: KeyOfInputStylesWithState = 'default';
  activeButtonTabs: Record<number, KeyOfButtonStylesWithState> = {};

  constructor(
    public editorService: EditorService,
    public editorConstants: EditorConstants
  ) {}

  onInputValueChange(propertyKey: keyof InputStyles, value: any) {
    this.editorService.processCommand({
      type: EditorCommands.UPDATE_INPUT_STYLE_FIELD_VALUE,
      payload: { inputState: this.activeTab, propertyKey, value },
    });
  }

  getActiveButtonTab(buttonIndex: number) {
    return this.activeButtonTabs[buttonIndex] || 'default';
  }

  onButtonValueChange(propertyKey: any, value: any, buttonIndex: number) {
    this.editorService.processCommand({
      type: EditorCommands.UPDATE_BUTTON_STYLE_FIELD_VALUE,
      payload: {
        buttonState: this.getActiveButtonTab(buttonIndex),
        propertyKey,
        value,
        buttonIndex,
      },
    });
  }

  editorTrackBy(index: number, inputStyleEntry: { key: string; value: any }) {
    return inputStyleEntry.key;
  }
}
