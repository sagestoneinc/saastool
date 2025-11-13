import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create demo user
  const passwordHash = await hashPassword('password123')
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@sagestone.dev' },
    update: {},
    create: {
      email: 'demo@sagestone.dev',
      passwordHash,
      firstName: 'Demo',
      lastName: 'User',
    },
  })

  console.log('Created demo user:', user.email)

  // Create workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo-workspace',
      website: 'https://demo.example.com',
      industry: 'Technology',
      businessGoal: 'lead_gen',
      defaultFromName: 'Demo Company',
      defaultFromEmail: 'hello@demo.example.com',
    },
  })

  console.log('Created workspace:', workspace.name)

  // Add user to workspace
  await prisma.workspaceMember.upsert({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId: workspace.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      workspaceId: workspace.id,
      role: 'owner',
      joinedAt: new Date(),
    },
  })

  // Create tags
  const tags = ['Customer', 'VIP', 'Lead', 'Trial', 'Churned']
  const createdTags = []

  for (const tagName of tags) {
    const tag = await prisma.tag.upsert({
      where: {
        workspaceId_name: {
          workspaceId: workspace.id,
          name: tagName,
        },
      },
      update: {},
      create: {
        workspaceId: workspace.id,
        name: tagName,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      },
    })
    createdTags.push(tag)
  }

  console.log('Created tags:', tags.length)

  // Create contacts
  const contacts = [
    { firstName: 'John', lastName: 'Smith', email: 'john@example.com', phone: '+1 (555) 123-4567', company: 'Acme Corp', tags: ['Customer', 'VIP'] },
    { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@example.com', phone: '+1 (555) 234-5678', company: 'Tech Inc', tags: ['Lead'] },
    { firstName: 'Mike', lastName: 'Davis', email: 'mike@example.com', phone: '+1 (555) 345-6789', company: 'Startup LLC', tags: ['Customer'] },
    { firstName: 'Emily', lastName: 'Brown', email: 'emily@example.com', phone: '+1 (555) 456-7890', company: 'Design Co', tags: ['Trial'] },
    { firstName: 'David', lastName: 'Wilson', email: 'david@example.com', phone: '+1 (555) 567-8901', company: 'Marketing Agency', tags: ['Lead'] },
  ]

  for (const contactData of contacts) {
    const contact = await prisma.contact.upsert({
      where: {
        workspaceId_email: {
          workspaceId: workspace.id,
          email: contactData.email,
        },
      },
      update: {},
      create: {
        workspaceId: workspace.id,
        email: contactData.email,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        phone: contactData.phone,
        company: contactData.company,
        status: 'active',
      },
    })

    // Add tags to contact
    for (const tagName of contactData.tags) {
      const tag = createdTags.find(t => t.name === tagName)
      if (tag) {
        await prisma.contactTag.upsert({
          where: {
            contactId_tagId: {
              contactId: contact.id,
              tagId: tag.id,
            },
          },
          update: {},
          create: {
            contactId: contact.id,
            tagId: tag.id,
          },
        })
      }
    }
  }

  console.log('Created contacts:', contacts.length)

  // Create a segment
  const segment = await prisma.segment.create({
    data: {
      workspaceId: workspace.id,
      name: 'Active Customers',
      description: 'All active customers',
      filters: JSON.stringify({ status: 'active', tags: ['Customer'] }),
    },
  })

  console.log('Created segment:', segment.name)

  // Create campaigns
  const campaign = await prisma.campaign.create({
    data: {
      workspaceId: workspace.id,
      name: 'Welcome Email Series',
      type: 'email',
      status: 'sent',
      subject: 'Welcome to our platform!',
      fromName: 'Demo Company',
      fromEmail: 'hello@demo.example.com',
      content: JSON.stringify({
        blocks: [
          { type: 'heading', content: 'Welcome!' },
          { type: 'text', content: 'Thank you for signing up.' },
          { type: 'button', content: 'Get Started', url: 'https://example.com' },
        ],
      }),
      segmentId: segment.id,
      sentAt: new Date(),
    },
  })

  // Add campaign stats
  await prisma.campaignStat.create({
    data: {
      campaignId: campaign.id,
      sends: 2543,
      opens: 812,
      clicks: 156,
      unsubscribes: 12,
      bounces: 23,
    },
  })

  console.log('Created campaign:', campaign.name)

  // Create pipeline
  const pipeline = await prisma.pipeline.create({
    data: {
      workspaceId: workspace.id,
      name: 'Sales Pipeline',
      description: 'Main sales pipeline',
    },
  })

  // Create pipeline stages
  const stageNames = ['New', 'Qualified', 'Proposal', 'Won', 'Lost']
  const stages = []

  for (let i = 0; i < stageNames.length; i++) {
    const stage = await prisma.pipelineStage.create({
      data: {
        pipelineId: pipeline.id,
        name: stageNames[i],
        order: i,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      },
    })
    stages.push(stage)
  }

  console.log('Created pipeline with stages:', stageNames.length)

  // Create automation
  const automation = await prisma.automation.create({
    data: {
      workspaceId: workspace.id,
      name: 'Welcome Email Sequence',
      description: 'Send welcome emails to new subscribers',
      trigger: JSON.stringify({ type: 'segment_joined', segmentId: segment.id }),
      isActive: true,
    },
  })

  // Add automation steps
  await prisma.automationStep.createMany({
    data: [
      {
        automationId: automation.id,
        stepOrder: 1,
        type: 'send_email',
        config: JSON.stringify({ subject: 'Welcome!', template: 'welcome-1' }),
      },
      {
        automationId: automation.id,
        stepOrder: 2,
        type: 'wait',
        config: JSON.stringify({ duration: '1 day' }),
      },
      {
        automationId: automation.id,
        stepOrder: 3,
        type: 'send_email',
        config: JSON.stringify({ subject: 'Getting Started', template: 'welcome-2' }),
      },
    ],
  })

  console.log('Created automation:', automation.name)

  console.log('✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
