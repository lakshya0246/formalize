import { Component } from '@angular/core';
import { GeneratorService } from '../generator/generator.service';
import { FailureResponse } from '../generator/generator.types';
import { EditorCommands } from './commands.types';
import { EditorService } from './editor.service';

@Component({
  selector: 'fl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  generatorPrompt: string = '';

  constructor(
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
