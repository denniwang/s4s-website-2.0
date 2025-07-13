import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    console.log('Fetching payment method for user:', session.user.email)

    // Find the user's Stripe customer
    const existingCustomers = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
    })

    console.log('Found customers:', existingCustomers.data.length)

    if (existingCustomers.data.length === 0) {
      console.log('No customer found for email:', session.user.email)
      return NextResponse.json({
        paymentMethod: null
      })
    }

    const customer = existingCustomers.data[0]
    console.log('Customer ID:', customer.id)
    console.log('Default payment method:', customer.invoice_settings?.default_payment_method)

    // Get the customer's default payment method
    if (customer.invoice_settings?.default_payment_method) {
      try {
        const paymentMethod = await stripe.paymentMethods.retrieve(
          customer.invoice_settings.default_payment_method as string
        )

        console.log('Retrieved payment method:', paymentMethod.id)
        return NextResponse.json({
          paymentMethod: {
            id: paymentMethod.id,
            card: {
              brand: paymentMethod.card?.brand,
              last4: paymentMethod.card?.last4,
              exp_month: paymentMethod.card?.exp_month,
              exp_year: paymentMethod.card?.exp_year,
            }
          }
        })
      } catch (error) {
        console.error('Error retrieving payment method:', error)
        return NextResponse.json({
          paymentMethod: null
        })
      }
    }

    // If no default payment method, get the first available one
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'card',
      limit: 1,
    })

    console.log('Found payment methods:', paymentMethods.data.length)

    if (paymentMethods.data.length > 0) {
      const paymentMethod = paymentMethods.data[0]
      console.log('Using first payment method:', paymentMethod.id)
      return NextResponse.json({
        paymentMethod: {
          id: paymentMethod.id,
          card: {
            brand: paymentMethod.card?.brand,
            last4: paymentMethod.card?.last4,
            exp_month: paymentMethod.card?.exp_month,
            exp_year: paymentMethod.card?.exp_year,
          }
        }
      })
    }

    console.log('No payment methods found')
    return NextResponse.json({
      paymentMethod: null
    })
  } catch (error) {
    console.error('Error fetching payment method:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment method' },
      { status: 500 }
    )
  }
} 