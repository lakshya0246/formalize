import {
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
export class FieldEditorDirective implements OnInit, OnDestroy, OnChanges {
  @Input('flFieldEditor') field!: FormField;
  @Output('valueChange') valueChanges = new EventEmitter<FormField>();
  @Output('delete') delete = new EventEmitter();
  subscriptions: Subscription | undefined;
  componentRef!: ComponentRef<BaseEditorComponent<any>>;
  constructor(public viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.componentRef) {
      if (changes['field']?.currentValue !== changes['field']?.previousValue)
        this.componentRef.instance.value = this.field;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe?.();
  }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    if (this.field) {
      switch (this.field.type) {
        case FormFields.SELECT:
          {
            this.componentRef = this.viewContainerRef.createComponent(
              SelectEditorComponent
            );
            this.componentRef.instance.value = this.field;
          }
          break;
        case FormFields.EMAIL:
          {
            this.componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<EmailField>
            );
            this.componentRef.instance.value = this.field;
          }
          break;
        case FormFields.NUMBER:
          {
            this.componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<NumberField>
            );
            this.componentRef.instance.value = this.field;
          }
          break;

        case FormFields.PHONE:
          {
            this.componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<PhoneField>
            );
            this.componentRef.instance.value = this.field;
          }
          break;

        case FormFields.TEXT:
        default:
          {
            this.componentRef = this.viewContainerRef.createComponent(
              BaseEditorComponent<TextField>
            );
            this.componentRef.instance.value = this.field;
          }
          break;
      }
      const valueChangeSubscription =
        this.componentRef.instance.valueChange.subscribe((value) =>
          this.valueChanges.emit(value)
        );
      const deleteSubscription = this.componentRef.instance.delete.subscribe(
        () => this.delete.emit()
      );
      this.subscriptions?.add(valueChangeSubscription);
      this.subscriptions?.add(deleteSubscription);
    }
  }
}
