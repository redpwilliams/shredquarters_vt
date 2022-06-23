import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from "react"

type StepButtonProps = {
  children?: ReactNode
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const StepButton = ({ children, ...props }: StepButtonProps) => {
  return <button {...props}>{children}</button>
}

export { StepButton }
