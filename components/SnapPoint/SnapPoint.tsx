import { NextPage } from "next"
import { ReactNode } from "react"

interface Props {
  /** href to snap to */
  href: string

  /** children */
  children?: ReactNode
}
const SnapPoint: NextPage<Props> = ({ href, children }) => {
  return (
    <li>
      <a href={href}>{children}</a>
    </li>
  )
}
export { SnapPoint }
