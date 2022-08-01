import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthWrapper, Navbar, SideMenu, Footer } from '@components/ui'
import { MenuContext } from '@components/context'
import { ReactNode, useState } from 'react'

type LayoutComponent = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: ({ children }: { children: ReactNode }) => JSX.Element
  }
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: LayoutComponent) {
  // Gets passed to context. All pages need to know to not scroll when modal is open
  const [menuState, setMenuState] = useState(false)

  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <MenuContext.Provider value={{ menuState, setMenuState }}>
          <Navbar />
          <SideMenu />
        </MenuContext.Provider>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <Footer />
      </AuthWrapper>
      <style jsx global>{`
        @media (max-width: 576px) {
          html {
            overflow-y: ${menuState ? 'hidden' : 'unset'};
          }
        }
      `}</style>
    </SessionProvider>
  )
}

export default MyApp
