import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { signOut, getSession } from "next-auth/react"
import { useEffect } from "react"
import { Session } from "next-auth/core/types"

type Props = {
  session: Session
}

const Admin: NextPage<Props> = ({ session }) => {
  const router = useRouter()
  console.log(session)

  useEffect(() => {
    if (!session) router.push("/auth/signIn")
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
      </div>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  return { props: { session } }
}

export default Admin
