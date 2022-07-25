/* eslint-disable no-promise-executor-return */
import { NextPage } from 'next'
import { ReactElement, ReactNode, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { ConsoleStep } from '@components/layouts'
import { useFormContext } from 'react-hook-form'
import { StepButton } from '@components/inputs'
import { LoadingBackdrop } from '@components/ui'
import styles from './Dialog.module.sass'

// All this is just ripped from MUI
// https://mui.com/material-ui/react-dialog/#customization

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    color: '#303030'
  },
  '& .MuiDialogTitle-root': {
    fontSize: '2.5rem',
    color: '#fff'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

interface DialogTitleProps {
  id: string
  children?: ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

interface IConfirm {
  isOpen: boolean
  setOpen: (state: boolean) => void
  title: string
  steps: ConsoleStep[]
}

const ConfirmDialog: NextPage<IConfirm> = ({
  isOpen,
  setOpen,
  title,
  steps
}) => {
  const { getValues } = useFormContext()

  const inputComponentName = 'InputElement'

  const getConfirmFields = () => {
    const inputsArray: ReactNode[] = []
    const data = getValues()

    steps.forEach((step) => {
      if (step.component.type.name !== inputComponentName) {
        // REVIEW - I think this change fixes the issue
        step.component.props.children?.forEach((child: ReactElement) => {
          inputsArray.push(
            <li key={child.props.registerLabel}>
              <h2>{child.props.label}</h2>
              <p>{data[`${child.props.registerLabel}`]}</p>
            </li>
          )
        })
      } else
        inputsArray.push(
          <li key={step.component.props.registerLabel}>
            <h2>{step.component.props.label}</h2>
            <p>{data[`${step.component.props.registerLabel}`]}</p>
          </li>
        )
    })

    return inputsArray
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [backdropStatus, setBackdropStatus] = useState(false)

  const handleSubmit = async () => {
    // Remove Dialog
    setOpen(false)
    // Wait some time
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.log('Start Submit')
    // Show loading animation
    setBackdropStatus(true)
    // Post data

    await new Promise((resolve) => setTimeout(resolve, 5000))
    // Remove loading animation
    setBackdropStatus(false)
    // Alert that submission was successful, or not successful
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={isOpen}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent>
          <ul className={styles.fields}>
            {/* TODO -  */}
            {getConfirmFields().map((li) => li)}
          </ul>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <StepButton
            type='submit'
            onClick={handleSubmit}
            style={{ width: '50%' }}
          >
            Submit
          </StepButton>
        </DialogActions>
      </BootstrapDialog>
      <div style={{ display: backdropStatus ? '' : 'none' }}>
        <LoadingBackdrop />
      </div>
    </div>
  )
}

export { ConfirmDialog }
