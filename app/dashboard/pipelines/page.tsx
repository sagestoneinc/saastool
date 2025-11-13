import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function PipelinesPage() {
  const pipelines = [
    {
      id: "1",
      name: "Sales Pipeline",
      stages: [
        { name: "New", count: 12, value: "$45,000" },
        { name: "Qualified", count: 8, value: "$32,000" },
        { name: "Proposal", count: 5, value: "$28,000" },
        { name: "Won", count: 3, value: "$15,000" },
        { name: "Lost", count: 2, value: "$8,000" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pipelines</h1>
          <p className="text-muted-foreground">Track deals through your sales process</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/pipelines/new">
            <Plus className="mr-2 h-4 w-4" />
            New Deal
          </Link>
        </Button>
      </div>

      {pipelines.map((pipeline) => (
        <div key={pipeline.id} className="space-y-4">
          <h2 className="text-xl font-semibold">{pipeline.name}</h2>
          <div className="grid grid-cols-5 gap-4">
            {pipeline.stages.map((stage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {stage.name}
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {stage.count}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stage.value}</p>
                  <div className="mt-4 space-y-2">
                    {stage.count > 0 && (
                      <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <p className="text-sm font-medium">Sample Deal {index + 1}</p>
                        <p className="text-xs text-muted-foreground">$5,000 - Acme Corp</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
