import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, map } from 'rxjs';
import { convertToHTML } from '../conversion-utilities/html';
import { EditorService } from './editor.service';
import { GeneratorService } from '../generator/generator.service';
import { FailureResponse } from '../generator/generator.types';
import { EditorCommands } from './commands.types';

@Component({
  selector: 'fl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
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
    console.log(this.generatorPrompt);
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
