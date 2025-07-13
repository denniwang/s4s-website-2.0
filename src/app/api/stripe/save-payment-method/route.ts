import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
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

    const body = await request.json()
    const { paymentMethodId } = body

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: 'Payment method ID is required' },
        { status: 400 }
      )
    }

    console.log('Saving payment method:', paymentMethodId, 'for user:', session.user.email)

    // First, create or get a Stripe customer
    let customer
    try {
      const existingCustomers = await stripe.customers.list({
        email: session.user.email,
        limit: 1,
      })
      
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
      } else {
        customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name || undefined,
        })
      }
    } catch (error) {
      console.error('Error creating/finding customer:', error)
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      )
    }

    // Attach the payment method to the customer
    try {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      })
      
      // Set as default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      })
      
      console.log('Payment method attached to customer:', customer.id)
    } catch (error) {
      console.error('Error attaching payment method:', error)
      return NextResponse.json(
        { error: 'Failed to attach payment method' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Payment method saved successfully',
      customerId: customer.id,
      paymentMethodId: paymentMethodId,
    })
  } catch (error) {
    console.error('Error saving payment method:', error)
    return NextResponse.json(
      { error: 'Failed to save payment method' },
      { status: 500 }
    )
  }
} 