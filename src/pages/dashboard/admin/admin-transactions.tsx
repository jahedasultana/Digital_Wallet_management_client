"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Download, MoreHorizontal, Eye, Flag, ArrowUpCircle, ArrowDownCircle, Send } from "lucide-react"

// Mock transaction data for admin view
const mockAllTransactions = [
  {
    id: "TXN001",
    type: "transfer",
    from: "Alice Johnson (USER001)",
    to: "Bob Smith (USER002)",
    amount: 125.0,
    fee: 1.25,
    status: "completed",
    date: "2024-01-15",
    time: "14:30",
    method: "wallet",
    category: "p2p",
  },
  {
    id: "AGT001",
    type: "cash-in",
    from: "Sarah Johnson (AGT001)",
    to: "Carol Davis (USER003)",
    amount: 500.0,
    fee: 6.0,
    status: "completed",
    date: "2024-01-15",
    time: "16:45",
    method: "cash",
    category: "agent",
  },
  {
    id: "TXN002",
    type: "topup",
    from: "Bank Account",
    to: "David Wilson (USER004)",
    amount: 200.0,
    fee: 2.0,
    status: "completed",
    date: "2024-01-15",
    time: "09:15",
    method: "bank-transfer",
    category: "topup",
  },
  {
    id: "AGT002",
    type: "cash-out",
    from: "Michael Chen (AGT002)",
    to: "Emma Brown (USER005)",
    amount: 150.0,
    fee: 1.5,
    status: "completed",
    date: "2024-01-14",
    time: "18:20",
    method: "cash",
    category: "agent",
  },
  {
    id: "TXN003",
    type: "withdrawal",
    from: "Frank Miller (USER006)",
    to: "Bank Account",
    amount: 300.0,
    fee: 3.0,
    status: "pending",
    date: "2024-01-14",
    time: "12:00",
    method: "bank-transfer",
    category: "withdrawal",
  },
  {
    id: "TXN004",
    type: "transfer",
    from: "Grace Wilson (USER007)",
    to: "Henry Davis (USER008)",
    amount: 75.0,
    fee: 0.75,
    status: "failed",
    date: "2024-01-13",
    time: "10:30",
    method: "wallet",
    category: "p2p",
  },
  {
    id: "TXN005",
    type: "topup",
    from: "Credit Card",
    to: "Alice Johnson (USER001)",
    amount: 100.0,
    fee: 2.5,
    status: "completed",
    date: "2024-01-13",
    time: "08:45",
    method: "credit-card",
    category: "topup",
  },
  {
    id: "AGT003",
    type: "cash-in",
    from: "Emily Rodriguez (AGT003)",
    to: "Bob Smith (USER002)",
    amount: 750.0,
    fee: 11.25,
    status: "completed",
    date: "2024-01-12",
    time: "15:20",
    method: "cash",
    category: "agent",
  },
]

export function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredTransactions = mockAllTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory

    return matchesSearch && matchesType && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "cash-in":
        return <ArrowUpCircle className="h-4 w-4 text-green-600" />
      case "cash-out":
        return <ArrowDownCircle className="h-4 w-4 text-blue-600" />
      case "transfer":
        return <Send className="h-4 w-4 text-purple-600" />
      case "topup":
        return <ArrowUpCircle className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <ArrowDownCircle className="h-4 w-4 text-red-600" />
      default:
        return <Send className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeBadge = (type: string) => {
    const typeColors = {
      "cash-in": "bg-green-50 text-green-700",
      "cash-out": "bg-blue-50 text-blue-700",
      transfer: "bg-purple-50 text-purple-700",
      topup: "bg-green-50 text-green-700",
      withdrawal: "bg-red-50 text-red-700",
    }

    return (
      <Badge variant="outline" className={typeColors[type as keyof typeof typeColors] || ""}>
        {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
      </Badge>
    )
  }

  const totalVolume = filteredTransactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const totalFees = filteredTransactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.fee, 0)
  const completedCount = filteredTransactions.filter((t) => t.status === "completed").length
  const pendingCount = filteredTransactions.filter((t) => t.status === "pending").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Transactions</h1>
        <p className="text-muted-foreground">Monitor and manage all system transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Completed transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Revenue generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">Successful transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Management</CardTitle>
          <CardDescription>Search, filter, and monitor all system transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID, user, or agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="cash-in">Cash In</SelectItem>
                <SelectItem value="cash-out">Cash Out</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="topup">Top Up</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="p2p">P2P</SelectItem>
                <SelectItem value="topup">Top Up</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="font-mono text-sm">{transaction.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                    <TableCell>
                      <span className="text-sm">{transaction.from}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{transaction.to}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${transaction.amount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-green-600">${transaction.fee.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{transaction.date}</p>
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
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
                          <DropdownMenuItem>
                            <Flag className="mr-2 h-4 w-4" />
                            Flag for Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
