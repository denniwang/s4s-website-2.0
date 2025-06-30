import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
    nextauthSecret: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    nextauthUrl: process.env.NEXTAUTH_URL ? 'SET' : 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
  })
} 