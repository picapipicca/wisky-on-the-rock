import '../styles/globals.css'
import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
    return (
        // max-w-lg: 512px / xs: 320px / sm: 384px / xl: 576px
        <div className={"w-full max-w-xl mx-auto"} >
            <Component {...pageProps} />
        </div>
    )
}
