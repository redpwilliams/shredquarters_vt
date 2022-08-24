import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const AddOfficer = () => {
  const AddOfficerSteps: ConsoleStep[] = [
    // Officer's First Name
    {
      // NOTE - Drop down to select an officer for editing info?
      // Either that or a update/delete toggle? Not priority
      label: 'Add an officer',
      component: <InputElement label='Officer' registerLabel='name' />
    },

    // Officer Title
    {
      label: 'Specify their position',
      component: <InputElement label='Position' registerLabel='position' />
    },

    // Officer Bio
    {
      label: 'Write the bio',
      component: (
        <InputElement
          label='Biography'
          variant='textarea'
          registerLabel='bio'
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
