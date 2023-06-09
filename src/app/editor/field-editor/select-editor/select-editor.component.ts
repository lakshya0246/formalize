import { Component } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';
import { SelectField, SelectOption } from 'src/app/global-types/config';
import { GeneratorService } from 'src/app/generator/generator.service';
import { FailureResponse } from 'src/app/generator/generator.types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fl-select-editor',
  templateUrl: './select-editor.component.html',
  styleUrls: [
    './select-editor.component.scss',
    '../field-editor.common-styles.scss',
  ],
})
export class SelectEditorComponent extends BaseEditorComponent<SelectField> {
  isGenerating = false;
  generateOptionsPrompt: string = '';
  constructor(
    private generatorService: GeneratorService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  optionTrackBy(index: number) {
    return index;
  }

  onGenerateOptionsClick() {
    if (this.generateOptionsPrompt) {
      this.isGenerating = true;
      this.generatorService
        .generateSelectOptions(this.generateOptionsPrompt)
        .then((response) => {
          if (response instanceof FailureResponse) {
            this.snackBar.open(response.getHumanizedErrorMessage(), 'DISMISS');
          } else {
            this.valueChange.emit({
              ...this.value,
              options: response,
            });
          }
        })
        .finally(() => (this.isGenerating = false));
    }
  }

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

  onDeleteOption(optionIndex: number) {
    this.value.options.splice(optionIndex, 1);
    this.valueChange.emit({
      ...this.value,
      options: [...this.value.options],
    });
  }

  onAddOption() {
    const newOption: SelectOption = { label: 'label', value: '0' };
    this.valueChange.emit({
      ...this.value,
      options: [...this.value.options, newOption],
    });
  }
}
