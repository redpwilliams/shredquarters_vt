import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthWrapper } from '@components/AuthWrapper/AuthWrapper'
import { ReactNode } from 'react'
import Home from './index'

type LayoutComponent = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: ({ children }: { children: ReactNode }) => JSX.Element
  }
}

const blacklist = [Home]

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: LayoutComponent) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper blacklist={blacklist}>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthWrapper>
    </SessionProvider>
  )
}

export default MyApp
