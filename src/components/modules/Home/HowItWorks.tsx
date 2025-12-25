import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, CreditCard, Send, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import flowImg from "../../../assets/images/transaction-flow.svg";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in minutes with just your phone number and basic details.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: CreditCard,
    title: "Add Money",
    description: "Load your wallet instantly using bank transfer, card, or mobile banking.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: Send,
    title: "Send & Withdraw",
    description: "Transfer money to anyone or withdraw cash from nearby agents.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: BarChart3,
    title: "Track Transactions",
    description: "Monitor all your activities with detailed transaction history and insights.",
    color: "from-pink-500 to-orange-500"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
            <Sparkles className="w-4 h-4" />
            Simple 4-Step Process
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
            Get started with your digital wallet in just 4 simple steps. 
            It's fast, secure, and designed for everyone.
          </p>
        </motion.div>

        {/* Transaction Flow Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-center"
        >
          <div className="relative max-w-2xl">
            <img 
              src={flowImg} 
              alt="Transaction Flow" 
              className="w-full h-auto drop-shadow-lg"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="relative mb-8">
                    <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Connection Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 z-20">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl text-white shadow-xl">
            <div className="text-lg font-semibold">Ready to get started?</div>
            <ArrowRight className="w-5 h-5" />
            <div className="text-lg font-semibold">Create your account now!</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}