import { AdminLayout, ConsoleLayout } from '@components/layouts'
import { InputElement } from '@components/inputs'
import type { ConsoleStep } from '@components/layouts'
import { supabase } from '@db/_supabase'
import { User } from '@public/types'
import { PostgrestResponse } from '@supabase/supabase-js'
import { GetServerSideProps } from 'next'

// TODO - Admin Page getStaticProps -> useContext to get list of users
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch users
  const { data }: PostgrestResponse<User> = await supabase
    .from('admin_users')
    .select('*')
    .order('id')

  return { props: { users: data } }
}

interface IUpdateUsers {
  users: User[]
}

const UpdateUser = ({ users }: IUpdateUsers) => {
  const userEmails = users.map((user) => user.email)
  const UpdateEventSteps: ConsoleStep[] = [
    // Event to Update
    {
      label: 'Select an user to update',
      component: (
        <InputElement
          label='Previous Email'
          registerLabel='user'
          variant='select'
          list={userEmails}
        />
      )
    },

    {
      label: 'Provide the new email',
      component: <InputElement label='New Email' registerLabel='email' />
    }
  ]

  return <ConsoleLayout steps={UpdateEventSteps} api='/api/users/update' />
}

// What the API will use to format data
type Keys = {
  /** Previous user email */
  email: string
}

// Additional data needed to make request
type Params = {
  /** New user email */
  email: string
}

// NOTE - The union of these types represents the entire user data

UpdateUser.PageLayout = AdminLayout

export default UpdateUser
export type { Keys, Params }
