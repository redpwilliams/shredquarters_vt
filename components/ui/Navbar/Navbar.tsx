import { MenuContext } from '@components/context'
import { useContext } from 'react'
import { motion } from 'framer-motion'
import { navLinkDuration as duration } from '@public/constants'
import Link from 'next/link'
import { useWindowSize } from '@components/hooks'
import styles from './Navbar.module.sass'

// I want the burger menu and the SQ header to come in animate sycnhronously
const headersDuration = 2 / 3

const Navbar = () => {
  const { width } = useWindowSize({ width: undefined, height: undefined })
  return (
    <nav className={styles.container}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: headersDuration }}
      >
        <Link href='/'>Shredquarters</Link>
      </motion.h1>
      <ul>
        <motion.li
          initial={{ top: -50 }}
          animate={{ top: 0 }}
          viewport={{ once: true }}
          transition={{ duration }}
        >
          <Link href='/#plan'>Events</Link>
        </motion.li>
        <motion.li
          initial={{ top: -50 }}
          animate={{ top: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration * 2 }}
        >
          <Link href='/#team'>Officers</Link>
        </motion.li>
        <motion.li
          initial={{ top: -50 }}
          animate={{ top: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration * 3 }}
        >
          <Link href='/#network'>Contact</Link>
        </motion.li>
        <motion.li
          id={styles.admin}
          initial={{ top: -50 }}
          animate={{ top: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration * 4 }}
        >
          <Link href='/admin'>Admin</Link>
        </motion.li>
      </ul>
      {width! <= 768 && <BurgerIcon />}
    </nav>
  )
}

const BurgerIcon = () => {
  const { menuState, setMenuState } = useContext(MenuContext)

  return (
    <motion.div
      className={styles.burger}
      onClick={() => setMenuState(!menuState)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: headersDuration }}
    >
      <div
        style={{
          transitionDelay: `${menuState ? '0.12s' : '0.18s'}`,
          transform: `rotate(${menuState ? '225deg' : '0deg'})`,
          transitionTimingFunction: `cubic-bezier(
            ${menuState ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'}
          )`,
          display: `${menuState ? 'flex' : 'hidden'}`
        }}
      />

      <style jsx>
        {`
          div::before {
            top: ${menuState ? '0' : '-10px'};
            opacity: ${menuState ? '0' : '1'};
            transition: ${menuState
              ? 'top 0.1s ease-out,opacity 0.1s ease-out 0.12s'
              : 'top 0.1s ease-in 0.25s,opacity 0.1s ease-in'};
          }

          div::after {
            bottom: ${menuState ? '0' : '-10px'};
            transform: rotate(${menuState ? '-90deg' : '0deg'});
            transition: ${menuState
              ? 'bottom 0.1s ease-out,transform 0.22s cubic-bezier(0.215,0.61,0.355,1) 0.12s'
              : 'bottom 0.1s ease-in 0.25s,transform 0.22s cubic-bezier(0.55,0.055,0.675,0.19)'};
          }
        `}
      </style>
    </motion.div>
  )
}

export { Navbar }
