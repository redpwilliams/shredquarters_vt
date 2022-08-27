import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Officer } from '@public/types'
import styles from './OfficerImage.module.sass'

const OfficerImage = ({ officer }: { officer: Officer }) => {
  const DEFAULT_IMAGE_PATH = '/img/DefaultProjectImage.png'
  const [imageUrl, setImageUrl] = useState(officer.src)
  console.log(officer.src)

  useCallback(async () => {
    // Set to URL, or default image if it doesn't exist
    setImageUrl(officer.src || DEFAULT_IMAGE_PATH)
  }, [officer.src])

  return (
    <li>
      <div className={styles.img}>
        <Image id='img' src={imageUrl} width={264} height={264} />
      </div>
      <div className={styles.content}>
        <h1>{officer.first_name}</h1>
        <h2>{officer.last_name}</h2>
      </div>
    </li>
  )
}

export { OfficerImage }
