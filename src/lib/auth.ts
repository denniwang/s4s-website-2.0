import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { prisma } from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error('Please verify your email address before signing in. Check your inbox for a verification link.')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          updatedAt: user.updatedAt,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('JWT callback - user:', user)
        token.id = user.id
        token.role = (user as any).role
        token.updatedAt = (user as any).updatedAt
        console.log('JWT callback - updated token:', token)
      }
      
      // Check if user's role has been updated since token was issued
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, updatedAt: true }
        })
        
        if (dbUser && dbUser.updatedAt > (token.updatedAt as Date)) {
          console.log('JWT callback - user data updated, updating token')
          // Update token with latest data from database
          token.role = dbUser.role
          token.updatedAt = dbUser.updatedAt
        }
      }
      
      return token
    },
    async session({ session, token }) {
      console.log('Session callback - token:', token)
      if (session.user && token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).role = token.role
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).updatedAt = token.updatedAt
        console.log('Session callback - updated session user:', session.user)
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Handle OAuth sign-in
      if (account?.provider === "google" && profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { accounts: true }
        })

        if (existingUser) {
          // Check if Google account is already linked
          const existingGoogleAccount = existingUser.accounts.find(
            (acc: { provider: string }) => acc.provider === "google"
          )

          if (!existingGoogleAccount) {
            // Link the Google account to the existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              }
            })
          }
          
          // Update the user object with the existing user's data
          user.id = existingUser.id
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(user as any).role = existingUser.role
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(user as any).updatedAt = existingUser.updatedAt
        } else {
          // For new users, ensure they get the PROSPECT role
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(user as any).role = "PROSPECT"
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects for OAuth completion
      if (url.startsWith('/auth/oauth-complete')) {
        return url
      }
      if (url.startsWith(baseUrl)) {
        return url
      }
      return baseUrl
    }
  },
  // Use JWT sessions for faster performance
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
} 