import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const completeProfileSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  grade: z.string().optional(),
  school: z.string().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  bio: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = completeProfileSchema.parse(body)

    // Verify the email matches the session
    if (validatedData.email !== session.user.email) {
      return NextResponse.json(
        { message: 'Email mismatch' },
        { status: 400 }
      )
    }

    // Update user profile - everyone becomes a PROSPECT
    const updatedUser = await prisma.user.update({
      where: { email: validatedData.email },
      data: {
        name: validatedData.name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role: 'PROSPECT' as any, // Everyone starts as a prospective student
        grade: validatedData.grade,
        school: validatedData.school,
        university: validatedData.university,
        major: validatedData.major,
        bio: validatedData.bio,
      }
    })

    return NextResponse.json({
      message: 'Profile completed successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Complete profile error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 