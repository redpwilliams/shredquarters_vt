import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

const DeleteEvent = () => {
  const eventNames = ['one, two, three']
  const DeleteEventSteps: ConsoleStep[] = [
    // Event to Delete
    {
      label: 'Select an event to remove',
      component: (
        <InputElement
          label='Event'
          registerLabel='event_name'
          variant='select'
          list={eventNames}
        />
      )
    }
  ]

  return (
    <ConsoleLayout
      steps={DeleteEventSteps}
      confirmMessage='Are you sure you want to delete this event?'
      api='/api/events/delete'
    />
  )
}

type Params = { event_name: string }

DeleteEvent.PageLayout = AdminLayout

export default DeleteEvent
export type { Params }
