import { MenuContext } from '@components/context'
import Link from 'next/link'
import { useContext } from 'react'
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
      <li id={styles.admin}>
        <Link href='/admin'>Admin</Link>
      </li>
    </ul>
    <BurgerIcon />
  </nav>
)

const BurgerIcon = () => {
  const { menuState, setMenuState } = useContext(MenuContext)

  return (
    <div className={styles.burger} onClick={() => setMenuState(!menuState)}>
      {/* <span
        style={{
          // top: `${menuState ? 'calc(-50% + 1px)' : '50%'}`,
          transform: `rotate(${menuState ? '225deg' : '0deg'})`,
          transition: `${
            menuState
              ? 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
              : 'bottom 0.1s ease 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.12s'
          }`,
          transitionTimingFunction: `cubic-bezier(
            ${menuState ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'}
          )`
        }}
      /> */}
      <div
        style={{
          transitionDelay: `${menuState ? '0.12s' : '0.18s'}`,
          transform: `rotate(${menuState ? '225deg' : '0deg'})`,
          transitionTimingFunction: `cubic-bezier(
            ${menuState ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'}
          )`
        }}
      />

      <style jsx>
        {`
          div::before {
            top: ${menuState ? '0' : '-10px'};
            opacity: ${menuState ? '0' : '1'};
            transition: ${
              menuState
                ? 'top 0.1s ease-out,opacity 0.1s ease-out 0.12s'
                : 'top 0.1s ease-in 0.25s,opacity 0.1s ease-in'
            };
          }

          div::after {
            bottom: ${menuState ? '0' : '-10px'};
            transform: rotate(${menuState ? '-90deg' : '0deg'});
            transition: ${
              menuState
                ? 'bottom 0.1s ease-out,transform 0.22s cubic-bezier(0.215,0.61,0.355,1) 0.12s'
                : 'bottom 0.1s ease-in 0.25s,transform 0.22s cubic-bezier(0.55,0.055,0.675,0.19)'
            };
          }

          @media (max-width: 768px) {
            .${styles.aside} {
              transform: translateX(${menuState ? '0' : '100'}vw);
              visibility: ${menuState ? 'visible' : 'hidden'};
            }
        `}
      </style>
    </div>
  )
}

export { Navbar }
