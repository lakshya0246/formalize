import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Editor } from '../../editor.types';

@Component({
  selector: 'fl-color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.scss'],
})
export class ColorEditorComponent implements Editor<string> {
  @Input() value!: any;
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
