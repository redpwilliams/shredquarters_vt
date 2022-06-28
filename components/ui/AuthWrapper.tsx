import { NextPage } from 'next'
import { useAuth } from '@components/hooks'
import { AuthContext } from '@components/context'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * AuthWrapper Component
 *
 * {@param} children Everything in this component that
 * will have access to the authentication status of the client
 */
const AuthWrapper: NextPage<Props> = ({ children }) => {
  const authState = useAuth(null, null, null)

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}

export { AuthWrapper }
