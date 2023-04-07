import { ButtonType, FormConfig, FormField, FormFields } from '../global-types';
import {
  DimensionalProperty,
  FormStyles,
  LabelProperties,
  PlaceholderProperties,
} from '../global-types/styles';

const CSS_CLASSES = {
  INPUT_CONTAINER: 'input-container',
  BUTTON_BASE: 'button',
  BUTTON_PRIMARY: 'primary',
  BUTTON_CONTAINER: 'button-container',
};

export function convertToHTML(config: FormConfig): string {
  const fields = config.fields.map((field) => {
    return `<div class='${CSS_CLASSES.INPUT_CONTAINER}'>${getInputHtml(
      field
    )}</div>`;
  });

  const buttonHtml = `<div class="${
    CSS_CLASSES.BUTTON_CONTAINER
  }">${config.buttons.reduce(
    (html, button) => html + getButtonHtml(button),
    ''
  )}</div>`;

  const stylesHtml = `<style>
    .${CSS_CLASSES.INPUT_CONTAINER}{${getInputStyles(config.styles.input)}}
  </style>`;

  return `
    ${stylesHtml}
    <form>
      ${fields.join('\n')}
      ${buttonHtml}
    </form>
  `;
}

function getButtonHtml(button: ButtonType): string {
  switch (button.type) {
    case 'submit': {
      return `<button class="${CSS_CLASSES.BUTTON_BASE} ${CSS_CLASSES.BUTTON_PRIMARY}" title="${button.label}" type="submit">${button.label}</button>`;
    }
    default: {
      return `<button class="${CSS_CLASSES.BUTTON_BASE}" title="${button.label}" type="button">${button.label}</button>`;
    }
  }
}

/**
 * @param formField
 * @returns appropriate html for `field.type` default is input of type `text`
 */
function getInputHtml(formField: FormField): string {
  switch (formField.type) {
    case FormFields.SELECT: {
      const options = formField.options.map((option) => {
        return `<option value="${option.value}" >${option.label}</option>`;
      });
      return `<select>${options}</select>`;
    }
    case FormFields.EMAIL: {
      return '<input type="email" />';
    }
    case FormFields.NUMBER: {
      return '<input type="number" />';
    }
    case FormFields.PHONE: {
      return '<input type="tel" />';
    }
    case FormFields.TEXT:
    default: {
      return `<input type='text' />`;
    }
  }
}

const NON_STANDARD_PROPERTY_KEY_MAP: Record<
  keyof PlaceholderProperties | keyof LabelProperties,
  string
> = {
  labelFontColor: 'font-color',
  labelFontSize: 'font-size',
  placeholderFontColor: 'font-color',
  placeholderFontSize: 'font-color',
};

function getInputStyles(styles: FormStyles['input']): string {
  const css = Object.entries(styles.defaultStyles).reduce(
    (stringifiedCSS, [propertyKey, propertyValue]) => {
      const sanitizedPropertyKey = sanitizePropertyKey(propertyKey);
      const sanitizedPropertyValue = sanitizePropertyValue(propertyValue);
      return (
        stringifiedCSS + `\n${sanitizedPropertyKey}:${sanitizedPropertyValue};`
      );
    },
    ''
  );
  return css;
}

export function parseHTML(html: string): FormConfig {
  throw new Error('function not implemented');
}

function sanitizePropertyKey(key: string): string {
  return (NON_STANDARD_PROPERTY_KEY_MAP as any)[key]
    ? (NON_STANDARD_PROPERTY_KEY_MAP as any)[key]
    : convertToKebabCase(key);
}

function sanitizePropertyValue(value: any): string {
  if (typeof value === 'number') {
    return `${value}px`;
  } else if (value instanceof DimensionalProperty) {
    return `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px `;
  }
  return value;
}
function convertToKebabCase(camelCaseString: string) {
  return camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
