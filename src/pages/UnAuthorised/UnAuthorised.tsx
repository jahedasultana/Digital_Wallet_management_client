"use client";

import { motion, type Variants } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Shield, Mail, LogIn } from "lucide-react";

interface UnauthorizedProps {
  title?: string;
  message?: string;
  showSignIn?: boolean;
  showCreateAccount?: boolean;
}

const UnAuthorised = ({
  title = "Access Denied",
  message = "You don't have permission to access this resource. This area is protected and requires proper authorization to continue.",
  showSignIn = true,
  showCreateAccount = true,
}: UnauthorizedProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [-1, 1, -1],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const shieldVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4 py-8'>
      <motion.div
        className='max-w-4xl mx-auto text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        role='main'
        aria-labelledby='unauthorized-title'
      >
        {/* Floating Illustration */}
        <motion.div
          className='relative mb-8'
          variants={floatingVariants}
          animate='animate'
          aria-hidden='true'
        >
          <div className='relative mx-auto w-80 h-80 md:w-96 md:h-96'>
            {/* Background Circle */}
            <div className='absolute inset-0 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl' />

            {/* Main Shield Icon */}
            <div className='relative flex items-center justify-center h-full'>
              <motion.div
                variants={shieldVariants}
                animate='animate'
                className='p-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full shadow-2xl'
              >
                <Shield
                  className='w-32 h-32 md:w-40 md:h-40 text-rose-500'
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>

            {/* 403 Text */}
            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2'>
              <span className='text-4xl md:text-5xl font-bold bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent'>
                403
              </span>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className='absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-20'
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className='absolute -bottom-8 -left-8 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-30'
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className='space-y-6'>
          <h1
            id='unauthorized-title'
            className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'
          >
            {title}
          </h1>

          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            {message}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-8'
        >
          {showSignIn && (
            <Button
              asChild
              size='lg'
              className='bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
              aria-label='Sign in to access this resource'
            >
              <Link to='/login' className='flex items-center gap-2'>
                <LogIn className='w-5 h-5' aria-hidden='true' />
                Sign In
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant='outline'
            size='lg'
            className='border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 bg-transparent'
            aria-label='Go back to homepage'
          >
            <Link to='/' className='flex items-center gap-2'>
              <Home className='w-5 h-5' aria-hidden='true' />
              Back to Home
            </Link>
          </Button>

          <Button
            variant='ghost'
            size='lg'
            onClick={() => window.history.back()}
            className='text-gray-600 hover:bg-gray-50 transition-all duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
            aria-label='Go back to previous page'
          >
            <ArrowLeft className='w-5 h-5 mr-2' aria-hidden='true' />
            Go Back
          </Button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          variants={itemVariants}
          className='mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-lg'
        >
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Need Access?
          </h2>

          <div className='grid sm:grid-cols-2 gap-4'>
            {showCreateAccount && (
              <Button
                asChild
                variant='ghost'
                className='h-auto p-4 text-left hover:bg-rose-50 transition-colors duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
              >
                <Link to='/signup' className='flex items-start gap-3'>
                  <LogIn
                    className='w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0'
                    aria-hidden='true'
                  />
                  <div>
                    <div className='font-medium text-gray-900'>
                      Create Account
                    </div>
                    <div className='text-sm text-gray-600'>
                      Sign up to get access
                    </div>
                  </div>
                </Link>
              </Button>
            )}

            <Button
              asChild
              variant='ghost'
              className='h-auto p-4 text-left hover:bg-rose-50 transition-colors duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
            >
              <a
                href='mailto:support@dreamwallet.com'
                className='flex items-start gap-3'
                aria-label='Contact support for access help'
              >
                <Mail
                  className='w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0'
                  aria-hidden='true'
                />
                <div>
                  <div className='font-medium text-gray-900'>
                    Contact Support
                  </div>
                  <div className='text-sm text-gray-600'>
                    Request access assistance
                  </div>
                </div>
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnAuthorised;
