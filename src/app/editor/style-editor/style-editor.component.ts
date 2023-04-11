import { Component } from '@angular/core';
import {
  KeyOfButtonStylesWithState,
  KeyOfInputStylesWithState,
} from 'src/app/global-types/styles';
import { EditorCommands } from '../commands.types';
import { EditorConstants } from '../editor-constants.service';
import { EditorService } from '../editor.service';
import { StyleEditorProperty } from '../editor.types';

@Component({
  selector: 'fl-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.scss'],
})
export class StyleEditorComponent {
  activeThemeIndex = 0;
  activeTab: KeyOfInputStylesWithState = 'default';
  activeButtonTabs: Record<number, KeyOfButtonStylesWithState> = {};

  constructor(
    public editorService: EditorService,
    public editorConstants: EditorConstants
  ) {}

  onInputValueChange(propertyKey: StyleEditorProperty['key'], value: any) {
    this.editorService.processCommand({
      type: EditorCommands.UPDATE_INPUT_STYLE_FIELD_VALUE,
      payload: { inputState: this.activeTab, propertyKey, value },
    });
  }

  getActiveButtonTab(buttonIndex: number) {
    return this.activeButtonTabs[buttonIndex] || 'default';
  }
  onChangeTheme(index: number) {
    if (
      index !== this.activeThemeIndex &&
      Boolean(this.editorConstants.THEMES[index])
    ) {
      this.editorService.processCommand({
        type: EditorCommands.CHANGE_CONFIG,
        newConfig: this.editorConstants.THEMES[index],
      });
      this.activeThemeIndex = index;
    }
  }
  onBorderRadiusChange(event: string) {
    this.editorService.processCommand({
      type: EditorCommands.UPDATE_GLOBAL_BORDER_RADIUS,
      borderRadius: +event,
    });
  }

  // TODO: Fix types
  onUnsafeButtonValueChange(propertyKey: any, value: any, buttonIndex: number) {
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
