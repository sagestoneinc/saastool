"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus, Edit2, Trash2 } from "lucide-react"

export default function AdminUsersPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  // Mock data - replace with actual data from database
  const [users, setUsers] = useState([
    {
      id: "1",
      email: "john@example.com",
      firstName: "John",
      lastName: "Smith",
      role: "user",
      workspaceName: "Acme Corp",
      workspacePlan: "growth",
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      email: "admin@sagestone.dev",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      workspaceName: "Sagestone",
      workspacePlan: "scale",
      createdAt: "2024-01-01",
      status: "active",
    },
    {
      id: "3",
      email: "sarah@startup.com",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "user",
      workspaceName: "Startup Inc",
      workspacePlan: "starter",
      createdAt: "2024-02-20",
      status: "active",
    },
  ])

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "user",
    workspaceName: "",
    workspacePlan: "free",
  })

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Replace with actual API call
    // Avoid logging sensitive info like password
    console.log("Creating user:", {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      workspaceName: formData.workspaceName,
      workspacePlan: formData.workspacePlan,
    })
    
    // Mock creation
    const newUser = {
      id: String(users.length + 1),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      status: "active",
    }
    setUsers([...users, newUser])
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "user",
      workspaceName: "",
      workspacePlan: "free",
    })
    setShowCreateForm(false)
    alert("User created successfully!")
  }

  const handleUpdatePlan = async (userId: string, newPlan: string) => {
    // TODO: Replace with actual API call
    console.log("Updating plan for user:", userId, "to", newPlan)
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, workspacePlan: newPlan } : user
    ))
    alert(`Plan updated to ${newPlan}!`)
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    
    // TODO: Replace with actual API call
    console.log("Deleting user:", userId)
    
    setUsers(users.filter(user => user.id !== userId))
    alert("User deleted successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and subscription plans
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">User Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspaceName">Workspace Name *</Label>
                  <Input
                    id="workspaceName"
                    value={formData.workspaceName}
                    onChange={(e) =>
                      setFormData({ ...formData, workspaceName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workspacePlan">Initial Plan</Label>
                <Select
                  value={formData.workspacePlan}
                  onValueChange={(value) =>
                    setFormData({ ...formData, workspacePlan: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="starter">Starter ($29/mo)</SelectItem>
                    <SelectItem value="growth">Growth ($99/mo)</SelectItem>
                    <SelectItem value="scale">Scale ($299/mo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button type="submit">Create User</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Workspace</th>
                  <th className="text-left py-3 px-4 font-medium">Plan</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 text-sm">{user.workspaceName}</td>
                    <td className="py-3 px-4">
                      <Select
                        value={user.workspacePlan}
                        onValueChange={(value) => handleUpdatePlan(user.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="starter">Starter</SelectItem>
                          <SelectItem value="growth">Growth</SelectItem>
                          <SelectItem value="scale">Scale</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        user.role === "admin" 
                          ? "bg-red-100 text-red-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {user.createdAt}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert("Edit functionality coming soon!")}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
