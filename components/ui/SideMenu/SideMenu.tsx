import { MenuContext } from '@components/context'
import { useContext } from 'react'
import { useWindowSize } from '@components/hooks'
import styles from './SideMenu.module.sass'

const SideMenu = () => {
  const { menuState } = useContext(MenuContext)
  const size = useWindowSize({ width: 576, height: undefined })

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateX(${
          menuState && size.width! < 576 ? '35%' : '135%'
        })`
      }}
    >
      <ul>
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
      </ul>
    </div>
  )
}
export { SideMenu }
