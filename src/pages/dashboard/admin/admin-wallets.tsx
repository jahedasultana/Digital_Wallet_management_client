"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Lock, Unlock, AlertTriangle } from "lucide-react"

// Mock wallet data
const mockWallets = [
  {
    id: "WALLET001",
    ownerId: "USER001",
    ownerName: "Alice Johnson",
    ownerType: "user",
    balance: 234.56,
    status: "active",
    lastTransaction: "2024-01-15 14:30",
    transactionCount: 47,
    createdDate: "2024-01-15",
  },
  {
    id: "WALLET002",
    ownerId: "USER002",
    ownerName: "Bob Smith",
    ownerType: "user",
    balance: 567.89,
    status: "active",
    lastTransaction: "2024-01-14 09:15",
    transactionCount: 23,
    createdDate: "2024-01-10",
  },
  {
    id: "WALLET003",
    ownerId: "AGT001",
    ownerName: "Sarah Johnson",
    ownerType: "agent",
    balance: 2847.92,
    status: "active",
    lastTransaction: "2024-01-15 16:45",
    transactionCount: 156,
    createdDate: "2023-03-10",
  },
  {
    id: "WALLET004",
    ownerId: "USER003",
    ownerName: "Carol Davis",
    ownerType: "user",
    balance: 123.45,
    status: "frozen",
    lastTransaction: "2024-01-13 12:00",
    transactionCount: 8,
    createdDate: "2024-01-20",
  },
  {
    id: "WALLET005",
    ownerId: "AGT002",
    ownerName: "Michael Chen",
    ownerType: "agent",
    balance: 1456.78,
    status: "active",
    lastTransaction: "2024-01-15 11:20",
    transactionCount: 89,
    createdDate: "2023-05-15",
  },
  {
    id: "WALLET006",
    ownerId: "USER004",
    ownerName: "David Wilson",
    ownerType: "user",
    balance: 789.12,
    status: "active",
    lastTransaction: "2024-01-15 08:45",
    transactionCount: 156,
    createdDate: "2024-01-05",
  },
  {
    id: "WALLET007",
    ownerId: "USER005",
    ownerName: "Emma Brown",
    ownerType: "user",
    balance: 0.0,
    status: "blocked",
    lastTransaction: "2024-01-08 15:30",
    transactionCount: 2,
    createdDate: "2024-01-18",
  },
  {
    id: "WALLET008",
    ownerId: "AGT003",
    ownerName: "Emily Rodriguez",
    ownerType: "agent",
    balance: 3245.67,
    status: "active",
    lastTransaction: "2024-01-15 17:10",
    transactionCount: 203,
    createdDate: "2023-01-20",
  },
]

export function AdminWallets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [wallets, setWallets] = useState(mockWallets)

  const filteredWallets = wallets.filter((wallet) => {
    const matchesSearch =
      wallet.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.ownerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || wallet.status === filterStatus
    const matchesType = filterType === "all" || wallet.ownerType === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "frozen":
        return <Badge variant="secondary">Frozen</Badge>
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getOwnerTypeBadge = (type: string) => {
    return type === "agent" ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700">
        Agent
      </Badge>
    ) : (
      <Badge variant="outline">User</Badge>
    )
  }

  const handleWalletStatusToggle = (walletId: string, newStatus: string) => {
    setWallets((prevWallets) =>
      prevWallets.map((wallet) => (wallet.id === walletId ? { ...wallet, status: newStatus } : wallet)),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStatusToggle = (wallet: any) => {
    if (wallet.status === "blocked") {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleWalletStatusToggle(wallet.id, "active")}
          className="text-green-600 hover:text-green-700"
        >
          <Unlock className="mr-1 h-3 w-3" />
          Unblock
        </Button>
      )
    }

    return (
      <div className="flex items-center space-x-2">
        <Switch
          checked={wallet.status === "active"}
          onCheckedChange={(checked) => handleWalletStatusToggle(wallet.id, checked ? "active" : "frozen")}
        />
        <span className="text-xs text-muted-foreground">{wallet.status === "active" ? "Active" : "Frozen"}</span>
      </div>
    )
  }

  const totalBalance = filteredWallets.reduce((sum, wallet) => sum + wallet.balance, 0)
  const activeWallets = filteredWallets.filter((w) => w.status === "active").length
  const frozenWallets = filteredWallets.filter((w) => w.status === "frozen").length
  const blockedWallets = filteredWallets.filter((w) => w.status === "blocked").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Wallets</h1>
        <p className="text-muted-foreground">Monitor and manage all user and agent wallets</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredWallets.length}</div>
            <p className="text-xs text-muted-foreground">All wallet accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Combined balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeWallets}</div>
            <p className="text-xs text-muted-foreground">Fully operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Restricted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{frozenWallets + blockedWallets}</div>
            <p className="text-xs text-muted-foreground">Frozen + Blocked</p>
          </CardContent>
        </Card>
      </div>

      {/* Wallets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Management</CardTitle>
          <CardDescription>Search, filter, and manage wallet statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by owner name, ID, or wallet ID..."
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
                <SelectItem value="frozen">Frozen</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="agent">Agents</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet ID</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Control</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWallets.map((wallet) => (
                  <TableRow key={wallet.id}>
                    <TableCell>
                      <span className="font-mono text-sm">{wallet.id}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{wallet.ownerName}</p>
                        <p className="text-sm text-muted-foreground">{wallet.ownerId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getOwnerTypeBadge(wallet.ownerType)}</TableCell>
                    <TableCell>
                      <span className="font-medium">${wallet.balance.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(wallet.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm">{wallet.transactionCount}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{wallet.lastTransaction}</span>
                    </TableCell>
                    <TableCell>{getStatusToggle(wallet)}</TableCell>
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
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Transaction History
                          </DropdownMenuItem>
                          {wallet.status !== "blocked" && (
                            <DropdownMenuItem
                              onClick={() => handleWalletStatusToggle(wallet.id, "blocked")}
                              className="text-red-600"
                            >
                              <Lock className="mr-2 h-4 w-4" />
                              Block Wallet
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredWallets.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No wallets found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
