import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import SEO from "@/components/SEO";
import { theme } from '../styles/theme';
import { Router } from "next/router";
import NProgress from 'nprogress';
import { AuthProvider } from '../context/AuthContext';
import "../styles/transition.css"
import '../styles/global.css'
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { PostProvider } from "@/context/PostContext";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

function MyApp({ Component, pageProps, cookies }: AppProps | any) {
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return getLayout(
    <ChakraProvider
      theme={theme}
    >
      <PostProvider>
        <AuthProvider>
          <SEO title='AnEx' shouldExcludeTitleSuffix></SEO>
          <Component {...pageProps} />
        </AuthProvider>
      </PostProvider>
    </ChakraProvider>
  );
}

export default MyApp;