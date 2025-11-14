import { NextResponse } from 'next/server'

/**
 * Checks if an error is a database-related error and returns an appropriate response
 * @param error The caught error
 * @returns NextResponse with appropriate error message and status code, or null if not a database error
 * 
 * Note: This function uses string matching for error detection as Prisma connection errors
 * don't always expose structured error codes. While this is less robust than checking error
 * codes, it provides practical coverage for common database connectivity issues.
 */
export function handleDatabaseError(error: unknown): NextResponse | null {
  if (!(error instanceof Error)) {
    return null
  }

  // Check for Prisma connection errors
  // These patterns cover common database connectivity issues
  if (
    error.message.includes('Can\'t reach database server') ||
    error.message.includes('Connection refused') ||
    (error.message.includes('database') && error.message.includes('connect'))
  ) {
    return NextResponse.json(
      { error: 'Database connection failed. Please contact support.' },
      { status: 503 }
    )
  }

  // Check for environment variable errors
  if (error.message.includes('DATABASE_URL')) {
    return NextResponse.json(
      { error: 'Database configuration error. Please contact support.' },
      { status: 503 }
    )
  }

  return null
}

/**
 * Checks if DATABASE_URL is configured
 * @returns NextResponse with error if not configured, null otherwise
 */
export function checkDatabaseConfig(): NextResponse | null {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not configured')
    return NextResponse.json(
      { error: 'Database configuration error. Please contact support.' },
      { status: 503 }
    )
  }
  return null
}
