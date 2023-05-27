import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  type Session,
} from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

import { useState } from "react";
import theme from "@/utils/theme";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </SessionContextProvider>
  );
}
