import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@public/types'
import type { PostgrestResponse } from '@supabase/postgrest-js'
import type { Keys } from 'pages/admin/officers/create'
import { supabase } from '@db/_supabase'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validate(req, res)

  const entry: Keys = {
    name: req.body.name,
    position: req.body.position,
    bio: req.body.bio
  }

  if (req.method === 'POST') {
    const { data, error }: PostgrestResponse<Event> = await supabase
      .from('officers')
      .insert(entry)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
