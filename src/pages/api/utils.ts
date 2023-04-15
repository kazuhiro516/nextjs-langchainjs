import { OpenAI } from "langchain/llms/openai";

export const runLlm = async (prompt: string) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  
  const res = await llm.call(
    prompt,
  );
  return res;
};