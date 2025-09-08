"use client";

import { Link } from "react-router";
import { motion, type Variants } from "framer-motion";
import { Shield, Users, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import Logo from "@/components/logo";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer
      className='bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-rose-900/20 border-t border-rose-100 dark:border-rose-800/30 mt-12'
      role='contentinfo'
      aria-label='Site footer'
    >
      <motion.div
        className='max-w-7xl mx-auto px-6 py-16'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className='lg:col-span-2'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg'>
                <Logo />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent'>
                Dream Wallet
              </span>
            </div>
            <p className='text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-md'>
              Send, receive, and manage your money securely anytime, anywhere.
              Trusted by users, agents, and admins across Bangladesh.
            </p>
            <div className='flex flex-wrap gap-6'>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <Shield className='h-4 w-4 text-rose-500' aria-hidden='true' />
                <span>Bank-level Security</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <Users className='h-4 w-4 text-rose-500' aria-hidden='true' />
                <span>1M+ Active Users</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.nav variants={itemVariants} aria-label='Footer navigation'>
            <h3 className='text-lg font-semibold mb-6 text-gray-900 dark:text-white'>
              Quick Links
            </h3>
            <ul className='space-y-4' role='list'>
              {[
                { to: "/about", label: "About Us" },
                { to: "/features", label: "Features" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/contact", label: "Contact" },
                { to: "/faq", label: "FAQ" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className='group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md p-1 -m-1'
                    aria-label={`Navigate to ${link.label}`}
                  >
                    <span>{link.label}</span>
                    <ExternalLink
                      className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity'
                      aria-hidden='true'
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Column 3: Contact & Support */}
          <motion.div variants={itemVariants}>
            <h3 className='text-lg font-semibold mb-6 text-gray-900 dark:text-white'>
              Get in Touch
            </h3>
            <address className='not-italic space-y-4'>
              <div className='flex items-start gap-3'>
                <Mail
                  className='h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0'
                  aria-hidden='true'
                />
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    Email Support
                  </p>
                  <a
                    href='mailto:support@dreamwallet.com'
                    className='text-gray-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md'
                    aria-label='Send email to support'
                  >
                    support@dreamwallet.com
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Phone
                  className='h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0'
                  aria-hidden='true'
                />
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    24/7 Helpline
                  </p>
                  <a
                    href='tel:+8801234567890'
                    className='text-gray-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md'
                    aria-label='Call support helpline'
                  >
                    +880 123 456 7890
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <MapPin
                  className='h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0'
                  aria-hidden='true'
                />
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    Location
                  </p>
                  <p className='text-gray-900 dark:text-white'>
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </address>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className='mt-12 pt-8 border-t border-rose-200 dark:border-rose-800/50'
        >
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left'>
              © {new Date().getFullYear()} Dream Wallet. All rights reserved.
            </p>
            <div className='flex items-center gap-6 text-sm'>
              <Link
                to='/privacy'
                className='text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md'
                aria-label='Read privacy policy'
              >
                Privacy
              </Link>
              <Link
                to='/terms'
                className='text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md'
                aria-label='Read terms of service'
              >
                Terms
              </Link>
              <Link
                to='/cookies'
                className='text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md'
                aria-label='Cookie policy'
              >
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
