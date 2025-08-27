"use client";

import type React from "react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Wallet,
  History,
  User,
  Users,
  UserCheck,
  CreditCard,
  ArrowUpCircle,
  ArrowDownCircle,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useGetUserInfoQuery } from "@/redux/features/user/userApi";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleMenus: Record<string, NavItem[]> = {
  USER: [
    { title: "Dashboard", href: "/dashboard/user/stats", icon: BarChart3 },
    { title: "Wallet", href: "/dashboard/user/wallet", icon: Wallet },
    {
      title: "Transactions",
      href: "/dashboard/user/transactions",
      icon: History,
    },
    { title: "Profile", href: "/dashboard/user/profile", icon: User },
  ],
  AGENT: [
    { title: "Dashboard", href: "/dashboard/agent/stats", icon: BarChart3 },
    { title: "Wallet", href: "/dashboard/agent/wallet", icon: Wallet },
    { title: "Cash In", href: "/dashboard/agent/cash-in", icon: ArrowUpCircle },
    {
      title: "Cash Out",
      href: "/dashboard/agent/cash-out",
      icon: ArrowDownCircle,
    },
    {
      title: "Transactions",
      href: "/dashboard/agent/transactions",
      icon: History,
    },
    { title: "Profile", href: "/dashboard/agent/profile", icon: User },
  ],
  ADMIN: [
    { title: "Dashboard", href: "/dashboard/admin/stats", icon: BarChart3 },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Agents", href: "/dashboard/admin/agents", icon: UserCheck },
    { title: "Wallets", href: "/dashboard/admin/wallets", icon: CreditCard },
    {
      title: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: History,
    },
    { title: "Profile", href: "/dashboard/admin/profile", icon: Settings },
  ],
};

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const { data } = useGetUserInfoQuery(undefined);

  const user = data?.data;
  const navigate = useNavigate();
  const currentRole = user?.role || "USER";
  const menuItems = roleMenus[currentRole.toUpperCase()] || [];
  const [currentPage, setCurrentPage] = useState(menuItems[0]?.href || "");

  const handleNavigation = (href: string) => {
    setCurrentPage(href);
    navigate(href);
    onNavigate?.();
  };

  return (
    <div className='flex h-full flex-col bg-sidebar'>
      {/* Logo/Brand */}
      <div className='flex h-16 items-center px-6 border-b border-sidebar-border'>
        <h1 className='text-xl font-bold text-sidebar-foreground'>Dashboard</h1>
      </div>

      {/* User Info */}
      {user && (
        <div className='p-4'>
          <div className='flex items-center space-x-3'>
            <div className='h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center overflow-hidden'>
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user.name}
                  className='h-full w-full object-cover'
                />
              ) : (
                <span className='text-sm font-medium text-sidebar-primary-foreground'>
                  {user.name?.[0] || user.role?.[0]}
                </span>
              )}
            </div>
            <div>
              <p className='text-sm font-medium text-sidebar-foreground'>
                {user.name}
              </p>
              <p className='text-xs text-sidebar-foreground/60'>{user.role}</p>
            </div>
          </div>
        </div>
      )}

      <Separator className='bg-sidebar-border' />

      {/* Navigation */}
      <nav className='flex-1 space-y-1 p-4'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.href;

          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <Icon className='mr-3 h-4 w-4' />
              {item.title}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
