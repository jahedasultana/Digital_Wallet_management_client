"use client";

import { UserStatsLoader } from "@/components/Loader/UserStatsLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserStatsQuery } from "@/redux/features/stats/statsApi";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

// 1. Define API response types
type UserStats = {
  balance: number;
  totalReceived: number;
  totalSent: number;
  totalTransactions: number;
  userId: string;
};

export function UserStats() {
  // 2. Hook usage with generic type
  const { data, isFetching, isError } = useGetUserStatsQuery(undefined);

  const stats = data?.data;

  if (isFetching) {
    return <UserStatsLoader />;
  }

  if (isError || !stats) {
    return <p>Failed to load stats</p>;
  }

  return (
    <div className='space-y-6 overflow-hidden'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome to your wallet dashboard. Here's an overview of your account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Balance */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Current Balance
            </CardTitle>
            <Wallet className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${stats.balance.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>Available in wallet</p>
          </CardContent>
        </Card>

        {/* Total Sent */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Sent</CardTitle>
            <ArrowDownRight className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${stats.totalSent.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
              All outgoing transfers
            </p>
          </CardContent>
        </Card>

        {/* Total Received */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Received
            </CardTitle>
            <ArrowUpRight className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${stats.totalReceived.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
              All incoming transfers
            </p>
          </CardContent>
        </Card>

        {/* Transactions Count */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Transactions</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalTransactions}</div>
            <p className='text-xs text-muted-foreground'>
              Lifetime transactions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
