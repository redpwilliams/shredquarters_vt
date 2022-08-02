import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const AddOfficer = () => {
  const AddOfficerSteps: ConsoleStep[] = [
    // Officer's First Name
    {
      // NOTE - Drop down to select an officer for editing info?
      // Either that or a update/delete toggle? Not priority
      label: 'Add officer first name',
      component: <InputElement label='First Name' registerLabel='first_name' />
    },

    // Officer's Last Name
    {
      label: 'Add officer last name',
      component: <InputElement label='Last Name' registerLabel='last_name' />
    },

    // TODO - Add Image

    // Officer Bio
    {
      label: 'Add officer bio',
      component: (
        <InputElement
          label='Biography'
          variant='textarea'
          registerLabel='bio'
        />
      )
    }
  ]

  return <ConsoleLayout steps={AddOfficerSteps} api='/api/officer/create' />
}

AddOfficer.PageLayout = AdminLayout

export default AddOfficer
