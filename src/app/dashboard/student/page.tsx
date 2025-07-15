"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ExternalLink, DollarSign, Clock, Calendar } from "lucide-react"
import { StripePayment } from "@/components/ui/stripe-payment"

interface AssignedMentor {
  id: string
  name: string
  email: string
  image?: string
  bio: string
  university: string
  major: string
  expertise: string[]
  calendlyLink: string
}

interface PaymentMethod {
  id: string
  card: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
}



interface SessionUser {
  email?: string | null
  name?: string | null
  role?: string
}

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [assignedMentor, setAssignedMentor] = useState<AssignedMentor | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)

  // Role-based protection
  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    const userRole = (session.user as SessionUser)?.role || 'PROSPECT'
    
    // Redirect to appropriate dashboard based on role
    if (userRole !== 'CONSULTED_STUDENT') {
      if (userRole === 'PROSPECT') {
        router.push('/dashboard/prospect')
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

  // Fetch student data function
  const fetchStudentData = useCallback(async () => {
    if (!session?.user?.email) {
      return
    }

    try {
      // Fetch assigned mentor
      const mentorResponse = await fetch(`/api/students/${session.user?.email}/mentor`)
      if (mentorResponse.ok) {
        const mentorData = await mentorResponse.json()
        setAssignedMentor(mentorData.mentor)
      }

      // Fetch existing payment method
      const paymentResponse = await fetch('/api/stripe/get-payment-method')
      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json()
        setPaymentMethod(paymentData.paymentMethod)
      }
    } catch (error) {
      console.error("Error fetching student data:", error)
    }
  }, [session?.user?.email])

  // Fetch assigned mentor
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session?.user?.email) {
      return
    }

    fetchStudentData()
  }, [session, status, fetchStudentData])

  const openCalendly = (calendlyLink: string) => {
    window.open(calendlyLink, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:w-[60vw]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">View your assigned mentor and manage your sessions</p>
      </div>

      {/* Show loading state while session is loading */}
      {status === 'loading' && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Loading...</p>
        </div>
      )}

      {/* Show content only when session is loaded */}
      {status !== 'loading' && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assigned Mentor</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assignedMentor ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Payment Method</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {paymentMethod ? 'Added' : 'Missing'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method Section */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-md">
              <StripePayment 
                existingPaymentMethod={paymentMethod}
                onPaymentMethodAdded={async (paymentMethodId) => {
                  console.log('Payment method added:', paymentMethodId)
                  // Refresh payment method data
                  await fetchStudentData()
                }}
                onError={(error) => {
                  console.error('Payment error:', error)
                }}
              />
            </div>
          </div>

          {/* Assigned Mentor Section */}
          {assignedMentor ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Assigned Mentor
                </CardTitle>
                <CardDescription>
                  Your mentor will help guide you through your college application process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{assignedMentor.name}</h3>
                    <p className="text-gray-600 mb-2">{assignedMentor.major} • {assignedMentor.university}</p>
                    {assignedMentor.bio && (
                      <p className="text-sm text-gray-600 mb-4">{assignedMentor.bio}</p>
                    )}
                    
                    {assignedMentor.expertise && assignedMentor.expertise.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {assignedMentor.expertise.map((exp, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {assignedMentor.calendlyLink ? (
                      <Button 
                        onClick={() => openCalendly(assignedMentor.calendlyLink)}
                        className="w-full"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        disabled
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Not Available
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Mentor Assigned</h3>
                <p className="text-gray-600 mb-4">
                  An admin will assign you a mentor soon. You&apos;ll be notified when your mentor is ready.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}