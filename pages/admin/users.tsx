import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const usersSteps: ConsoleStep[] = [
  // New User Email
  {
    label: 'Add a user email',
    component: (
      <InputElement label='User Email' type='email' registerLabel='email' />
    )
  }
]

const Users = () => <ConsoleLayout steps={usersSteps} />

Users.PageLayout = AdminLayout

export default Users
