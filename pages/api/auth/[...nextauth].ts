import { supabase } from '@db/_supabase'
import { User } from '@public/types'
import { PostgrestResponse } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions, unstable_getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: '/auth/signIn'
  },
  callbacks: {
    async signIn({ profile }) {
      const { data }: PostgrestResponse<User> = await supabase
        .from('admin_users')
        .select('*')
        .order('id')

      return !!data?.find((user) => user.email === profile.email)
    }
  },

  secret: process.env.SECRET
}

export const validate = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get authorization status
  const session = await unstable_getServerSession(req, res, authOptions)

  // Unauthorized
  if (session === null) res.status(401).json({ error: 'Unauthorized' })
}

export default NextAuth(authOptions)
