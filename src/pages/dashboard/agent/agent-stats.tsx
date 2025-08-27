"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  DollarSign,
  Users,
} from "lucide-react";
import { useGetAgentStatsQuery } from "@/redux/features/stats/statsApi";

export function AgentStats() {
  const { data: agentStats } = useGetAgentStatsQuery({});
  const stats = agentStats?.data;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Agent Dashboard</h1>
        <p className='text-muted-foreground'>
          Monitor your agent performance and earnings overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Total Cash In */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Cash In</CardTitle>
            <ArrowUpCircle className='h-4 w-4 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${stats?.totalCashIn?.toFixed(2) ?? "0.00"}
            </div>
          </CardContent>
        </Card>

        {/* Total Cash Out */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Cash Out
            </CardTitle>
            <ArrowDownCircle className='h-4 w-4 text-blue-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${stats?.totalCashOut?.toFixed(2) ?? "0.00"}
            </div>
          </CardContent>
        </Card>

        {/* Total Commission */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Commission
            </CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${stats?.totalCommission?.toFixed(2) ?? "0.00"}
            </div>
          </CardContent>
        </Card>

        {/* Users Served */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Users Served</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats?.usersServed ?? 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
