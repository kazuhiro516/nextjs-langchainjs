import { Message } from "@/components/Chat/ChatMessages";

type DummyMessages = {
  data: Message[];
};

export const dummyMessages: DummyMessages = {
  data: [
    {
      from: "computer",
      text: "わたしの名前はPODです。",
    },
    {
      from: "computer",
      text: "なにかお困りですか？",
    },
  ],
};
