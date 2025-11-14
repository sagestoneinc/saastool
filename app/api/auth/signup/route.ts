import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName } = body

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
    })

    // Create default workspace for the user
    const workspace = await prisma.workspace.create({
      data: {
        name: `${firstName}'s Workspace`,
        slug: `${firstName.toLowerCase()}-workspace-${Date.now()}`,
        members: {
          create: {
            userId: user.id,
            role: 'owner',
            joinedAt: new Date(),
          },
        },
      },
    })

    // Send welcome email (don't block on this)
    sendWelcomeEmail(email, firstName).catch((error) => {
      console.error('Failed to send welcome email:', error)
      // Don't fail the signup if email fails
    })

    // Generate JWT token
    const token = generateToken({ userId: user.id, email: user.email })

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        workspace: {
          id: workspace.id,
          name: workspace.name,
        },
        token,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
