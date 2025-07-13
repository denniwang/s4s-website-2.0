"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, Users, ArrowRight } from "lucide-react"

interface SessionUser {
  email?: string | null
  name?: string | null
  role?: string
}

export default function ProspectDashboard() {
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
    
    // Redirect if user is not a prospect
    if (userRole !== 'PROSPECT') {
      if (userRole === 'CONSULTED_STUDENT') {
        router.push('/dashboard/student')
      } else if (userRole === 'PARENT') {
        router.push('/dashboard/parent')
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome to S4S!</h1>
          <p className="text-lg text-gray-600 mt-2">
            Complete your consultation to unlock full access to our mentoring platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Consultation Card */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Book Your Consultation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 mb-4">
                Schedule a free consultation to discuss your college goals and learn how our mentors can help you succeed.
              </CardDescription>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens After Your Consultation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Complete Consultation</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Meet with our team to discuss your goals and create a personalized plan.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Access</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Unlock full access to book mentors and manage your college journey.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Start Learning</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Book sessions with mentors and track your progress toward your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 