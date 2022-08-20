import { NextPage } from 'next'
import { signOut } from 'next-auth/react'
import { useAuth } from '@components/hooks'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { AdminLayout } from '@components/layouts/'
import { LoadingBackdrop } from '@components/ui'
import Link from 'next/link'

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
    <LinkedHeader header='Create an event' href='/admin/events/create' />
    <p>
      Adds an event to the home page which automatically deletes when the event
      has passed.
    </p>
    <LinkedHeader header='Remove an event' href='/admin/events/delete' />
    <p>Manualy removes an event from the home page.</p>
    <LinkedHeader header='Add an officer' href='/admin/officers/create' />
    <p>Adds an officer&apos;s biography and picture to the home page.</p>
    <LinkedHeader header='Remove an officer' href='/admin/officers/delete' />
    <p>Removes all information of the officer from the home page.</p>
    <LinkedHeader header='Add a user' href='/admin/users/create' />
    <p>Gives access to the admin console to a specific user via email.</p>
    <LinkedHeader header='Delete a user' href='/admin/users/delete' />
    <p>Manualy removes an event from the home page.</p>
  </AdminLayout>
)

interface LHProps {
  header: string
  href: string
}
const LinkedHeader = ({ header, href }: LHProps) => (
  <h1>
    <Link href={href}>{header}</Link>
  </h1>
)

export default Admin
