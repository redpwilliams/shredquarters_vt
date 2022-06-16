import { createContext } from "react"
import type { AuthState } from "@hooks/useAuth"

const AuthContext = createContext<AuthState>(null)

export { AuthContext }
