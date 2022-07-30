type Officer = {
  id: number
  first_name: string
  last_name: string
  title: string | null
}

type Event = {
  name: string
  date: string
  start_time: string
  end_time: string
  location: string
}

export type { Officer, Event }
