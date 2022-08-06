// TODO - Change InputElement to InputField
import { createContext, HTMLInputTypeAttribute } from 'react'
import { FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
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

const InputContext = createContext<Props>({
  label: 'Default Label',
  registerLabel: 'example',
  type: 'text',
  variant: 'input'
})

/* 
  NOTE - I could add an opt out prop since this uses react hook form 
  by default, but honestly that probably isn't worth it/needed
*/

const InputElement = ({ ...props }: Props) => {
  const { register } = useFormContext()

  return (
    <InputContext.Provider value={{ ...props }}>
      <div className={styles.container}>
        <label>{props.label}</label>
        {getVariant(props.variant, register, props)}
      </div>
    </InputContext.Provider>
  )
}

const getVariant = (
  variant: Props['variant'],
  register: UseFormRegister<FieldValues>,
  { ...props }
) => {
  switch (variant) {
    case 'textarea':
      return <TextArea {...props} register={register} />
    case 'select':
      return <Select {...props} register={register} />
    default:
      return <Input {...props} register={register} />
  }
}

const Input = ({ ...props }) => (
  <input
    {...props}
    {...props.register(props.registerLabel, { required: true })}
  />
)

const TextArea = ({ ...props }) => (
  <textarea
    rows={5}
    {...props}
    {...props.register(props.registerLabel, { required: true })}
  />
)

const Select = ({ ...props }) => (
  <select
    {...props}
    {...props.register(props.registerLabel, { required: true })}
  >
    <option value='volvo'>Volvo</option>
    <option value='saab'>Saab</option>
    <option value='mercedes'>Mercedes</option>
    <option value='audi'>Audi</option>
  </select>
)

export { InputElement }
