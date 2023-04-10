import { PromptTemplate } from './prompt.types';

export const PROMPT_TEMPLATE_1: PromptTemplate = {
  context: `
          enum FormFields {
              TEXT = 'TEXT',
              SELECT = 'SELECT',
              EMAIL = 'EMAIL',
              NUMBER = 'NUMBER',
              PHONE = 'PHONE',
          }
           interface FormField {
            type: FormFields;
            label: string;
            }
            
            interface SelectField extends FormField {
              type: FormFields.SELECT;
              options: {label: string; value: number | string}[];
            }
    `,
  getPrompt: function (prompt) {
    return `
        ${this.context}
        Given this enum, generate an array of type FormField in JSON format for the following fields: ${prompt}.
    `;
  },
};

export const PROMPT_TEMPLATE_2: PromptTemplate = {
  context: `
        type SelectOption = {label: string; value: number | string}[];
    `,
  getPrompt: function (prompt) {
    return `
        ${this.context}
        Generate an array of type SelectOption in JSON format with the following instructions: ${prompt}.
    `;
  },
};
