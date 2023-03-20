import { motion } from 'framer-motion'
import { navLinkDuration as duration } from '@public/constants'
import Link from 'next/link'
import styles from './Navbar.module.sass'

// I want the burger menu and the SQ header to come in animate sycnhronously
const headersDuration = 2 / 3

const Navbar = () => (
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
  </nav>
)

export { Navbar }
