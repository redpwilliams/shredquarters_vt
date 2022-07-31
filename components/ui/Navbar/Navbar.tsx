import { useState } from 'react'
import styles from './Navbar.module.sass'

const Navbar = () => (
  <nav className={styles.container}>
    <h1>Shredquarters</h1>
    <ul>
      <li>Events</li>
      <li>Officers</li>
      <li>Contact</li>
      <li id={styles.admin}>Admin</li>
    </ul>
    <BurgerIcon />
  </nav>
)

const BurgerIcon = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
      <span
        style={{
          bottom: `${menuOpen ? 'calc(-50% + 1px)' : '0'}`,
          transform: `rotate(${menuOpen ? '225deg' : '0deg'})`,
          transition: `${
            menuOpen
              ? 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
              : 'bottom 0.1s ease 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.12s'
          }`,
          transitionTimingFunction: `cubic-bezier(
            ${menuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'}
          )`
        }}
      />
      <span
        style={{
          opacity: `${menuOpen ? '0' : '1'}`,
          transition: `${
            menuOpen
              ? 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s'
              : 'top 0.1s ease-in 0.25s, opacity 0.1s ease-in 0.12s'
          }`
        }}
      />
      <span
        style={{
          bottom: `${menuOpen ? 'calc(50% - 1px)' : '0'}`,
          transition: `${
            menuOpen
              ? 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
              : 'bottom 0.1s ease 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.12s'
          }`,
          transitionTimingFunction: `cubic-bezier(
            ${menuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'}
          )`,
          transform: `rotate(${menuOpen ? '135deg' : '0'})`
        }}
      />
      {/* <style jsx>
      {`
        .burger:first-child {
          transition-delay: ${menuOpen ? '0.12s' : '0s'};
          transform: rotate(${menuOpen ? '225deg' : '0deg'});
          transition-timing-function: cubic-bezier(
            ${menuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'}
          );
        }
        .burger::before {
          top: ${menuOpen ? '0px' : '-5px'};
          opacity: ${menuOpen ? '0' : '1'};
          transition: ${menuOpen
            ? 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s'
            : 'top 0.1s ease-in 0.25s, opacity 0.1s ease-in'};
        }
        .burger::after {
          bottom: ${menuOpen ? '0px' : '-5px'};
          transition: ${menuOpen
            ? 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
            : 'bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)'};
          transform: rotate(${menuOpen ? '-90deg' : '0'});
        }
      `}
    </style> */}
    </div>
  )
}

export { Navbar }
