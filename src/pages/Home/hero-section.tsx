"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

export const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center text-center px-6 py-24" aria-labelledby="hero-heading">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <h1
          id="hero-heading"
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 dark:from-rose-400 dark:via-pink-300 dark:to-rose-200 bg-clip-text text-transparent"
        >
          Dream Wallet
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed"
        >
          A <span className="font-semibold text-rose-600 dark:text-rose-400">secure</span>,{" "}
          <span className="font-semibold text-rose-600 dark:text-rose-400">fast</span>, and{" "}
          <span className="font-semibold text-rose-600 dark:text-rose-400">smart</span> digital wallet for{" "}
          <strong>Users</strong>, <strong>Agents</strong>, and <strong>Admins</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 text-white transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            aria-label="Get started with Dream Wallet"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-rose-200 hover:border-rose-300 hover:bg-rose-50 dark:border-rose-800 dark:hover:border-rose-700 dark:hover:bg-rose-950/50 transition-all duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 bg-transparent"
            aria-label="Learn more about Dream Wallet features"
          >
            <Play className="mr-2 h-4 w-4" aria-hidden="true" />
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
