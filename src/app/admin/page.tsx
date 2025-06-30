"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  id: string
  name: string
  email: string
  role: string
  grade?: string
  school?: string
  university?: string
  major?: string
  bio?: string
  createdAt: string
}

interface SessionUser {
  email?: string | null
  role?: string
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [promotingUser, setPromotingUser] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("ALL")

  // Role-based protection
  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    const userRole = (session.user as SessionUser)?.role || 'STUDENT'
    
    // Redirect to appropriate dashboard based on role
    if (userRole !== 'ADMIN') {
      if (userRole === 'STUDENT') {
        router.push('/dashboard/student')
      } else if (userRole === 'MENTOR') {
        router.push('/dashboard/mentor')
      } else {
        router.push('/dashboard')
      }
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (status === "loading") return

    if (!session || (session.user as SessionUser)?.role !== "ADMIN") {
      return // Don't redirect here, let the role-based protection handle it
    }

    fetchUsers()
  }, [session, status])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const promoteToMentor = async (userId: string) => {
    setPromotingUser(userId)
    try {
      const response = await fetch("/api/admin/promote-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole: "MENTOR" }),
      })

      if (response.ok) {
        // Update the user in the local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: "MENTOR" } : user
        ))
      } else {
        alert("Failed to promote user")
      }
    } catch (error) {
      console.error("Error promoting user:", error)
      alert("Error promoting user")
    } finally {
      setPromotingUser(null)
    }
  }

  const demoteToStudent = async (userId: string) => {
    setPromotingUser(userId)
    try {
      const response = await fetch("/api/admin/promote-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole: "STUDENT" }),
      })

      if (response.ok) {
        // Update the user in the local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: "STUDENT" } : user
        ))
      } else {
        alert("Failed to demote user")
      }
    } catch (error) {
      console.error("Error demoting user:", error)
      alert("Error demoting user")
    } finally {
      setPromotingUser(null)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session || (session.user as SessionUser)?.role !== "ADMIN") {
    return null
  }

  const stats = {
    total: users.length,
    students: users.filter(u => u.role === "STUDENT").length,
    mentors: users.filter(u => u.role === "MENTOR").length,
    admins: users.filter(u => u.role === "ADMIN").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and system settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.students}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.mentors}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage all users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="search">Search Users</Label>
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Label htmlFor="role-filter">Filter by Role</Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Roles</SelectItem>
                    <SelectItem value="STUDENT">Students</SelectItem>
                    <SelectItem value="MENTOR">Mentors</SelectItem>
                    <SelectItem value="ADMIN">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Users Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "ADMIN" ? "destructive" : user.role === "MENTOR" ? "default" : "secondary"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {user.role === "STUDENT" && (
                            <>
                              {user.grade && <div>Grade: {user.grade}</div>}
                              {user.school && <div>School: {user.school}</div>}
                            </>
                          )}
                          {user.role === "MENTOR" && (
                            <>
                              {user.university && <div>University: {user.university}</div>}
                              {user.major && <div>Major: {user.major}</div>}
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user.role === "STUDENT" && (
                          <Button
                            size="sm"
                            onClick={() => promoteToMentor(user.id)}
                            disabled={promotingUser === user.id}
                          >
                            {promotingUser === user.id ? "Promoting..." : "Promote to Mentor"}
                          </Button>
                        )}
                        {user.role === "MENTOR" && user.email !== "info@trys4s.com" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => demoteToStudent(user.id)}
                            disabled={promotingUser === user.id}
                          >
                            {promotingUser === user.id ? "Demoting..." : "Demote to Student"}
                          </Button>
                        )}
                        {user.role === "ADMIN" && (
                          <span className="text-sm text-gray-500">No actions available</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 