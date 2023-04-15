import { Divider, Flex } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Messages from "@/components/Messages";
import type { Message } from "@/components/Messages";
import { runLlm } from "@/pages/api/utils";
import { dummyMessages } from "@/utils/dummyMessages";

type FormValues = {
  message: string;
};

const queryKey: string[] = ["messages"];

const postMessage = async (message: string) => {
  const data = await runLlm(message);
  return data;
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
          <Flex w="40%" h="90%" flexDir="column">
            <Header />
            <Divider />
            <Messages messages={messages} />
            <Divider />
            <Footer />
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
