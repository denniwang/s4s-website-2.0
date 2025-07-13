import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check if the user is requesting their own session data
    if (session.user.email !== params.email) {
      return NextResponse.json(
        { error: 'Not authorized to access this data' },
        { status: 403 }
      )
    }

    // For now, return empty sessions since we haven't implemented the session system yet
    // This can be expanded later when we add session booking functionality
    const sessions: any[] = []

    return NextResponse.json({
      sessions
    })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
} 