import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CONFIG_TEMPLATE_A } from '../templates';
import { BUTTON_STATES } from './editor.constants';
import { EditorService } from './editor.service';
import { KeyOfButtonStylesWithState } from './editor.types';

@Component({
  selector: 'fl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  readonly BUTTON_STATES = BUTTON_STATES;
  activeButtonTab: KeyOfButtonStylesWithState = 'default';
  CONFIG_TEMPLATE_A = CONFIG_TEMPLATE_A;

  html: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    public editorService: EditorService
  ) {}
}
