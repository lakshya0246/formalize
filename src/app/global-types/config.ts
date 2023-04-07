import { FormStyles } from './styles';

export interface FormConfig {
  fields: FormField[];
  buttons: ButtonType[];
  styles: FormStyles;
}

export enum FormFields {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  EMAIL = 'EMAIL',
  NUMBER = 'NUMBER',
  PHONE = 'PHONE',
}

export type FormField =
  | TextField
  | SelectField
  | EmailField
  | NumberField
  | PhoneField;

export interface BaseFormField {
  id: string;
  label: string;
  type: FormFields;
  validationSchema: any;
  placeholder?: string;
}

export interface TextField extends BaseFormField {
  type: FormFields.TEXT;
}

export interface SelectField extends BaseFormField {
  type: FormFields.SELECT;
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: number | string;
}

export interface EmailField extends BaseFormField {
  type: FormFields.EMAIL;
}

export interface NumberField extends BaseFormField {
  type: FormFields.NUMBER;
}

export interface PhoneField extends BaseFormField {
  type: FormFields.PHONE;
}

export interface ButtonType {
  id: string;
  label: string;
  type: 'submit' | 'button';
  onClick?: (buttonConfig: ButtonType, event: MouseEvent) => void;
}
