import Image from 'next/image'
import { Officer } from '@public/types'
import { motion } from 'framer-motion'
import styles from './OfficerImage.module.sass'

const OfficerImage = ({
  officer,
  index
}: {
  officer: Officer
  index: number
}) => (
  <motion.li
    className={styles.container}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index ** (1 / 3) }}
  >
    <div className={styles.header}>
      <div className={styles.img}>
        <Image
          id='img'
          src={officer.src}
          width='144px'
          height='144px'
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
  </motion.li>
)

export { OfficerImage }
