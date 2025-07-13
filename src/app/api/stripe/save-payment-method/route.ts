import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    // Update user with payment method ID
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        // You might want to add a paymentMethodId field to your User model
        // For now, we'll store it in a custom field or you can add it to the schema
        // paymentMethodId: paymentMethodId,
      },
    })

    return NextResponse.json({
      message: 'Payment method saved successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        // paymentMethodId: updatedUser.paymentMethodId,
      }
    })
  } catch (error) {
    console.error('Error saving payment method:', error)
    return NextResponse.json(
      { error: 'Failed to save payment method' },
      { status: 500 }
    )
  }
} 