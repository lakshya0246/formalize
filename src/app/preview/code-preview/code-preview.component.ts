import { Component, Input } from '@angular/core';
import * as Prism from 'prismjs';
@Component({
  selector: 'fl-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.scss'],
})
export class CodePreviewComponent {
  @Input()
  public get code(): string {
    return this._code;
  }
  private _code: string = '';
  public set code(value: string) {
    this._code = Prism.highlight(value, Prism.languages['html'], 'html');
  }
}
