import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, startWith } from 'rxjs';
import { CONFIG_TEMPLATE_A } from '../templates';
import { FormConfig } from '../global-types/config';
import { processCommand } from './commands.processor';

@Injectable()
export class EditorService {
  private readonly formConfigSubject = new BehaviorSubject<FormConfig>(
    CONFIG_TEMPLATE_A
  );
  public formConfig$ = this.formConfigSubject
    .asObservable()
    .pipe(startWith(CONFIG_TEMPLATE_A));

  constructor() {}

  processCommand(command: Parameters<typeof processCommand>['1']) {
    const newConfig = processCommand(
      this.formConfigSubject.getValue(),
      command
    );
    this.formConfigSubject.next(newConfig);
  }
}
