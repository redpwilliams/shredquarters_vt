import { NextPage } from "next"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"

const SignIn: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) router.push("/admin")
  return (
    <div>
      Hello
      <button onClick={() => signIn("google")}>Sign in with google</button>
    </div>
  )
}

export default SignIn
