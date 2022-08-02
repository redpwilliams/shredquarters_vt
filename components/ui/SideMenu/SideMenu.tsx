import { useContext } from 'react'
import { MenuContext, AuthContext } from '@components/context'
import { useWindowSize } from '@components/hooks'
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
          menuState && size.width! < 576 ? '0%' : '-100%'
        })`
      }}
    >
      {isAuthed ? <AuthMenu /> : <Menu />}
    </div>
  )
}

const Menu = () => (
  <ol className={styles.menu}>
    <li>
      <span>1. </span>Events
    </li>
    <li>
      <span>2. </span>Officers
    </li>
    <li>
      <span>3. </span>Contact
    </li>
    <li>
      <span>4. </span>Admin
    </li>
  </ol>
)

const AuthMenu = () => (
  <div className={styles.authMenu}>
    <h1>SQ Admin</h1>
    <h2>Events</h2>
    <ol>
      <li>Create an Event</li>
      <li>Edit an Event</li>
      <li>Delete an Event</li>
    </ol>
    <h2>Officers</h2>
    <ol>
      <li>Submit a new Officer</li>
      <li>Edit an existing Officer</li>
      <li>Remove an existing Officer</li>
    </ol>
    <h2>Admin Users</h2>
    <ol>
      <li>Add a new Administrator</li>
      <li>Remove an existing Administrator</li>
    </ol>
  </div>
)
export { SideMenu }
