"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Settings, BookOpen, Users, Crown } from "lucide-react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    // Redirect based on user role
    const userRole = (session.user as any)?.role || 'STUDENT'
    
    switch (userRole) {
      case 'STUDENT':
        router.push('/dashboard/student')
        break
      case 'MENTOR':
        router.push('/dashboard/mentor')
        break
      case 'ADMIN':
        router.push('/admin')
        break
      default:
        router.push('/dashboard/student')
    }
  }, [session, status, router])

  // Show loading state while checking session and redirecting
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Show a brief welcome screen while redirecting
  if (session?.user) {
    const userRole = (session.user as any)?.role || 'STUDENT'
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {userRole === 'STUDENT' && (
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                )}
                {userRole === 'MENTOR' && (
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                )}
                {userRole === 'ADMIN' && (
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Crown className="h-8 w-8 text-purple-600" />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl">Welcome, {session.user.name}!</CardTitle>
              <CardDescription>
                Redirecting you to your {userRole.toLowerCase()} dashboard...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                {userRole === 'STUDENT' && (
                  <>
                    <p className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Find and book mentors
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Book through Calendly
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Browse mentor profiles
                    </p>
                  </>
                )}
                {userRole === 'MENTOR' && (
                  <>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Manage your Calendly link
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Set up your scheduling
                    </p>
                    <p className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Update your profile
                    </p>
                  </>
                )}
                {userRole === 'ADMIN' && (
                  <>
                    <p className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Manage all users
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Promote users to mentors
                    </p>
                    <p className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      System administration
                    </p>
                  </>
                )}
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => {
                    switch (userRole) {
                      case 'STUDENT':
                        router.push('/dashboard/student')
                        break
                      case 'MENTOR':
                        router.push('/dashboard/mentor')
                        break
                      case 'ADMIN':
                        router.push('/admin')
                        break
                      default:
                        router.push('/dashboard/student')
                    }
                  }}
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // This should not be reached due to redirect, but just in case
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-lg text-gray-600">Redirecting to sign in...</p>
      </div>
    </div>
  )
} 