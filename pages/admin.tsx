import { NextPage } from "next"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import { Footer } from "components/Footer/Footer"

const Admin: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)

  useEffect(() => {
    if (session === null) {
      console.log(session)
      router.push("/auth/signIn")
    }
  }, [router, session])

  return (
    session && (
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
  )
}

export default Admin
