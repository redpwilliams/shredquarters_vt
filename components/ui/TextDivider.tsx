import { NextPage } from 'next'
import styles from './TextDivider.module.sass'

interface Props {
  /** Header text to display on divider */
  header: string

  /**
   * % to float from left.
   * Must be >= 0 and <= 100.
   * Defaults to 0%.
   */
  float?: number | string
}

const TextDivider: NextPage<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  header,
  float = '0%',
  ...props
}) => {
  if (typeof float === 'number') float = `${float}%`

  return (
    <div className={styles.container} {...props}>
      <h3
        className={styles.text}
        style={{ left: float, transform: `translateX(-${float})` }}
      >
        {header}
      </h3>
    </div>
  )
}

export { TextDivider }
