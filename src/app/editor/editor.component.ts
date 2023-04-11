import { Component } from '@angular/core';
import { GeneratorService } from '../generator/generator.service';
import { FailureResponse } from '../generator/generator.types';
import { EditorCommands } from './commands.types';
import { EditorService } from './editor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  isGenerating = false;
  generatorPrompt: string = '';

  constructor(
    public editorService: EditorService,
    private generatorService: GeneratorService,
    private snackBar: MatSnackBar
  ) {}

  onGeneratePromptClick() {
    if (Boolean(this.generatorPrompt)) {
      this.isGenerating = true;
      this.generatorService
        .generateFormConfig(this.generatorPrompt)
        .then((response) => {
          if (response instanceof FailureResponse) {
            this.snackBar.open(response.getHumanizedErrorMessage(), 'DISMISS');
          } else {
            this.editorService.processCommand({
              type: EditorCommands.REPLACE_FIELDS,
              fields: response,
            });
          }
        })
        .finally(() => (this.isGenerating = false));
    }
  }
}
