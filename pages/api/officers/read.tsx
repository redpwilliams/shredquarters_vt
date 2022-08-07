import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@public/types'
import type { PostgrestResponse } from '@supabase/supabase-js'
import { supabase } from '@db/_supabase'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure request is authenticated
  validate(req, res)

  // Handle GET request
  if (req.method === 'GET') {
    const { data, error }: PostgrestResponse<Event> = await supabase
      .from('officers')
      .select('*')
      .order('id')

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  // Handle wrong request type
  return res.status(400).json({ error: 'Wrong request type' })
}
