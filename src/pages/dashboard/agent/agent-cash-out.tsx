"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowDownCircle, Search, DollarSign, User, AlertTriangle } from "lucide-react"

export function AgentCashOut() {
  const [customerSearch, setCustomerSearch] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [notes, setNotes] = useState("")

  // Mock customer data
  const mockCustomers = [
    { id: "CUST001", name: "Alice Johnson", phone: "+1 (555) 123-4567", balance: 234.56 },
    { id: "CUST002", name: "Bob Smith", phone: "+1 (555) 234-5678", balance: 567.89 },
    { id: "CUST003", name: "Carol Davis", phone: "+1 (555) 345-6789", balance: 123.45 },
    { id: "CUST004", name: "David Wilson", phone: "+1 (555) 456-7890", balance: 789.12 },
  ]

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.phone.includes(customerSearch) ||
      customer.id.toLowerCase().includes(customerSearch.toLowerCase()),
  )

  const calculateCommission = (amount: number) => {
    return (amount * 0.01).toFixed(2) // 1.0% commission for cash-out
  }

  const isInsufficientBalance = selectedCustomer && amount && Number.parseFloat(amount) > selectedCustomer.balance

  const handleCashOut = () => {
    if (!selectedCustomer || !amount || isInsufficientBalance) return

    // In a real app, this would process the cash-out transaction
    console.log("Processing cash-out:", {
      customer: selectedCustomer,
      amount: Number.parseFloat(amount),
      commission: calculateCommission(Number.parseFloat(amount)),
      notes,
    })

    // Reset form
    setSelectedCustomer(null)
    setAmount("")
    setNotes("")
    setCustomerSearch("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cash Out</h1>
        <p className="text-muted-foreground">Withdraw money from customer wallets and earn commissions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Select Customer</span>
            </CardTitle>
            <CardDescription>Search and select a customer for the cash-out transaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-search">Search Customer</Label>
              <Input
                id="customer-search"
                placeholder="Search by name, phone, or ID..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
              />
            </div>

            {customerSearch && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedCustomer?.id === customer.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Balance</p>
                        <p className="text-lg font-bold">${customer.balance.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredCustomers.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No customers found</p>
                )}
              </div>
            )}

            {selectedCustomer && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Selected Customer</span>
                </div>
                <p className="font-medium">{selectedCustomer.name}</p>
                <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                <Badge variant="outline" className="mt-2">
                  Available Balance: ${selectedCustomer.balance.toFixed(2)}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowDownCircle className="h-5 w-5" />
              <span>Transaction Details</span>
            </CardTitle>
            <CardDescription>Enter the cash-out amount and transaction details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Cash-Out Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!selectedCustomer}
                max={selectedCustomer?.balance || 0}
              />
              {selectedCustomer && (
                <p className="text-xs text-muted-foreground">Maximum: ${selectedCustomer.balance.toFixed(2)}</p>
              )}
            </div>

            {isInsufficientBalance && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Insufficient balance. Customer only has ${selectedCustomer.balance.toFixed(2)} available.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
              <Select disabled={!selectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="mobile-money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={!selectedCustomer}
                rows={3}
              />
            </div>

            {amount && selectedCustomer && !isInsufficientBalance && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Commission Calculation</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Transaction Amount:</span>
                    <span className="font-medium">${Number.parseFloat(amount || "0").toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission Rate:</span>
                    <span className="font-medium">1.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Balance:</span>
                    <span className="font-medium">
                      ${(selectedCustomer.balance - Number.parseFloat(amount || "0")).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="font-medium">Your Commission:</span>
                    <span className="font-bold text-blue-600">
                      ${calculateCommission(Number.parseFloat(amount || "0"))}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleCashOut}
              disabled={!selectedCustomer || !amount || Number.parseFloat(amount) <= 0 || isInsufficientBalance}
            >
              Process Cash-Out Transaction
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cash-Out Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cash-Out Transactions</CardTitle>
          <CardDescription>Your latest cash-out transactions and commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { customer: "Bob Smith", amount: 150.0, commission: 1.5, time: "4 hours ago", status: "completed" },
              { customer: "David Wilson", amount: 75.0, commission: 0.75, time: "1 day ago", status: "completed" },
              { customer: "Alice Johnson", amount: 200.0, commission: 2.0, time: "2 days ago", status: "completed" },
              { customer: "Carol Davis", amount: 100.0, commission: 1.0, time: "3 days ago", status: "completed" },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <ArrowDownCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                  <p className="text-sm text-blue-600">+${transaction.commission.toFixed(2)} commission</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
