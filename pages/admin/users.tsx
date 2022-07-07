import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const usersSteps: ConsoleStep[] = [
  {
    label: 'Add a user email',
    component: (
      <InputElement label='User Email' style={{ fontSize: '1.5rem' }} />
    )
  },
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
