"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, ExternalLink, Copy, CheckCircle } from "lucide-react"

interface MentorProfile {
  id: string
  name: string
  email: string
  university: string
  major: string
  bio: string
  expertise: string[]
  hourlyRate: number
  timezone: string
  calendlyLink: string
}

interface SessionUser {
  email?: string | null
  name?: string | null
  role?: string
}

export default function MentorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<MentorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    university: "",
    major: "",
    bio: "",
    expertise: "",
    hourlyRate: "",
    timezone: "America/New_York",
    calendlyLink: ""
  })

  // Role-based protection
  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    const userRole = (session.user as SessionUser)?.role || 'PROSPECT'
    
    // Redirect to appropriate dashboard based on role
    if (userRole !== 'MENTOR') {
      if (userRole === 'PROSPECT') {
        router.push('/dashboard/prospect')
      } else if (userRole === 'CONSULTED_STUDENT') {
        router.push('/dashboard/student')
      } else if (userRole === 'PARENT') {
        router.push('/dashboard/parent')
      } else if (userRole === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (status === "loading") return

    if (!session || (session.user as SessionUser)?.role !== "MENTOR") {
      return // Don't redirect here, let the role-based protection handle it
    }

    fetchMentorData()
  }, [session, status])

  const fetchMentorData = async () => {
    try {
      const response = await fetch("/api/mentor/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        
        // Initialize form with current data
        setProfileForm({
          university: data.profile.university || "",
          major: data.profile.major || "",
          bio: data.profile.bio || "",
          expertise: Array.isArray(data.profile.expertise) ? data.profile.expertise.join(", ") : "",
          hourlyRate: data.profile.hourlyRate?.toString() || "",
          timezone: data.profile.timezone || "America/New_York",
          calendlyLink: data.profile.calendlyLink || ""
        })
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSave = async () => {
    try {
      const expertiseArray = profileForm.expertise
        .split(",")
        .map(item => item.trim())
        .filter(item => item.length > 0)

      const response = await fetch("/api/mentor/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          university: profileForm.university,
          major: profileForm.major,
          bio: profileForm.bio,
          expertise: expertiseArray,
          hourlyRate: parseFloat(profileForm.hourlyRate) || null,
          timezone: profileForm.timezone,
          calendlyLink: profileForm.calendlyLink
        }),
      })

      if (response.ok) {
        await fetchMentorData()
        setIsEditingProfile(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const copyCalendlyLink = async () => {
    if (profile?.calendlyLink) {
      try {
        await navigator.clipboard.writeText(profile.calendlyLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy link:", error)
      }
    }
  }

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

  if (!session || (session.user as SessionUser)?.role !== "MENTOR") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        value={profileForm.university}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, university: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        value={profileForm.major}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, major: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expertise">Areas of Expertise</Label>
                      <Input
                        id="expertise"
                        placeholder="e.g., Computer Science, College Applications, SAT Prep"
                        value={profileForm.expertise}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, expertise: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={profileForm.hourlyRate}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, hourlyRate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={profileForm.timezone}
                        onValueChange={(value) => setProfileForm(prev => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                          <SelectItem value="Pacific/Honolulu">Hawaii Time (HT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                          <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                          <SelectItem value="Australia/Sydney">Sydney (AEST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="calendlyLink">Calendly Link</Label>
                      <Input
                        id="calendlyLink"
                        placeholder="https://calendly.com/your-link"
                        value={profileForm.calendlyLink}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, calendlyLink: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleProfileSave} size="sm">
                        Save
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">University</span>
                      <p className="font-medium">{profile?.university || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Major</span>
                      <p className="font-medium">{profile?.major || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Expertise</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile?.expertise?.map((exp, index) => (
                          <Badge key={index} variant="secondary">{exp}</Badge>
                        )) || <span className="text-gray-400">Not set</span>}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Hourly Rate</span>
                      <p className="font-medium">${profile?.hourlyRate || 0}/hour</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Timezone</span>
                      <p className="font-medium">{profile?.timezone || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Calendly Link</span>
                      {profile?.calendlyLink ? (
                        <div className="flex items-center space-x-2 mt-1">
                          <a 
                            href={profile.calendlyLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <span className="truncate">{profile.calendlyLink}</span>
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyCalendlyLink}
                            className="h-6 w-6 p-0"
                          >
                            {copied ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not set</span>
                      )}
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Bio</span>
                      <p className="text-sm">{profile?.bio || "No bio provided"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calendly Integration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendly Integration</CardTitle>
                <CardDescription>
                  Manage your scheduling with Calendly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Set up your Calendly link in your profile</li>
                      <li>• Students will see your link on the student dashboard</li>
                      <li>• Students can book sessions directly through Calendly</li>
                      <li>• You&apos;ll receive notifications from Calendly for new bookings</li>
                    </ul>
                  </div>
                  
                  {profile?.calendlyLink ? (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-900">Calendly Link Active</span>
                      </div>
                      <p className="text-sm text-green-800 mb-3">
                        Students can now book sessions with you through your Calendly link.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(profile.calendlyLink, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Calendly
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-yellow-900">No Calendly Link Set</span>
                      </div>
                      <p className="text-sm text-yellow-800 mb-3">
                        Add your Calendly link to your profile to start receiving bookings.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Add Calendly Link
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}