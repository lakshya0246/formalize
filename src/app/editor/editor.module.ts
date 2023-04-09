import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorConstants } from './editor-constants.service';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';
import { RestrictInputDirective } from './restrict-input.directive';
import { StyleEditorComponent } from './style-editor/style-editor.component';
import { UnitEditorComponent } from './style-editor/unit-editor/unit-editor.component';

@NgModule({
  declarations: [
    EditorComponent,
    StyleEditorComponent,
    UnitEditorComponent,
    RestrictInputDirective,
  ],
  imports: [CommonModule],
  exports: [EditorComponent],
  providers: [EditorService, EditorConstants],
})
export class EditorModule {}
