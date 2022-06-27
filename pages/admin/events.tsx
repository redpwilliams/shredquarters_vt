import { AdminLayout } from '@layouts/AdminLayout'
import { StepButton } from '@components/StepButton/StepButton'
import { Step, Stepper, StepLabel, StepContent } from '@mui/material'
import { useState, CSSProperties } from 'react'
import styles from '@styles/Events.module.sass'
import { InputElement } from '@components/InputElement/InputElement'

type CustomStep = {
  label: string
  description: string
  component?: any
}

const steps: CustomStep[] = [
  {
    label: 'Choose an event name',
    description: 'This is the description for choosing a name',
    component: (
      <InputElement
        label='Event name'
        style={{ fontSize: '1.5rem' }}
        id={styles.inpute}
      />
    )
  },

  {
    label: 'Select event characteristics',
    description: 'Description for characteristics'
  },
  { label: 'Confirm data', description: 'Confirm data here' }
]

const Events = () => {
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

Events.PageLayout = AdminLayout

export default Events
