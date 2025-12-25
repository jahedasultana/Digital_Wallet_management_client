import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const securityFeatures = [
  {
    icon: UserCheck,
    title: "Secure Authentication",
    description: "Multi-factor authentication and biometric login for maximum account protection."
  },
  {
    icon: Lock,
    title: "Encrypted Transactions",
    description: "End-to-end encryption ensures your financial data stays private and secure."
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Advanced AI monitoring detects and prevents suspicious activities in real-time."
  },
  {
    icon: Eye,
    title: "Data Privacy",
    description: "Your personal information is protected with industry-leading privacy standards."
  }
];

export default function TrustSecurity() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trust & Security
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your financial security is our top priority. We use cutting-edge technology 
            and industry best practices to keep your money and data safe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 mx-auto w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-300 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}