import Image from 'next/image'
import { Officer } from '@public/types'
import styles from './OfficerImage.module.sass'

const OfficerImage = ({ officer }: { officer: Officer }) => (
  <li className={styles.container} key={officer.id}>
    <div className={styles.img}>
      <Image
        id='img'
        src={officer.src}
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        priority
        style={{ borderRadius: '5%' }}
      />
    </div>
    <h1 className={styles.name}>
      {`${officer.first_name} ${officer.last_name}`.trim()}
      <div>{officer.position}</div>
    </h1>
  </li>
)

export { OfficerImage }
