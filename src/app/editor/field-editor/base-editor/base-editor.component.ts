import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseFormField } from 'src/app/global-types/config';
import { Editor } from '../../editor.types';

@Component({
  selector: 'fl-text-editor',
  templateUrl: './base-editor.component.html',
  styleUrls: ['./base-editor.component.scss'],
})
export class BaseEditorComponent<T extends BaseFormField> implements Editor<T> {
  @Input() value!: T;
  @Output() valueChange = new EventEmitter<T>();

  onTextualPropertyChange(key: keyof T, event: Event) {
    this.valueChange.emit({
      ...this.value,
      [key]: (event.target as HTMLInputElement).value,
    });
  }
}
