import { NextPage } from "next"
import { signOut } from "next-auth/react"
import { Footer } from "components/Footer/Footer"
import { useAuth } from "@hooks/useAuth"
import { Backdrop, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"

const Admin: NextPage = () => {
  const isAuthenticated = useAuth()
  return isAuthenticated ? <AuthenticatedAdmin /> : <LoadingBackdrop />
}

const AuthenticatedAdmin = () => {
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
      sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Admin
