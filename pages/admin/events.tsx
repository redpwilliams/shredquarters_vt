import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

const Events = () => {
  const eventSteps: ConsoleStep[] = [
    // Event Name
    {
      label: 'Choose an event name',
      component: <InputElement label='Event name' />
    },

    // Event Characteristics
    {
      label: 'Select event characteristics',
      component: (
        <>
          <InputElement label='Event date' type='date' />
          <InputElement label='Event Start Time' type='time' />
          <InputElement label='Event End Time' type='time' />
        </>
      )
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
  return <ConsoleLayout steps={eventSteps} />
}

Events.PageLayout = AdminLayout

export default Events
