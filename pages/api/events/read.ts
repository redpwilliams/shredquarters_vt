import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@public/types'
import type { PostgrestResponse } from '@supabase/supabase-js'
import { unstable_getServerSession } from 'next-auth/next'
import { supabase } from '@db/_supabase'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  // Unauthorized
  if (session === null) return res.status(401).json({ error: 'Unauthorized' })

  // Handle GET request
  if (req.method === 'GET') {
    const { data, error }: PostgrestResponse<Event> = await supabase
      .from('events')
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
