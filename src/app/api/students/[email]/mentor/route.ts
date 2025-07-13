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

    // Check if the user is requesting their own mentor data
    if (session.user.email !== params.email) {
      return NextResponse.json(
        { error: 'Not authorized to access this data' },
        { status: 403 }
      )
    }

    // Find the student and their assigned mentor
    const student = await prisma.user.findUnique({
      where: { email: params.email },
      include: {
        assignedMentor: {
          select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            university: true,
            major: true,
            expertise: true,
            calendlyLink: true,
          }
        }
      }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    if (!student.assignedMentor) {
      return NextResponse.json({
        mentor: null
      })
    }

    return NextResponse.json({
      mentor: student.assignedMentor
    })
  } catch (error) {
    console.error('Error fetching mentor:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mentor' },
      { status: 500 }
    )
  }
} 