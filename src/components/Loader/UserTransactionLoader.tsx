"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UserTransactionsSkeleton() {
  return (
    <div className='space-y-6 animate-pulse'>
      {/* Header Skeleton */}
      <Skeleton className='h-8 w-1/3 mb-2' />
      <Skeleton className='h-4 w-2/3 mb-6' />

      {/* Summary Cards Skeleton */}
      <div className='grid gap-4 md:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='pb-2'>
              <Skeleton className='h-5 w-32' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-24 mb-2' />
              <Skeleton className='h-3 w-16' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className='h-5 w-32 mb-1' />
          <Skeleton className='h-3 w-48' />
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <Skeleton className='h-10 flex-1' />
            <Skeleton className='h-10 w-full sm:w-[180px]' />
            <Skeleton className='h-10 w-full sm:w-[180px]' />
            <Skeleton className='h-10 w-12' />
          </div>

          {/* Table Skeleton */}
          <div className='rounded-md border'>
            <div className='w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='h-10'>
                    {[...Array(5)].map((_, i) => (
                      <th key={i}>
                        <Skeleton className='h-4 w-20' />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className='h-12 border-t'>
                      {[...Array(5)].map((_, j) => (
                        <td key={j}>
                          <Skeleton className='h-4 w-16' />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No Transactions Placeholder */}
          <div className='text-center py-8'>
            <Skeleton className='h-4 w-64 mx-auto' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
