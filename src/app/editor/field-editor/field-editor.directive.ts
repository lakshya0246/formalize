import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  EmailField,
  FormField,
  FormFields,
  NumberField,
  PhoneField,
  TextField,
} from 'src/app/global-types/config';
import { BaseEditorComponent } from './base-editor/base-editor.component';
import { SelectEditorComponent } from './select-editor/select-editor.component';

@Directive({
  selector: '[flFieldEditor]',
})
export class FieldEditorDirective implements OnInit, OnDestroy {
  @Input('flFieldEditor') field!: FormField;
  @Output('valueChange') valueChanges = new EventEmitter<FormField>();
  valueChangeSubscription: Subscription | undefined;
  constructor(public viewContainerRef: ViewContainerRef) {}

  ngOnDestroy(): void {
    this.valueChangeSubscription?.unsubscribe?.();
  }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    if (this.field) {
      let componentRef;
      switch (this.field.type) {
        case FormFields.SELECT:
          {
            componentRef = this.viewContainerRef.createComponent(
              SelectEditorComponent
            );
            componentRef.instance.value = this.field;
          }
          break;
        case FormFields.EMAIL:
          {
            componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<EmailField>
            );
            componentRef.instance.value = this.field;
          }
          break;
        case FormFields.NUMBER:
          {
            componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<NumberField>
            );
            componentRef.instance.value = this.field;
          }
          break;

        case FormFields.PHONE:
          {
            componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<PhoneField>
            );
            componentRef.instance.value = this.field;
          }
          break;

        case FormFields.TEXT:
        default:
          {
            componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<TextField>
            );
            componentRef.instance.value = this.field;
          }
          break;
      }
      this.valueChangeSubscription =
        componentRef.instance.valueChange.subscribe((value) =>
          this.valueChanges.emit(value)
        );
    }
  }
}
