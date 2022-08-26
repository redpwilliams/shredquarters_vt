import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'

// TODO - Admin Page getStaticProps -> useContext to get names and qualities of projects

const UpdateEvent = () => {
  const eventNames = ['one', 'two', 'three']
  const UpdateEventSteps: ConsoleStep[] = [
    // Event to Update
    {
      label: 'Select an event to update',
      component: (
        <InputElement
          label='Event'
          register_label='event_name'
          variant='select'
          list={eventNames}
        />
      )
    },

    // Update name?
    // NOTE - Inputs with placeholder don't need to have new info,
    // it should just be previous value if blanked
    {
      label: "Update the event's name",
      component: (
        <InputElement
          label='Name'
          register_label='new_name'
          placeholder='Previous name here'
        />
      )
    },

    // Event Characteristics
    {
      label: 'Update the characteristics',
      component: (
        <>
          <InputElement label='Date' type='date' register_label='date' />
          <InputElement label='Start Time' type='time' register_label='start' />
          <InputElement label='End Time' type='time' register_label='end' />
        </>
      )
    },

    {
      label: 'Update the location',
      component: (
        <InputElement
          label='Location'
          register_label='new_location'
          placeholder='Previous location here'
        />
      )
    }
  ]

  return <ConsoleLayout steps={UpdateEventSteps} api='/api/events/update' />
}

// What the API will use to format data
type Keys = {
  /** New name of the event */
  name: string

  /** New date */
  date: string

  /** New start time */
  start_time: string

  /** New end time */
  end_time: string

  /** New location */
  location: string
}

// Additional data needed to make request
type Params = {
  /** Original name of the event */
  name: string
}

// NOTE - The union of these types represents the entire user data

UpdateEvent.PageLayout = AdminLayout

export default UpdateEvent
export type { Keys, Params }
