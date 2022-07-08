import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const usersSteps: ConsoleStep[] = [
  // New User Email
  {
    label: 'Add a user email',
    component: <InputElement label='User Email' />
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

const Users = () => <ConsoleLayout steps={usersSteps} />

Users.PageLayout = AdminLayout

export default Users
