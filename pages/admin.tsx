import { NextPage } from "next"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import { Footer } from "components/Footer/Footer"
import { useAuth } from "@hooks/useAuth"

const Admin: NextPage = () => {
  const isAuthenticated = useAuth()
  console.log("State:", isAuthenticated)
  // const router = useRouter() // REVIEW - This may not be needed? Handle in parent admin

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
