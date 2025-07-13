"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar,  Settings, BookOpen, Users, Crown } from "lucide-react"

interface SessionUser {
  email?: string | null
  name?: string | null
  role?: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log('Dashboard useEffect - status:', status, 'session:', session)
    
    if (status === 'loading') {
      console.log('Session is still loading...')
      return
    }

    if (status === 'unauthenticated') {
      console.log('User is unauthenticated, redirecting to signin')
      router.push('/auth/signin')
      return
    }

    if (!session?.user) {
      console.log('No session user, redirecting to signin')
      router.push('/auth/signin')
      return
    }

    // Redirect based on user role from JWT token
    const userRole = (session.user as SessionUser)?.role || 'PROSPECT'
    console.log('User role from JWT:', userRole)
    
    switch (userRole) {
      case 'PROSPECT':
        router.push('/dashboard/prospect')
        break
      case 'CONSULTED_STUDENT':
        router.push('/dashboard/student')
        break
      case 'PARENT':
        router.push('/dashboard/parent')
        break
      case 'MENTOR':
        router.push('/dashboard/mentor')
        break
      case 'ADMIN':
        router.push('/admin')
        break
      default:
        router.push('/dashboard/prospect')
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
    const userRole = (session.user as SessionUser)?.role || 'PROSPECT'
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {(userRole === 'PROSPECT' || userRole === 'CONSULTED_STUDENT') && (
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                )}
                {userRole === 'PARENT' && (
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Users className="h-8 w-8 text-orange-600" />
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
                Redirecting you to your {userRole.toLowerCase().replace('_', ' ')} dashboard...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                {userRole === 'PROSPECT' && (
                  <>
                    <p className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Complete your consultation first
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Book a consultation session
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Learn about our services
                    </p>
                  </>
                )}
                {(userRole === 'CONSULTED_STUDENT' || userRole === 'STUDENT') && (
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
                {userRole === 'PARENT' && (
                  <>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Monitor your student&apos;s progress
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      View scheduled sessions
                    </p>
                    <p className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Manage student accounts
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