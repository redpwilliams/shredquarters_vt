import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { getSession, SessionProvider, signOut } from 'next-auth/react'
import { AuthWrapper, Navbar, SideMenu, Footer } from '@components/ui'
import { MenuContext } from '@components/context'
import { ReactNode, useEffect, useState } from 'react'
import { User } from '@public/types'

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

  // Validate users on load on latest approved user list
  useEffect(() => {
    const checkVal = async () => {
      const s = await getSession()
      if (s === null) throw new Error("Invalid session, can't make call")
      // Get users
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
    // .then((s) => {
    //   // Get users
    //   console.log(s.user)
    //   console.log('Tried to fetch')
    //   fetch('http://localhost:3000/api/users/read', {
    //     method: 'GET'
    //   }).then(async (data) => {
    //     // Validate user email
    //     const users: User[] = await data.json()
    //     const email = s?.user?.email

    //     // Sign out if newly unauthorized
    //     if (!users.find((user) => user.email === email)) signOut()
    //   })
    // })
    // .catch((err) => err)
    // .catch((err) => err)
  }, [])

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
