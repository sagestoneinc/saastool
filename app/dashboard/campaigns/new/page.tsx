"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, MessageSquare } from "lucide-react"

function NewCampaignForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [campaignType, setCampaignType] = useState<"email" | "sms">("email")
  
  useEffect(() => {
    const typeParam = searchParams.get("type")
    if (typeParam === "email" || typeParam === "sms") {
      setCampaignType(typeParam)
    }
  }, [searchParams])

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    fromName: "",
    fromEmail: "",
    content: "",
    status: "draft",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Simulate successful creation
      console.log("Creating campaign:", { ...formData, type: campaignType })
      
      // Redirect to campaigns page
      router.push("/dashboard/campaigns")
    } catch (error) {
      console.error("Error creating campaign:", error)
      alert("Failed to create campaign. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/campaigns">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${campaignType === "email" ? "bg-blue-100" : "bg-green-100"}`}>
          {campaignType === "email" ? (
            <Mail className={`h-6 w-6 ${campaignType === "email" ? "text-blue-600" : "text-green-600"}`} />
          ) : (
            <MessageSquare className="h-6 w-6 text-green-600" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            Create {campaignType === "email" ? "Email" : "SMS"} Campaign
          </h1>
          <p className="text-muted-foreground">
            Design and schedule your {campaignType} campaign
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Campaign Type</Label>
                <Select value={campaignType} onValueChange={(value: "email" | "sms") => setCampaignType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="sms">SMS Campaign</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., Summer Sale 2024"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {campaignType === "email" && (
            <Card>
              <CardHeader>
                <CardTitle>Email Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Enter email subject"
                    required={campaignType === "email"}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name *</Label>
                    <Input
                      id="fromName"
                      value={formData.fromName}
                      onChange={(e) => handleChange("fromName", e.target.value)}
                      placeholder="Your Company"
                      required={campaignType === "email"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email *</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={formData.fromEmail}
                      onChange={(e) => handleChange("fromEmail", e.target.value)}
                      placeholder="noreply@company.com"
                      required={campaignType === "email"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>
                {campaignType === "email" ? "Email Content" : "SMS Message"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">
                  {campaignType === "email" ? "Email Body" : "Message Text"} *
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder={
                    campaignType === "email"
                      ? "Enter your email content here..."
                      : "Enter your SMS message (max 160 characters)..."
                  }
                  rows={10}
                  maxLength={campaignType === "sms" ? 160 : undefined}
                  required
                />
                {campaignType === "sms" && (
                  <p className="text-sm text-muted-foreground">
                    {formData.content.length}/160 characters
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/campaigns">Cancel</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function NewCampaignPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewCampaignForm />
    </Suspense>
  )
}
