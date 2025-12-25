import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Send, ShieldCheck, Users, Wallet, Zap, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const items = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Bank-grade security",
      desc: "Your money and data are protected with encryption and real-time fraud detection.",
      color: "from-pink-500 to-orange-500",
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant transactions",
      desc: "Transfer funds within seconds — anytime, anywhere in the world.",
      color: "from-pink-500 to-orange-500",
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950"
    },
    {
      icon: <Send className="h-6 w-6" />,
      title: "Global payments",
      desc: "Send and receive money across borders with minimal effort.",
      color: "from-pink-500 to-orange-500",
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Smart insights",
      desc: "Track spending, set budgets, and view clear analytics of your activity.",
      color: "from-pink-500 to-orange-500",
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "For everyone",
      desc: "Built for individuals, businesses, and agents with role-based dashboards.",
      color: "from-pink-500 to-orange-500",
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950"
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Low & transparent fees",
      desc: "No hidden charges — just simple, affordable pricing for every transfer.",
      color: "from-pink-500 to-orange-500",
      bgColor: "from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950"
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />
      
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
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Features that matter
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
            Everything you need for a secure and effortless digital wallet experience.
            Built with cutting-edge technology for modern financial needs.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((f, index) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${f.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">{f.icon}</div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{f.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="text-muted-foreground leading-relaxed relative z-10">
                  {f.desc}
                </CardContent>
                
                {/* Hover Effect Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">All features included in every plan</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
