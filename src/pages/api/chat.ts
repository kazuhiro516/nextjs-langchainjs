import { ChatOpenAI } from "langchain/chat_models/openai";
import { Message } from "@/components/Chat/ChatMessages";
import {
  aiChatMessage,
  humanChatMessage,
  systemPrompt,
} from "@/lib/langchain/messages";

type ChatProps = {
  model: () => ChatOpenAI;
  messages: Message[];
};

export const runChat = async ({ model, messages }: ChatProps) => {
  const chat = new ChatOpenAI({
    temperature: 0,
    prefixMessages: [
      {
        role: "user",
        content: "Please reply in Japanese.",
      },
    ],
  });
  const response = await chat.call(
    messages.map((message) => {
      if (message.role === "human") {
        return humanChatMessage(message.text);
      }
      if (message.role === "ai") {
        return aiChatMessage(message.text);
      }
      return systemPrompt(message.text);
    })
  );
  return response;
  // AIChatMessage { text: '\n\nRainbow Sox Co.' }
};
