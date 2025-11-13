import Link from "next/link"
import { Navigation } from "@/components/marketing/navigation"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 1,000 contacts",
        "Unlimited email campaigns",
        "Basic automation workflows",
        "5 landing pages",
        "Email support",
        "Basic analytics"
      ]
    },
    {
      name: "Growth",
      price: "$149",
      description: "For growing businesses that need more power",
      features: [
        "Up to 10,000 contacts",
        "Unlimited email & SMS campaigns",
        "Advanced automation workflows",
        "Unlimited landing pages",
        "Priority support",
        "Advanced analytics",
        "A/B testing",
        "Custom domains"
      ],
      popular: true
    },
    {
      name: "Scale",
      price: "$399",
      description: "For established businesses scaling up",
      features: [
        "Unlimited contacts",
        "Everything in Growth",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced API access",
        "White-label options",
        "SLA guarantee",
        "Custom reporting"
      ]
    }
  ]

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a 14-day free trial on all plans. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and offer annual billing with a discount."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. No long-term contracts."
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that&apos;s right for your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {tiers.map((tier, index) => (
            <Card key={index} className={`relative ${tier.popular ? 'border-blue-600 border-2 shadow-xl' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
