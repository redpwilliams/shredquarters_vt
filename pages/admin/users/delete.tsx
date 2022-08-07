import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const DeleteUser = () => {
  const emails = ['email1', 'email2', 'email3']
  const DeleteUserSteps: ConsoleStep[] = [
    {
      label: 'Remove a user',
      component: (
        <InputElement
          label='User Email'
          registerLabel='email'
          variant='select'
          list={emails}
        />
      )
    }
  ]

  return <ConsoleLayout steps={DeleteUserSteps} api='/api/admin/create' />
}

type Params = {
  email: string
}

DeleteUser.PageLayout = AdminLayout

export default DeleteUser
export type { Params }
