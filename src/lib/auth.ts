import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { prisma } from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

interface UserWithRole {
  id: string
  email: string
  name: string
  role: string
}

interface SessionUser {
  id?: string
  email?: string | null
  name?: string | null
  role?: string
}


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

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = (user as UserWithRole).role || "STUDENT"
      }
      
      // If this is a new OAuth sign-in, ensure role is set
      if (account?.provider === "google" && !token.role) {
        token.role = "STUDENT"
      }
      
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as SessionUser).id = token.id as string
        (session.user as SessionUser).role = token.role as string || "STUDENT"
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
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
} 