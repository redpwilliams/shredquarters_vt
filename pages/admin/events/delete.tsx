import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'
import type { Event } from '@public/types'
import { supabase } from '@db/_supabase'
import { PostgrestResponse } from '@supabase/supabase-js'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch all users
  const { data }: PostgrestResponse<Event> = await supabase
    .from('events')
    .select('*')
    .order('id')

  return { props: { events: data } }
}

interface Props {
  events: Event[]
}

const DeleteEvent = ({ events }: Props) => {
  const eventNames = events.map((event) => event.name)
  const DeleteEventSteps: ConsoleStep[] = [
    // Event to Delete
    {
      label: 'Select an event to remove',
      component: (
        <InputElement
          label='Event'
          register_label='event_name'
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

type Params = { name: string }

DeleteEvent.PageLayout = AdminLayout

export default DeleteEvent
export type { Params }
