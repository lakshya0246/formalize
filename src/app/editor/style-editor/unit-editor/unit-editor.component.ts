import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'fl-unit-editor',
  templateUrl: './unit-editor.component.html',
  styleUrls: ['./unit-editor.component.scss'],
})
export class UnitEditorComponent {
  @Input() value!: any;

  @Output() valueChange = new EventEmitter<number>();
  onSafeChange(event: string) {
    console.log({ event });
    this.valueChange.emit(Number(event));
  }
}
