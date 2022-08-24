import { Event } from '@public/types'
import styles from './UpcomingEvent.module.sass'

const UpcomingEvent = ({ event }: { event: Event }) => (
  <li className={styles.container}>
    <header>
      <h3>{new Date(event.date).getDate()}</h3>
      <h4>{new Date(event.date).toLocaleString('en-US', { month: 'long' })}</h4>
    </header>
    <main>
      <p>{event.name}</p>
      <h5>
        @ {event.location},{' '}
        <span>
          {formatTime(event.start_time)} - {formatTime(event.end_time)}
        </span>
      </h5>
    </main>
  </li>
)

// NOTE - temporary until Dialog is better developed.
const formatTime = (start: string) => {
  const time = start.split(':')
  let meridiem: 'am' | 'pm' = 'am'

  // Change to 12 hour format
  let hour = parseInt(time[0])
  if (hour > 12) {
    hour -= 12
    meridiem = 'pm'
  }

  // Format minute string
  const minute = time[1]

  return `${hour}${minute !== '00' ? `:${minute}` : ''} ${meridiem}`
}

export { UpcomingEvent }
