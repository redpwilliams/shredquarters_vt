import { NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
const Admin: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
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
    </div>
  )
}

export default Admin
