import { Navigation } from "@/components/marketing/navigation"
import { Footer } from "@/components/marketing/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SolutionsPage() {
  const solutions = [
    {
      title: "For Small Businesses",
      description: "Grow your business with affordable, easy-to-use marketing automation",
      benefits: [
        "Quick setup and onboarding",
        "Affordable pricing plans",
        "Templates and best practices",
        "No technical expertise required",
        "Scales as you grow"
      ]
    },
    {
      title: "For Marketing Agencies",
      description: "Manage multiple client campaigns from a single platform",
      benefits: [
        "Multi-client management",
        "White-label options",
        "Team collaboration tools",
        "Client reporting dashboards",
        "Agency-specific pricing"
      ]
    },
    {
      title: "For E-commerce",
      description: "Drive more sales with automated marketing campaigns",
      benefits: [
        "Shopping cart abandonment recovery",
        "Product recommendation emails",
        "Customer segmentation",
        "Order follow-up automation",
        "Integration with major platforms"
      ]
    },
    {
      title: "For B2B Companies",
      description: "Generate and nurture leads through the sales pipeline",
      benefits: [
        "Lead scoring and qualification",
        "Sales pipeline management",
        "Account-based marketing",
        "CRM integration",
        "ROI tracking and reporting"
      ]
    },
    {
      title: "For SaaS Companies",
      description: "Automate user onboarding and reduce churn",
      benefits: [
        "User onboarding workflows",
        "Feature adoption campaigns",
        "Churn prevention automation",
        "Usage-based segmentation",
        "In-app messaging integration"
      ]
    },
    {
      title: "For Content Creators",
      description: "Build and engage your audience with powerful tools",
      benefits: [
        "Newsletter management",
        "Content distribution automation",
        "Audience segmentation",
        "Subscription management",
        "Analytics and insights"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Solutions for every business
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover how Sagestone can help your business grow, no matter your industry or size
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{solution.title}</CardTitle>
                <CardDescription className="text-lg">{solution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
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
