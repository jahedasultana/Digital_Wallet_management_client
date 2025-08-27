"use client"

import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Users, Globe, Bell, ArrowRight, CheckCircle } from "lucide-react"

const featureList = [
  {
    icon: Wallet,
    title: "Fast Transactions",
    description: "Send and receive money instantly with zero hassle. Lightning-fast processing every time.",
    benefits: ["Instant transfers", "Zero waiting time", "24/7 availability"],
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your funds are protected with bank-grade encryption and advanced security protocols.",
    benefits: ["256-bit encryption", "Multi-factor auth", "Fraud protection"],
  },
  {
    icon: Users,
    title: "User Friendly",
    description: "Intuitive interface designed for everyone, from beginners to advanced users.",
    benefits: ["Simple navigation", "Clear interface", "Easy onboarding"],
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Real-time updates on all transactions, keeping you informed and in control.",
    benefits: ["Real-time alerts", "Custom preferences", "Smart insights"],
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Plan to expand globally, enabling seamless cross-border digital payments.",
    benefits: ["Multi-currency", "Global network", "Low fees"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants :Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // cubic-bezier easing
    },
  },
}

const Features = () => {
  return (
    <main className="w-full" role="main">
      {/* Skip to content link for accessibility */}
      <a
        href="#features-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-rose-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to features content
      </a>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-purple-50/80 backdrop-blur-sm py-20 px-6 text-center rounded-2xl border border-rose-100/50"
        aria-labelledby="features-hero-title"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-purple-500/5 rounded-2xl"></div>
        <div className="relative z-10">
          <motion.h1
            id="features-hero-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100"
          >
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Dream Wallet
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            Discover innovative tools and functionalities designed to revolutionize your digital wallet experience with
            security, speed, and simplicity at its core.
          </motion.p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features-content" className="py-20 px-6 md:px-12" aria-labelledby="features-grid-title">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            id="features-grid-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto"
          >
            Each feature is carefully crafted to provide you with the best digital wallet experience
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Dream Wallet features"
          >
            {featureList.map((feature, i) => (
              <motion.div key={i} variants={itemVariants} role="listitem" className="group">
                <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg hover:shadow-2xl rounded-2xl border border-rose-100/50 dark:border-gray-700/50 transition-all duration-500 hover:scale-[1.02] hover:border-rose-200/70 focus-within:ring-2 focus-within:ring-rose-500/20">
                  <CardContent className="flex flex-col h-full p-8">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl mb-6 group-hover:from-rose-500/20 group-hover:to-pink-500/20 transition-all duration-300">
                      <feature.icon
                        className="h-8 w-8 text-rose-500 group-hover:text-rose-600 transition-colors duration-300"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
                      {feature.description}
                    </p>

                    <div className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 text-rose-500 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section
        className="py-24 px-6 md:px-12 text-center bg-gradient-to-r from-rose-50/50 to-pink-50/50 rounded-2xl mx-6 border border-rose-100/50"
        aria-labelledby="cta-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 id="cta-title" className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Financial Future?
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Join thousands of users who have already discovered the power of Dream Wallet. Start your journey towards
            smarter, faster, and more secure digital payments today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-describedby="get-started-description"
            >
              Get Started Now
              <ArrowRight
                className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-rose-200 hover:border-rose-300 text-rose-600 hover:text-rose-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-transparent"
            >
              Learn More
            </Button>
          </div>

          <p id="get-started-description" className="sr-only">
            Click to create your Dream Wallet account and start using our features immediately
          </p>
        </motion.div>
      </section>
    </main>
  )
}

export default Features
