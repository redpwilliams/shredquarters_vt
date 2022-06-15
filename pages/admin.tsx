import { NextPage } from "next"
import { signOut } from "next-auth/react"
import { Footer } from "components/Footer/Footer"
import { useAuth } from "@hooks/useAuth"

const Admin: NextPage = () => {
  const isAuthenticated = useAuth()
  return isAuthenticated ? <AuthenticatedAdmin /> : <h1>Loading . . .</h1>
}

const AuthenticatedAdmin = () => {
  return (
    <div style={{ color: "white" }}>
      Admin: We must be signed in to view this page
      <button
        onClick={() => {
          signOut()
          // router.push("/")
        }}
      >
        Signout
      </button>
      <Footer />
    </div>
  )
}

export default Admin
