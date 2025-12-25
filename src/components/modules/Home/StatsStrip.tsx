import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Globe, Zap, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsStrip() {
  const stats = [
    { 
      label: "Monthly volume", 
      value: "$2.3M", 
      icon: DollarSign,
      color: "from-pink-500 to-orange-500",
      change: "+23%"
    },
    { 
      label: "Transactions/day", 
      value: "18k", 
      icon: Zap,
      color: "from-pink-500 to-orange-500",
      change: "+15%"
    },
    { 
      label: "Avg. uptime", 
      value: "99.98%", 
      icon: TrendingUp,
      color: "from-pink-500 to-orange-500",
      change: "99.9%"
    },
    { 
      label: "Countries", 
      value: "3+", 
      icon: Globe,
      color: "from-pink-500 to-orange-500",
      change: "Growing"
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-white to-orange-50 dark:from-pink-950 dark:via-gray-900 dark:to-orange-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-200/10 to-orange-200/10 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Trusted by thousands
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time statistics showing our platform's growth and reliability
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, index) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="p-6 text-center relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${s.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <s.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {s.value}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      {s.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-2xl border border-pink-200/20 dark:border-pink-800/20">
            <Users className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-muted-foreground">
              Join 50,000+ satisfied users worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
