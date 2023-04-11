import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorConstants } from './editor-constants.service';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';
import { BaseEditorComponent } from './field-editor/base-editor/base-editor.component';
import { FieldEditorComponent } from './field-editor/field-editor.component';
import { FieldEditorDirective } from './field-editor/field-editor.directive';
import { SelectEditorComponent } from './field-editor/select-editor/select-editor.component';
import { RestrictInputDirective } from './restrict-input.directive';
import { ColorEditorComponent } from './style-editor/color-editor/color-editor.component';
import { SingleStyleEditorComponent } from './style-editor/single-style-editor/single-style-editor.component';
import { SpacingEditorComponent } from './style-editor/spacing-editor/spacing-editor.component';
import { StyleEditorComponent } from './style-editor/style-editor.component';
import { UnitEditorComponent } from './style-editor/unit-editor/unit-editor.component';
import { ButtonLoaderDirective } from './button-loader.directive';
import { CdkMenuModule } from '@angular/cdk/menu';

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
    ButtonLoaderDirective,
  ],
  imports: [CommonModule, FormsModule, CdkMenuModule],
  exports: [EditorComponent],
  providers: [EditorService, EditorConstants],
})
export class EditorModule {}
