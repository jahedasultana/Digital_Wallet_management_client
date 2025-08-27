"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Wallet, Shield, Users, ArrowRight, Smartphone, LineChart } from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Easy Access",
    desc: "Manage your wallet anytime, anywhere with your phone.",
  },
  {
    icon: Wallet,
    title: "Instant Transfers",
    desc: "Send and receive money instantly across users.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    desc: "We protect every transaction with advanced encryption.",
  },
  {
    icon: Users,
    title: "Role-Based Dashboards",
    desc: "Separate dashboards for Users, Agents, and Admins.",
  },
  {
    icon: LineChart,
    title: "Smart Insights",
    desc: "Visualize spending, income, and commissions.",
  },
  {
    icon: ArrowRight,
    title: "Seamless Experience",
    desc: "Responsive, fast, and accessible on all devices.",
  },
]

export const FeaturesSection = () => {
  return (
    <section id="features" className="px-6 py-20 w-full max-w-6xl" aria-labelledby="features-heading">
      <motion.h2
        id="features-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold text-center mb-12"
      >
        Features at a Glance
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Card className="h-full backdrop-blur-md bg-white/70 dark:bg-gray-900/40 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border-rose-100 dark:border-rose-900/50 group">
              <CardContent className="flex flex-col items-center p-8 text-center h-full">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                  className="mb-4 p-3 rounded-full bg-rose-100 dark:bg-rose-900/30 group-hover:bg-rose-200 dark:group-hover:bg-rose-800/50 transition-colors duration-300"
                >
                  <feature.icon className="h-8 w-8 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                </motion.div>

                <h3 className="text-lg font-semibold mb-3 text-rose-900 dark:text-rose-100">{feature.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
