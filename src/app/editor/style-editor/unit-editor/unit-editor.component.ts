import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Editor } from '../../editor.types';

@Component({
  selector: 'fl-unit-editor',
  templateUrl: './unit-editor.component.html',
  styleUrls: ['./unit-editor.component.scss'],
})
export class UnitEditorComponent implements Editor<number> {
  @Input() value!: any;
  @Output() valueChange = new EventEmitter<number>();

  onSafeChange(event: string) {
    this.valueChange.emit(Number(event));
  }
}
