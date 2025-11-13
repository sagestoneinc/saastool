import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Copy } from "lucide-react"

export default function FormsPage() {
  const forms = [
    {
      id: "1",
      name: "Contact Us Form",
      description: "Main contact form on the website",
      submissions: 234,
      fields: 5,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Newsletter Signup",
      description: "Email subscription form",
      submissions: 1243,
      fields: 2,
      createdAt: "2024-01-20",
    },
    {
      id: "3",
      name: "Demo Request",
      description: "Sales demo request form",
      submissions: 87,
      fields: 7,
      createdAt: "2024-02-01",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>
          <p className="text-muted-foreground">Create forms to capture leads</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/forms/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Form
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                <Link href={`/dashboard/forms/${form.id}`} className="hover:text-blue-600">
                  {form.name}
                </Link>
              </CardTitle>
              <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Submissions</p>
                    <p className="text-2xl font-bold">{form.submissions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fields</p>
                    <p className="text-2xl font-bold">{form.fields}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Created {form.createdAt}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/dashboard/forms/${form.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
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
