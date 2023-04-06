import { PromptTemplate } from './prompt.types';

export const PROMPT_TEMPLATE_1: PromptTemplate = {
  context: `
          export enum FormFields {
              TEXT = 'TEXT',
              SELECT = 'SELECT',
              EMAIL = 'EMAIL',
              NUMBER = 'NUMBER',
              PHONE = 'PHONE',
          }
    `,
  getPrompt: function (prompt) {
    return `
        ${this.context}
        Given this enum, generate an array of type FormField in JSON format for the following fields: ${prompt}
    `;
  },
};
