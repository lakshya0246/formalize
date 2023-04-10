import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorConstants } from './editor-constants.service';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';
import { RestrictInputDirective } from './restrict-input.directive';
import { StyleEditorComponent } from './style-editor/style-editor.component';
import { UnitEditorComponent } from './style-editor/unit-editor/unit-editor.component';
import { ColorEditorComponent } from './style-editor/color-editor/color-editor.component';
import { SpacingEditorComponent } from './style-editor/spacing-editor/spacing-editor.component';
import { SingleStyleEditorComponent } from './style-editor/single-style-editor/single-style-editor.component';
import { FieldEditorComponent } from './field-editor/field-editor.component';
import { FieldEditorDirective } from './field-editor/field-editor.directive';
import { BaseEditorComponent } from './field-editor/base-editor/base-editor.component';
import { SelectEditorComponent } from './field-editor/select-editor/select-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditorComponent,
    StyleEditorComponent,
    UnitEditorComponent,
    RestrictInputDirective,
    ColorEditorComponent,
    SpacingEditorComponent,
    SingleStyleEditorComponent,
    FieldEditorComponent,
    FieldEditorDirective,
    BaseEditorComponent,
    SelectEditorComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [EditorComponent],
  providers: [EditorService, EditorConstants],
})
export class EditorModule {}
