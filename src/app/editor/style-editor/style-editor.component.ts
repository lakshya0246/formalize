import { Component } from '@angular/core';
import { EditorConstants } from '../editor-constants.service';
import { EditorService } from '../editor.service';
import { KeyOfInputStylesWithState } from '../editor.types';
import { EditorCommands } from '../commands.types';
import { InputStyles } from 'src/app/global-types/styles';

@Component({
  selector: 'fl-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.scss'],
})
export class StyleEditorComponent {
  activeTab: KeyOfInputStylesWithState = 'default';

  constructor(
    public editorService: EditorService,
    public editorConstants: EditorConstants
  ) {}

  onInputValueChange(propertyKey: keyof InputStyles, value: any) {
    this.editorService.processCommand({
      type: EditorCommands.UPDATE_STYLE_FIELD_VALUE,
      payload: { inputState: this.activeTab, propertyKey, value },
    });
  }

  editorTrackBy(index: number, inputStyleEntry: { key: string; value: any }) {
    return inputStyleEntry.key;
  }
}
