import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Play, Pause } from "lucide-react"

export default function AutomationsPage() {
  const automations = [
    {
      id: "1",
      name: "Welcome Email Sequence",
      description: "Send a series of welcome emails to new subscribers",
      trigger: "Contact joins segment",
      isActive: true,
      triggered: 245,
      completed: 198,
    },
    {
      id: "2",
      name: "Abandoned Cart Recovery",
      description: "Remind customers about items left in their cart",
      trigger: "Cart abandoned",
      isActive: true,
      triggered: 89,
      completed: 34,
    },
    {
      id: "3",
      name: "Lead Nurture Campaign",
      description: "Engage leads with educational content over 30 days",
      trigger: "Form submitted",
      isActive: false,
      triggered: 0,
      completed: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automations</h1>
          <p className="text-muted-foreground">Build workflows to automate your marketing</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/automations/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Automation
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {automations.map((automation) => (
          <Card key={automation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    <Link href={`/dashboard/automations/${automation.id}`} className="hover:text-blue-600">
                      {automation.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{automation.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={automation.isActive ? "outline" : "default"}
                    size="sm"
                  >
                    {automation.isActive ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Activate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Trigger:</span>
                  <span className="font-medium">{automation.trigger}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    automation.isActive 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {automation.isActive ? "Active" : "Paused"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Triggered</p>
                    <p className="text-2xl font-bold">{automation.triggered}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{automation.completed}</p>
                    {automation.triggered > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {((automation.completed / automation.triggered) * 100).toFixed(1)}% completion
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/automations/${automation.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/automations/${automation.id}/edit`}>Edit Workflow</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
