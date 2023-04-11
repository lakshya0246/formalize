import { Component } from '@angular/core';
import { EditorConstants } from '../editor-constants.service';
import { EditorService } from '../editor.service';
import { FormField, FormFields } from 'src/app/global-types/config';
import { EditorCommands } from '../commands.types';
import { v4 as uuid } from 'uuid';

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
  onDeleteField(fieldIndex: number) {
    this.editorService.processCommand({
      type: EditorCommands.REMOVE_FIELD,
      fieldIndex,
    });
  }
  onAddField(type: FormFields) {
    let newField: Partial<FormField> = {
      id: uuid(),
      label: type.toLowerCase(),
      type,
    };
    switch (type) {
      case FormFields.SELECT:
        newField = {
          ...newField,
          type: FormFields.SELECT,
          options: [{ label: 'label', value: 0 }],
        };
        break;
      default:
        break;
    }

    this.editorService.processCommand({
      type: EditorCommands.ADD_FIELD,
      newField: newField as FormField,
    });
  }
}
