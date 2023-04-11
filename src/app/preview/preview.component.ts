import { Component } from '@angular/core';
import { PreviewTab } from './preview.types';
import { debounceTime, map } from 'rxjs';
import { EditorService } from '../editor/editor.service';
import { DomSanitizer } from '@angular/platform-browser';
import { convertToHTML } from '../conversion-utilities/html';

@Component({
  selector: 'fl-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  previewTabs: PreviewTab[] = ['preview', 'code'];
  activePreviewTab: PreviewTab = 'preview';
  previewHtml$ = this.editorService.formConfig$.pipe(
    debounceTime(300),
    map((formConfig) => {
      const raw = convertToHTML(formConfig);
      return {
        sanitized: this.sanitizer.bypassSecurityTrustHtml(raw),
        raw,
      };
    })
  );

  constructor(
    private sanitizer: DomSanitizer,
    public editorService: EditorService
  ) {}
}
