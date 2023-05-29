import { OpenAI } from "langchain/llms/openai";

export const passOpenAiModel = () => {
  const model = new OpenAI({
    temperature: 0.9,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  return model;
};
