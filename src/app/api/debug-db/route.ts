import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlFormat: 'checking...' as string | object,
    connectionTest: 'pending',
    userCount: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: null as any
  }

  try {
    // Check DATABASE_URL format (safely)
    if (process.env.DATABASE_URL) {
      const url = process.env.DATABASE_URL
      debugInfo.databaseUrlFormat = {
        startsWithPostgresql: url.startsWith('postgresql://'),
        containsSupabaseHost: url.includes('db.vismbkvlspgxpuwlygum.supabase.co'),
        containsPort5432: url.includes(':5432'),
        containsPostgresDb: url.includes('/postgres'),
        hasSslMode: url.includes('sslmode='),
        urlLength: url.length
      }
    }

    // Test connection with detailed logging
    const prisma = new PrismaClient({
      log: ['error', 'warn'],
    })

    console.log('🔍 Attempting database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    debugInfo.connectionTest = 'success'
    
    // Test a simple query
    const userCount = await prisma.user.count()
    debugInfo.userCount = userCount
    
    await prisma.$disconnect()
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    debugInfo.connectionTest = 'failed'
    debugInfo.error = {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3) : null
    }
  }

  return NextResponse.json(debugInfo)
} 