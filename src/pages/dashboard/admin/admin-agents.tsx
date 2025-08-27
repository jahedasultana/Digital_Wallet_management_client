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
import { Search, MoreHorizontal, UserCheck, UserX, Ban, Eye, Star } from "lucide-react"

// Mock agent data
const mockAgents = [
  {
    id: "AGT001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    balance: 2847.92,
    status: "active",
    level: "Gold Agent",
    commissionRate: 1.2,
    joinDate: "2023-03-10",
    lastActive: "1 hour ago",
    customers: 127,
    monthlyVolume: 15234,
    rating: 4.8,
  },
  {
    id: "AGT002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 876-5432",
    balance: 1456.78,
    status: "active",
    level: "Silver Agent",
    commissionRate: 1.0,
    joinDate: "2023-05-15",
    lastActive: "3 hours ago",
    customers: 89,
    monthlyVolume: 8945,
    rating: 4.6,
  },
  {
    id: "AGT003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 765-4321",
    balance: 3245.67,
    status: "active",
    level: "Platinum Agent",
    commissionRate: 1.5,
    joinDate: "2023-01-20",
    lastActive: "30 minutes ago",
    customers: 203,
    monthlyVolume: 25678,
    rating: 4.9,
  },
  {
    id: "AGT004",
    name: "David Thompson",
    email: "david.thompson@example.com",
    phone: "+1 (555) 654-3210",
    balance: 567.89,
    status: "pending",
    level: "Bronze Agent",
    commissionRate: 0.8,
    joinDate: "2024-01-25",
    lastActive: "2 days ago",
    customers: 12,
    monthlyVolume: 1234,
    rating: 4.2,
  },
  {
    id: "AGT005",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    phone: "+1 (555) 543-2109",
    balance: 0.0,
    status: "suspended",
    level: "Bronze Agent",
    commissionRate: 0.8,
    joinDate: "2023-11-08",
    lastActive: "1 week ago",
    customers: 45,
    monthlyVolume: 0,
    rating: 3.8,
  },
  {
    id: "AGT006",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    phone: "+1 (555) 432-1098",
    balance: 1876.54,
    status: "active",
    level: "Silver Agent",
    commissionRate: 1.0,
    joinDate: "2023-07-12",
    lastActive: "2 hours ago",
    customers: 156,
    monthlyVolume: 12456,
    rating: 4.7,
  },
]

export function AdminAgents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")
  const [agents, setAgents] = useState(mockAgents)

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || agent.status === filterStatus
    const matchesLevel = filterLevel === "all" || agent.level.toLowerCase().includes(filterLevel.toLowerCase())

    return matchesSearch && matchesStatus && matchesLevel
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

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Platinum Agent":
        return <Badge className="bg-purple-100 text-purple-800">Platinum</Badge>
      case "Gold Agent":
        return <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>
      case "Silver Agent":
        return <Badge className="bg-gray-100 text-gray-800">Silver</Badge>
      case "Bronze Agent":
        return <Badge variant="outline">Bronze</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const handleAgentAction = (agentId: string, action: string) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) => {
        if (agent.id === agentId) {
          switch (action) {
            case "approve":
              return { ...agent, status: "active" }
            case "suspend":
              return { ...agent, status: "suspended" }
            case "block":
              return { ...agent, status: "blocked" }
            case "activate":
              return { ...agent, status: "active" }
            default:
              return agent
          }
        }
        return agent
      }),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getActionButtons = (agent: any) => {
    switch (agent.status) {
      case "pending":
        return (
          <>
            <DropdownMenuItem onClick={() => handleAgentAction(agent.id, "approve")}>
              <UserCheck className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAgentAction(agent.id, "block")}>
              <Ban className="mr-2 h-4 w-4" />
              Block
            </DropdownMenuItem>
          </>
        )
      case "active":
        return (
          <DropdownMenuItem onClick={() => handleAgentAction(agent.id, "suspend")}>
            <UserX className="mr-2 h-4 w-4" />
            Suspend
          </DropdownMenuItem>
        )
      case "suspended":
      case "blocked":
        return (
          <DropdownMenuItem onClick={() => handleAgentAction(agent.id, "activate")}>
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
        <h1 className="text-3xl font-bold tracking-tight">Manage Agents</h1>
        <p className="text-muted-foreground">View and manage all agent accounts and their performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">Registered agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {agents.filter((a) => a.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {agents.filter((a) => a.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${agents.reduce((sum, a) => sum + a.monthlyVolume, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Monthly volume</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Management</CardTitle>
          <CardDescription>Search, filter, and manage agent accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Customers</TableHead>
                  <TableHead>Monthly Volume</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{agent.email}</p>
                        <p className="text-sm text-muted-foreground">{agent.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getLevelBadge(agent.level)}
                        <p className="text-xs text-muted-foreground">{agent.commissionRate}% commission</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(agent.status)}</TableCell>
                    <TableCell>
                      <span className="font-medium">${agent.balance.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{agent.customers}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">${agent.monthlyVolume.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{agent.rating}</span>
                      </div>
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
                          {getActionButtons(agent)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No agents found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
