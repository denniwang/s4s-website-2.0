import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test basic database connection
    await prisma.$connect()
    
    // Test a simple query
    const userCount = await prisma.user.count()
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      userCount,
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
    })
  } catch (error) {
    console.error('Database connection error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
    }, { status: 500 })
  }
} 