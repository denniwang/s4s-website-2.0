'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorDetails = (error: string | null) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Already Exists',
          description: 'An account with this email already exists using a different sign-in method. Please sign in with your original method.',
          icon: AlertCircle,
          color: 'text-orange-600'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          description: 'You denied the permission request. Please try again and allow the required permissions.',
          icon: Lock,
          color: 'text-red-600'
        }
      case 'Verification':
        return {
          title: 'Verification Required',
          description: 'Please check your email and click the verification link to continue.',
          icon: Mail,
          color: 'text-blue-600'
        }
      default:
        return {
          title: 'Authentication Error',
          description: 'An error occurred during authentication. Please try again.',
          icon: AlertCircle,
          color: 'text-red-600'
        }
    }
  }

  const errorDetails = getErrorDetails(error)
  const IconComponent = errorDetails.icon

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/s4s-trans.png"
              alt="S4S Logo"
              width={80}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <IconComponent className={`h-6 w-6 ${errorDetails.color}`} />
            <CardTitle className="text-2xl text-center">{errorDetails.title}</CardTitle>
          </div>
          <CardDescription className="text-center">
            {errorDetails.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error === 'OAuthAccountNotLinked' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center">
                You can either:
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/auth/signin">
                    Sign in with Email/Password
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/signup">
                    Create a New Account
                  </Link>
                </Button>
              </div>
            </div>
          )}
          
          {error !== 'OAuthAccountNotLinked' && (
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/signin">
                  Try Again
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  Go Home
                </Link>
              </Button>
            </div>
          )}
          
          <div className="text-center text-sm text-gray-500">
            <p>Need help? Contact us at support@trys4s.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AuthErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/s4s-trans.png"
              alt="S4S Logo"
              width={80}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <CardTitle className="text-2xl text-center">Loading...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={<AuthErrorFallback />}>
      <AuthErrorContent />
    </Suspense>
  )
} 