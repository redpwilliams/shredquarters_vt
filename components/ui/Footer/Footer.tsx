import { useAuth } from '@components/hooks'
import { NextPage } from 'next'
import Link from 'next/link'
import styles from './Footer.module.sass'

const Footer: NextPage = () => {
  const authState = useAuth(null, null, null)

  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <h2>
          <Link href='/'>Shredquarters 2023</Link>
        </h2>
        <ul>
          <li>
            <Link href='https://www.instagram.com/vt_shredq/'> Instagram</Link>
          </li>
          <li>
            <Link href='https://groupme.com/join_group/89192800/zDcHQgMY'>
              GroupMe
            </Link>
          </li>
          <li>
            <Link href='https://gobblerconnect.vt.edu/organization/shredquarters'>
              Gobbler Connect
            </Link>
          </li>
          <li>
            {/* TODO - USeContext for admin path.
              Ex: User navigates to /admin/events. Then back to Index
              When User navigates to /admin, they are redirected
              to /admin/events instead of just /admin (the home page) */}
            <Link href={authState ? '/admin' : '/auth/signIn'}>Admin</Link>
          </li>
        </ul>
      </div>
      <p>
        © 2023 Shredquarters at Virginia Tech, All rights reserved. Made with
        love by <span>Red Williams</span>
      </p>
    </footer>
  )
}
export { Footer }
