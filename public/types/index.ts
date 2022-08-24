/**
 * Event Type
 * Events are shown on the events section of the website
 * and has qualities relating to the name and setting of the event
 */
type Event = {
  /** Database Id number */
  id: number

  /** Name of the event */
  name: string

  /** Full date of the event in YYYY-mm-dd format */
  date: Date

  /** Start time */
  start_time: string

  /** End time */
  end_time: string

  /** Location of the event */
  location: string
}

type Officer = {
  /** Database Id number */
  id: number

  /** Officer's full name */
  name: string

  /** Officer's position/role in the club */
  position: string
}

type User = {
  id: number
  email: string
}

export type { Event, Officer, User }
