import { ChatOpenAI } from "langchain/chat_models/openai";

export const passChatOpenAiModel = () => {
  const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  return model;
};
