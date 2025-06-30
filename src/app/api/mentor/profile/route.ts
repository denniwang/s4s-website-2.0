import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if user is a mentor
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== "MENTOR") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    return NextResponse.json({ profile: user })
  } catch (error) {
    console.error("Error fetching mentor profile:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if user is a mentor
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== "MENTOR") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const body = await request.json()
    const { university, major, bio, expertise, hourlyRate, timezone, calendlyLink } = body

    // Update the mentor's profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        university: university || null,
        major: major || null,
        bio: bio || null,
        expertise: expertise || [],
        hourlyRate: hourlyRate || null,
        timezone: timezone || "America/New_York",
        calendlyLink: calendlyLink || null,
      },
    })

    return NextResponse.json({ 
      message: "Profile updated successfully",
      profile: updatedUser
    })
  } catch (error) {
    console.error("Error updating mentor profile:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
} 