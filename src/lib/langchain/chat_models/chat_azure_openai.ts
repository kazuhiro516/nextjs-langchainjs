import { ChatOpenAI } from "langchain/chat_models/openai";

export const passChatAzureOpenAiModel = () => {
  const model = new ChatOpenAI({
    temperature: 0.9,
    azureOpenAIApiKey: "YOUR-API-KEY",
    azureOpenAIApiInstanceName: "YOUR-INSTANCE-NAME",
    azureOpenAIApiDeploymentName: "YOUR-DEPLOYMENT-NAME",
    azureOpenAIApiVersion: "YOUR-API-VERSION",
  });

  return model;
};
