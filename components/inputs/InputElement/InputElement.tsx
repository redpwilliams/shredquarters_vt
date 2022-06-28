import { NextPage } from 'next'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  HTMLInputTypeAttribute
} from 'react'
import styles from './InputElement.module.sass'

type Props = {
  label: string
  id?: string
  type?: HTMLInputTypeAttribute
  variant?: 'input' | 'textarea'
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const InputElement: NextPage<Props> = ({
  label,
  id,
  type,
  variant = 'input',
  ...props
}) => (
  <div className={styles.ie} {...props}>
    <label>{label}</label>
    {variant === 'input' ? <input id={id} type={type} /> : <textarea />}
  </div>
)

export { InputElement }
