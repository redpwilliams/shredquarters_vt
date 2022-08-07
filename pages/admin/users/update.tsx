import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

// TODO - Admin Page getStaticProps -> useContext to get list of users

const UpdateEvent = () => {
  const userEmails = ['one', 'two', 'three']
  const UpdateEventSteps: ConsoleStep[] = [
    // Event to Update
    {
      label: 'Select an user to update',
      component: (
        <InputElement
          label='User'
          registerLabel='user'
          variant='select'
          list={userEmails}
        />
      )
    },

    {
      label: 'Provide the new email',
      component: (
        <InputElement
          label='Email'
          registerLabel='email'
          placeholder='Previous email here'
        />
      )
    }
  ]

  return <ConsoleLayout steps={UpdateEventSteps} api='/api/users/update' />
}

// What the API will use to format data
type Keys = {
  /** Previous user email */
  email: string
}

// Additional data needed to make request
type Params = {
  /** New user email */
  email: string
}

// NOTE - The union of these types represents the entire user data

UpdateEvent.PageLayout = AdminLayout

export default UpdateEvent
export type { Keys, Params }
