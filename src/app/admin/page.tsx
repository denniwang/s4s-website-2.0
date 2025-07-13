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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingRoleChange, setPendingRoleChange] = useState<{ userId: string; newRole: string; userName: string } | null>(null)

  // Role-based protection
  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    const userRole = (session.user as SessionUser)?.role || 'PROSPECT'
    
    // Redirect to appropriate dashboard based on role
    if (userRole !== 'ADMIN') {
      if (userRole === 'PROSPECT') {
        router.push('/dashboard/prospect')
      } else if (userRole === 'CONSULTED_STUDENT') {
        router.push('/dashboard/student')
      } else if (userRole === 'PARENT') {
        router.push('/dashboard/parent')
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

  const changeUserRole = async (userId: string, newRole: string, userName: string) => {
    setPromotingUser(userId)
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole }),
      })

      if (response.ok) {
        // Update the user in the local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ))
        
        alert(`Successfully changed ${userName}'s role to ${newRole}`)
      } else {
        alert("Failed to change user role")
      }
    } catch (error) {
      console.error("Error changing user role:", error)
      alert("Error changing user role")
    } finally {
      setPromotingUser(null)
    }
  }



  const handleRoleChange = (userId: string, newRole: string, userName: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    // Don't allow changing the main admin
    if (user.email === "info@trys4s.com") {
      alert("Cannot change the main admin account")
      return
    }

    // Don't allow changing to the same role
    if (user.role === newRole) {
      return
    }

    // Show confirmation dialog
    setPendingRoleChange({ userId, newRole, userName })
    setShowConfirmDialog(true)
  }

  const confirmRoleChange = async () => {
    if (!pendingRoleChange) return

    const { userId, newRole, userName } = pendingRoleChange
    await changeUserRole(userId, newRole, userName)
    setShowConfirmDialog(false)
    setPendingRoleChange(null)
  }

  const cancelRoleChange = () => {
    setShowConfirmDialog(false)
    setPendingRoleChange(null)
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
    prospects: users.filter(u => u.role === "PROSPECT").length,
    consultedStudents: users.filter(u => u.role === "CONSULTED_STUDENT").length,
    parents: users.filter(u => u.role === "PARENT").length,
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
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
              <CardTitle className="text-sm font-medium text-gray-600">Prospects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.prospects}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Consulted Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.consultedStudents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Parents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.parents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.mentors}</div>
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
                    <SelectItem value="PROSPECT">Prospects</SelectItem>
                    <SelectItem value="CONSULTED_STUDENT">Consulted Students</SelectItem>
                    <SelectItem value="PARENT">Parents</SelectItem>
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
                        <Badge variant={
                          user.role === "ADMIN" ? "destructive" : 
                          user.role === "MENTOR" ? "default" : 
                          user.role === "CONSULTED_STUDENT" ? "secondary" :
                          user.role === "PARENT" ? "outline" :
                          "secondary"
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {user.role === "CONSULTED_STUDENT" && (
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
                        <div className="flex items-center gap-2">
                          <Select
                            value={user.role}
                            onValueChange={(newRole) => handleRoleChange(user.id, newRole, user.name || user.email)}
                            disabled={promotingUser === user.id || user.email === "info@trys4s.com"}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PROSPECT">Prospect</SelectItem>
                              <SelectItem value="CONSULTED_STUDENT">Consulted Student</SelectItem>
                              <SelectItem value="PARENT">Parent</SelectItem>
                              <SelectItem value="MENTOR">Mentor</SelectItem>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          {promotingUser === user.id && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                          )}
                          {user.email === "info@trys4s.com" && (
                            <span className="text-xs text-gray-500">Main Admin</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Role Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change {pendingRoleChange?.userName}&apos;s role from{' '}
              <span className="font-semibold">{users.find(u => u.id === pendingRoleChange?.userId)?.role}</span> to{' '}
              <span className="font-semibold">{pendingRoleChange?.newRole}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelRoleChange}>
              Cancel
            </Button>
            <Button onClick={confirmRoleChange} disabled={promotingUser === pendingRoleChange?.userId}>
              {promotingUser === pendingRoleChange?.userId ? "Changing..." : "Confirm Change"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 