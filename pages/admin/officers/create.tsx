import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const AddOfficer = () => {
  const AddOfficerSteps: ConsoleStep[] = [
    // Officer's First Name
    {
      label: 'Provide their first name',
      component: <InputElement label='First Name' register_label='First Name' />
    },

    // Officer's First Name
    {
      label: 'Provide their last name',
      component: <InputElement label='Last Name' register_label='Last Name' />
    },

    // Officer position
    {
      label: 'Specify their position',
      component: <InputElement label='Position' register_label='Position' />
    },

    // Officer Bio
    {
      label: 'Write the bio',
      component: (
        <InputElement
          label='Biography'
          variant='textarea'
          register_label='Bio'
        />
      )
    }
  ]

  return <ConsoleLayout steps={AddOfficerSteps} api='/api/officers/create' />
}

AddOfficer.PageLayout = AdminLayout

// What the API will use to format data
// These match the columns of the db
type Keys = {
  /** Officer's first name */
  first_name: string

  /** Officer's last name */
  last_name: string

  /** Officer's position */
  position: string

  /** Officer biography */
  bio: string

  /** Image source */
  src: string
}

export default AddOfficer
export type { Keys }
