import { OpenAI } from "langchain/llms/openai";

export const passAzureOpenAiModel = () => {
  const model = new OpenAI({
    temperature: 0.9,
    azureOpenAIApiKey: "YOUR-API-KEY",
    azureOpenAIApiInstanceName: "YOUR-INSTANCE-NAME",
    azureOpenAIApiDeploymentName: "YOUR-DEPLOYMENT-NAME",
    azureOpenAIApiVersion: "YOUR-API-VERSION",
  });

  return model;
};
