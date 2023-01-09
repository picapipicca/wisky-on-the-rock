import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import LoginCheckLayout from "../components/layout/LoginCheckLayout";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // max-w-lg: 512px / xs: 320px / sm: 384px / xl: 576px
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <div className={"w-full max-w-xl mx-auto"}>
        <LoginCheckLayout />
        <Component {...pageProps} />
      </div>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      ></Script>
 {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={()=>{
          window.fbAsyncInit = function() {
            FB.init({
              appId            : 'your-app-id',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v15.0'
            });
          };
        }}
      /> */}
    </SWRConfig>
  );
}
