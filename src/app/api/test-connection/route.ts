import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test basic network connectivity to Supabase
    const response = await fetch('https://db.vismbkvlspgxpuwlygum.supabase.co:5432', {
      method: 'HEAD'
    })
    
    return NextResponse.json({
      status: 'success',
      message: 'Network connectivity test passed',
      responseStatus: response.status
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Network connectivity test failed',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 