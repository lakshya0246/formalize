import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormConfig } from '../global-types/config';
import { EditorService } from './editor.service';
import { convertToHTML } from '../conversion-utilities/html';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'fl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  previewHtml$ = this.editorService.formConfig$.pipe(
    debounceTime(500),
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
