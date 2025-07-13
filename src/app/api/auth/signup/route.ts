import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['PROSPECT', 'CONSULTED_STUDENT', 'PARENT', 'MENTOR', 'ADMIN']),
  grade: z.string().optional(),
  school: z.string().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  bio: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user (without email verification)
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        grade: validatedData.grade,
        school: validatedData.school,
        university: validatedData.university,
        major: validatedData.major,
        bio: validatedData.bio,
        // Don't set emailVerified - user needs to verify first
      }
    })

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        identifier: validatedData.email,
        token: verificationToken,
        expires: expires,
      }
    })

    // Send verification email
    const emailResult = await sendVerificationEmail(validatedData.email, verificationToken)
    
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error)
      // Still create the user, but log the email error
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(
      { 
        message: 'User created successfully. Please check your email to verify your account.',
        user: userWithoutPassword,
        emailSent: emailResult.success
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 