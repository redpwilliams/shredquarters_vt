import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@public/types'
import type { PostgrestResponse } from '@supabase/postgrest-js'
import { supabase } from '@db/_supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { data, error }: PostgrestResponse<Event> = await supabase
      .from('events')
      .insert(req.body)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
