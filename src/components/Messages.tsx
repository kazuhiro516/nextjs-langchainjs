import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

export type Message = {
  from: "me" | "computer";
  text: string;
};

type MessagesProps = {
  messages: Message[];
};

const Messages = ({ messages }: MessagesProps) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!elementRef.current) {
        return;
      }
      elementRef.current.scrollIntoView();
    });
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item: { from: string; text: any }, index: number) => (
        <ChatBubble
          key={index}
          message={item.text}
          isOwnMessage={item.from === "me"}
        />
      ))}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
