import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Zap, ArrowRight, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import heroImg from "../../../assets/images/hero-bg.svg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Enhanced Background */}
      <div className="absolute -z-10 inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-200/40 via-orange-100/20 to-purple-200/30 dark:from-pink-900/20 dark:via-orange-900/10 dark:to-purple-900/20" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} 
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <Badge className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 px-4 py-1">
                <Star className="w-3 h-3 mr-1" fill="currentColor" />
                Trusted by 50k+ users
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            >
              Your all‑in‑one{" "}
              <span className="bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                digital wallet
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground text-xl leading-relaxed max-w-lg"
            >
              Send, spend, and manage money with confidence. Experience lightning-fast transactions with bank-grade security.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/register/user">
                <Button size="lg" className="rounded-2xl px-8 py-3 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-2xl px-8 py-3 border-2 hover:bg-accent group">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
                  <ShieldCheck className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Bank‑grade</div>
                  <div className="text-xs text-muted-foreground">Security</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20">
                <div className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-500">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Instant</div>
                  <div className="text-xs text-muted-foreground">Transfers</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20">
                <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">50k+</div>
                  <div className="text-xs text-muted-foreground">Happy Users</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src={heroImg} 
                alt="Digital Wallet Interface" 
                className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-green-600">+$2,340</div>
              <div className="text-xs text-muted-foreground">This month</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 left-10 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-sm font-medium">Transaction Complete</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}