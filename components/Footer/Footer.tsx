import { NextPage } from "next"
import styles from "./Footer.module.sass"
const Footer: NextPage = () => {
  return (
    <footer className={styles.container}>
      <h2>Shredquarters 2022</h2>
      <ul>
        <li>Instagram</li>
        <li>Gobbler Connect</li>
        <li>Admin</li>
      </ul>
    </footer>
  )
}
export { Footer }
