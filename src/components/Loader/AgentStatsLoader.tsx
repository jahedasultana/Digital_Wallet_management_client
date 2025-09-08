"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AgentStatsSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Page header */}
      <div>
        <Skeleton className='h-8 w-40 mb-2' />
        <Skeleton className='h-4 w-72' />
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                <Skeleton className='h-4 w-24' />
              </CardTitle>
              <Skeleton className='h-5 w-5 rounded-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-7 w-20' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
