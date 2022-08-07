import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const AddUser = () => {
  const AddUserSteps: ConsoleStep[] = [
    // New User Email
    {
      label: 'Add a user email',
      component: (
        <InputElement label='User Email' type='email' registerLabel='email' />
      )
    }
  ]

  return <ConsoleLayout steps={AddUserSteps} api='/api/users/create' />
}

type Keys = {
  email: string
}

AddUser.PageLayout = AdminLayout

export default AddUser
export type { Keys }
