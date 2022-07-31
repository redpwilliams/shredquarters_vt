import { MenuContext } from '@components/context'
import { useContext } from 'react'
import styles from './SideMenu.module.sass'

const SideMenu = () => {
  const { menuState } = useContext(MenuContext)

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateX(${menuState ? '35%' : '135%'})`
      }}
    />
  )
}
export { SideMenu }
