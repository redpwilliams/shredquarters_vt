import { InputElement, StepButton } from '@components/inputs'
import { AdminLayout } from '@components/layouts'
import { Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { CSSProperties, useState } from 'react'
import styles from '@styles/Events.module.sass'

type CustomStep = {
  label: string
  component?: any
}

const steps: CustomStep[] = [
  {
    label: 'Add officer first name',
    component: (
      <InputElement label='First Name' style={{ fontSize: '1.5rem' }} />
    )
  },
  {
    label: 'Add officer last name',
    component: <InputElement label='Last Name' style={{ fontSize: '1.5rem' }} />
  },
  // TODO - Add Image
  {
    label: 'Add officer bio',
    component: (
      <InputElement
        label='Biography'
        variant='textarea'
        style={{ fontSize: '1.5rem' }}
      />
    )
  },
  {
    label: 'Confirm data',
    component: (
      <>
        <h2>Is all this information correct?</h2>
        <p>Information goes here</p>
      </>
    )
  }
]
const Officers = () => {
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

Officers.PageLayout = AdminLayout

export default Officers
