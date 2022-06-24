import { NextPage } from "next"
import styles from "./InputElement.module.sass"
import {
  DetailedHTMLProps,
  HTMLAttributes,
  HTMLInputTypeAttribute
} from "react"

type InputElement = {
  label: string
  id?: string
  type?: HTMLInputTypeAttribute
  variant?: "input" | "textarea"
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const InputElement: NextPage<InputElement> = ({
  label,
  id,
  type,
  variant = "input",
  ...props
}) => {
  console.log(props)
  return (
    <div className={styles.ie} {...props}>
      <label>{label}</label>
      {variant === "input" ? <input id={id} type={type} /> : <textarea />}
    </div>
  )
}

export { InputElement }
