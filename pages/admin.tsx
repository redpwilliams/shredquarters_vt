import { NextPage } from "next"
import { signOut } from "next-auth/react"
// import { Footer } from "components/Footer/Footer"
import { useAuth } from "@hooks/useAuth"
import { Backdrop, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { useRef } from "react"
import { AdminLayout } from "@layouts/AdminLayout"

/**
 * Renders `AuthenticatedAdmin` component if authenticated,
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
        router.push("/")
      } else {
        router.push("/auth/signIn")
      }
    },
    null
  )
  return isAuthenticated ? <AuthenticatedAdmin /> : <LoadingBackdrop />
}

/** Renders when client is Authenticated */
const AuthenticatedAdmin = () => {
  return (
    <AdminLayout>
      <p>
        The Shrequarters Admin Console is a page available to predetermined and
        authenticated users to add, update, or remove content relating to the
        Shredquarters Website.
      </p>
      <h2>Operations Include:</h2>
      <ul>
        <li>Events</li>
        <li>Officers</li>
        <li>Admin Users</li>
      </ul>
      {/* <Footer /> */}
    </AdminLayout>
  )
}

const LoadingBackdrop = () => {
  return (
    <Backdrop
      sx={{ color: "gold", zIndex: theme => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Admin
