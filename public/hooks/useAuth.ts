import { useEffect, useReducer } from "react"
import { useSession } from "next-auth/react"

/** Function that triggers on that specific authentication state */
type handlerFunction = (() => void) | null

/**
 * Returns the authentication state of the client,
 * and redirects to index if unauthenticated
 *
 * @param signIn Function to run when signing in
 * @param signOut Function to run when signing out
 * @param loading Function to run when loading
 */
const useAuth = (
  signIn: handlerFunction,
  signOut: handlerFunction,
  loading: handlerFunction
): AuthState => {
  const { status } = useSession()
  const [isAuthenticated, dispatch] = useReducer(reducer, false)

  useEffect(() => {
    switch (status) {
      // Runs when client has been authenticated
      case "authenticated":
        dispatch({ type: "authenticated" })
        if (signIn !== null) signIn()
        return

      // Runs when client has been unauthenticated
      case "unauthenticated":
        dispatch({ type: "unauthenticated" })
        if (signOut !== null) signOut()
        return

      // Runs when client is in a loading state
      case "loading":
        dispatch({ type: "loading" })
        if (loading !== null) loading()
        return

      // Should never run
      default:
        throw new Error(`'status' var held an unexpected value: ${status}`)
    }
  }, [status, signIn, signOut, loading])

  return isAuthenticated
}

type AuthState = boolean | null
type Action = { type: "authenticated" | "unauthenticated" | "loading" }

/**
 * `React.useReducer` reducer function to handle state.
 *
 * @param state Current state of the component
 * @param action New state to dispatch
 * @returns { AuthState } The updated state
 */
const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "authenticated":
      return true
    case "unauthenticated":
      return false
  }
  return null
}

export { useAuth }
