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

  /** Description */
  description: string

  /** Location of the event */
  location: string
}

type Officer = {
  /** Database Id number */
  id: number

  /** Officer's first name */
  first_name: string

  /** Officer's last name */
  last_name: string

  /** Officer's position/role in the club */
  position: string

  /** Officer's bio */
  bio: string

  /** The officer's corresponding image src */
  src: string
}

type User = {
  id: number
  email: string
}

export type { Event, Officer, User }
