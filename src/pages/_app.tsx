import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";

import { RecoilRoot } from "recoil";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  const queryClient = new QueryClient();

  export default function App({
    Component,
    pageProps: { session, ...pageProps },
  }: AppProps) {
    return (
      <RecoilRoot>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </SessionProvider>
      </RecoilRoot>
    );
  }
