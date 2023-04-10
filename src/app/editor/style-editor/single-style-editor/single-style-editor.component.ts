import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditorConstants } from '../../editor-constants.service';
import {
  KeyOfInputStyles,
  NonStandardKeyOfInputStyles,
  NonStandardValueOfInputStyles,
  ValueOfInputStyles,
} from '../../editor.types';

@Component({
  selector: 'fl-single-style-editor',
  templateUrl: './single-style-editor.component.html',
  styleUrls: ['./single-style-editor.component.scss'],
})
export class SingleStyleEditorComponent {
  @Input() styleProperty!: {
    key: KeyOfInputStyles;
    value: ValueOfInputStyles;
  };

  @Output() valueChange = new EventEmitter<{
    propertyKey: KeyOfInputStyles;
    value: ValueOfInputStyles;
  }>();

  constructor(public editorConstants: EditorConstants) {}

  onInputValueChange(
    propertyKey: KeyOfInputStyles,
    value: ValueOfInputStyles,
    nonStandardParentStyleProperty?: ReturnType<
      typeof this.assertAsNonStandardInputStyleEntry
    >
  ) {
    if (nonStandardParentStyleProperty) {
      const newStylePropertyValue = {
        ...nonStandardParentStyleProperty.value,
        [propertyKey]: value,
      };
      this.valueChange.emit({
        propertyKey: nonStandardParentStyleProperty.key,
        value: newStylePropertyValue,
      });
    } else {
      this.valueChange.emit({ propertyKey, value });
    }
  }

  editorTrackBy(index: number, inputStyleEntry: { key: string; value: any }) {
    return inputStyleEntry.key;
  }

  // TODO: Find a better solution
  assertAsNonStandardInputStyleEntry(value: any) {
    return value as {
      key: NonStandardKeyOfInputStyles;
      value: NonStandardValueOfInputStyles;
    };
  }
}
