import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Message } from "@/components/Chat/ChatMessages";
import { runChain, passOpenAiModel, passPromptTemplate } from "@/pages/api";

type FormValues = {
  message: string;
};

type ChatFormProps = {
  children: ReactElement;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
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

export const ChatForm = (props: ChatFormProps) => {
  const { children, setMessages } = props;

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
      <form onSubmit={handleSubmit(onSubmitForm)}>{children}</form>
    </FormProvider>
  );
};
