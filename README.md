# Sagestone - Marketing Automation & CRM Platform

A production-ready, full-stack SaaS application for marketing automation and CRM, similar to Mailchimp and GoHighLevel. Built with Next.js 16, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### Marketing Website
- Modern, Prismfly-inspired design with bold typography and clean layouts
- Fully responsive across all devices
- Pages included:
  - Home (hero, features, social proof, testimonials, CTA)
  - Product (module overviews with benefits)
  - Pricing (tiered plans with FAQ)
  - About (company story and values)
  - Contact (comprehensive form with revenue/budget selectors)

### SaaS Application
Comprehensive dashboard with the following modules:

#### Core Features
- **Dashboard**: Overview with key metrics, recent activity, and campaign performance
- **Contacts & CRM**: Manage contacts with tags, segments, search, and filters
- **Campaigns**: Create and send email/SMS campaigns with analytics
- **Automations**: Build workflow sequences with triggers and actions
- **Funnels & Landing Pages**: Create high-converting funnels and pages
- **Forms**: Build custom forms to capture leads
- **Pipelines**: Track deals through customizable sales stages
- **Calendar**: Manage appointments and schedule events
- **Settings**: Profile, workspace, branding, and notification preferences

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components inspired by shadcn/ui with Radix UI primitives
- **Backend**: Next.js API Routes (ready for implementation)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based (structure ready for implementation)
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd saastool
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/sagestone?schema=public"

# JWT Secret for authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js URLs
NEXT_PUBLIC_MARKETING_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

4. **Set up the database**

Generate Prisma client:
```bash
npx prisma generate
```

Run database migrations (when ready):
```bash
npx prisma migrate dev --name init
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the marketing site.
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the SaaS app.

## 📁 Project Structure

```
saastool/
├── app/                      # Next.js App Router pages
│   ├── (marketing)/          # Marketing website routes
│   │   ├── page.tsx          # Homepage
│   │   ├── product/          # Product page
│   │   ├── pricing/          # Pricing page
│   │   ├── about/            # About page
│   │   └── contact/          # Contact page
│   ├── auth/                 # Authentication pages
│   │   ├── login/            # Login page
│   │   └── signup/           # Signup page
│   └── dashboard/            # SaaS app pages
│       ├── page.tsx          # Dashboard overview
│       ├── contacts/         # Contacts management
│       ├── campaigns/        # Email/SMS campaigns
│       ├── automations/      # Workflow automations
│       ├── funnels/          # Funnels & landing pages
│       ├── forms/            # Form builder
│       ├── pipelines/        # Sales pipelines
│       ├── calendar/         # Calendar & appointments
│       └── settings/         # Settings pages
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── marketing/            # Marketing site components
│   └── app/                  # SaaS app components
├── lib/                      # Utility functions
│   ├── prisma.ts            # Prisma client
│   ├── auth.ts              # Authentication utilities
│   └── utils.ts             # General utilities
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                   # Static assets
```

## 🗄 Database Schema

The application includes a comprehensive Prisma schema with the following entities:

- **User**: User accounts with authentication
- **Workspace**: Multi-tenant workspaces
- **WorkspaceMember**: User-workspace relationships
- **Contact**: Customer and lead information
- **Tag**: Contact tagging system
- **Segment**: Contact segmentation
- **Campaign**: Email and SMS campaigns
- **CampaignStat**: Campaign analytics
- **Automation**: Marketing automation workflows
- **AutomationStep**: Workflow step definitions
- **Funnel**: Marketing funnels
- **LandingPage**: Landing page builder
- **Form**: Form builder and submissions
- **Pipeline**: Sales pipeline management
- **PipelineStage**: Pipeline stages
- **Opportunity**: Deal tracking
- **ActivityLog**: Activity tracking
- **Settings**: Workspace settings

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

### Database Setup
For production, use a managed PostgreSQL database:
- Vercel Postgres
- Railway
- Supabase
- AWS RDS
- Render

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Component-based architecture
- Tailwind CSS for styling

## 🎨 Design System

The application follows a Prismfly-inspired design with:
- Clean, spacious layouts
- Bold typography with clear hierarchy
- Soft cards with rounded corners
- Subtle shadows and hover states
- Minimal, elegant color palette
- Responsive design patterns

## 📝 API Routes (To Be Implemented)

The following API routes are ready to be implemented:

- `/api/auth/*` - Authentication endpoints
- `/api/contacts/*` - Contact management
- `/api/campaigns/*` - Campaign operations
- `/api/automations/*` - Automation workflows
- `/api/funnels/*` - Funnel management
- `/api/forms/*` - Form operations
- `/api/pipelines/*` - Pipeline management

## 🔐 Security

- JWT-based authentication (structure ready)
- Password hashing with bcrypt
- Environment variable management
- Multi-tenant data isolation in database schema
- Input validation ready for API implementation

## 📄 License

This project is proprietary software for Sagestone Inc.

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.

## 📞 Support

For support, email: support@sagestone.dev
Website: https://tool.sagestone.dev (when deployed)
