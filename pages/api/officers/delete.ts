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
  await validate(req, res)

  const params: Params = {
    name: req.body.officer
  }

  // Handle GET request
  if (req.method === 'POST') {
    // Get the id, first name, and last name of all officers
    const { data: officers, error: err }: PostgrestResponse<Officer> =
      await supabase.from('officers').select('id, first_name, last_name')

    // Error check
    if (err) return res.status(400).json(err)

    // Find the officer to remove
    const officerToRemove = officers.find(
      (officer) =>
        params.name.includes(officer.first_name) &&
        params.name.includes(officer.last_name)
    )

    // Check if undefined
    if (!officerToRemove)
      return res.status(400).json({ error: 'Could not find officer to remove' })

    // Remove that officer by id
    const { data, error } = await supabase
      .from('officers')
      .delete()
      .match({ id: officerToRemove.id })

    return data ? res.status(200).json(data) : res.status(400).json(error)
  }

  // Handle wrong request type
  return res.status(400).json({ error: 'Wrong request type' })
}
