import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
})

export async function POST() {
  try {
    // Check environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { error: 'Stripe configuration error' },
        { status: 500 }
      )
    }
    
    console.log('Stripe key exists:', !!process.env.STRIPE_SECRET_KEY)
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      console.error('No session or user email found')
      console.log('Session:', session)
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    console.log('User email:', session.user.email)

    // Check if user is a consulted student by querying the database directly
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
      }
    })

    if (!user) {
      console.error('User not found in database:', session.user.email)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.role !== 'CONSULTED_STUDENT') {
      console.error('User is not a consulted student:', user.role)
      return NextResponse.json(
        { error: 'Only consulted students can add payment methods' },
        { status: 403 }
      )
    }

    console.log('User verified:', user.email, 'Role:', user.role)

    // Create or get a Stripe customer first
    let customer
    try {
      const existingCustomers = await stripe.customers.list({
        email: session.user?.email,
        limit: 1,
      })
      
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
        console.log('Found existing customer:', customer.id)
      } else {
        customer = await stripe.customers.create({
          email: session.user?.email,
          name: session.user?.name || undefined,
        })
        console.log('Created new customer:', customer.id)
      }
    } catch (error) {
      console.error('Error creating/finding customer:', error)
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      )
    }

    // Create a setup intent
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      usage: 'off_session', // Allow the payment method to be used for future payments
    })

    console.log('Created setup intent:', setupIntent.id, 'for customer:', customer.id)

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
    })
  } catch (error) {
    console.error('Error creating setup intent:', error)
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to create setup intent',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 