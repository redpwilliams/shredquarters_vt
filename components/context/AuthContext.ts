import { createContext } from 'react'
import type { AuthState } from '@components/hooks'

const AuthContext = createContext<AuthState>(null)

export { AuthContext }
