import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface UserWhereInput {
  role?: 'STUDENT' | 'MENTOR' | 'ADMIN'
  OR?: Array<{
    name?: { contains: string; mode: 'insensitive' }
    email?: { contains: string; mode: 'insensitive' }
    university?: { contains: string; mode: 'insensitive' }
    major?: { contains: string; mode: 'insensitive' }
    expertise?: { hasSome: string[] }
  }>
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      console.log("No session or user email found")
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    console.log("Fetching users with role:", role, "for user:", session.user.email)

    // Build where clause
    const where: UserWhereInput = {}

    if (role) {
      where.role = role as 'STUDENT' | 'MENTOR' | 'ADMIN'
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { university: { contains: search, mode: 'insensitive' } },
        { major: { contains: search, mode: 'insensitive' } },
        { expertise: { hasSome: [search] } },
      ]
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        university: true,
        major: true,
        bio: true,
        expertise: true,
        hourlyRate: true,
        grade: true,
        school: true,
        graduationYear: true,
        timezone: true,
        calendlyLink: true,
      },
      orderBy: {
        name: 'asc'
      }
    })

    console.log(`Found ${users.length} users with role ${role}`)
    return NextResponse.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 