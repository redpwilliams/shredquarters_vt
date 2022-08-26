import { useCallback, useState } from 'react'
import Image from 'next/image'

interface Props {
  /**
   * Name of the image. Should be the officer's name
   * Format: {first name}_{last_name}
   */
  src: string
  first_name: string
  // last_name: string
}

const OfficerImage = ({ src, first_name }: Props) => {
  const DEFAULT_IMAGE_PATH = '/img/DefaultProjectImage.png'
  const [imageUrl, setImageUrl] = useState(`${src}${first_name}`)
  console.log(src)

  useCallback(async () => {
    // Set to URL, or default image if it doesn't exist
    setImageUrl(src || DEFAULT_IMAGE_PATH)
  }, [src])

  return <Image id='img' src={imageUrl} width={264} height={264} />
}

export { OfficerImage }
