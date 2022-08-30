import Image from 'next/image'
import { Officer } from '@public/types'
import styles from './OfficerImage.module.sass'

const OfficerImage = ({ officer }: { officer: Officer }) => (
  <li className={styles.container}>
    <div className={styles.header}>
      <div className={styles.img}>
        <Image
          id='img'
          src={officer.src}
          width='192px'
          height='192px'
          layout='fixed'
          objectFit='cover'
          style={{ borderRadius: '5%' }}
        />
      </div>
      <div className={styles.name}>
        <h1>{officer.first_name}</h1>
        <h2>{officer.last_name}</h2>
      </div>
    </div>
    <div className={styles.info}>
      <h3>
        <span>{officer.position}</span>
      </h3>
      <p>{officer.bio}</p>
    </div>
  </li>
)

export { OfficerImage }
