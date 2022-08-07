import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@public/types'
import type { PostgrestResponse } from '@supabase/supabase-js'
import { supabase } from '@db/_supabase'
import { Params } from 'pages/admin/users/delete'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure request is authenticated
  await validate(req, res)

  const params: Params = {
    email: req.body.email
  }

  // Handle GET request
  if (req.method === 'DELETE') {
    const { data, error }: PostgrestResponse<User> = await supabase
      .from('events')
      .delete()
      .match(params)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  // Handle wrong request type
  return res.status(400).json({ error: 'Wrong request type' })
}
