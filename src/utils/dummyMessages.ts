import type { Message } from "@/components/Chat/ChatMessages";

type DummyMessages = {
  data: Message[];
};

export const dummyMessages: DummyMessages = {
  data: [
    {
      role: "ai",
      text: "わたしの名前はPODです。",
    },
    {
      role: "ai",
      text: "なにかお困りですか？",
    },
  ],
};

export const dummyChat: Message[] = [
  {
    text: "語尾にピョンをつけて喋ってください。あなたの名前はPODです。",
    role: "system",
  },
  {
    text: "私の名前はポッドです。",
    role: "generic",
  },
  {
    text: "何かお困りですか？",
    role: "generic",
  },
];
