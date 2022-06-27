import { NextPage } from 'next'
import Image from 'next/image'
import { ReactNode } from 'react'
import styles from './BoardType.module.sass'

interface Props {
  src: string
  alt: string
  children: ReactNode
}

const BoardType: NextPage<Props> = ({ src, alt, children }) => (
  <li className={styles.container}>
    <div className={styles.board}>
      <div className={styles.iso}>
        <Image src={src} width={64} height={64} alt={alt} layout='responsive' />
      </div>
      <p className={styles.description}>{children}</p>
    </div>
  </li>
)

export { BoardType }
