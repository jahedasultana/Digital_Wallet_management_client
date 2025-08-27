"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserWalletSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <Skeleton className='h-8 w-1/3 mb-2' />
      <Skeleton className='h-4 w-2/3 mb-6' />

      {/* Balance Card */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-5 w-20' />
            <Skeleton className='h-4 w-8 rounded-full' />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-10 w-40 mb-2' />
          <Skeleton className='h-4 w-24' />
        </CardContent>
      </Card>

      {/* Tabs Skeleton */}
      <Skeleton className='h-12 w-full mb-4' />
      <Card>
        <CardContent className='space-y-4'>
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-full' />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-20 w-full' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
