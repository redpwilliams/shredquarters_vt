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
          <Link href={authState ? '/admin' : '/auth/signIn'}>Admin</Link>
        </li>
      </ul>
    </footer>
  )
}
export { Footer }
