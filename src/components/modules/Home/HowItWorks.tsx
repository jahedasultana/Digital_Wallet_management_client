import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, CreditCard, Send, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in minutes with just your phone number and basic details."
  },
  {
    icon: CreditCard,
    title: "Add Money",
    description: "Load your wallet instantly using bank transfer, card, or mobile banking."
  },
  {
    icon: Send,
    title: "Send & Withdraw",
    description: "Transfer money to anyone or withdraw cash from nearby agents."
  },
  {
    icon: BarChart3,
    title: "Track Transactions",
    description: "Monitor all your activities with detailed transaction history and insights."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started with your digital wallet in just 4 simple steps. 
            It's fast, secure, and designed for everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-300 rounded-full flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-pink-600 to-pink-300 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}