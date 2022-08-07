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
  secret: process.env.SECRET
}

export const validate = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get authorization status
  const session = await unstable_getServerSession(req, res, authOptions)

  // Unauthorized
  if (session === null) res.status(401).json({ error: 'Unauthorized' })
}

export default NextAuth(authOptions)
