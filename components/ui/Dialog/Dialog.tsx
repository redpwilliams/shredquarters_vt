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
import useSWR from 'swr'
import { StepButton } from '@components/inputs'
import { LoadingBackdrop } from '@components/ui'
import styles from './Dialog.module.sass'

// All this is just ripped from MUI
// https://mui.com/material-ui/react-dialog/#customization

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#303030'
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
  steps: ConsoleStep[]
  confirmMessage: string
  apiPath: string
}

const ConfirmDialog: NextPage<IConfirm> = ({
  isOpen,
  setOpen,
  steps,
  confirmMessage,
  apiPath
}) => {
  // Check if api path is good
  if (!apiPath.startsWith('/api/'))
    throw new Error(`Api route ${apiPath} is invalid.`)

  // Get field values/data
  const { getValues } = useFormContext()

  const inputComponentName = 'InputElement'

  // Get an array of all the InputElements (may be nested in a fragment)
  const getConfirmFields = () => {
    const inputsArray: ReactNode[] = []
    const data = getValues()

    steps.forEach((step) => {
      if (step.component.type.name !== inputComponentName) {
        step.component.props.children?.forEach((child: ReactElement) => {
          inputsArray.push(
            <li key={child.props.register_label}>
              <h2>{child.props.label}</h2>
              <p>{data[`${child.props.register_label}`]}</p>
            </li>
          )
        })
      } else
        inputsArray.push(
          <li key={step.component.props.register_label}>
            <h2>{step.component.props.label}</h2>
            <p>{data[`${step.component.props.register_label}`]}</p>
          </li>
        )
    })

    // TODO - Final step to format all fields so they are ready for fetching later on
    return inputsArray
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [backdropStatus, setBackdropStatus] = useState(false)
  const [submitReady, setSubmitReady] = useState(false)

  useSWR(
    submitReady ? apiPath : null,
    async () => {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getValues())
      })

      const json = await res.json()
      return json
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  // TODO - Will add a wait time for better user experience
  const handleSubmit = async () => {
    // Remove Dialog
    setOpen(false)
    setSubmitReady(true)
    // Wait some time
    await new Promise((resolve) => setTimeout(resolve, 1200))
    // Show loading animation
    setBackdropStatus(true)
    // Post data

    await new Promise((resolve) => setTimeout(resolve, 5000))
    // Remove loading animation
    setBackdropStatus(false)
    setSubmitReady(false)
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
          {confirmMessage}
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
