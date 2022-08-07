type Event = {
  name: string
  date: string
  start_time: string
  end_time: string
  location: string
}

type Officer = {
  id: number
  name: string
  title: string | null
}

type User = {
  email: string
}

export type { Event, Officer, User }
