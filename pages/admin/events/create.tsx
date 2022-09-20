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

    // Event Description
    {
      label: "Write the event's description",
      component: (
        <InputElement
          label='Description'
          register_label='description'
          variant='textarea'
        />
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

type Keys = {
  /** Name of the event */
  name: string

  /** When the event takes place */
  date: string

  /** Event start time */
  start_time: string

  /** Event end time */
  end_time: string

  /** Event description */
  description: string

  /** Event location */
  location: string
}

CreateEvent.PageLayout = AdminLayout

export default CreateEvent
export type { Keys }
