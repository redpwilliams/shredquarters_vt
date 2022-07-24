import { NextPage } from 'next'
import { signOut } from 'next-auth/react'
import { useAuth } from '@components/hooks'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { AdminLayout } from '@components/layouts/'
import { LoadingBackdrop } from '@components/ui'

/**
 * Renders `AuthenticatedAdmin` component if authenticated, fdgfhg
 * or a loading backdrop spinner
 */
const Admin: NextPage = () => {
  const router = useRouter()
  const hasBeenAuthed = useRef(false)
  const isAuthenticated = useAuth(
    null,
    () => {
      if (hasBeenAuthed.current) {
        signOut()
        router.push('/')
      } else {
        router.push('/auth/signIn')
      }
    },
    null
  )
  return isAuthenticated ? <AuthenticatedAdmin /> : <LoadingBackdrop />
}

/** Renders when client is Authenticated */
const AuthenticatedAdmin = () => (
  <AdminLayout>
    <p>
      The Shrequarters Admin Console is a page available to predetermined and
      authenticated users to add, update, or remove content relating to the
      Shredquarters Website.
      <br />
      <br />
      This section will explain which options are available, and how to use each
      of them.
    </p>
  </AdminLayout>
)

export default Admin
