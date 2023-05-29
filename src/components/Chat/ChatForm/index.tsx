import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactElement, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Message } from "@/components/Chat/ChatMessages";
import { useAuth } from "@/hooks/useAuth";
// import { passOpenAiModel, passPromptTemplate } from "@/lib/langchain";
import { passChatOpenAiModel, passOpenAiChatModel } from "@/lib/langchain";
import type { Database } from "@/lib/supabase";
import {
  TABLE_NAME,
  addSupabaseData,
  fetchDatabase,
} from "@/lib/supabase/functions";
import { runChain, runChat, runChatllm } from "@/pages/api";
import { dummyChat } from "@/utils/dummyMessages";

type FormValues = {
  message: string;
};

type ChatFormProps = {
  children: ReactElement;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const queryKey: string[] = ["messages"];

const postMessage = async (message: string) => {
  // const res = await runChain({
  //   variant: message,
  //   prompt: passPromptTemplate,
  //   model: passOpenAiModel,
  // });
  const res = await runChatllm({
    model: passOpenAiChatModel,
    message,
    prefixMessages: [
      {
        role: "system",
        content: "Please reply in Japanese.",
      },
    ],
  });

  return res;
};

export const ChatForm = (props: ChatFormProps) => {
  const { children, setMessages } = props;
  const { session, profileFromGithub } = useAuth();
  const [messageText, setMessageText] = useState<Database[]>([]);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { message: "" },
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = methods;

  const queryClient = useQueryClient();
  const sendMessage = useMutation(postMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey);
    },
  });
  const values = watch();

  const onSubmitForm = (data: FormValues) => {
    if (!data.message.trim().length) {
      return;
    }
    setMessages((old) => [...old, { role: "human", text: data.message }]);
    // ユーザーInputのDB登録
    addSupabaseData({ message: data.message, ...profileFromGithub });
    reset();
    // 非同期処理
    sendMessage.mutate(data.message, {
      onSuccess: (res) => {
        setMessages((old) => [...old, { role: "ai", text: res }]);
        // TODO responceのDB登録
        // addSupabaseData({
        //   message: res,
        //   nickName: "ai",
        //   avatarUrl: "",
        // });
      },
    });
  };

  // TODO supabaseのrealtime eventを利用してDBを更新する
  // const fetchRealtimeData = () => {
  //   try {
  //     supabase
  //       .channel("table_postgres_changes")
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "*",
  //           schema: "public",
  //           table: TABLE_NAME,
  //         },
  //         (payload) => {
  //           if (payload.eventType === "INSERT") {
  //             console.log("payload: ", payload);
  //             const { createdAt, id, message, avatarUrl, nickName } =
  //               payload.new;
  //             setMessageText((messageText) => [
  //               ...messageText,
  //               { createdAt, id, message, avatarUrl, nickName },
  //             ]);
  //           }
  //         }
  //       )
  //       .subscribe();
  //
  //     return () => supabase.channel("table_postgres_changes").unsubscribe();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // TODO 初回のDB取得はuseEffectで行う
  // useEffect(() => {
  //   (async () => {
  //     const allMessage = await fetchDatabase();
  //     setMessageText(allMessage as Database[]);
  //   })();
  //   fetchRealtimeData();
  // }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>{children}</form>
    </FormProvider>
  );
};
