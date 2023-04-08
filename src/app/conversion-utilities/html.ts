import { ButtonType, FormConfig, FormField, FormFields } from '../global-types';
import {
  SpacingProperty,
  FormStyles,
  NON_STANDARD_PROPERTY_KEY_SELECTOR_MAP,
} from '../global-types/styles';

const CSS_CLASSES = {
  INPUT_CONTAINER: 'input-container',
  BUTTON_BASE: 'button',
  BUTTON_PRIMARY: 'primary',
  BUTTON_CONTAINER: 'button-container',
};

export function convertToHTML(config: FormConfig): string {
  const fields = config.fields.map((field) => {
    return `<div class='${CSS_CLASSES.INPUT_CONTAINER}'>
    <label>${field.label}</label>
    ${getInputHtml(field)}
    </div>`;
  });

  const buttonHtml = `<div class="${
    CSS_CLASSES.BUTTON_CONTAINER
  }">${config.buttons.reduce(
    (html, button) => html + getButtonHtml(button),
    ''
  )}</div>`;

  const stylesHtml = `<style>
    * {
      box-sizing: border-box;
    }

    form .${CSS_CLASSES.INPUT_CONTAINER} {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
    }
    
    form .${CSS_CLASSES.INPUT_CONTAINER} label {
      margin-bottom: 4px;
    }
    
    .${CSS_CLASSES.INPUT_CONTAINER} > input,
    .${CSS_CLASSES.INPUT_CONTAINER} > select {
      ${getStandardInputCSSProperties(config.styles.input.defaultStyles)};
      border-radius: ${config.styles.borderRadius}px;
    }

    ${getNonStandardInputCSSRules(
      config.styles.input,
      `.${CSS_CLASSES.INPUT_CONTAINER}`
    )}
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
  const placeholder = formField.placeholder || '';
  switch (formField.type) {
    case FormFields.SELECT: {
      const options = formField.options.map((option) => {
        return `<option value="${option.value}" >${option.label}</option>`;
      });
      return `<select>${options}</select>`;
    }
    case FormFields.EMAIL: {
      return `<input type="email" placeholder="${placeholder}" />`;
    }
    case FormFields.NUMBER: {
      return `<input type="number" placeholder="${placeholder}" />`;
    }
    case FormFields.PHONE: {
      return `<input type="tel" placeholder="${placeholder}" />`;
    }
    case FormFields.TEXT:
    default: {
      return `<input type='text' placeholder="${placeholder}"  />`;
    }
  }
}

// TODO: Make this function congruent with the `getNonStandardInputCSSRules`
function getStandardInputCSSProperties(styles: object): string {
  const css = Object.entries(styles).reduce(
    (stringifiedCSS, [propertyKey, propertyValue]) => {
      const sanitizedPropertyKey = sanitizePropertyKey(propertyKey);
      if (isNonStandardPropertyKey(propertyKey)) {
        return stringifiedCSS;
      }
      const sanitizedPropertyValue = sanitizePropertyValue(propertyValue);
      return (
        stringifiedCSS + `\n${sanitizedPropertyKey}:${sanitizedPropertyValue};`
      );
    },
    ''
  );
  return css;
}

function getNonStandardInputCSSRules(
  styles: FormStyles['input'],
  selector: string
): string {
  const rules: Record<string, string> = {};
  Object.entries(styles.defaultStyles).forEach(
    ([propertyKey, propertyValue]) => {
      if (isNonStandardPropertyKey(propertyKey)) {
        const nsSelector = (NON_STANDARD_PROPERTY_KEY_SELECTOR_MAP as any)[
          propertyKey
        ];
        if (!rules[nsSelector]) {
          rules[nsSelector] = '';
        }
        rules[nsSelector] = getStandardInputCSSProperties(propertyValue);
      }
    },
    ''
  );

  return Object.entries(rules).reduce(
    (stringifiedCssRules, [nsSelector, value]) =>
      `${stringifiedCssRules}${selector}>${nsSelector}{${value}} \n`,
    ''
  );
}

export function parseHTML(html: string): FormConfig {
  throw new Error('function not implemented');
}

function isNonStandardPropertyKey(key: string): boolean {
  return Boolean((NON_STANDARD_PROPERTY_KEY_SELECTOR_MAP as any)[key]);
}

function sanitizePropertyKey(key: string): string | false {
  return isNonStandardPropertyKey(key) ? false : convertToKebabCase(key);
}

function sanitizePropertyValue(value: any): string {
  if (typeof value === 'number') {
    return `${value}px`;
  } else if (value instanceof SpacingProperty) {
    return `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px `;
  }
  return value;
}
function convertToKebabCase(camelCaseString: string) {
  return camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
