import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not configured')
      return NextResponse.json(
        { error: 'Database configuration error. Please contact support.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        workspaceMembers: {
          include: {
            workspace: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id, email: user.email })

    // Get primary workspace
    const primaryWorkspace = user.workspaceMembers[0]?.workspace

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      workspace: primaryWorkspace ? {
        id: primaryWorkspace.id,
        name: primaryWorkspace.name,
        slug: primaryWorkspace.slug,
      } : null,
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    
    // Check if it's a database connection error
    if (error instanceof Error) {
      // Prisma connection errors
      if (error.message.includes('Can\'t reach database server') || 
          error.message.includes('Connection refused') ||
          error.message.includes('database') && error.message.includes('connect')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please contact support.' },
          { status: 503 }
        )
      }
      
      // Environment variable errors
      if (error.message.includes('DATABASE_URL')) {
        return NextResponse.json(
          { error: 'Database configuration error. Please contact support.' },
          { status: 503 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
