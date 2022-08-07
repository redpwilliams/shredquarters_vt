import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@public/types'
import type { Keys, Params } from 'pages/admin/events/update'
import type { PostgrestResponse } from '@supabase/postgrest-js'
import { supabase } from '@db/_supabase'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure request is authenticated
  validate(req, res)

  // Data to push to db
  const entry: Keys = {
    name: req.body.new_name,
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    location: req.body.location
  }

  // Parameters needed to make request
  const params: Params = { name: req.body.event_name }

  if (req.method === 'PATCH') {
    const { data, error }: PostgrestResponse<Event> = await supabase
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
