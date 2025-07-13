import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { role, grade, school, university, major, intendedMajor, bio } = body

    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 })
    }

    // Update the user's profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role: "PROSPECT" as any, // Type assertion needed due to Prisma enum type mismatch
        grade: grade || null,
        school: school || null,
        university: university || null,
        major: major || null,
        bio: bio || null,
        // Store intended major in interests array for students
        interests: intendedMajor ? [intendedMajor] : [],
      },
    })

    return NextResponse.json({ 
      message: "Profile completed successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      }
    })
  } catch (error) {
    console.error("Error completing profile:", error)
    return NextResponse.json(
      { error: "Failed to complete profile" },
      { status: 500 }
    )
  }
} 