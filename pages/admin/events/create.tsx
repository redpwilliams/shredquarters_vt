import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

const CreateEvent = () => {
  const CreateEventSteps: ConsoleStep[] = [
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
    },

    // Event Location
    {
      label: "Choose the event's location",
      component: <InputElement label='Location' registerLabel='location' />
    }
  ]

  return <ConsoleLayout steps={CreateEventSteps} api='/api/events/create' />
}

CreateEvent.PageLayout = AdminLayout

export default CreateEvent
