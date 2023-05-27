import { OpenAI } from "langchain/llms/openai";

export const passOpenAiModel = () => {
  const model = new OpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  return model;
};
