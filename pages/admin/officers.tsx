import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const officerSteps: ConsoleStep[] = [
  // Officer's First Name
  {
    label: 'Add officer first name', // NOTE - Drop down to select an officer for editing info?
    component: (
      <InputElement label='First Name' style={{ fontSize: '1.5rem' }} />
    )
  },

  // Officer's Last Name
  {
    label: 'Add officer last name',
    component: <InputElement label='Last Name' style={{ fontSize: '1.5rem' }} />
  },

  // TODO - Add Image

  // Officer Bio
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

  // Confirm
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

const Officers = () => <ConsoleLayout steps={officerSteps} />

Officers.PageLayout = AdminLayout

export default Officers
