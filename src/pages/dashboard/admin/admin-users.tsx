"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserCheck, UserX, Ban, Eye } from "lucide-react"

// Mock user data
const mockUsers = [
  {
    id: "USER001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    balance: 234.56,
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    transactions: 47,
  },
  {
    id: "USER002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 234-5678",
    balance: 567.89,
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "1 day ago",
    transactions: 23,
  },
  {
    id: "USER003",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 345-6789",
    balance: 123.45,
    status: "pending",
    joinDate: "2024-01-20",
    lastActive: "5 hours ago",
    transactions: 8,
  },
  {
    id: "USER004",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 456-7890",
    balance: 789.12,
    status: "active",
    joinDate: "2024-01-05",
    lastActive: "3 hours ago",
    transactions: 156,
  },
  {
    id: "USER005",
    name: "Emma Brown",
    email: "emma.brown@example.com",
    phone: "+1 (555) 567-8901",
    balance: 0.0,
    status: "suspended",
    joinDate: "2024-01-18",
    lastActive: "1 week ago",
    transactions: 2,
  },
  {
    id: "USER006",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    phone: "+1 (555) 678-9012",
    balance: 456.78,
    status: "active",
    joinDate: "2024-01-12",
    lastActive: "30 minutes ago",
    transactions: 89,
  },
  {
    id: "USER007",
    name: "Grace Wilson",
    email: "grace.wilson@example.com",
    phone: "+1 (555) 789-0123",
    balance: 234.56,
    status: "blocked",
    joinDate: "2024-01-08",
    lastActive: "2 weeks ago",
    transactions: 12,
  },
  {
    id: "USER008",
    name: "Henry Davis",
    email: "henry.davis@example.com",
    phone: "+1 (555) 890-1234",
    balance: 678.9,
    status: "pending",
    joinDate: "2024-01-22",
    lastActive: "1 hour ago",
    transactions: 5,
  },
]

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [users, setUsers] = useState(mockUsers)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "suspended":
        return <Badge variant="outline">Suspended</Badge>
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "approve":
              return { ...user, status: "active" }
            case "suspend":
              return { ...user, status: "suspended" }
            case "block":
              return { ...user, status: "blocked" }
            case "activate":
              return { ...user, status: "active" }
            default:
              return user
          }
        }
        return user
      }),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getActionButtons = (user: any) => {
    switch (user.status) {
      case "pending":
        return (
          <>
            <DropdownMenuItem onClick={() => handleUserAction(user.id, "approve")}>
              <UserCheck className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUserAction(user.id, "block")}>
              <Ban className="mr-2 h-4 w-4" />
              Block
            </DropdownMenuItem>
          </>
        )
      case "active":
        return (
          <>
            <DropdownMenuItem onClick={() => handleUserAction(user.id, "suspend")}>
              <UserX className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUserAction(user.id, "block")}>
              <Ban className="mr-2 h-4 w-4" />
              Block
            </DropdownMenuItem>
          </>
        )
      case "suspended":
      case "blocked":
        return (
          <DropdownMenuItem onClick={() => handleUserAction(user.id, "activate")}>
            <UserCheck className="mr-2 h-4 w-4" />
            Activate
          </DropdownMenuItem>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-muted-foreground">View and manage all user accounts in the system</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{users.filter((u) => u.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Verified and active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter((u) => u.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suspended/Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {users.filter((u) => u.status === "suspended" || u.status === "blocked").length}
            </div>
            <p className="text-xs text-muted-foreground">Restricted accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Search, filter, and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${user.balance.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm">{user.joinDate}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.transactions}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {getActionButtons(user)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
