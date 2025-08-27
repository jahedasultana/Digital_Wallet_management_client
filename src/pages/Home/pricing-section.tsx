"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"

const plans = [
  {
    title: "Starter",
    price: "$0",
    period: "forever",
    features: ["Free wallet creation", "Basic transfers", "Mobile app access", "Email support"],
    highlight: false,
    popular: false,
  },
  {
    title: "Pro",
    price: "$9",
    period: "per month",
    features: [
      "Lower transaction fees",
      "Priority support",
      "Advanced analytics",
      "Multi-currency support",
      "API access",
    ],
    highlight: true,
    popular: true,
  },
  {
    title: "Business",
    price: "$29",
    period: "per month",
    features: [
      "Team accounts",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
      "White-label options",
    ],
    highlight: false,
    popular: false,
  },
]

export const PricingSection = () => {
  return (
    <section id="pricing" className="px-6 py-20 w-full max-w-6xl" aria-labelledby="pricing-heading">
      <motion.h2
        id="pricing-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold text-center mb-4"
      >
        Transparent Pricing
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
      >
        Choose the plan that fits your needs. All plans include our core security features and 24/7 monitoring.
      </motion.p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
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
              transition: { duration: 0.3 },
            }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="h-3 w-3" aria-hidden="true" />
                  Most Popular
                </div>
              </div>
            )}

            <Card
              className={`h-full p-8 text-center rounded-2xl shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-xl ${
                plan.highlight
                  ? "border-2 border-rose-600 dark:border-rose-400 bg-rose-50/50 dark:bg-rose-950/20"
                  : "bg-white/70 dark:bg-gray-900/40 border-rose-100 dark:border-rose-900/50"
              }`}
            >
              <CardContent className="space-y-6 p-0">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-rose-900 dark:text-rose-100">{plan.title}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-rose-700 dark:text-rose-300">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm" role="list" aria-label={`${plan.title} plan features`}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-rose-600 dark:text-rose-400 flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className={`w-full transition-all duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                    plan.highlight
                      ? "bg-rose-600 hover:bg-rose-700 text-white hover:scale-105"
                      : "bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-900/50 dark:hover:bg-rose-800/70 dark:text-rose-200"
                  }`}
                  aria-label={`Choose ${plan.title} plan for ${plan.price} ${plan.period}`}
                >
                  Choose {plan.title}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
