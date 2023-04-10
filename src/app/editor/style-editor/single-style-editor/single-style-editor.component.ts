import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditorConstants } from '../../editor-constants.service';
import {
  NonStandardInputStyleEditorProperty,
  StyleEditorProperty,
} from '../../editor.types';

@Component({
  selector: 'fl-single-style-editor',
  templateUrl: './single-style-editor.component.html',
  styleUrls: ['./single-style-editor.component.scss'],
})
export class SingleStyleEditorComponent {
  @Input() label!: string;
  @Input() styleProperty!: StyleEditorProperty;

  @Output() valueChange = new EventEmitter<StyleEditorProperty>();

  constructor(public editorConstants: EditorConstants) {}

  onValueChange(
    key: StyleEditorProperty['key'],
    value: StyleEditorProperty['value'],
    nonStandardParentStyleProperty?: NonStandardInputStyleEditorProperty
  ) {
    if (nonStandardParentStyleProperty) {
      const newStylePropertyValue = {
        ...nonStandardParentStyleProperty.value,
        [key]: value,
      };
      this.valueChange.emit({
        key: nonStandardParentStyleProperty.key,
        value: newStylePropertyValue,
      });
    } else {
      this.valueChange.emit({ key, value });
    }
  }

  editorTrackBy(index: number, inputStyleEntry: { key: string; value: any }) {
    return inputStyleEntry.key;
  }

  // TODO: Find a better solution
  assertAsNonStandardInputStyleEntry(value: any) {
    return value as NonStandardInputStyleEditorProperty;
  }
}
