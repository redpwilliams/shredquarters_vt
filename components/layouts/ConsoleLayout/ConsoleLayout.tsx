import { Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { CSSProperties, useState } from 'react'
import { StepButton } from '@components/inputs'
import styles from './ConsoleLayout.module.sass'

type ConsoleStep = {
  label: string
  component: any
}

interface ConsoleLayoutProps {
  steps: ConsoleStep[]
}

const ConsoleLayout = ({ steps }: ConsoleLayoutProps) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSubmit = () => {
    console.log('Submitting')
  }

  const inactiveButtonStyles: CSSProperties = {
    opacity: '50%',
    cursor: 'default'
  }

  return (
    <div className={styles.container}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent style={{ position: 'relative' }}>
              {step.component}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <div className={styles.navButtons}>
        <div className={styles.leftButtons}>
          <StepButton
            onClick={handleBack}
            disabled={activeStep === 0}
            style={activeStep === 0 ? inactiveButtonStyles : undefined}
          >
            Back
          </StepButton>
          <StepButton
            className={styles.nextButton}
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            style={
              activeStep === steps.length - 1 ? inactiveButtonStyles : undefined
            }
          >
            Next
          </StepButton>
        </div>
        <div className={styles.rightButtons}>
          <StepButton
            onClick={handleSubmit}
            disabled={activeStep !== steps.length - 1}
            style={
              activeStep !== steps.length - 1 ? inactiveButtonStyles : undefined
            }
          >
            Submit
          </StepButton>
        </div>
      </div>
    </div>
  )
}

export { ConsoleLayout }
export type { ConsoleStep }
