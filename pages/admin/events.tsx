import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

const Events = () => {
  const eventSteps: ConsoleStep[] = [
    // Event Name
    {
      label: 'Choose an event name',
      component: <InputElement label='Name' registerLabel='name' />
    },

    // Event Characteristics
    {
      label: 'Select event characteristics',
      component: (
        <>
          <InputElement label='Date' type='date' registerLabel='date' />
          <InputElement label='Start Time' type='time' registerLabel='start' />
          <InputElement label='End Time' type='time' registerLabel='end' />
        </>
      )
    }
  ]

  return <ConsoleLayout steps={eventSteps} />
}

Events.PageLayout = AdminLayout

export default Events
