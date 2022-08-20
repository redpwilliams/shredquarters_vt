import Link from 'next/link'
import styles from './AdminNavigation.module.sass'

const AdminNavigation = () => (
  <ul className={styles.container}>
    <li>
      <Link href='/admin' replace>
        About
      </Link>
    </li>
    <li>
      <Link href='/admin/events/create'>Events</Link>
    </li>
    <li>
      <Link href='/admin/officers/create'>Officers</Link>
    </li>
    <li>
      <Link href='/admin/users/create'>Users</Link>
    </li>
  </ul>
)

export { AdminNavigation }
