import { NextPage } from "next"
import { useAuth } from "@hooks/useAuth"
import { AuthContext } from "@context/AuthContext"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const AuthWrapper: NextPage<Props> = ({ children }) => {
  const authState = useAuth(null, null, null)
  console.log(authState)

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}

export { AuthWrapper }
