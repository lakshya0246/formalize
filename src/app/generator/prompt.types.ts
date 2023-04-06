export interface PromptTemplate {
  /**
   * the text that is needed to drive the response
   */
  context: string;
  /**
   * @returns the `prompt` interpolated with the context and templatePrompt
   */
  getPrompt: (prompt?: string) => string;
}
