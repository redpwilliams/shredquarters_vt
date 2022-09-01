import Image from 'next/image'
import { ReactNode } from 'react'
import styles from './BoardType.module.sass'

interface Props {
  src: string
  alt: string
  header: string
  children: ReactNode
}

const BoardType = ({ src, alt, header, children }: Props) => (
  <li className={styles.container}>
    <div className={styles.board}>
      <div className={styles.iso}>
        <Image src={src} width={64} height={64} alt={alt} layout='responsive' />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{header}</h2>
        <p className={styles.description}>{children}</p>
      </div>
    </div>
  </li>
)

export { BoardType }
