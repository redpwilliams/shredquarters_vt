import type { NextApiRequest, NextApiResponse } from 'next'
import type { Officer } from '@public/types'
import type { PostgrestResponse } from '@supabase/supabase-js'
import { supabase } from '@db/_supabase'
import { Params } from 'pages/admin/officers/delete'
import { validate } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure request is authenticated
  validate(req, res)

  const params: Params = {
    name: req.body.officer
  }

  // Handle GET request
  if (req.method === 'DELETE') {
    const { data, error }: PostgrestResponse<Officer> = await supabase
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
