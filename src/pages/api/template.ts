import { PromptTemplate } from "langchain/prompts";

type Prompt = {
  variant: string;
  template: string;
};

export const passPrompt = async ({
  variant = "靴下",
  template = "カラフルな{variant}を作る会社の良い名前を考えてください。",
}: Prompt) => {
  const prompt = new PromptTemplate({
    inputVariables: ["variant"],
    template,
  });

  const res = await prompt.format({ variant });
  return res;
};
