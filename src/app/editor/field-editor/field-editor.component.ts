import { Component } from '@angular/core';
import { EditorConstants } from '../editor-constants.service';
import { EditorService } from '../editor.service';
import { FormField } from 'src/app/global-types/config';
import { EditorCommands } from '../commands.types';

@Component({
  selector: 'fl-field-editor',
  templateUrl: './field-editor.component.html',
  styleUrls: ['./field-editor.component.scss'],
})
export class FieldEditorComponent {
  constructor(
    public editorService: EditorService,
    public editorConstants: EditorConstants
  ) {}

  editorTrackBy(index: number, fieldEntry: FormField) {
    return fieldEntry.id;
  }

  onValueChanges(field: FormField, fieldIndex: number) {
    this.editorService.processCommand({
      type: EditorCommands.UPDATE_FIELD,
      payload: { field, fieldIndex },
    });
  }
}
