// TODO - Change InputElement to InputField
import { NextPage } from 'next'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  HTMLInputTypeAttribute
} from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './InputElement.module.sass'

type Props = {
  /** Header of the InputField */
  label: string

  /** Custom label to give the InputField for form hook */
  registerLabel: string

  /** HTML id for string. TODO - Remove across project, this was stupid */
  id?: string

  /** Input type of the field */
  type?: HTMLInputTypeAttribute

  /** Which available type of input to render */
  variant?: 'input' | 'textarea'
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

/* 
  NOTE - I could add an opt out prop since this uses react hook form 
  by default, but honestly that probably isn't worth it/needed
*/

const InputElement: NextPage<Props> = ({
  label,
  registerLabel,
  id,
  type,
  variant = 'input',
  ...props
}) => {
  const { register } = useFormContext()

  return (
    <div className={styles.container} {...props}>
      <label>{label}</label>
      {variant === 'input' ? (
        <input
          id={id}
          type={type}
          {...register(registerLabel, { required: true })}
        />
      ) : (
        <textarea rows={5} {...register(registerLabel, { required: true })} />
      )}
    </div>
  )
}

export { InputElement }
