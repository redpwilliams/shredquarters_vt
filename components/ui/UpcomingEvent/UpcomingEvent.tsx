import styles from './UpcomingEvent.module.sass'

interface Props {
  /** Full date of the event in YYYY-mm-dd format */
  date: string

  /** Name of the event */
  name: string

  /** Start time */
  start_time: string

  /** End time */
  end_time: string

  /** Location of the event */
  location: string

  /** Google maps link of the event */
  link?: string
}

const UpcomingEvent = ({
  date,
  name,
  start_time,
  end_time,
  location,
  link
}: Props) => (
  <li className={styles.container}>
    <header>
      <h3>{date.split('-')[2]}</h3>
      <h4>{getMonth(date)}</h4>
    </header>
    <main>
      <p>{name}</p>
      <h5>
        <a href={link}>
          @ {location},{' '}
          <span>
            {formatTime(start_time)} - {formatTime(end_time)}
          </span>
        </a>
      </h5>
    </main>
  </li>
)

const getMonth = (date: string) => {
  const month = date.split('-')[1]
  switch (month) {
    case '01':
      return 'January'
    case '02':
      return 'February'
    case '03':
      return 'March'
    case '04':
      return 'April'
    case '05':
      return 'May'
    case '06':
      return 'June'
    case '07':
      return 'July'
    case '08':
      return 'August'
    case '09':
      return 'September'
    case '10':
      return 'October'
    case '11':
      return 'November'
    case '12':
      return 'December'
    default:
      Error('Lmao you messed up')
      return ''
  }
}

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
