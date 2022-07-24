import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import styles from './StepButton.module.sass'

type StepButtonProps = {
  children: ReactNode
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const StepButton = ({ children, ...props }: StepButtonProps) => (
  <button className={styles.container} type={props.type} {...props}>
    {children}
  </button>
)

export { StepButton }
