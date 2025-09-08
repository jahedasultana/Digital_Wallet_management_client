/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { useGetAgentStatsQuery } from "@/redux/features/stats/statsApi";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import { AgentTransactionsSkeleton } from "@/components/Loader/AgentTransactionSceleton";

// ✅ Currency formatter
const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
};

// ✅ Safe string includes
const safeIncludes = (
  field: string | null | undefined,
  search: string
): boolean => {
  return (field ?? "").toLowerCase().includes(search.toLowerCase());
};

export default function AgentTransactions() {
  const {
    data: agentStats,
    isLoading,
    isError,
  } = useGetAgentStatsQuery(undefined);
  const stats = agentStats?.data;
  const { data: AgentTransactions } = useGetMyTransactionsQuery({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // rows per page

  const transactions = useMemo(
    () =>
      Array.isArray(AgentTransactions?.data) ? AgentTransactions?.data : [],
    [AgentTransactions?.data]
  );

  // ✅ Filtering
  const filteredTransactions = useMemo(() => {
    if (!searchTerm.trim()) return transactions;
    return transactions.filter(
      (transaction: any) =>
        safeIncludes(transaction?.receiverId, searchTerm) ||
        safeIncludes(transaction?.senderId, searchTerm) ||
        safeIncludes(transaction?.status, searchTerm) ||
        safeIncludes(transaction?.type, searchTerm)
    );
  }, [transactions, searchTerm]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Loading / Error handling
  if (isLoading) return <AgentTransactionsSkeleton />;
  if (isError)
    return (
      <p className='p-6 text-red-500'>Failed to load stats. Try again later.</p>
    );

  return (
    <div className='space-y-6'>
      {/* --- Responsive Top Stat Cards --- */}
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Wallet className='h-5 w-5 text-blue-500' />
              Total Cash Out
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {formatCurrency(stats?.totalCashOut)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ArrowUpCircle className='h-5 w-5 text-green-500' />
              Total Cash In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {formatCurrency(stats?.totalCashIn)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ArrowDownCircle className='h-5 w-5 text-red-500' />
              Total Commision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {formatCurrency(stats?.totalCommission)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-purple-500' />
              Total User Served
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{stats?.usersServed ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Transactions Table --- */}
      <div className='bg-white dark:bg-neutral-900 rounded-xl shadow p-4'>
        <input
          type='text'
          placeholder='Search transactions...'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page on new search
          }}
          className='w-full mb-4 px-3 py-2 border rounded-lg dark:bg-neutral-800'
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction: any, index: number) => (
                <TableRow
                  key={transaction?._id ?? index}
                  className='hover:bg-muted/50'
                >
                  <TableCell className='px-4 py-3'>
                    {transaction?.type ?? "N/A"}
                  </TableCell>
                  <TableCell className='px-4 py-3'>
                    {formatCurrency(transaction?.amount)}
                  </TableCell>
                  <TableCell className='px-4 py-3'>
                    {transaction?.senderId ?? "N/A"}
                  </TableCell>
                  <TableCell className='px-4 py-3'>
                    {transaction?.receiverId ?? "N/A"}
                  </TableCell>
                  <TableCell className='px-4 py-3 capitalize'>
                    {transaction?.status ?? "Unknown"}
                  </TableCell>
                  <TableCell className='px-4 py-3'>
                    {transaction?.createdAt
                      ? new Date(transaction.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-center py-6 text-muted-foreground'
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* --- Pagination Controls --- */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-2 mt-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
