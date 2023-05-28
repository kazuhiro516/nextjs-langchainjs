import { ChatOpenAI } from "langchain/chat_models";
import { Message } from "@/components/Chat/ChatMessages";
import { humanChatMessage, systemPrompt } from "@/lib/langchain/messages";

type ChatProps = {
  model: () => ChatOpenAI;
  messages: Message[];
};

export const runChat = async ({ model, messages }: ChatProps) => {
  const chat = model();
  const response = await chat.call(
    messages.map((message) => {
      if (message.role === "human") {
        return humanChatMessage(message.text);
      }
      return systemPrompt(message.text);
    })
  );
  return response;
  // AIChatMessage { text: '\n\nRainbow Sox Co.' }
};
