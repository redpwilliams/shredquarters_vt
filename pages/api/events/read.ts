import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@db/_supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('id')

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
