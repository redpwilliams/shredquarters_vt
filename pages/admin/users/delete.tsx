import { InputElement } from '@components/inputs'
import { AdminLayout, ConsoleLayout, ConsoleStep } from '@components/layouts'
import { supabase } from '@db/_supabase'
import { PostgrestResponse } from '@supabase/supabase-js'
import { GetServerSideProps } from 'next'
import { User } from '@public/types'

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch all users
  const { data }: PostgrestResponse<User> = await supabase
    .from('admin_users')
    .select('*')
    .order('id')

  return { props: { users: data } }
}

interface Props {
  users: User[]
}

const DeleteUser = ({ users }: Props) => {
  const emails = users.map((user) => user.email)
  const DeleteUserSteps: ConsoleStep[] = [
    {
      label: 'Remove a user',
      component: (
        <InputElement
          label='User Email'
          register_label='email'
          variant='select'
          list={emails}
        />
      )
    }
  ]

  return <ConsoleLayout steps={DeleteUserSteps} api='/api/users/delete' />
}

type Params = {
  /** Selected email to remove from db */
  email: string
}

DeleteUser.PageLayout = AdminLayout

export default DeleteUser
export type { Params }
