import { NextPage } from "next"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import GoogleIcon from "@mui/icons-material/Google"
import styles from "@styles/SignIn.module.sass"
import { useAuth } from "@hooks/useAuth"

const SignIn: NextPage = () => {
  const router = useRouter()

  useAuth(
    () => {
      router.push("/admin")
    },
    () => {
      console.log("signIn is unAuthed")
    },
    () => console.log("signIn is loading")
  )

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
