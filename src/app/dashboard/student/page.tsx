"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Users, ExternalLink, Search, Filter, GraduationCap, DollarSign, Clock } from "lucide-react"

interface Mentor {
  id: string
  name: string
  email: string
  image?: string
  bio: string
  university: string
  major: string
  expertise: string[]
  hourlyRate: number
  calendlyLink: string
}

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([])
  const [isLoadingMentors, setIsLoadingMentors] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [expertiseFilter, setExpertiseFilter] = useState("ALL")
  const [priceFilter, setPriceFilter] = useState("ALL")

  // Role-based protection
  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    const userRole = (session.user as any)?.role || 'STUDENT'
    
    // Redirect to appropriate dashboard based on role
    if (userRole !== 'STUDENT') {
      if (userRole === 'MENTOR') {
        router.push('/dashboard/mentor')
      } else if (userRole === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
      return
    }
  }, [session, status, router])

  // Fetch mentors only when session is available
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session?.user?.email) {
      setIsLoadingMentors(false)
      return
    }

    const fetchMentors = async () => {
      setIsLoadingMentors(true)
      try {
        const response = await fetch("/api/users?role=MENTOR")
        if (response.ok) {
          const data = await response.json()
          setMentors(Array.isArray(data) ? data : [])
        } else {
          setMentors([])
        }
      } catch (error) {
        console.error("Error fetching mentors:", error)
        setMentors([])
      } finally {
        setIsLoadingMentors(false)
      }
    }

    fetchMentors()
  }, [session, status])

  // Filter mentors based on search and filters
  useEffect(() => {
    let filtered = mentors

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.major?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise?.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by expertise
    if (expertiseFilter !== "ALL") {
      filtered = filtered.filter(mentor =>
        mentor.expertise?.some(exp => exp.toLowerCase() === expertiseFilter.toLowerCase())
      )
    }

    // Filter by price
    if (priceFilter !== "ALL") {
      filtered = filtered.filter(mentor => {
        const rate = mentor.hourlyRate || 0
        switch (priceFilter) {
          case "UNDER_50":
            return rate < 50
          case "50_100":
            return rate >= 50 && rate <= 100
          case "OVER_100":
            return rate > 100
          default:
            return true
        }
      })
    }

    setFilteredMentors(filtered)
  }, [mentors, searchTerm, expertiseFilter, priceFilter])

  // Get unique expertise areas for filter
  const getAllExpertise = () => {
    const expertiseSet = new Set<string>()
    mentors.forEach(mentor => {
      mentor.expertise?.forEach(exp => expertiseSet.add(exp))
    })
    return Array.from(expertiseSet).sort()
  }

  const openCalendly = (calendlyLink: string) => {
    window.open(calendlyLink, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Find mentors and book sessions through Calendly</p>
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
                    <p className="text-sm font-medium text-gray-600">Available Mentors</p>
                    <p className="text-2xl font-bold text-gray-900">{mentors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expertise Areas</p>
                    <p className="text-2xl font-bold text-gray-900">{getAllExpertise().length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Avg. Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${mentors.length > 0 ? Math.round(mentors.reduce((sum, m) => sum + (m.hourlyRate || 0), 0) / mentors.length) : 0}/hr
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find a Mentor</CardTitle>
              <CardDescription>
                Search and filter mentors by expertise, price, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search mentors by name, major, university, or expertise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Expertise</SelectItem>
                      {getAllExpertise().map(expertise => (
                        <SelectItem key={expertise} value={expertise}>
                          {expertise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Prices</SelectItem>
                      <SelectItem value="UNDER_50">Under $50/hr</SelectItem>
                      <SelectItem value="50_100">$50-$100/hr</SelectItem>
                      <SelectItem value="OVER_100">Over $100/hr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mentors Grid */}
          {isLoadingMentors ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Loading mentors...</p>
            </div>
          ) : filteredMentors.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No mentors found</h3>
                <p className="text-gray-600">
                  {searchTerm || expertiseFilter !== "ALL" || priceFilter !== "ALL" 
                    ? "Try adjusting your search criteria or filters."
                    : "No mentors are currently available. Please check back later."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>
                          {mentor.major} • {mentor.university}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        ${mentor.hourlyRate || 0}/hr
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mentor.bio && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {mentor.bio}
                        </p>
                      )}
                      
                      {mentor.expertise && mentor.expertise.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.slice(0, 3).map((exp, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {exp}
                              </Badge>
                            ))}
                            {mentor.expertise.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{mentor.expertise.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {mentor.calendlyLink ? (
                        <Button 
                          onClick={() => openCalendly(mentor.calendlyLink)}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}