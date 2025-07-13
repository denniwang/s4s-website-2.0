import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', email },
        { status: 404 }
      )
    }

    // Check if user has password (for OAuth users)
    if (!user.password) {
      return NextResponse.json(
        { 
          error: 'User exists but has no password (OAuth user)',
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.emailVerified,
            hasPassword: false
          }
        },
        { status: 400 }
      )
    }

    // Check email verification
    if (!user.emailVerified) {
      return NextResponse.json(
        { 
          error: 'Email not verified',
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.emailVerified,
            needsVerification: true
          }
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        message: 'User found and verified',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified,
          hasPassword: true
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Test signin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 