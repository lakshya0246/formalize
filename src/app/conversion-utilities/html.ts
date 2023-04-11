import { BUTTON_STATES, INPUT_STATES } from '../editor/editor.constants';
import {
  ButtonType,
  FormConfig,
  FormField,
  FormFields,
} from '../global-types/config';
import {
  FormStyles,
  KeyOfInputStylesWithState,
  NON_STANDARD_PROPERTY_KEY_SELECTOR_MAP,
  SpacingProperty,
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
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

    * {
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
    }

    form .${CSS_CLASSES.INPUT_CONTAINER} {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
    }
    
    .${CSS_CLASSES.INPUT_CONTAINER} label {
      margin-bottom: 4px;
    }

    input, select {
      cursor: pointer;
      background: white;
      outline: none;
      border-style: solid;
    }

    .${CSS_CLASSES.BUTTON_CONTAINER}{
      display: flex;
      flex-direction:column;
    }
    .${CSS_CLASSES.BUTTON_CONTAINER} > *{
      margin-top: 8px;
    }
    .${CSS_CLASSES.BUTTON_BASE}{
        cursor: pointer;
        appearance: none;
        outline: none;
        border: hidden;
    }

    
    ${getInputCSS(config)}
    ${getButtonCSS(config)}

  
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

function getButtonCSS(config: FormConfig) {
  const css = BUTTON_STATES.reduce((css, state) => {
    const stateSelector = state === 'default' ? '' : `:${state}`;
    // TODO: Add support for n number of buttons
    return (
      css +
      `
    .${CSS_CLASSES.BUTTON_BASE}${stateSelector}{
      ${getStandardCSSProperties(config.styles.buttons[1][state])}
      border-radius: ${config.styles.borderRadius}px;
    }
    .${CSS_CLASSES.BUTTON_BASE}.${CSS_CLASSES.BUTTON_PRIMARY}${stateSelector}{
      ${getStandardCSSProperties(config.styles.buttons[0][state])}
      border-radius: ${config.styles.borderRadius}px;
    }
`
    );
  }, '');
  return css;
}

function getInputCSS(config: FormConfig) {
  const css = INPUT_STATES.reduce((css, state) => {
    const stateSelector = state === 'default' ? '' : `:${state}`;
    return (
      css +
      `.${CSS_CLASSES.INPUT_CONTAINER} > input${stateSelector},
    .${CSS_CLASSES.INPUT_CONTAINER} > select${stateSelector} {
      ${getStandardCSSProperties(config.styles.input[state])};
      border-radius: ${config.styles.borderRadius}px;
    }
    .${CSS_CLASSES.INPUT_CONTAINER} > select${stateSelector} {
      padding-top: 0;
      padding-bottom: 0;
    }
    ${getNonStandardCSSRules(
      config.styles.input,
      `.${CSS_CLASSES.INPUT_CONTAINER}${stateSelector}`,
      state
    )}
  `
    );
  }, '');
  return css;
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
function getStandardCSSProperties(styles: object): string {
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

function getNonStandardCSSRules(
  styles: FormStyles['input'],
  selector: string,
  state: KeyOfInputStylesWithState
): string {
  const rules: Record<string, string> = {};
  Object.entries(styles[state]).forEach(([propertyKey, propertyValue]) => {
    if (isNonStandardPropertyKey(propertyKey)) {
      const nsSelector = (NON_STANDARD_PROPERTY_KEY_SELECTOR_MAP as any)[
        propertyKey
      ];
      if (!rules[nsSelector]) {
        rules[nsSelector] = '';
      }
      rules[nsSelector] = getStandardCSSProperties(propertyValue);
    }
  }, '');

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
