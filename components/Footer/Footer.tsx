import { NextPage } from "next"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import styles from "./Footer.module.sass"
const Footer: NextPage = () => {
  const { data: session } = useSession()

  return (
    <footer className={styles.container}>
      <h2>
        <Link href="/">Shredquarters 2022</Link>
      </h2>
      <ul>
        <li>Instagram</li>
        <li>Gobbler Connect</li>
        <li>
          <Link href={session ? "/admin" : "/auth/signIn"}>Admin</Link>
        </li>
      </ul>
    </footer>
  )
}
export { Footer }
