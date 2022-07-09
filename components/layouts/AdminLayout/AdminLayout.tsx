import { ReactNode } from 'react'
import { AdminNavigation } from '@components/navigation'
import styles from './AdminLayout.module.sass'

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>
    <h1 className='admin-header'>Shredquarters Admin Console</h1>
    <AdminNavigation />
    <div className={styles.children}>{children}</div>
    {/* <ul className={styles.nav}>
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
    </ul> */}
  </div>
)

export { AdminLayout }
