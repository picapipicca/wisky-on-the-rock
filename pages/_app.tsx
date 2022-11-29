import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import LoginCheckLayout from '../components/layout/LoginCheckLayout';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
      // max-w-lg: 512px / xs: 320px / sm: 384px / xl: 576px
    <SWRConfig value={{fetcher:(url: string) => fetch(url).then((res) => res.json())}}>
      <div className={"w-full max-w-xl mx-auto"}>
        <LoginCheckLayout/>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
