import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@public/types'
import type { PostgrestResponse } from '@supabase/postgrest-js'
import type { Keys } from 'pages/admin/events/update'
import { supabase } from '@db/_supabase'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validate(req, res)

  const entry: Keys = {
    name: req.body.name,
    date: req.body.date,
    start_time: req.body.start,
    end_time: req.body.end,
    location: req.body.location
  }
  if (req.method === 'POST') {
    const { data, error }: PostgrestResponse<Event> = await supabase
      .from('events')
      .insert(entry)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
