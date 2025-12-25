import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-200/30 via-background to-transparent dark:from-fuchsia-900/20" />
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-pink-600 to-pink-300 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            
            <CardContent className="relative p-8 sm:p-12 lg:p-16 text-center text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Join 50,000+ Happy Users</span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
              >
                Ready to Transform Your
                <br />
                Financial Experience?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of users who trust our platform for secure, fast, and reliable 
                digital transactions. Start your journey today!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-pink-600 hover:bg-gray-100 rounded-2xl px-8 py-3 font-semibold group"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-3 font-semibold backdrop-blur-sm"
                >
                  Login to Account
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 text-sm text-white/70"
              >
                No setup fees • Free to download • 24/7 customer support
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}