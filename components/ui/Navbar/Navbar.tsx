import Link from 'next/link'
import styles from './Navbar.module.sass'

const Navbar = () => (
  <nav className={styles.container}>
    <h1>
      <Link href='/'>Shredquarters</Link>
    </h1>
    <ul>
      <li>
        <Link href='/#plan'>Events</Link>
      </li>
      <li>
        <Link href='/#team'>Officers</Link>
      </li>
      <li>
        <Link href='/#network'>Contact</Link>
      </li>
      <li>
        <Link href='/admin'>Admin</Link>
      </li>
    </ul>
  </nav>
)

export { Navbar }
