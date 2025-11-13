import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/contacts - List all contacts for a workspace
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const workspaceId = searchParams.get('workspaceId')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      )
    }

    interface WhereClause {
      workspaceId: string
      OR?: Array<{
        firstName?: { contains: string; mode: 'insensitive' }
        lastName?: { contains: string; mode: 'insensitive' }
        email?: { contains: string; mode: 'insensitive' }
      }>
    }

    const where: WhereClause = { workspaceId }

    // Add search filter
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get contacts with pagination
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count({ where }),
    ])

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/contacts - Create a new contact
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { workspaceId, email, firstName, lastName, phone, company, tags } = body

    if (!workspaceId || !email) {
      return NextResponse.json(
        { error: 'Workspace ID and email are required' },
        { status: 400 }
      )
    }

    // Check if contact already exists
    const existingContact = await prisma.contact.findUnique({
      where: {
        workspaceId_email: {
          workspaceId,
          email,
        },
      },
    })

    if (existingContact) {
      return NextResponse.json(
        { error: 'Contact with this email already exists' },
        { status: 400 }
      )
    }

    // Create contact
    const contact = await prisma.contact.create({
      data: {
        workspaceId,
        email,
        firstName,
        lastName,
        phone,
        company,
      },
    })

    // Add tags if provided
    if (tags && Array.isArray(tags)) {
      for (const tagName of tags) {
        // Find or create tag
        const tag = await prisma.tag.upsert({
          where: {
            workspaceId_name: {
              workspaceId,
              name: tagName,
            },
          },
          create: {
            workspaceId,
            name: tagName,
          },
          update: {},
        })

        // Associate tag with contact
        await prisma.contactTag.create({
          data: {
            contactId: contact.id,
            tagId: tag.id,
          },
        })
      }
    }

    // Fetch the created contact with tags
    const contactWithTags = await prisma.contact.findUnique({
      where: { id: contact.id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json(contactWithTags, { status: 201 })
  } catch (error) {
    console.error('Create contact error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
