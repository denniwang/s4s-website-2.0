"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      
      if (!token) {
        setStatus('error')
        setMessage('No verification token provided')
        return
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`)
        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage(data.message)
        } else {
          setStatus('error')
          setMessage(data.message || 'Verification failed')
        }
      } catch {
        setStatus('error')
        setMessage('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [searchParams])

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            {status === 'loading' && (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                </div>
                <CardTitle className="text-xl">Verifying your email...</CardTitle>
                <CardDescription>
                  Please wait while we verify your email address.
                </CardDescription>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-xl text-green-600">Email Verified!</CardTitle>
                <CardDescription>
                  Your email has been successfully verified.
                </CardDescription>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="flex justify-center mb-4">
                  <XCircle className="h-12 w-12 text-red-500" />
                </div>
                <CardTitle className="text-xl text-red-600">Verification Failed</CardTitle>
                <CardDescription>
                  There was an issue verifying your email.
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">{message}</p>

            {status === 'success' && (
              <Button onClick={handleSignIn} className="w-full">
                Sign In to Your Account
              </Button>
            )}

            {status === 'error' && (
              <div className="space-y-3">
                <Button onClick={handleSignUp} className="w-full">
                  Sign Up Again
                </Button>
                <Button onClick={handleSignIn} variant="outline" className="w-full">
                  Go to Sign In
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 