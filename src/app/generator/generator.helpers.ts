import { v4 as uuid } from 'uuid';
import { FormField } from '../global-types/config';

export function sanitizeParsedArray(array: Partial<FormField>[]): FormField[] {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.map((item) => {
    return {
      ...item,
      id: uuid(),
      placeholder: item.label || 'Placeholder',
      validationSchema: undefined,
    } as FormField;
  });
}
