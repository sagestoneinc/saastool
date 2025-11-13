import { Navigation } from "@/components/marketing/navigation"
import { Footer } from "@/components/marketing/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  const values = [
    {
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, building features that solve real problems."
    },
    {
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge marketing automation technology."
    },
    {
      title: "Simplicity",
      description: "Complex problems deserve simple solutions. We make powerful tools accessible to everyone."
    },
    {
      title: "Transparency",
      description: "We believe in honest communication, clear pricing, and building trust with our customers."
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building the future of marketing automation
          </h1>
          <p className="text-xl text-muted-foreground">
            Our mission is to empower businesses of all sizes to grow through intelligent marketing automation
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sagestone was born from a simple observation: marketing automation tools were either too complicated for small businesses or too limited for growing companies. We believed there had to be a better way.
                </p>
                <p>
                  Founded by a team of marketing professionals and engineers, we set out to create a platform that combines the power of enterprise tools with the simplicity that small businesses need. Today, we're proud to serve thousands of businesses worldwide.
                </p>
                <p>
                  Our platform helps businesses automate their marketing, manage customer relationships, and drive growth—all from one intuitive interface. We're constantly innovating and adding new features based on feedback from our amazing community.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Join Our Team</h2>
          <p className="text-center text-muted-foreground mb-6">
            We're always looking for talented individuals who share our passion for building great products.
          </p>
          <div className="text-center">
            <a href="mailto:careers@sagestone.dev" className="text-blue-600 font-medium hover:underline">
              View Open Positions →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
