import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

const CreateEvent = () => {
  const CreateEventSteps: ConsoleStep[] = [
    // Event Name
    {
      label: 'Choose an event name',
      component: <InputElement label='Name' register_label='name' />
    },

    // Event Characteristics
    {
      label: 'Select event characteristics',
      component: (
        <>
          <InputElement label='Date' type='date' register_label='date' />
          <InputElement label='Start Time' type='time' register_label='start' />
          <InputElement label='End Time' type='time' register_label='end' />
        </>
      )
    },

    // Event Location
    {
      label: "Choose the event's location",
      component: <InputElement label='Location' register_label='location' />
    }
  ]

  return <ConsoleLayout steps={CreateEventSteps} api='/api/events/create' />
}

CreateEvent.PageLayout = AdminLayout

export default CreateEvent
