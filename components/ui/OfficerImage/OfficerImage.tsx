import Image from 'next/image'
import { Officer } from '@public/types'
import styles from './OfficerImage.module.sass'

const OfficerImage = ({ officer }: { officer: Officer }) => (
  <li className={styles.container}>
    <div className={styles.img}>
      <Image
        id='img'
        src={officer.src}
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        style={{ borderRadius: '5%' }}
      />
    </div>
    <h1 className={styles.name}>
      {`${formatNames(officer.first_name, officer.last_name)}, `}
      <div>{officer.position}</div>
    </h1>
  </li>
)

const formatNames = (fName: string, lName: string) => {
  if (lName) return `${fName} ${lName}`
  return `${fName}`
}

export { OfficerImage }
