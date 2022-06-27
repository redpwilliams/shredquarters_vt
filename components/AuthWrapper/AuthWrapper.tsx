import { NextPage } from 'next'
import { useAuth } from '@hooks/useAuth'
import { AuthContext } from '@context/AuthContext'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  blacklist: NextPage[]
}

/**
 * AuthWrapper Component
 * Everything in this component will have access to the authentication status of the client
 */
const AuthWrapper: NextPage<Props> = ({ children }) => {
  const authState = useAuth(null, null, null)

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}

export { AuthWrapper }
