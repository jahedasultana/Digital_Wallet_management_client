"use client";

import {
  HomeIcon,
  InfoIcon,
  MailIcon,
  HelpCircleIcon,
  StarIcon,
  LayoutDashboardIcon,
  XIcon,
  MenuIcon,
  LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "@/components/logo";
import UserMenu from "@/components/user-menu";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserInfoQuery } from "@/redux/features/user/userApi";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { baseApi } from "@/redux/baseApi";

export default function Navbar() {
  const { data } = useGetUserInfoQuery(undefined);
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const user = data?.data;
  const isAuthenticated = user?.email;
  const userRole = user?.role?.toLowerCase();
  // Navigation links with icons for desktop icon-only navigation
  const navigationLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/about", label: "About", icon: InfoIcon },
    { href: "/features", label: "Features", icon: StarIcon },
    {
      href: isAuthenticated ? `/dashboard/${userRole}/stats` : "/login",
      label: "Dashboard",
      icon: LayoutDashboardIcon,
    },
    { href: "/faq", label: "FAQ", icon: HelpCircleIcon },
    { href: "/contact", label: "Contact", icon: MailIcon },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      toast.success("LogOut Success");

      // Invalidate all cached queries
      dispatch(baseApi.util.resetApiState());
      // Reload page to refresh all hooks/queries
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header
      className='sticky top-0 z-50 w-full border-b bg-gradient-to-r from-rose-50/95 to-pink-50/95 backdrop-blur-md dark:from-rose-950/95 dark:to-pink-950/95 supports-[backdrop-filter]:bg-background/60'
      role='banner'
    >
      <div className='container flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Left side */}
        <div className='flex flex-1 items-center gap-2'>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                className='group relative size-10 md:hidden hover:bg-rose-100 dark:hover:bg-rose-900/20 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
                variant='ghost'
                size='icon'
                aria-label='Open navigation menu'
                aria-expanded={isMobileMenuOpen}
              >
                <AnimatePresence mode='wait'>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key='close'
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <XIcon size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='menu'
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MenuIcon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='left'
              className='w-80 p-0 border-rose-200 dark:border-rose-800'
              aria-describedby='mobile-nav-description'
            >
              <SheetHeader className='p-6 border-b border-rose-100 dark:border-rose-800'>
                <SheetTitle className='flex items-center gap-3 text-left'>
                  <Logo />
                  <span className='text-lg font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent'>
                    Dream Wallet
                  </span>
                </SheetTitle>
                <p id='mobile-nav-description' className='sr-only'>
                  Mobile navigation menu with links to main sections
                </p>
              </SheetHeader>

              <nav
                className='flex flex-col p-6'
                role='navigation'
                aria-label='Mobile navigation'
              >
                <ul className='space-y-2' role='list'>
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = isActiveRoute(link.href);

                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        role='listitem'
                      >
                        <SheetClose asChild>
                          <Link
                            to={link.href}
                            className={`flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-rose-50 dark:hover:bg-rose-900/20 focus:bg-rose-50 dark:focus:bg-rose-900/20 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                              isActive
                                ? "bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40 text-rose-700 dark:text-rose-300 border-l-4 border-rose-500"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <Icon
                              size={20}
                              className={
                                isActive
                                  ? "text-rose-600 dark:text-rose-400"
                                  : "text-gray-500 dark:text-gray-400"
                              }
                              aria-hidden='true'
                            />
                            <span>{link.label}</span>
                            {isActive && (
                              <motion.div
                                className='ml-auto h-2 w-2 rounded-full bg-rose-500'
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                aria-hidden='true'
                              />
                            )}
                          </Link>
                        </SheetClose>
                      </motion.li>
                    );
                  })}
                </ul>

                {isAuthenticated && (
                  <motion.div className='mt-6 border-t border-rose-100 dark:border-rose-800 pt-4 space-y-3'>
                    <div className='flex items-center gap-3'>
                      {user.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt={user.name || user.email}
                          className='h-10 w-10 rounded-full object-cover'
                        />
                      ) : (
                        <div className='h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300'>
                          {user.name?.[0] || user.email?.[0]}
                        </div>
                      )}
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>
                          {user.name || user.email}
                        </span>
                        <span className='text-xs text-gray-500 dark:text-gray-400'>
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full flex items-center justify-center gap-2 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20'
                      onClick={handleLogout}
                    >
                      <LogOutIcon size={16} />
                      Logout
                    </Button>
                  </motion.div>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <div className='flex items-center gap-6'>
            {/* Logo */}
            <Link
              to='/'
              className='text-primary hover:text-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md'
              aria-label='Dream Wallet Home'
            >
              <Logo />
            </Link>

            <NavigationMenu className='hidden md:flex'>
              <NavigationMenuList className='gap-1'>
                <TooltipProvider delayDuration={300}>
                  {navigationLinks.map((link) => {
                    const isActive = isActiveRoute(link.href);
                    return (
                      <NavigationMenuItem key={link.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={link.href}
                              className={`relative flex size-10 items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                                isActive
                                  ? "bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40 text-rose-600 dark:text-rose-400 shadow-sm"
                                  : "hover:bg-rose-50 dark:hover:bg-rose-900/20 text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400"
                              }`}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <link.icon size={20} aria-hidden='true' />
                              <span className='sr-only'>{link.label}</span>
                              {isActive && (
                                <motion.div
                                  className='absolute -bottom-1 left-1/2 h-1 w-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500'
                                  layoutId='activeTab'
                                  initial={false}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                  style={{ x: "-50%" }}
                                />
                              )}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent
                            side='bottom'
                            className='px-3 py-2 text-sm border-rose-200 dark:border-rose-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm'
                            sideOffset={8}
                          >
                            <p>{link.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </NavigationMenuItem>
                    );
                  })}
                </TooltipProvider>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-3'>
          {/* Theme toggle */}
          <ModeToggle />

          {isAuthenticated ? (
            <UserMenu user={user} />
          ) : (
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='hidden sm:inline-flex border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-900/20 dark:hover:text-rose-200 transition-all duration-200 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 bg-transparent'
                asChild
              >
                <Link to='/signup'>Get Started</Link>
              </Button>

              <Button
                size='sm'
                className='bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
                asChild
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
