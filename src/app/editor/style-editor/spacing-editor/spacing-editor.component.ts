import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Editor } from '../../editor.types';
import { SpacingProperty } from 'src/app/global-types/styles';

@Component({
  selector: 'fl-spacing-editor',
  templateUrl: './spacing-editor.component.html',
  styleUrls: ['./spacing-editor.component.scss'],
})
export class SpacingEditorComponent implements Editor<SpacingProperty> {
  // TODO: Add check for verifying if instance of SpacingProperty
  @Input() propertyName: string = '';
  @Input() value!: any;
  @Output() valueChange = new EventEmitter<SpacingProperty>();
  readonly INPUTS: Array<keyof SpacingProperty> = [
    'top',
    'right',
    'bottom',
    'left',
  ];
  onSafeChange(property: keyof SpacingProperty, value: string) {
    if (this.value instanceof SpacingProperty) {
      this.value[property] = Number(value);
      this.valueChange.emit(this.value);
    }
  }
}
