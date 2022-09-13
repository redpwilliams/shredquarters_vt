import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'
import { supabase } from '@db/_supabase'
import { Officer } from '@public/types'
import { PostgrestResponse } from '@supabase/supabase-js'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch all users
  const { data }: PostgrestResponse<Officer> = await supabase
    .from('officers')
    .select('*')
    .order('id')

  return { props: { officers: data } }
}

interface Props {
  officers: Officer[]
}

const DeleteOfficer = ({ officers }: Props) => {
  const officerNames = officers.map(
    (officer) => `${officer.first_name} ${officer.last_name}`
  )
  const DeleteOfficerSteps: ConsoleStep[] = [
    {
      label: 'Choose an officer to remove',
      component: (
        <InputElement
          label='Officer'
          register_label='officer'
          variant='select'
          list={officerNames}
        />
      )
    }
  ]

  return <ConsoleLayout steps={DeleteOfficerSteps} api='/api/officers/delete' />
}

type Params = { name: string }

DeleteOfficer.PageLayout = AdminLayout

export default DeleteOfficer
export type { Params }
