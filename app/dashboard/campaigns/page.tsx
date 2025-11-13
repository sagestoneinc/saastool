import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Mail, MessageSquare } from "lucide-react"

export default function CampaignsPage() {
  const campaigns = [
    {
      id: "1",
      name: "Summer Sale 2024",
      type: "email",
      status: "sent",
      sends: 2543,
      opens: 812,
      clicks: 156,
      sentAt: "2024-03-15",
    },
    {
      id: "2",
      name: "Product Launch Announcement",
      type: "email",
      status: "scheduled",
      sends: 0,
      opens: 0,
      clicks: 0,
      sentAt: "2024-03-20",
    },
    {
      id: "3",
      name: "Weekly Newsletter",
      type: "email",
      status: "draft",
      sends: 0,
      opens: 0,
      clicks: 0,
      sentAt: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-700"
      case "scheduled":
        return "bg-blue-100 text-blue-700"
      case "draft":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">Create and manage your email and SMS campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/campaigns/new?type=sms">
              <MessageSquare className="mr-2 h-4 w-4" />
              New SMS
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/campaigns/new?type=email">
              <Mail className="mr-2 h-4 w-4" />
              New Email
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    {campaign.type === "email" ? (
                      <Mail className="h-5 w-5 text-blue-600" />
                    ) : (
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      <Link href={`/dashboard/campaigns/${campaign.id}`} className="hover:text-blue-600">
                        {campaign.name}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {campaign.type.toUpperCase()} Campaign
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sent</p>
                  <p className="text-2xl font-bold">{campaign.sends.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Opens</p>
                  <p className="text-2xl font-bold">{campaign.opens.toLocaleString()}</p>
                  {campaign.sends > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {((campaign.opens / campaign.sends) * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clicks</p>
                  <p className="text-2xl font-bold">{campaign.clicks.toLocaleString()}</p>
                  {campaign.sends > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {((campaign.clicks / campaign.sends) * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-sm font-medium">{campaign.sentAt || "Not scheduled"}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/campaigns/${campaign.id}`}>View Details</Link>
                </Button>
                {campaign.status === "draft" && (
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>Continue Editing</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
