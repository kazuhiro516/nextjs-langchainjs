import {
  AIChatMessage,
  ChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";

const humanChatMessage = (text: string) => {
  return new HumanChatMessage(text);
};

const systemPrompt = (text: string) => {
  return new SystemChatMessage(text);
};

const aiChatMessage = (text: string) => {
  return new AIChatMessage(text);
};

const chatMessage = (text: string, role: string) => {
  return new ChatMessage(text, role);
};

export { humanChatMessage, systemPrompt, aiChatMessage, chatMessage };
