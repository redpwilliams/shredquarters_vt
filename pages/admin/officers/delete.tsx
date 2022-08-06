import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const DeleteOfficer = () => {
  const officers = ['officer1', 'officer2', 'officer3']
  const DeleteOfficerSteps: ConsoleStep[] = [
    {
      label: 'Choose an officer to remove',
      component: (
        <InputElement
          label='User Email'
          registerLabel='email'
          variant='select'
          list={officers}
        />
      )
    }
  ]

  return <ConsoleLayout steps={DeleteOfficerSteps} api='/api/admin/create' />
}

// TODO - Each crud page should export a type for the data, so the api logic is more clear

DeleteOfficer.PageLayout = AdminLayout

export default DeleteOfficer
