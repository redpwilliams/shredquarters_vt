import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'

const DeleteOfficer = () => {
  const officers = ['officer1', 'officer2', 'officer3']
  const DeleteOfficerSteps: ConsoleStep[] = [
    {
      label: 'Choose an officer to remove',
      component: (
        <InputElement
          label='Officer'
          registerLabel='officer'
          variant='select'
          list={officers}
        />
      )
    }
  ]

  return (
    <ConsoleLayout
      steps={DeleteOfficerSteps}
      api='/api/admin/officers/delete'
    />
  )
}

type Params = { name: string }

DeleteOfficer.PageLayout = AdminLayout

export default DeleteOfficer
export type { Params }
