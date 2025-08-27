"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar, Camera, Save, Edit, Shield, Key } from "lucide-react"

// Mock admin data
const mockAdminData = {
  id: "ADMIN001",
  name: "John Administrator",
  email: "admin@example.com",
  phone: "+1 (555) 000-0001",
  address: "123 Admin Street, HQ Building, NY 10001",
  dateJoined: "January 1, 2023",
  accountStatus: "verified",
  role: "Super Admin",
  department: "System Administration",
  bio: "Senior system administrator with 10+ years of experience managing financial platforms and user systems.",
  avatar: null,
  permissions: {
    userManagement: true,
    agentManagement: true,
    walletManagement: true,
    transactionManagement: true,
    systemSettings: true,
    reportGeneration: true,
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    securityAlerts: true,
    systemAlerts: true,
    twoFactorAuth: true,
  },
}

export function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(mockAdminData)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value,
      },
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving admin profile data:", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
        <p className="text-muted-foreground">Manage your administrator account and system permissions</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Administrator Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formData.avatar || undefined} />
                    <AvatarFallback className="text-lg">{formData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{formData.name}</h3>
                  <p className="text-muted-foreground">{formData.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="default" className="bg-red-100 text-red-800">
                      {formData.role}
                    </Badge>
                    <Badge variant="outline">Admin ID: {formData.id}</Badge>
                    <Badge variant={formData.accountStatus === "verified" ? "default" : "secondary"}>
                      {formData.accountStatus === "verified" ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Office Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              {/* Admin Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined: {formData.dateJoined}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Role: {formData.role}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Permissions</CardTitle>
              <CardDescription>Your current access levels and system permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>User Management</Label>
                    <p className="text-sm text-muted-foreground">Create, edit, and manage user accounts</p>
                  </div>
                  <Badge variant={formData.permissions.userManagement ? "default" : "secondary"}>
                    {formData.permissions.userManagement ? "Granted" : "Denied"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Agent Management</Label>
                    <p className="text-sm text-muted-foreground">Manage agent accounts and approvals</p>
                  </div>
                  <Badge variant={formData.permissions.agentManagement ? "default" : "secondary"}>
                    {formData.permissions.agentManagement ? "Granted" : "Denied"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Wallet Management</Label>
                    <p className="text-sm text-muted-foreground">Control wallet statuses and balances</p>
                  </div>
                  <Badge variant={formData.permissions.walletManagement ? "default" : "secondary"}>
                    {formData.permissions.walletManagement ? "Granted" : "Denied"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Transaction Management</Label>
                    <p className="text-sm text-muted-foreground">Monitor and manage all transactions</p>
                  </div>
                  <Badge variant={formData.permissions.transactionManagement ? "default" : "secondary"}>
                    {formData.permissions.transactionManagement ? "Granted" : "Denied"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>System Settings</Label>
                    <p className="text-sm text-muted-foreground">Configure system-wide settings</p>
                  </div>
                  <Badge variant={formData.permissions.systemSettings ? "default" : "secondary"}>
                    {formData.permissions.systemSettings ? "Granted" : "Denied"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Report Generation</Label>
                    <p className="text-sm text-muted-foreground">Generate and export system reports</p>
                  </div>
                  <Badge variant={formData.permissions.reportGeneration ? "default" : "secondary"}>
                    {formData.permissions.reportGeneration ? "Granted" : "Denied"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={formData.preferences.twoFactorAuth}
                    onCheckedChange={(checked) => handlePreferenceChange("twoFactorAuth", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Change Password</Label>
                  <div className="space-y-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>
                    <Key className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>API Keys</Label>
                  <p className="text-sm text-muted-foreground">Manage API keys for system integrations</p>
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Manage API Keys
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about system events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive system alerts and updates via email</p>
                </div>
                <Switch
                  checked={formData.preferences.emailNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                </div>
                <Switch
                  checked={formData.preferences.smsNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                </div>
                <Switch
                  checked={formData.preferences.pushNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about security events and breaches</p>
                </div>
                <Switch
                  checked={formData.preferences.securityAlerts}
                  onCheckedChange={(checked) => handlePreferenceChange("securityAlerts", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about system maintenance and updates
                  </p>
                </div>
                <Switch
                  checked={formData.preferences.systemAlerts}
                  onCheckedChange={(checked) => handlePreferenceChange("systemAlerts", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
