import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from '@utils/database'
import User from '@models/user'

// Extend the Profile type to include the `picture` property
interface ExtendedProfile {
  email?: string
  name?: string
  picture?: string // Add the missing `picture` property
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth environment variables')
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        if (session.user && session.user.email) {
          const sessionUser = await User.findOne({
            email: session.user.email,
          })

          if (sessionUser) {
            session.user.id = sessionUser._id.toString()
          }
        }
      } catch (error) {
        console.error('Error in session callback:', error)
      }

      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()

        const extendedProfile = profile as ExtendedProfile

        const userExist = await User.findOne({
          email: extendedProfile?.email,
        })

        if (!userExist) {
          await User.create({
            email: extendedProfile?.email,
            username: extendedProfile?.name?.replace(' ', '').toLowerCase(),
            image: extendedProfile?.picture,
          })
        }
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
