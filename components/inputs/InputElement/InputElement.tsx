// TODO - Change InputElement to InputField
import { HTMLInputTypeAttribute } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './InputElement.module.sass'

type Variant =
  | {
      variant: 'select'
      list: string[]
    }
  | {
      variant: 'textarea'
    }
  | {
      variant?: 'input'
      placeholder?: string
    }

type Props = Variant & {
  /** Header of the InputField */
  label: string

  /** Custom label to give the InputField for form hook */
  registerLabel: string

  /** Input type of the field */
  type?: HTMLInputTypeAttribute
}

/* 
  NOTE - I could add an opt out prop since this uses react hook form 
  by default, but honestly that probably isn't worth it/needed
*/

const InputElement = ({ ...props }: Props) => (
  <div className={styles.container}>
    <label>{props.label}</label>
    {getVariant(props.variant, props)}
  </div>
)

const getVariant = (variant: Props['variant'], { ...props }) => {
  switch (variant) {
    case 'textarea':
      return <TextArea {...props} />
    case 'select':
      return <Select {...props} />
    default:
      return <Input {...props} />
  }
}

const Input = ({ ...props }) => {
  const { register } = useFormContext()
  return (
    <input {...props} {...register(props.registerLabel, { required: true })} />
  )
}

const TextArea = ({ ...props }) => {
  const { register } = useFormContext()
  return (
    <textarea
      rows={5}
      {...props}
      {...register(props.registerLabel, { required: true })}
    />
  )
}

const Select = ({ ...props }) => {
  const { register } = useFormContext()
  return (
    <select {...props} {...register(props.registerLabel, { required: true })}>
      {props.list.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export { InputElement }
