import { Injectable } from '@angular/core';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { UserFacingErrorTypes } from '../global-types/errors';
import { FailureResponse } from './generator.types';
import { PromptTemplate } from './prompt.types';
import { PROMPT_TEMPLATE_1 } from './prompts.constants';
import { sanitizeParsedArray } from './generator.helpers';
import { FormField } from '../global-types/config';

// TODO: add generation for validation of a particular field
// TODO: add generation for generation of select options

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  private openai = new OpenAIApi(
    new Configuration({
      apiKey: environment.OPENAI_API_KEY,
    })
  );
  constructor() {}

  async generateFormConfig(
    prompt: string
  ): Promise<FailureResponse | FormField[]> {
    const response = await this.getCompletion(prompt, PROMPT_TEMPLATE_1);
    if (!(response instanceof FailureResponse)) {
      try {
        const parsed = JSON.parse(response || '[]');
        return sanitizeParsedArray(parsed);
      } catch (err) {
        return new FailureResponse({
          errorType: UserFacingErrorTypes.FORM_CONFIG_PARSING_ERROR,
          reason: 'Could not process the prompt',
          context: response,
        });
      }
    }
    return response;
  }

  private async getCompletion(
    prompt: string,
    promptTemplate: PromptTemplate,
    completionRequestOverrideParams?: Partial<CreateCompletionRequest>
  ) {
    try {
      const response = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: promptTemplate.getPrompt(prompt),
        temperature: 0.6,
        max_tokens: 1200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        ...completionRequestOverrideParams,
      });
      if (response.status === 200) {
        return response.data.choices?.[0]?.text || '';
      } else {
        return new FailureResponse({
          errorType: UserFacingErrorTypes.GENERATION_ERROR_2,
          reason: 'Could not process the prompt',
          context: response,
        });
      }
    } catch (error) {
      return new FailureResponse(
        UserFacingErrorTypes.GENERATION_ERROR,
        'Could not process the prompt',
        error
      );
    }
  }
}
