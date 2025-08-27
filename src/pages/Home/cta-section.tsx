"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Zap } from "lucide-react"

export const CTASection = () => {
  return (
    <section
      id="contact"
      className="px-6 py-24 text-center bg-gradient-to-r from-rose-50 via-white to-rose-50 dark:from-rose-950/20 dark:via-background dark:to-rose-950/20"
      aria-labelledby="cta-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold leading-tight"
        >
          Ready to{" "}
          <span className="text-rose-600 dark:text-rose-400 relative">
            simplify your money
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            />
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of users who trust Dream Wallet for secure, fast, and smart financial transactions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 text-white transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 px-8"
            aria-label="Create your free Dream Wallet account"
          >
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-rose-500" aria-hidden="true" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-rose-500" aria-hidden="true" />
              <span>Instant setup</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
