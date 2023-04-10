import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { CodePreviewComponent } from './code-preview/code-preview.component';

@NgModule({
  declarations: [PreviewComponent, CodePreviewComponent],
  imports: [CommonModule],
  exports: [PreviewComponent],
})
export class PreviewModule {}
