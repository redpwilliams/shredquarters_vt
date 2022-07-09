import { useAuth } from '@components/hooks'
import { NextPage } from 'next'
import Link from 'next/link'
import styles from './Footer.module.sass'

const Footer: NextPage = () => {
  const authState = useAuth(null, null, null)

  return (
    <footer className={styles.container}>
      <h2>
        <Link href='/'>Shredquarters 2022</Link>
      </h2>
      <ul>
        <li>Instagram</li>
        <li>Gobbler Connect</li>
        <li>
          {/* TODO - USeContext for admin path.
              Ex: User navigates to /admin/events. Then back to Index
              When User navigates to /admin, they are redirected
              to /admin/events instead of just /admin (the home page) */}
          <Link href={authState ? '/admin' : '/auth/signIn'}>Admin</Link>
        </li>
      </ul>
      <p>
        © 2022 Shredquarters at Virginia Tech, All rights reserved. Made with
        love by <span>Red Williams</span>
      </p>
    </footer>
  )
}
export { Footer }
