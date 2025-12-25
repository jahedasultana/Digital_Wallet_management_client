import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, Shield, CreditCard, Users, Smartphone, Star } from "lucide-react";

export default function Faq() {
  const faqs = [
    {
      q: "How secure is TrustPay?",
      a: "We use JWT-based authentication, encrypted passwords, and role-based permissions. Your data is protected with bank-grade 256-bit encryption and real-time fraud monitoring.",
      icon: Shield,
      color: "from-pink-500 to-orange-500"
    },
    {
      q: "Is there any fee to send money?",
      a: "Personal accounts are free with transparent fees disclosed at checkout. Agent accounts earn 0.5% commission on transactions. No hidden charges, ever.",
      icon: CreditCard,
      color: "from-pink-500 to-orange-500"
    },
    {
      q: "Can I use it as an agent?",
      a: "Yes! Create an agent account during registration to enable cash-in and cash-out services. You'll get professional tools and earn commission on every transaction.",
      icon: Users,
      color: "from-pink-500 to-orange-500"
    },
    {
      q: "Do you have a mobile app?",
      a: "This web app is fully responsive and PWA-ready, working seamlessly on all devices. Native iOS and Android apps are coming soon!",
      icon: Smartphone,
      color: "from-pink-500 to-orange-500"
    },
    {
      q: "What makes TrustPay different?",
      a: "We combine bank-grade security with instant transfers, transparent pricing, and 24/7 support. Plus, you get 50 Tk bonus on registration!",
      icon: Star,
      color: "from-pink-500 to-orange-500"
    },
    {
      q: "How fast are transactions?",
      a: "Transactions are processed instantly within our network. External transfers typically complete within minutes, not hours or days.",
      icon: HelpCircle,
      color: "from-pink-500 to-orange-500"
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
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
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
            Quick answers to common questions about TrustPay.
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${idx}`} 
                  className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <AccordionTrigger className="hover:no-underline py-6 group-hover:text-primary transition-colors">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-semibold text-lg">{item.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2 text-muted-foreground leading-relaxed text-base ml-16">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl text-white shadow-xl">
            <HelpCircle className="w-6 h-6" />
            <div>
              <div className="font-semibold text-lg">Still have questions?</div>
              <div className="text-sm opacity-90">Our support team is here to help 24/7</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
