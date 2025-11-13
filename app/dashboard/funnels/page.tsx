import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function FunnelsPage() {
  const funnels = [
    {
      id: "1",
      name: "Product Launch Funnel",
      description: "Complete funnel for new product launch",
      visits: 5432,
      leads: 892,
      conversions: 123,
      pages: 4,
    },
    {
      id: "2",
      name: "Webinar Registration",
      description: "Landing page and thank you sequence",
      visits: 3241,
      leads: 654,
      conversions: 89,
      pages: 3,
    },
    {
      id: "3",
      name: "Free Trial Signup",
      description: "Trial signup flow with onboarding",
      visits: 2134,
      leads: 432,
      conversions: 67,
      pages: 5,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funnels & Landing Pages</h1>
          <p className="text-muted-foreground">Build high-converting funnels</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/funnels/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Funnel
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funnels.map((funnel) => (
          <Card key={funnel.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                <Link href={`/dashboard/funnels/${funnel.id}`} className="hover:text-blue-600">
                  {funnel.name}
                </Link>
              </CardTitle>
              <CardDescription>{funnel.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Visits</p>
                    <p className="text-lg font-bold">{funnel.visits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Leads</p>
                    <p className="text-lg font-bold">{funnel.leads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conv.</p>
                    <p className="text-lg font-bold">{funnel.conversions}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Conversion Rate:</span>
                  <span className="font-medium">
                    {((funnel.conversions / funnel.visits) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="font-medium">{funnel.pages}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/dashboard/funnels/${funnel.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/funnels/${funnel.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
