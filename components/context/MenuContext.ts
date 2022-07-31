import { createContext } from 'react'

interface IMC {
  menuState: boolean
  setMenuState: (state: boolean) => void
}

const MenuContext = createContext<IMC>({
  menuState: false,
  setMenuState: () => undefined
})

export { MenuContext }
