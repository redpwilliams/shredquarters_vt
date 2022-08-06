import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

const DeleteEvent = () => {
  const ol = ['one, two, three']
  const DeleteEventSteps: ConsoleStep[] = [
    // Event to Delete
    {
      label: 'Select an event to remove',
      component: (
        <InputElement
          label='Selected Event'
          registerLabel='event_name'
          variant='select'
          list={ol}
        />
      )
    }
  ]

  return <ConsoleLayout steps={DeleteEventSteps} api='/api/event/delete' />
}

DeleteEvent.PageLayout = AdminLayout

export default DeleteEvent
