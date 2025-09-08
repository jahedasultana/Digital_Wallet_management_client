/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Eye,
  Flag,
  ArrowUpCircle,
  ArrowDownCircle,
  Send,
} from "lucide-react";
import { debounce } from "lodash";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

interface ITransaction {
  _id: string;
  sender?: IUser | null;
  receiver?: IUser | null;
  type: string;
  amount: number;
  fee?: number;
  commission?: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
  [key: string]: any;
}

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);
  const limit = 10;

  // Debounce search
  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(searchTerm), 300);
    handler();
    return () => handler.cancel();
  }, [searchTerm]);

  // Reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterType, filterStatus]);

  // Fetch all transactions
  const {
    data: transactionData,
    isLoading,
    isError,
  } = useGetAllTransactionsQuery({
    page,
    limit,
  });

  const allTransactions: ITransaction[] = Array.isArray(
    transactionData?.data?.data
  )
    ? transactionData.data.data
    : [];

  // Apply local filters
  const filteredTransactions = allTransactions.filter((txn) => {
    const matchesType = filterType === "all" || txn.type === filterType;
    const matchesStatus = filterStatus === "all" || txn.status === filterStatus;
    const matchesSearch =
      debouncedSearch === "" ||
      txn._id.includes(debouncedSearch) ||
      txn.sender?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      txn.receiver?.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalPages = transactionData?.data?.meta?.totalPage || 1;

  if (isError)
    return (
      <div className='text-center mt-20 text-red-600'>
        Error fetching transactions.
      </div>
    );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className='bg-green-100 text-green-800'>Success</Badge>;
      case "pending":
        return <Badge className='bg-yellow-100 text-yellow-800'>Pending</Badge>;
      case "failed":
        return <Badge className='bg-red-100 text-red-800'>Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "cash-in":
        return <ArrowUpCircle className='h-4 w-4 text-green-600' />;
      case "cash-out":
        return <ArrowDownCircle className='h-4 w-4 text-blue-600' />;
      case "transfer":
        return <Send className='h-4 w-4 text-purple-600' />;
      case "topup":
        return <ArrowUpCircle className='h-4 w-4 text-green-600' />;
      case "withdrawal":
        return <ArrowDownCircle className='h-4 w-4 text-red-600' />;
      case "add-money":
        return <ArrowUpCircle className='h-4 w-4 text-teal-600' />;
      default:
        return <Send className='h-4 w-4 text-gray-600' />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      "cash-in": "bg-green-50 text-green-700",
      "cash-out": "bg-blue-50 text-blue-700",
      transfer: "bg-purple-50 text-purple-700",
      topup: "bg-green-50 text-green-700",
      withdrawal: "bg-red-50 text-red-700",
      "add-money": "bg-teal-50 text-teal-700",
    };
    return <Badge className={typeColors[type] || ""}>{type}</Badge>;
  };

  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-3xl font-bold'>All Transactions</h1>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className='w-full sm:w-[150px]'>
            <SelectValue placeholder='Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value='cash-in'>Cash In</SelectItem>
            <SelectItem value='cash-out'>Cash Out</SelectItem>
            <SelectItem value='transfer'>Transfer</SelectItem>
            <SelectItem value='topup'>Top Up</SelectItem>
            <SelectItem value='withdrawal'>Withdrawal</SelectItem>
            <SelectItem value='add-money'>Add Money</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className='w-full sm:w-[150px]'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='success'>Success</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='failed'>Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardContent>
          <div className='overflow-x-auto'>
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
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className='text-center py-4'>
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className='text-center py-4'>
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((txn) => (
                    <TableRow key={txn._id}>
                      <TableCell className='flex items-center gap-2'>
                        {getTransactionIcon(txn.type)} {txn._id}
                      </TableCell>
                      <TableCell>{getTypeBadge(txn.type)}</TableCell>
                      <TableCell>{txn.sender?.name || "N/A"}</TableCell>
                      <TableCell>{txn.receiver?.name || "N/A"}</TableCell>
                      <TableCell>${txn.amount.toFixed(2)}</TableCell>
                      <TableCell>${txn.fee?.toFixed(2) || 0}</TableCell>
                      <TableCell>{getStatusBadge(txn.status)}</TableCell>
                      <TableCell>
                        {new Date(txn.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => setSelectedTransaction(txn)}
                            >
                              <Eye className='mr-2 h-4 w-4' /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className='mr-2 h-4 w-4' /> Flag
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className='flex justify-between mt-4'>
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog
        open={!!selectedTransaction}
        onOpenChange={() => setSelectedTransaction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Full information of this transaction
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className='space-y-2 mt-2'>
              <p>
                <strong>ID:</strong> {selectedTransaction._id}
              </p>
              <p>
                <strong>Type:</strong> {selectedTransaction.type}
              </p>
              <p>
                <strong>From:</strong>{" "}
                {selectedTransaction.sender?.name || "N/A"}
              </p>
              <p>
                <strong>To:</strong>{" "}
                {selectedTransaction.receiver?.name || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> $
                {selectedTransaction.amount.toFixed(2)}
              </p>
              <p>
                <strong>Fee:</strong> $
                {selectedTransaction.fee?.toFixed(2) || 0}
              </p>
              <p>
                <strong>Status:</strong> {selectedTransaction.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedTransaction.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Commission:</strong> $
                {selectedTransaction.commission?.toFixed(2) || 0}
              </p>
            </div>
          )}
          <DialogClose asChild>
            <Button className='mt-4 w-full'>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
