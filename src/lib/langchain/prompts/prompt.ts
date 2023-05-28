import { PromptTemplate } from "langchain/prompts";

export const passPromptTemplate = () => {
  const prompt = new PromptTemplate({
    inputVariables: ["variant"],
    template:
      "カラフルな{variant}を作る会社の良い名前を日本語で考えてください。",
  });

  return prompt;
};
