import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, UserCheck, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import securityImg from "../../../assets/images/security-shield.svg";

const securityFeatures = [
  {
    icon: UserCheck,
    title: "Secure Authentication",
    description: "Multi-factor authentication and biometric login for maximum account protection.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: Lock,
    title: "Encrypted Transactions",
    description: "End-to-end encryption ensures your financial data stays private and secure.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Advanced AI monitoring detects and prevents suspicious activities in real-time.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: Eye,
    title: "Data Privacy",
    description: "Your personal information is protected with industry-leading privacy standards.",
    color: "from-pink-500 to-orange-500"
  }
];

const certifications = [
  { name: "ISO 27001", desc: "Information Security" },
  { name: "PCI DSS", desc: "Payment Card Industry" },
  { name: "SOC 2", desc: "Security & Availability" }
];

export default function TrustSecurity() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
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
            <Award className="w-4 h-4" />
            Bank-Grade Security Standards
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Trust & Security
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
            Your financial security is our top priority. We use cutting-edge technology 
            and industry best practices to keep your money and data safe.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src={securityImg} 
                alt="Security Shield" 
                className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
            
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="text-sm font-medium">SSL Secured</div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ rotate: [0, -3, 0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <div className="text-sm font-medium">256-bit Encryption</div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Industry Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-pink-200 dark:border-pink-800 text-center"
                  >
                    <div className="font-bold text-lg text-pink-600 dark:text-pink-400">{cert.name}</div>
                    <div className="text-sm text-muted-foreground">{cert.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`mb-4 mx-auto w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}