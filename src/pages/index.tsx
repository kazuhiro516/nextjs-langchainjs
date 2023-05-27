import { Divider, Flex } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { runChain } from "./api/chain";
import { passOpenAiModel } from "./api/models/openai";
import { passPromptTemplate } from "./api/prompts/prompt";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Messages from "@/components/Messages";
import type { Message } from "@/components/Messages";
import { dummyMessages } from "@/utils/dummyMessages";

type FormValues = {
  message: string;
};

const queryKey: string[] = ["messages"];

const postMessage = async (message: string) => {
  const res = await runChain({
    variant: message,
    prompt: passPromptTemplate,
    model: passOpenAiModel,
  });

  return res.text;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(dummyMessages.data);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { message: "" },
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const queryClient = useQueryClient();
  const sendMessage = useMutation(postMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const onSubmitForm = (data: FormValues) => {
    if (!data.message.trim().length) {
      return;
    }
    setMessages((old) => [...old, { from: "me", text: data.message }]);
    sendMessage.mutate(data.message, {
      onSuccess: (data) => {
        setMessages((old) => [...old, { from: "computer", text: data }]);
        reset();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
            pt="40px"
            pb="20px"
          >
            <Header />
            <Divider borderColor="gray.300" mt="4" />
            <Messages messages={messages} />
            <Divider borderColor="gray.300" />
            <Footer />
          </Flex>
          <Divider
            orientation="vertical"
            height="100%"
            borderColor="gray.400"
          />
        </Flex>
      </form>
    </FormProvider>
  );
}
