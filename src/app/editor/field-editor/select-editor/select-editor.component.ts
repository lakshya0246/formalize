import { Component } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';
import { SelectField, SelectOption } from 'src/app/global-types/config';

@Component({
  selector: 'fl-select-editor',
  templateUrl: './select-editor.component.html',
  styleUrls: ['./select-editor.component.scss'],
})
export class SelectEditorComponent extends BaseEditorComponent<SelectField> {
  onOptionPropertyChange(
    key: keyof SelectOption,
    optionIndex: number,
    event: Event
  ) {
    const newOptions = [...this.value.options];
    newOptions[optionIndex] = {
      ...newOptions[optionIndex],
      [key]: (event.target as HTMLInputElement).value,
    };
    this.valueChange.emit({
      ...this.value,
      options: newOptions,
    });
  }
}
