import "../styles/globals.sass"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { AuthWrapper } from "@components/AuthWrapper/AuthWrapper"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  )
}

export default MyApp
