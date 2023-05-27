import { PromptTemplate } from "langchain/prompts";

export const passPromptTemplate = () => {
  const prompt = new PromptTemplate({
    inputVariables: ["input_language", "output_language"],
    template:
      "You are a helpful assistant that translates {input_language} to {output_language}.",
  });

  return prompt;
};
