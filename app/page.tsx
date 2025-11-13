import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/marketing/navigation"
import { Footer } from "@/components/marketing/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Transform your marketing with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              intelligent automation
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            An all-in-one marketing automation and CRM platform designed to help you capture, nurture, and convert leads with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold">Company A</div>
            <div className="text-2xl font-bold">Company B</div>
            <div className="text-2xl font-bold">Company C</div>
            <div className="text-2xl font-bold">Company D</div>
          </div>
        </div>
      </section>

      {/* What Sagestone Does */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need to grow</h2>
          <p className="text-xl text-muted-foreground">
            Powerful features to automate your marketing and manage customer relationships
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Marketing Automation</CardTitle>
              <CardDescription>
                Build sophisticated workflows that nurture leads automatically
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>CRM & Pipelines</CardTitle>
              <CardDescription>
                Manage contacts and track deals through customizable sales pipelines
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Funnels & Landing Pages</CardTitle>
              <CardDescription>
                Create high-converting landing pages and funnels in minutes
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Reporting & Analytics</CardTitle>
              <CardDescription>
                Get insights into campaign performance and customer behavior
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to marketing success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Capture</h3>
              <p className="text-muted-foreground">
                Collect leads through forms, landing pages, and integrations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Nurture</h3>
              <p className="text-muted-foreground">
                Engage with personalized emails, SMS, and automated workflows
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Convert</h3>
              <p className="text-muted-foreground">
                Close deals with powerful CRM and pipeline management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-24">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <CardTitle className="text-4xl md:text-5xl text-white">Ready to grow your business?</CardTitle>
            <CardDescription className="text-xl text-blue-100">
              Join thousands of businesses using Sagestone to automate their marketing and scale their growth.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10" asChild>
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
