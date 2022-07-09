import Link from 'next/link'
import styles from './AdminNavigation.module.sass'

const AdminNavigation = () => (
  <ul className={styles.container}>
    <li>
      <Link href='/admin' replace>
        <a>Home</a>
      </Link>
    </li>
    <li>
      <Link href='/admin/events' replace>
        <a>Events</a>
      </Link>
    </li>
    <li>
      <Link href='/admin/officers' replace>
        <a>Officers</a>
      </Link>
    </li>
    <li>
      <Link href='/admin/users' replace>
        <a>Users</a>
      </Link>
    </li>
  </ul>
)

export { AdminNavigation }
