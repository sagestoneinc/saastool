import { Navigation } from "@/components/marketing/navigation"
import { Footer } from "@/components/marketing/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductPage() {
  const modules = [
    {
      title: "Contacts & CRM",
      description: "Manage all your contacts in one place with powerful segmentation and tagging",
      features: [
        "Unlimited contact storage",
        "Custom fields and properties",
        "Smart segmentation",
        "Advanced search and filters",
        "Contact activity timeline"
      ]
    },
    {
      title: "Email & SMS Campaigns",
      description: "Create and send beautiful email and SMS campaigns to engage your audience",
      features: [
        "Drag-and-drop email builder",
        "SMS campaign support",
        "A/B testing",
        "Scheduling and automation",
        "Detailed analytics"
      ]
    },
    {
      title: "Automations & Workflows",
      description: "Build sophisticated automation workflows to nurture leads on autopilot",
      features: [
        "Visual workflow builder",
        "Trigger-based automations",
        "Conditional logic",
        "Multi-step sequences",
        "Integration with all modules"
      ]
    },
    {
      title: "Funnels & Landing Pages",
      description: "Create high-converting landing pages and complete marketing funnels",
      features: [
        "Page builder with templates",
        "Mobile responsive designs",
        "Custom domains",
        "A/B testing",
        "Conversion tracking"
      ]
    },
    {
      title: "Forms",
      description: "Build custom forms to capture leads from any channel",
      features: [
        "Custom form fields",
        "Conditional logic",
        "Embed anywhere",
        "Anti-spam protection",
        "Webhook integrations"
      ]
    },
    {
      title: "Reporting & Analytics",
      description: "Get deep insights into your marketing performance",
      features: [
        "Real-time dashboards",
        "Campaign analytics",
        "Revenue attribution",
        "Custom reports",
        "Export capabilities"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Everything you need to grow your business
          </h1>
          <p className="text-xl text-muted-foreground">
            Sagestone combines powerful marketing automation, CRM, and analytics in one platform
          </p>
        </div>

        <div className="space-y-12">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{module.title}</CardTitle>
                <CardDescription className="text-lg">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
