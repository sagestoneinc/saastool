You are an expert Next.js + TypeScript + Tailwind engineer and product designer.

Build a production-ready, responsive **marketing website** for my SaaS product with the following requirements.

====================
CONTEXT
====================

Brand/Product: Sagestone  
What it is: A marketing automation + CRM platform (similar problem space to Mailchimp / GoHighLevel).  
Domain: https://tool.sagestone.dev  

Primary goal: Convert visitors into **demo requests** and **free trials**.

Visual/UX direction:
- Take strong inspiration from https://prismfly.com/:
  - Clean, high-end, conversion-focused
  - Generous white space
  - Bold typography
  - Card-based layouts
  - Subtle gradients and hover animations
- Keep the design system reusable so it can be shared later with `app.sagestone.dev`.

Tech stack:
- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- shadcn/ui (or similar) for base components
- Ready for Vercel deployment

====================
PAGES IN SCOPE (MVP)
====================

Implement these pages fully:

1) Home (`/`)
2) Product (`/product`)
3) Pricing (`/pricing`)
4) Contact / “Let’s Talk” (`/contact`)
5) Layout + shared components (nav, footer, buttons, sections)

Nice-to-have placeholders only:
- Blog index (`/blog`) and single post layout (`/blog/[slug]`)
- About page (`/about`)

====================
GLOBAL LAYOUT
====================

- Sticky top navigation:
  - Logo: “Sagestone”
  - Links: Product, Pricing, Resources (can point to /blog), About
  - CTAs on the right:
    - Primary: “Book a Demo”
    - Secondary: “Start Free Trial”
- Footer:
  - Product links
  - Company links
  - Legal links (Terms, Privacy)
  - Social icons (placeholders)
- SEO:
  - Reasonable <title>, <meta description> and OG tags per page
- Responsive:
  - Nav collapses into a mobile menu
  - Cards stack nicely on small screens

====================
HOME PAGE (`/`)
====================

Sections to implement:

1) Hero
- Big headline that frames Sagestone as an all-in-one growth and automation platform.
- Subheadline summarizing:
  - “Email, SMS, funnels, and CRM in one workspace.”
- Two primary buttons:
  - “Book a Demo”
  - “Start Free Trial”
- Right side: mock UI preview (a composed card or dashboard screenshot-style layout).

2) Social proof strip
- Row of 4–6 logo placeholders and a short line like “Trusted by modern service and e-commerce brands.”

3) “What Sagestone Does” feature grid
- 3–4 feature cards:
  - Marketing Automations
  - CRM & Pipelines
  - Funnels & Landing Pages
  - Reporting & Analytics
- Each card: icon, short title, 2–3 bullet points.

4) “How It Works” steps
- 3 horizontal or vertical steps:
  - Capture → Nurture → Convert
- Each step with small icon and simple description.

5) Results / Case-study style section
- 3 cards inspired by Prismfly’s case layout:
  - Metric, short description (e.g. “+35% more booked calls in 60 days”).
  - CTA button: “View story” (can link to `#` for now).

6) Product highlight bands
- 2–3 alternating sections:
  - Left: text describing a key feature (e.g. Automations).
  - Right: simple mock UI / card.
  - Alternate left/right for visual rhythm.

7) Testimonials
- 3–4 testimonials with:
  - Avatar, name, role, brand.
- Use card layout with subtle hover or shadow.

8) Final CTA
- Full-width band near footer:
  - Headline: “Ready to turn traffic into revenue?”
  - Buttons: “Book a Demo” and “Start Free Trial”.

====================
PRODUCT PAGE (`/product`)
====================

Goal: Explain the main modules at a higher level than the app.

Sections:

1) Hero:
- Short product statement like “One workspace for contacts, campaigns, and conversions.”
- CTA: “See it in action” → scrolls to feature overview.

2) Modules overview:
For each module, create a consistent component:
- Title
- Short explanation
- 3 bullets on value, not just features
- Simple illustrative UI card

Modules:
- Contacts & CRM
- Email & SMS Campaigns
- Automations & Workflows
- Funnels & Landing Pages
- Reporting & Analytics

3) “Who it’s for”
- 3 personas (e.g. Agencies, Service Businesses, E-com brands) with mini blurbs.

4) Light FAQ
- 4–6 questions focused on product fit, integrations (can be “coming soon”), and onboarding.

====================
PRICING PAGE (`/pricing`)
====================

Sections:

1) Pricing hero:
- Clear, simple messaging around fair and scalable pricing.
- Toggle for Monthly / Yearly (UI only is fine).

2) Plans:
Implement 3 cards, e.g.:
- Starter
- Growth
- Scale

Each plan includes:
- Price (placeholder, e.g. “$49/mo”)
- “Best for” description
- Feature bullets
- Primary CTA: “Start Free Trial”
- Secondary: “Book a Demo”

3) Comparison table:
- Simple table showing which modules and limits each plan includes.

4) FAQ:
- Pricing and commitment questions in an accordion.

====================
CONTACT / “LET’S TALK” PAGE (`/contact`)
====================

Form inspired by Prismfly’s contact UX:

Fields:
- Full Name
- Email
- Company Name
- Website URL
- Revenue range (dropdown)
- Budget range (dropdown)
- “How did you hear about us?” (dropdown or text)
- Message (textarea)

Behavior:
- Client-side validation with helpful error messages.
- Submits to a Next.js API route (POST `/api/contact`) that:
  - Logs the request (or stores in a simple DB table if easy).
  - Returns success/failure.
- On success:
  - Show a success state in-page (no alert-only UX).

====================
COMPONENT & DESIGN SYSTEM
====================

- Create a small design system so we can reuse in the app later:
  - Button variants (primary, secondary, ghost)
  - Card components
  - Section containers
  - Typography styles
- Use Tailwind utility classes cleanly:
  - Consistent spacing scale
  - Consistent border-radius
  - Consistent shadows

Provide:
- A `Layout` component to wrap all pages (nav + footer).
- Reusable section components if appropriate.

====================
DELIVERABLES
====================

- A working Next.js + TypeScript + Tailwind project for `tool.sagestone.dev`
- All routes/pages wired and styled (/, /product, /pricing, /contact, plus basic /blog and /about placeholders).
- Contact API route implemented.
- Reusable components for layout, buttons, cards, and sections.
- README with:
  - How to run dev server
  - How to build for production
