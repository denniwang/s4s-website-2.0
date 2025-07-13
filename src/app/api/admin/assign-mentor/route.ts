import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { studentId, mentorId } = body

    if (!studentId || !mentorId) {
      return NextResponse.json(
        { error: 'Student ID and Mentor ID are required' },
        { status: 400 }
      )
    }

    // Verify the student exists and is a CONSULTED_STUDENT
    const student = await prisma.user.findUnique({
      where: { id: studentId }
    })

    if (!student || student.role !== 'CONSULTED_STUDENT') {
      return NextResponse.json(
        { error: 'Student not found or not a consulted student' },
        { status: 400 }
      )
    }

    // Verify the mentor exists and is a MENTOR
    const mentor = await prisma.user.findUnique({
      where: { id: mentorId }
    })

    if (!mentor || mentor.role !== 'MENTOR') {
      return NextResponse.json(
        { error: 'Mentor not found or not a mentor' },
        { status: 400 }
      )
    }

    // Update the student with the assigned mentor
    const updatedStudent = await prisma.user.update({
      where: { id: studentId },
      data: {
        assignedMentorId: mentorId,
      },
      include: {
        assignedMentor: true,
      }
    })

    return NextResponse.json({
      message: 'Mentor assigned successfully',
      student: {
        id: updatedStudent.id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        assignedMentorId: updatedStudent.assignedMentorId,
        assignedMentor: updatedStudent.assignedMentor,
      }
    })
  } catch (error) {
    console.error('Error assigning mentor:', error)
    return NextResponse.json(
      { error: 'Failed to assign mentor' },
      { status: 500 }
    )
  }
} 