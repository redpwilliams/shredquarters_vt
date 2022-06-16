import { NextPage } from "next"
import { signOut } from "next-auth/react"
import { Footer } from "components/Footer/Footer"
import { useAuth } from "@hooks/useAuth"
import { Backdrop, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { useRef } from "react"

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
    () => console.log("admin is loading")
  )
  return isAuthenticated ? <AuthenticatedAdmin /> : <LoadingBackdrop />
}

/** Renders when client is Authenticated */
const AuthenticatedAdmin = () => {
  // Router object
  const router = useRouter()
  return (
    <div style={{ color: "white" }}>
      Admin: We must be signed in to view this page
      <button
        onClick={() => {
          signOut()
          router.push("/")
        }}
      >
        Signout
      </button>
      <Footer />
    </div>
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
