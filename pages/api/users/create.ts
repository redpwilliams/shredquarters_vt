import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@public/types'
import type { Keys } from 'pages/admin/users/create'
import type { PostgrestResponse } from '@supabase/postgrest-js'
import { supabase } from '@db/_supabase'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validate(req, res)

  const entry: Keys = { email: req.body.email }

  if (req.method === 'POST') {
    const { data, error }: PostgrestResponse<User> = await supabase
      .from('admin_users')
      .insert(entry)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
