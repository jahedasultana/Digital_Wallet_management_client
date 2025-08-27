"use client"

import { motion, type Variants } from "framer-motion"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search, Mail } from "lucide-react"

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

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
  }

  const floatingVariants:Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4 py-8">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="main"
        aria-labelledby="not-found-title"
      >
        {/* Floating Illustration */}
        <motion.div className="relative mb-8" variants={floatingVariants} animate="animate" aria-hidden="true">
          <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96">
            {/* Background Circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl" />

            {/* Main 404 Text */}
            <div className="relative flex items-center justify-center h-full">
              <span className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent">
                404
              </span>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-30"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 id="not-found-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Oops! Page Not Found
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the digital wilderness. Don't worry, even the
            best explorers sometimes take a wrong turn!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            aria-label="Go back to homepage"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" aria-hidden="true" />
              Back to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
            Go Back
          </Button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help Finding Something?</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Button
              asChild
              variant="ghost"
              className="h-auto p-4 text-left hover:bg-rose-50 transition-colors duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <Link to="/features" className="flex items-start gap-3">
                <Search className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-medium text-gray-900">Explore Features</div>
                  <div className="text-sm text-gray-600">Discover what Dream Wallet can do</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-auto p-4 text-left hover:bg-rose-50 transition-colors duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <a
                href="mailto:support@dreamwallet.com"
                className="flex items-start gap-3"
                aria-label="Contact support via email"
              >
                <Mail className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-medium text-gray-900">Contact Support</div>
                  <div className="text-sm text-gray-600">We're here to help you</div>
                </div>
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Skip Link for Screen Readers */}
        <a
          href="#main-navigation"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-rose-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main navigation
        </a>
      </motion.div>
    </main>
  )
}

export default NotFound
