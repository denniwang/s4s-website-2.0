import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    // Fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        grade: true,
        school: true,
        university: true,
        major: true,
        bio: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    console.log("PATCH /api/admin/users - Starting request")
    const session = await getServerSession(authOptions)
    console.log("PATCH /api/admin/users - Session:", session)
    
    if (!session?.user?.email) {
      console.log("PATCH /api/admin/users - No session or email")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    console.log("PATCH /api/admin/users - User from DB:", user)

    if (!user || user.role !== "ADMIN") {
      console.log("PATCH /api/admin/users - Not admin, user role:", user?.role)
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const body = await request.json()
    const { userId, newRole } = body
    console.log("PATCH /api/admin/users - Request body:", body)

    if (!userId || !newRole) {
      console.log("PATCH /api/admin/users - Missing userId or newRole")
      return NextResponse.json(
        { error: "Missing userId or newRole" },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ["PROSPECT", "CONSULTED_STUDENT", "PARENT", "MENTOR", "ADMIN"]
    if (!validRoles.includes(newRole)) {
      console.log("PATCH /api/admin/users - Invalid role:", newRole)
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      )
    }

    console.log("PATCH /api/admin/users - Updating user role:", { userId, newRole })
    
    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        grade: true,
        school: true,
        university: true,
        major: true,
        bio: true,
        createdAt: true,
      }
    })

    console.log("PATCH /api/admin/users - User updated successfully:", updatedUser)

    // For JWT sessions, the token will be updated on next request
    // No need to delete database sessions

    return NextResponse.json({ 
      message: "User role updated successfully. User will see changes on next page refresh.",
      user: updatedUser 
    })
  } catch (error) {
    console.error("Error updating user role:", error)
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    )
  }
} 