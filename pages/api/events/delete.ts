import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@public/types'
import type { Params } from 'pages/admin/events/delete'
import type { PostgrestResponse } from '@supabase/postgrest-js'
import { supabase } from '@db/_supabase'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure request is authenticated
  validate(req, res)

  // Parameters needed to make request
  const params: Params = { name: req.body.event_name }

  if (req.method === 'POST') {
    const { data, error }: PostgrestResponse<Event> = await supabase
      .from('events')
      .delete()
      .match(params)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
