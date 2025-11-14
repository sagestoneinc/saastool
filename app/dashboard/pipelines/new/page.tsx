"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, DollarSign } from "lucide-react"

export default function NewDealPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    contactEmail: "",
    stage: "new",
    expectedCloseDate: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Simulate successful creation
      console.log("Creating deal:", formData)
      
      // Redirect to pipelines page
      router.push("/dashboard/pipelines")
    } catch (error) {
      console.error("Error creating deal:", error)
      alert("Failed to create deal. Please try again.")
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
          <Link href="/dashboard/pipelines">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pipelines
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-green-100">
          <DollarSign className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create New Deal</h1>
          <p className="text-muted-foreground">Add a new opportunity to your sales pipeline</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Deal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Deal Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g., Acme Corp - Annual License"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Add notes about this deal..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Deal Value *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleChange("value", e.target.value)}
                    placeholder="5000"
                    className="pl-9"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
                <Input
                  id="expectedCloseDate"
                  type="date"
                  value={formData.expectedCloseDate}
                  onChange={(e) => handleChange("expectedCloseDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                placeholder="contact@company.com"
                required
              />
              <p className="text-sm text-muted-foreground">
                The contact must exist in your contacts list
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Pipeline Stage *</Label>
              <Select value={formData.stage} onValueChange={(value) => handleChange("stage", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Deal"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/pipelines">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
