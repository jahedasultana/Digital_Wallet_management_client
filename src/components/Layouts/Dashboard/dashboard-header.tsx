"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGetUserInfoQuery } from "@/redux/features/user/userApi";

export function DashboardHeader() {
  const { data } = useGetUserInfoQuery(undefined);

  const user = data?.data;
  return (
    <header className='flex h-16 items-center justify-between border-b border-border bg-background px-6'>
      {/* Greeting */}
      <div className='hidden md:flex items-center space-x-4 '>
        <h2 className='text-lg font-semibold text-foreground'>
          Welcome back, {user?.name}
        </h2>
        <Badge variant='outline' className='text-xs'>
          {user?.role}
        </Badge>
      </div>

      {/* User Avatar & Info */}
      <div className='flex items-center space-x-3'>
        <Avatar className='h-10 w-10'>
          {user?.profile_picture ? (
            <AvatarImage src={user.profile_picture} alt={user?.name} />
          ) : (
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-foreground'>{user?.name}</p>
          <p className='text-xs text-muted-foreground truncate'>
            {user?.email}
          </p>
        </div>
      </div>
    </header>
  );
}
