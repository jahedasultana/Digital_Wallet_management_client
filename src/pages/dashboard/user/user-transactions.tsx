/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import { UserTransactionsSkeleton } from "@/components/Loader/UserTransactionLoader";

export function UserTransactions() {
  const { data: response, isLoading } = useGetMyTransactionsQuery(undefined);
  const transactions = useMemo(() => response?.data || [], [response]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filtered transactions
  const filteredTransactions = useMemo(
    () =>
      transactions.filter((tx: any) => {
        const matchesSearch =
          tx.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.receiver?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.sender?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || tx.type === filterType;
        const matchesStatus =
          filterStatus === "all" || tx.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
      }),
    [transactions, searchTerm, filterType, filterStatus]
  );

  // Summary
  const summary = useMemo(() => {
    let totalReceived = 0;
    let totalSent = 0;

    transactions.forEach((tx: any) => {
      if (tx.type === "add-money" || tx.type === "received") {
        totalReceived += tx.amount;
      } else if (tx.type === "send-money" || tx.type === "sent") {
        totalSent += tx.amount;
      }
    });

    return {
      thisMonth: totalReceived - totalSent, // basic calculation
      totalReceived,
      totalSent,
    };
  }, [transactions]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
      case "completed":
        return <Badge className='bg-green-100 text-green-800'>Completed</Badge>;
      case "pending":
        return <Badge variant='secondary'>Pending</Badge>;
      case "failed":
        return <Badge variant='destructive'>Failed</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const getTransactionIcon = (type: string) =>
    type === "add-money" || type === "received" ? (
      <ArrowDownRight className='h-4 w-4 text-green-600' />
    ) : (
      <ArrowUpRight className='h-4 w-4 text-red-600' />
    );
  if (isLoading) {
    return <UserTransactionsSkeleton />;
  }
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Transactions</h1>
        <p className='text-muted-foreground'>
          View and manage your transaction history
        </p>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${summary.thisMonth.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
              Calculated from all transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              ${summary.totalReceived.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
              {
                transactions.filter(
                  (tx: any) => tx.type === "add-money" || tx.type === "received"
                ).length
              }{" "}
              transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              ${summary.totalSent.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
              {
                transactions.filter(
                  (tx: any) => tx.type === "send-money" || tx.type === "sent"
                ).length
              }{" "}
              transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            All your wallet transactions in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search transactions...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Types</SelectItem>
                <SelectItem value='received'>Received</SelectItem>
                <SelectItem value='sent'>Sent</SelectItem>
                <SelectItem value='add-money'>Top-up</SelectItem>
                <SelectItem value='send-money'>Send Money</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='success'>Success</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='failed'>Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant='outline' size='icon'>
              <Download className='h-4 w-4' />
            </Button>
          </div>

          {/* Transactions Table */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx: any) => (
                  <TableRow key={tx._id || tx.id}>
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        {getTransactionIcon(tx.type)}
                        <span className='font-medium'>{tx._id || tx.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className='font-medium'>{tx.notes || "-"}</p>
                        <p className='text-sm text-muted-foreground capitalize'>
                          {tx.type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className='font-medium'>
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {new Date(tx.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    <TableCell className='text-right'>
                      <span
                        className={`font-medium ${
                          tx.type === "add-money" || tx.type === "received"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "add-money" || tx.type === "received"
                          ? "+"
                          : "-"}
                        ${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No transactions found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
