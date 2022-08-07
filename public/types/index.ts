type Officer = {
  id: number
  name: string
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
