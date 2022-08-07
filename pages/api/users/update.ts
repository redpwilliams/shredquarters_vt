import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@public/types'
import type { Keys, Params } from 'pages/admin/users/update'
import type { PostgrestResponse } from '@supabase/postgrest-js'
import { supabase } from '@db/_supabase'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure request is authenticated
  await validate(req, res)

  // Data to push to db
  const entry: Keys = {
    email: req.body.email
  }

  // Parameters needed to make request
  const params: Params = { email: req.body.user }

  if (req.method === 'PATCH') {
    const { data, error }: PostgrestResponse<User> = await supabase
      .from('events')
      .update(entry)
      .match(params)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
