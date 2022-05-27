import { NextPage } from "next"
import styles from "./TextDivider.module.sass"

interface Props {
  children: string
}
const TextDivider: NextPage<Props> = ({ children }) => {
  return <h3 className={styles.text}>{children}</h3>
}

export { TextDivider }
