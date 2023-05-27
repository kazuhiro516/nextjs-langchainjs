import { Divider, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { SignIn } from "@/components/Auth/SignIn";

import {
  ChatForm,
  ChatFooter,
  ChatHeader,
  ChatMessages,
  type Message,
} from "@/components/Chat";
import { ChatLayout } from "@/components/Layout/ChatLayout";
import { useAuth } from "@/hooks/useAuth";
import { dummyMessages } from "@/utils/dummyMessages";

export default function Home() {
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>(dummyMessages.data);

  return (
    <ChatLayout>
      <>
        <SignIn />
        <ChatForm setMessages={setMessages}>
          <Flex w="100%" h="100vh" justify="center" align="center">
            <Divider
              orientation="vertical"
              height="100%"
              borderColor="gray.400"
            />
            <Flex
              maxW="480px"
              w="100%"
              h="100%"
              flexDir="column"
              px="20px"
              pt="80px"
              pb="20px"
              pos="relative"
            >
              <ChatHeader />
              <Divider borderColor="gray.300" mt="4" />
              <ChatMessages messages={messages} />
              <Divider borderColor="gray.300" />
              <ChatFooter />
            </Flex>
            <Divider
              orientation="vertical"
              height="100%"
              borderColor="gray.400"
            />
          </Flex>
        </ChatForm>
      </>
    </ChatLayout>
  );
}
