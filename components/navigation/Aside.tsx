import { SnapPoint } from 'components/SnapPoint/SnapPoint'
import { NextPage } from 'next'
import styles from './Aside.module.sass'

const Aside: NextPage = () => (
  <aside className={styles.aside}>
    <nav className={styles.nav}>
      <ul>
        <SnapPoint href='#crew'>Crew</SnapPoint>
        <SnapPoint href='#team'>Team</SnapPoint>
        <SnapPoint href='#plan'>Plan</SnapPoint>
        <SnapPoint href='#network'>Network</SnapPoint>
      </ul>
    </nav>
  </aside>
)

export { Aside }
