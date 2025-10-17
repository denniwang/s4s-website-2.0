'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn&apos;t load the Playbook right now. Please try again.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => reset()} className="bg-blue-600 hover:bg-blue-700">Try again</Button>
            <Link href="/" className="inline-flex items-center px-4 py-2 border rounded-md text-blue-600 border-blue-200">Go home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


