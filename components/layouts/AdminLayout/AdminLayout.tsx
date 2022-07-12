import { ReactNode } from 'react'
import { AdminNavigation } from '@components/navigation'
import styles from './AdminLayout.module.sass'

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>
    <h1 className='admin-header'>Shredquarters Admin Console</h1>
    <AdminNavigation />
    <div className={styles.children}>{children}</div>
  </div>
)

export { AdminLayout }
