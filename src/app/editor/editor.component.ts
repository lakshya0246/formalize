import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, map } from 'rxjs';
import { convertToHTML } from '../conversion-utilities/html';
import { GeneratorService } from '../generator/generator.service';
import { FailureResponse } from '../generator/generator.types';
import { EditorCommands } from './commands.types';
import { EditorService } from './editor.service';
import { PreviewTab } from './editor.types';

@Component({
  selector: 'fl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  previewTabs: PreviewTab[] = ['preview', 'code'];
  activePreviewTab: PreviewTab = 'preview';
  generatorPrompt: string = '';
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
    public editorService: EditorService,
    private generatorService: GeneratorService
  ) {}

  onGeneratePromptClick() {
    if (Boolean(this.generatorPrompt)) {
      this.generatorService
        .generateFormConfig(this.generatorPrompt)
        .then((response) => {
          if (response instanceof FailureResponse) {
            console.log(response.getHumanizedErrorMessage());
          } else {
            this.editorService.processCommand({
              type: EditorCommands.REPLACE_FIELDS,
              fields: response,
            });
          }
        });
    }
  }
}
