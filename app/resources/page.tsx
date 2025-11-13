import { Navigation } from "@/components/marketing/navigation"
import { Footer } from "@/components/marketing/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Getting Started",
      items: [
        {
          title: "Quick Start Guide",
          description: "Learn the basics and get your first campaign running in minutes",
          type: "Guide"
        },
        {
          title: "Platform Overview",
          description: "Comprehensive introduction to all features and capabilities",
          type: "Video"
        },
        {
          title: "Best Practices",
          description: "Tips and strategies from successful marketing automation campaigns",
          type: "Article"
        }
      ]
    },
    {
      category: "Tutorials",
      items: [
        {
          title: "Building Your First Automation",
          description: "Step-by-step guide to creating effective marketing workflows",
          type: "Tutorial"
        },
        {
          title: "Email Campaign Optimization",
          description: "Improve your email marketing results with proven techniques",
          type: "Tutorial"
        },
        {
          title: "Landing Page Design",
          description: "Create high-converting landing pages that drive results",
          type: "Tutorial"
        }
      ]
    },
    {
      category: "Documentation",
      items: [
        {
          title: "API Documentation",
          description: "Complete reference for integrating with Sagestone API",
          type: "Docs"
        },
        {
          title: "Integration Guides",
          description: "Connect Sagestone with your favorite tools and platforms",
          type: "Docs"
        },
        {
          title: "Feature Reference",
          description: "Detailed documentation for every feature and module",
          type: "Docs"
        }
      ]
    },
    {
      category: "Templates",
      items: [
        {
          title: "Email Templates",
          description: "Pre-designed email templates for various industries and use cases",
          type: "Template"
        },
        {
          title: "Automation Workflows",
          description: "Ready-to-use automation templates for common scenarios",
          type: "Template"
        },
        {
          title: "Landing Pages",
          description: "Professional landing page templates optimized for conversions",
          type: "Template"
        }
      ]
    }
  ]

  const support = [
    {
      title: "Knowledge Base",
      description: "Search our comprehensive library of help articles and guides"
    },
    {
      title: "Community Forum",
      description: "Connect with other users, share tips, and get answers"
    },
    {
      title: "Contact Support",
      description: "Get help from our support team via email or live chat"
    },
    {
      title: "Schedule Training",
      description: "Book a personalized training session with our experts"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Resources to help you succeed
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to master marketing automation and grow your business
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {resources.map((section, index) => (
            <div key={index}>
              <h2 className="text-3xl font-bold mb-6">{section.category}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {section.items.map((item, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {item.type}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">Need Help?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {support.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
