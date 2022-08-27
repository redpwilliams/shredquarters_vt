/* eslint-disable @typescript-eslint/dot-notation */
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Officer } from '@public/types'
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
    first_name: req.body['First Name'],
    last_name: req.body['Last Name'],
    position: req.body['Position'],
    bio: req.body['Bio'],
    src: `${process.env.SUPABASE_URL}/storage/v1/object/public/officer-images/${req.body['First Name']}_${req.body['Last Name']}`
  }

  if (req.method === 'POST') {
    const { data, error }: PostgrestResponse<Officer> = await supabase
      .from('officers')
      .insert(entry)

    if (data) {
      return res.status(200).json(data)
    }
    return res.status(400).json(error)
  }

  return res.status(400).json({ error: 'Wrong request type' })
}
