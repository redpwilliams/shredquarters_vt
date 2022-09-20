import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { getSession, SessionProvider, signOut } from 'next-auth/react'
import { AuthWrapper, Navbar, SideMenu, Footer } from '@components/ui'
import { MenuContext } from '@components/context'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWindowSize } from '@components/hooks'
import { User } from '@public/types'
import Head from 'next/head'

type LayoutComponent = AppProps & {
  Component: AppProps['Component'] & {
    // Does it have a PageLayout property?
    PageLayout?: ({ children }: { children: ReactNode }) => JSX.Element

    // How about a CustomTitle?
    CustomTitle?: ({ title }: { title: string }) => JSX.Element
  }
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: LayoutComponent) {
  // Gets passed to context. All pages need to know to not scroll when modal is open
  const [menuState, setMenuState] = useState(false)
  const { width } = useWindowSize({ width: undefined, height: undefined })

  // Validate users on load on latest approved user list
  useEffect(() => {
    const checkVal = async () => {
      const s = await getSession()
      if (s === null) throw new Error("Invalid session, can't make call")
      // Get users
      // FIXME - WTF
      const data = await fetch('http://localhost:3000/api/users/read', {
        method: 'GET'
      })

      const users: User[] = await data.json()
      const email = s.user?.email
      return users.find((user) => user.email === email)
    }

    checkVal()
      .then((r) => {
        if (!r) signOut()
      })
      .catch((e) => e)
  }, [])

  // Toggle off the Side Menu on route change
  const router = useRouter()
  useEffect(() => {
    const handleMenuNavigation = () => {
      if (menuState) setMenuState(false)
    }
    router.events.on('routeChangeStart', handleMenuNavigation)

    return () => router.events.off('routeChangeStart', handleMenuNavigation)
  })

  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Head>
          <title>Shredquarters at VT</title>
          <meta name='author' content='Red Williams' />
          <meta name='description' content='Shredquarters at Virginia Tech' />
          <meta charSet='UTF-8' />
          <meta
            name='keywords'
            content='shredquarters virginia tech VT club skateboarding longboarding'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />

          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
        </Head>
        <MenuContext.Provider value={{ menuState, setMenuState }}>
          <Navbar />
          {width! <= 768 && <SideMenu />}
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
        @media (max-width: 768px) {
          html {
            overflow-y: ${menuState ? 'hidden' : 'unset'};
          }
        }
      `}</style>
    </SessionProvider>
  )
}

export default MyApp
