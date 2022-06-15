import { useEffect, useReducer, useRef } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

/**
 * Returns the authentication state of the client,
 * and redirects to index if unauthenticated
 */
const useAuth = () => {
  const router = useRouter()
  const { status } = useSession()
  const [isAuthenticated, dispatch] = useReducer(reducer, false)

  /**
   * `false` if client has no record of being authenticated
   * during the lifetime of the session,
   * `true` if there is a record (such as being signed out)
   *
   * Used to push client to home vs sign in page
   */
  const authedPrior = useRef(false)

  useEffect(() => {
    switch (status) {
      // Maintains that client has been authenticated
      case "authenticated":
        dispatch({ type: "authenticated" })
        authedPrior.current = true

      // Pushes route to home or sign in based on prior auth status
      case "unauthenticated":
        dispatch({ type: "unauthenticated" })
        if (authedPrior.current) {
          router.push("/")
        } else router.push("/auth/signIn")

      // Loading state, if necessary
      case "loading":
        dispatch({ type: "loading" })

      // Should never run
      default:
        throw new Error(`'status' var held an unexpected value: ${status}`)
    }
  }, [status, router])

  return isAuthenticated
}

type State = boolean
type Action = { type: "authenticated" | "unauthenticated" | "loading" }

/**
 * `React.useReducer` reducer function to handle state.
 *
 * @param state Current state of the component
 * @param action New state to dispatch
 * @returns { State } The updated state
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "authenticated":
      return true
    case "unauthenticated":
      return false
  }
  return false
}

export { useAuth }
