import { Component } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';
import { SelectField, SelectOption } from 'src/app/global-types/config';
import { GeneratorService } from 'src/app/generator/generator.service';
import { FailureResponse } from 'src/app/generator/generator.types';

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
  constructor(private generatorService: GeneratorService) {
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
            console.log(response.getHumanizedErrorMessage());
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
}
