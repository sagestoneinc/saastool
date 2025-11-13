import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mail, TrendingUp, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Contacts",
      value: "2,543",
      change: "+12% from last month",
      icon: Users,
    },
    {
      title: "Emails Sent",
      value: "45,231",
      change: "+8% from last month",
      icon: Mail,
    },
    {
      title: "Open Rate",
      value: "24.5%",
      change: "+2.1% from last month",
      icon: TrendingUp,
    },
    {
      title: "Pipeline Value",
      value: "$125,400",
      change: "+15% from last month",
      icon: DollarSign,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your business overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New contact added", contact: "John Smith", time: "2 minutes ago" },
                { action: "Campaign sent", contact: "Newsletter #45", time: "1 hour ago" },
                { action: "Deal moved", contact: "$5,000 - ABC Corp", time: "3 hours ago" },
                { action: "Form submitted", contact: "Contact Form", time: "5 hours ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.contact}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Top performing campaigns this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Summer Sale 2024", opens: "2,543", rate: "32%" },
                { name: "Product Launch", opens: "1,892", rate: "28%" },
                { name: "Weekly Newsletter", opens: "1,234", rate: "24%" },
                { name: "Customer Survey", opens: "987", rate: "22%" },
              ].map((campaign, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.opens} opens</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">{campaign.rate}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
