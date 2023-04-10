import { v4 as uuid } from 'uuid';
import { FormField, SelectOption } from '../global-types/config';

export function sanitizeParsedFormFieldArray(
  array: Partial<FormField>[]
): FormField[] {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.map((item) => {
    return {
      ...item,
      id: uuid(),
      placeholder: item.label || 'Placeholder',
    } as FormField;
  });
}

export function sanitizeParsedSelectOptionArray(
  array: Partial<SelectOption>[]
): SelectOption[] {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.map((item) => {
    return {
      ...item,
      label: item.label || 'Label',
      value: item.value || uuid(),
    } as SelectOption;
  });
}
