import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Star, Users, Briefcase, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Pricing() {
  const tiers = [
    {
      name: "Personal Wallet",
      price: "Free",
      desc: "Perfect for everyday users sending & receiving money.",
      features: [
        "Free wallet account",
        "Send & receive instantly",
        "View transaction history",
        "Basic customer support",
        "Mobile-friendly interface",
        "🎁 50 Tk bonus credited on registration",
      ],
      cta: "Register as User",
      icon: Users,
      color: "from-pink-500 to-orange-500",
      bgColor:
        "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950",
      popular: false,
    },
    {
      name: "Agent Account",
      price: "0.5% commission",
      desc: "Earn money by providing cash-in & cash-out services to users.",
      features: [
        "Cash-in / Cash-out operations",
        "User verification tools",
        "Real-time commission tracking",
        "Priority customer support",
        "Advanced analytics dashboard",
        "Agent training resources",
        "🎁 50 Tk bonus credited on registration",
      ],
      cta: "Register as Agent",
      icon: Briefcase,
      color: "from-pink-500 to-orange-500",
      bgColor:
        "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950",
      popular: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-950 dark:via-blue-950 dark:to-purple-950" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-orange-500 px-4 py-2 text-sm font-medium text-white mb-6"
          >
            <Gift className="h-4 w-4" />
            Special Launch Offer
          </motion.div>

          <h2 className="mb-5 text-4xl sm:text-5xl font-bold tracking-tight text-center">
            Transparent & Fair Pricing
          </h2>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-muted-foreground">
            No hidden fees. Simple charges and real-time receipts.
            Choose the plan that works best for you.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`relative flex h-full flex-col overflow-hidden border-0
                bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
                shadow-xl hover:shadow-2xl transition-all duration-300
                hover:-translate-y-1 group
                ${
                  tier.popular
                    ? "ring-2 ring-pink-500 ring-offset-4 ring-offset-background"
                    : ""
                }`}
              >
                {/* Hover Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.bgColor}
                  opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="border-0 bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-1 text-white shadow-lg">
                      <Star className="mr-1 h-3 w-3" fill="currentColor" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <CardHeader className="relative z-10 pb-6 pt-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-2xl bg-gradient-to-r ${tier.color}
                      p-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <tier.icon className="h-8 w-8 text-white" />
                    </div>

                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-semibold">
                        {tier.name}
                      </CardTitle>
                      <div className="mt-1 text-3xl sm:text-4xl font-bold">
                        {tier.price}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {tier.desc}
                  </p>
                </CardHeader>

                {/* Content */}
                <CardContent className="relative z-10 flex-1 px-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm sm:text-base leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Footer */}
                <CardFooter className="relative z-10 px-6 pb-8 pt-6">
                  <Link
                    to={
                      tier.cta === "Register as User"
                        ? "/register/user"
                        : "/register/agent"
                    }
                    className="w-full"
                  >
                    <Button
                      className="flex h-12 w-full items-center justify-center gap-2
                      rounded-xl text-base sm:text-lg font-semibold
                      bg-gradient-to-r from-pink-600 to-orange-500
                      text-white shadow-md hover:shadow-lg transition-all"
                    >
                      {tier.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Offer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-5 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-6 text-white shadow-xl">
            <Gift className="h-8 w-8" />
            <div>
              <div className="text-xl font-bold">Limited Time Offer</div>
              <div className="text-sm opacity-90">
                Get 50 Tk bonus when you register today!
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
