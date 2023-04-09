import { OpenAI } from "langchain/llms";

export const runLlm = async () => {
  const llm = new OpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const res = await llm.call("自己紹介してください");
  return res;
};