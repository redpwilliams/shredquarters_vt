import { CSSProperties, useState } from 'react'
import { Step, StepContent, StepLabel, Stepper, Alert } from '@mui/material'
import { ConfirmDialog } from '@components/ui/Dialog/Dialog'
import { StepButton } from '@components/inputs'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler
} from 'react-hook-form'
import styles from './ConsoleLayout.module.sass'

/** Blueprint for each step of the Stepper */
type ConsoleStep = {
  /** The label of the step */
  label: string

  /** Component to render for that step */
  component: JSX.Element
}

/** Props for the ConsoleLayout */
interface ConsoleLayoutProps {
  /** An array of steps to be included in the Stepper */
  steps: ConsoleStep[]

  /** Function to handle when form is submitted */
  // onSubmit?: SubmitHandler<any>
}

/** Format for hook fields */
interface IFormProps {
  [key: string]: string
}

const ConsoleLayout = ({ steps }: ConsoleLayoutProps) => {
  const [submitReady, setSubmitReady] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  // Stepper navigation
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const inactiveButtonStyles: CSSProperties = {
    opacity: '50%',
    cursor: 'default'
  }

  const methods = useForm()

  const onSubmit: SubmitHandler<IFormProps> = () => {
    setHasErrors(false)
    setSubmitReady(true)
  }

  const onError: SubmitErrorHandler<IFormProps> = () => {
    setHasErrors(true)
  }

  return (
    <FormProvider {...methods}>
      <form
        className={styles.container}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent
                TransitionProps={{ unmountOnExit: false }}
                style={{ position: 'relative' }}
              >
                {step.component}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <div className={styles.navButtons}>
          <div className={styles.leftButtons}>
            <StepButton
              type='button'
              onClick={handleBack}
              disabled={activeStep === 0}
              style={activeStep === 0 ? inactiveButtonStyles : undefined}
            >
              Back
            </StepButton>
            <StepButton
              type='button'
              className={styles.nextButton}
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              style={
                activeStep === steps.length - 1
                  ? inactiveButtonStyles
                  : undefined
              }
            >
              Next
            </StepButton>
          </div>
          <div className={styles.rightButtons}>
            <StepButton
              type='submit'
              disabled={activeStep !== steps.length - 1}
              style={
                activeStep !== steps.length - 1
                  ? inactiveButtonStyles
                  : undefined
              }
            >
              Submit
            </StepButton>
          </div>
        </div>
        <Alert
          severity='error'
          sx={{
            display: hasErrors ? '' : 'none',
            margin: '0 auto',
            fontSize: '1.25rem',
            alignItems: 'center'
          }}
        >
          Error: Ensure all fields are completed
        </Alert>
        <ConfirmDialog
          isOpen={submitReady}
          setOpen={setSubmitReady}
          title='Submit this information?'
          steps={steps}
        />
      </form>
    </FormProvider>
  )
}

export { ConsoleLayout }
export type { ConsoleStep }
