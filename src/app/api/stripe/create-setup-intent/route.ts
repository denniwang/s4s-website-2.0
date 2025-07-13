import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check if user is a consulted student
    const user = await fetch(`${process.env.NEXTAUTH_URL}/api/users?email=${session.user.email}`)
      .then(res => res.json())
      .catch(() => null)

    if (!user || user.role !== 'CONSULTED_STUDENT') {
      return NextResponse.json(
        { error: 'Only consulted students can add payment methods' },
        { status: 403 }
      )
    }

    // Create a setup intent
    const setupIntent = await stripe.setupIntents.create({
      customer: session.user.email, // Using email as customer identifier
      payment_method_types: ['card'],
      usage: 'off_session', // Allow the payment method to be used for future payments
    })

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating setup intent:', error)
    return NextResponse.json(
      { error: 'Failed to create setup intent' },
      { status: 500 }
    )
  }
} 