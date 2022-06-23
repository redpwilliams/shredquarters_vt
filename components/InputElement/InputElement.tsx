import { NextPage } from "next"
import { HTMLInputTypeAttribute } from "react"

interface InputElement {
  label: string
  id?: string
  type?: HTMLInputTypeAttribute
  variant?: "input" | "textarea"
}

const InputElement: NextPage<InputElement> = ({
  label,
  id,
  type,
  variant = "input"
}) => {
  return (
    <>
      <label>{label}</label>
      {variant === "input" ? <input id={id} type={type} /> : <textarea />}
    </>
  )
}

export { InputElement }
