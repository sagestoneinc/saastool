import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unknown' as 'ok' | 'error' | 'unknown',
      environment: 'unknown' as 'ok' | 'error' | 'unknown',
    },
    errors: [] as string[],
  }

  // Check DATABASE_URL is configured
  if (!process.env.DATABASE_URL) {
    healthCheck.checks.environment = 'error'
    healthCheck.errors.push('DATABASE_URL environment variable is not set')
    healthCheck.status = 'error'
  } else {
    healthCheck.checks.environment = 'ok'
  }

  // Check database connectivity (only if DATABASE_URL is configured)
  if (healthCheck.checks.environment === 'ok') {
    try {
      await prisma.$queryRaw`SELECT 1`
      healthCheck.checks.database = 'ok'
    } catch (error) {
      healthCheck.checks.database = 'error'
      healthCheck.status = 'error'
      if (error instanceof Error) {
        healthCheck.errors.push(`Database connection failed: ${error.message}`)
      } else {
        healthCheck.errors.push('Database connection failed')
      }
    }
  }

  const statusCode = healthCheck.status === 'ok' ? 200 : 503

  return NextResponse.json(healthCheck, { status: statusCode })
}
