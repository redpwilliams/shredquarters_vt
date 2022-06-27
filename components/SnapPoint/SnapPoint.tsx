import { NextPage } from 'next'
import { ReactNode } from 'react'
import styles from './SnapPoint.module.sass'

interface Props {
  /** href to snap to */
  href: string

  /** children */
  children?: ReactNode
}
const SnapPoint: NextPage<Props> = ({ href, children }) => (
  <li className={styles.container}>
    <a href={href}>{children}</a>
  </li>
)
export { SnapPoint }
