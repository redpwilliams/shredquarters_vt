import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const AddOfficer = () => {
  const AddOfficerSteps: ConsoleStep[] = [
    // Officer's First Name
    {
      label: 'Provide their first name',
      component: <InputElement label='Officer' register_label='name' />
    },

    // Officer's First Name
    {
      label: 'Provide their last name',
      component: <InputElement label='Officer' register_label='name' />
    },

    // Officer position
    {
      label: 'Specify their position',
      component: <InputElement label='Position' register_label='position' />
    },

    // Officer Bio
    {
      label: 'Write the bio',
      component: (
        <InputElement
          label='Biography'
          variant='textarea'
          register_label='bio'
        />
      )
    }
  ]

  return <ConsoleLayout steps={AddOfficerSteps} api='/api/officers/create' />
}

AddOfficer.PageLayout = AdminLayout

// What the API will use to format data
type Keys = {
  /** Officer's name */
  name: string

  /** Officer's position */
  position: string

  /** Officer biography */
  bio: string
}

export default AddOfficer
export type { Keys }
