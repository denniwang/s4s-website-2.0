"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, TrendingUp, BookOpen, Eye, Settings } from "lucide-react"

interface SessionUser {
  email?: string | null
  name?: string | null
  role?: string
}

export default function ParentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Role-based protection
  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    const userRole = (session.user as SessionUser)?.role || 'PROSPECT'
    
    // Redirect if user is not a parent
    if (userRole !== 'PARENT') {
      if (userRole === 'PROSPECT') {
        router.push('/dashboard/prospect')
      } else if (userRole === 'CONSULTED_STUDENT') {
        router.push('/dashboard/student')
      } else if (userRole === 'MENTOR') {
        router.push('/dashboard/mentor')
      } else if (userRole === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">
            Monitor your student&apos;s progress and manage their college preparation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student Overview Card */}
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Student Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 mb-4">
                View your student&apos;s profile, progress, and upcoming sessions.
              </CardDescription>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Eye className="h-4 w-4 mr-2" />
                View Student Profile
              </Button>
            </CardContent>
          </Card>

          {/* Scheduled Sessions Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Scheduled Sessions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 mb-4">
                Track upcoming mentoring sessions and view past meetings.
              </CardDescription>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Progress Tracking Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Progress Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 mb-4">
                Monitor your student&apos;s academic progress and goal achievements.
              </CardDescription>
              <Button variant="outline" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">College Essay Workshop</p>
                      <p className="text-sm text-gray-600">with Sarah Johnson</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Tomorrow</p>
                      <p className="text-xs text-gray-500">2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">SAT Math Prep</p>
                      <p className="text-sm text-gray-600">with Mike Chen</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Friday</p>
                      <p className="text-xs text-gray-500">4:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">SAT Practice Test</p>
                      <p className="text-sm text-gray-600">Math section completed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">+50 points</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">College Essay</p>
                      <p className="text-sm text-gray-600">First draft submitted</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">Completed</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="text-sm">View Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Schedule Meeting</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Settings className="h-6 w-6 mb-2" />
              <span className="text-sm">Account Settings</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Contact Support</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 