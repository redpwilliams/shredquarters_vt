import { ReactNode } from "react"
import Link from "next/link"
import { Footer } from "@components/Footer/Footer"

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={StyleSheet}>
      <h1>Shredquarters Admin Console</h1>
      <ul>
        <li>
          <Link href="/admin/events" replace>
            <a>To Events</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/officers" replace>
            <a>To Officers</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/users" replace>
            <a>To Users</a>
          </Link>
        </li>
      </ul>
      {children}
      <Footer />
    </div>
  )
}

const StyleSheet = {
  border: "5px solid gold",
  color: "white",
  fontSize: "4rem"
}

export { AdminLayout }
