import { useContext } from 'react'
import { MenuContext, AuthContext } from '@components/context'
import { useWindowSize } from '@components/hooks'
import Link from 'next/link'
import styles from './SideMenu.module.sass'

const SideMenu = () => {
  const { menuState } = useContext(MenuContext)
  const size = useWindowSize({ width: 576, height: undefined })

  const isAuthed = useContext(AuthContext)

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateX(${
          menuState && size.width! < 768 ? '0%' : '-100%'
        })`,
        boxShadow: `0px 0px ${menuState ? '10px' : '0px'} 0px #0a0a0a`
      }}
    >
      {isAuthed ? <AuthMenu /> : <Menu />}
    </div>
  )
}

const Menu = () => (
  <ol className={styles.menu}>
    <li>
      <span>1. </span>
      <Link href='#plan'>Events</Link>
    </li>
    <li>
      <span>2. </span>
      <Link href='#team'>Officers</Link>
    </li>
    <li>
      <span>3. </span>
      <Link href='#network'>Contact</Link>
    </li>
    <li>
      <span>4. </span>
      <Link href='/admin'>Admin</Link>
    </li>
  </ol>
)

const AuthMenu = () => (
  <div className={styles.authMenu}>
    <h1>SQ Admin</h1>
    <h2>Events</h2>
    <ol>
      <li>
        <Link href='/admin/events/create'>Create an Event</Link>
      </li>
      {/* <li>
        <Link href='/admin/events/delete'>Edit an Event</Link>
      </li> */}
      <li>
        <Link href='/admin/events/delete'>Delete an Event</Link>
      </li>
    </ol>
    <h2>Officers</h2>
    <ol>
      <li>
        <Link href='/admin/officers/delete'>Submit a new Officer</Link>
      </li>
      {/* <li>
        <Link href='/admin/officers/delete'>Edit an existing Officer</Link>
      </li> */}
      <li>
        <Link href='/admin/officers/delete'>Remove an existing Officer</Link>
      </li>
    </ol>
    <h2>Admin Users</h2>
    <ol>
      <li>
        <Link href='/admin/users/delete'>Add a new Administrator</Link>
      </li>
      <li>
        <Link href='/admin/users/delete'>Remove an existing Administrator</Link>
      </li>
    </ol>
  </div>
)
export { SideMenu }
