import { NextPage } from "next"
import styles from "./UpcomingEvent.module.sass"

interface Props {
  /** Day of the month of the event */
  day: number

  /** Month of the event */
  month: string

  /** Name of the event */
  name: string

  /** TODO - Time range of the event */

  /** Location of the event */
  location: string

  /** Location link of the event */
  link: string
}

const UpcomingEvent: NextPage<Props> = ({
  day,
  month,
  name,
  location,
  link
}) => {
  return (
    <div className={styles.container}>
      <h3>{stringifyDay(day)}</h3>
      <h4>{month}</h4>
      <p>{name}</p>
      <h5>
        <a href={link}>{`@ ${location}`}</a>
      </h5>
    </div>
  )
}

/** Returns a date in String form, adding a 0 for single digit dates */
const stringifyDay = (date: number): string => {
  return `${date >= 0 && date <= 9 ? `0${date}` : `${date}`}`
}
export { UpcomingEvent }
