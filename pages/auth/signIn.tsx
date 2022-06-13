import { NextPage } from "next"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import GoogleIcon from "@mui/icons-material/Google"
import styles from "@styles/SignIn.module.sass"

const SignIn: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push("/admin")
  }, [router, session])
  return (
    <div className={styles.container}>
      <h1>Access Protected</h1>
      <h2>Sign In to Continue</h2>
      <button onClick={() => signIn("google")}>
        <GoogleIcon />
        <span>Sign In with Google</span>
      </button>
    </div>
  )
}

export default SignIn
