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
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950",
      popular: false
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
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950",
      popular: true
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-950 dark:via-blue-950 dark:to-purple-950" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Gift className="w-4 h-4" />
            Special Launch Offer
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Transparent & Fair Pricing
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
            No hidden fees. Simple charges and real-time receipts.
            Choose the plan that works best for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`relative h-full border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group ${
                  tier.popular ? "ring-2 ring-pink-500 ring-offset-4 ring-offset-background" : ""
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 px-4 py-1 shadow-lg">
                      <Star className="w-3 h-3 mr-1" fill="currentColor" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="relative z-10 pb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${tier.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <tier.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{tier.name}</CardTitle>
                      <div className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {tier.price}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{tier.desc}</p>
                </CardHeader>

                <CardContent className="relative z-10 flex-1">
                  <ul className="space-y-4">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mt-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative z-10 pt-8">
                  <Link
                    to={
                      tier.cta === "Register as User"
                        ? "/register/user"
                        : "/register/agent"
                    }
                    className="w-full"
                  >
                    <Button
                      className={`w-full rounded-2xl py-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group/btn bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white border-0`}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-6 p-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl text-white shadow-xl">
            <Gift className="w-8 h-8" />
            <div>
              <div className="font-bold text-xl">Limited Time Offer</div>
              <div className="text-sm opacity-90">Get 50 Tk bonus when you register today!</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
