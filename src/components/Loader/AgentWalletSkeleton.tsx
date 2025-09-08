"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AgentWalletSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
      {/* Balance Card */}
      <Card>
        <CardHeader className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-5 w-5 rounded-full' />
            <Skeleton className='h-4 w-20' />
          </div>
          <Skeleton className='h-8 w-8 rounded-md' />
        </CardHeader>
        <CardContent className='min-h-[120px] flex items-center justify-center'>
          <Skeleton className='h-8 w-24' />
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <Skeleton className='h-4 w-16' />
        </CardHeader>
        <CardContent className='min-h-[120px] flex items-center justify-center'>
          <Skeleton className='h-6 w-20' />
        </CardContent>
      </Card>

      {/* Created At Card */}
      <Card>
        <CardHeader>
          <Skeleton className='h-4 w-24' />
        </CardHeader>
        <CardContent className='min-h-[120px] flex items-center justify-center'>
          <Skeleton className='h-4 w-32' />
        </CardContent>
      </Card>

      {/* Updated At Card */}
      <Card>
        <CardHeader>
          <Skeleton className='h-4 w-24' />
        </CardHeader>
        <CardContent className='min-h-[120px] flex items-center justify-center'>
          <Skeleton className='h-4 w-32' />
        </CardContent>
      </Card>
    </div>
  );
}
