"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const faqList = [
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Sign Up' button on the top navigation and fill out your details. Verification is instant! You'll need a valid email address and phone number for security purposes.",
    category: "account",
  },
  {
    question: "Is my money safe?",
    answer:
      "Dream Wallet uses bank-grade security with 256-bit encryption, two-factor authentication, and biometric verification. Your funds are FDIC insured up to $250,000.",
    category: "security",
  },
  {
    question: "Can I send money internationally?",
    answer:
      "Currently, Dream Wallet supports domestic transactions within the US. International support is coming soon with competitive exchange rates and low fees.",
    category: "transactions",
  },
  {
    question: "What are the transaction fees?",
    answer:
      "Transactions within the wallet are completely free. Sending money to external bank accounts may incur minimal fees ($0.50-$2.00) depending on your plan and transfer speed.",
    category: "fees",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click 'Forgot Password'. Enter your email address and follow the secure reset instructions sent to your inbox. The reset link expires in 24 hours.",
    category: "account",
  },
  {
    question: "What payment methods can I add?",
    answer:
      "You can link bank accounts, debit cards, and credit cards. We support all major US banks and card networks including Visa, Mastercard, and American Express.",
    category: "payments",
  },
  {
    question: "How long do transfers take?",
    answer:
      "Instant transfers between Dream Wallet users are immediate. Bank transfers typically take 1-3 business days, with express options available for faster processing.",
    category: "transactions",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes! Dream Wallet is available on both iOS and Android. Download from the App Store or Google Play Store for the full mobile experience with biometric login.",
    category: "mobile",
  },
];

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "account", label: "Account" },
    { id: "security", label: "Security" },
    { id: "transactions", label: "Transactions" },
    { id: "fees", label: "Fees" },
    { id: "payments", label: "Payments" },
    { id: "mobile", label: "Mobile" },
  ];

  const filteredFaqs = faqList.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-purple-50/30'>
      {/* Hero Section */}
      <section
        className='relative py-20 px-6 text-center'
        role='banner'
        aria-labelledby='faq-title'
      >
        <div className='absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-purple-500/10 backdrop-blur-sm rounded-3xl mx-6' />
        <div className='relative z-10 max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex items-center justify-center gap-3 mb-6'
          >
            <HelpCircle
              className='w-12 h-12 text-rose-500'
              aria-hidden='true'
            />
            <h1
              id='faq-title'
              className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100'
            >
              Frequently Asked{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600'>
                Questions
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='max-w-2xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8'
          >
            Find quick answers to common questions about Dream Wallet. Can't
            find what you're looking for? Our support team is here to help.
          </motion.p>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='max-w-2xl mx-auto space-y-6'
          >
            <div className='relative'>
              <Search
                className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
              <Input
                type='text'
                placeholder='Search frequently asked questions...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-12 pr-4 py-3 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-rose-200 dark:border-rose-800 focus:border-rose-400 dark:focus:border-rose-600 rounded-2xl'
                aria-label='Search FAQ questions'
              />
            </div>

            <div className='flex flex-wrap gap-2 justify-center'>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size='sm'
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg"
                      : "bg-white/80 dark:bg-gray-800/80 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  }`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section
        className='py-16 px-6 md:px-12 max-w-5xl mx-auto'
        role='main'
        aria-labelledby='faq-content-title'
      >
        <h2 id='faq-content-title' className='sr-only'>
          FAQ Content
        </h2>

        {filteredFaqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12'
          >
            <HelpCircle
              className='w-16 h-16 text-gray-400 mx-auto mb-4'
              aria-hidden='true'
            />
            <h3 className='text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2'>
              No questions found
            </h3>
            <p className='text-gray-500 dark:text-gray-500'>
              Try adjusting your search terms or category filter.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='space-y-4'
          >
            <Accordion type='single' collapsible className='space-y-4'>
              {filteredFaqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <AccordionItem value={`item-${i}`} className='border-0'>
                    <Card className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-rose-100 dark:border-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800/50'>
                      <CardContent className='p-0'>
                        <AccordionTrigger
                          className='px-6 py-4 text-left text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-200 [&[data-state=open]]:text-rose-600 dark:[&[data-state=open]]:text-rose-400'
                          aria-expanded='false'
                        >
                          <span className='flex items-start gap-3'>
                            <HelpCircle
                              className='w-5 h-5 mt-1 text-rose-500 flex-shrink-0'
                              aria-hidden='true'
                            />
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className='px-6 pb-6 text-gray-700 dark:text-gray-300 leading-relaxed'>
                          <div className='pl-8 border-l-2 border-rose-200 dark:border-rose-800'>
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </CardContent>
                    </Card>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        )}
      </section>

      {/* Contact Support Section */}
      <section
        className='py-20 px-6 md:px-12'
        role='complementary'
        aria-labelledby='support-title'
      >
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2
              id='support-title'
              className='text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100'
            >
              Still Have Questions?
            </h2>
            <p className='max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-8'>
              Our dedicated support team is available 24/7 to help you with any
              questions or concerns.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='grid md:grid-cols-3 gap-6 mb-12'
          >
            <Card className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-rose-100 dark:border-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800/50'>
              <CardContent className='p-6 text-center'>
                <MessageCircle
                  className='w-12 h-12 text-rose-500 mx-auto mb-4'
                  aria-hidden='true'
                />
                <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                  Live Chat
                </h3>
                <p className='text-gray-600 dark:text-gray-400 mb-4'>
                  Get instant help from our support team
                </p>
                <Button
                  variant='outline'
                  className='w-full rounded-full border-rose-200 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-900/20 bg-transparent'
                  aria-label='Start live chat with support'
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-rose-100 dark:border-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800/50'>
              <CardContent className='p-6 text-center'>
                <Phone
                  className='w-12 h-12 text-rose-500 mx-auto mb-4'
                  aria-hidden='true'
                />
                <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                  Phone Support
                </h3>
                <p className='text-gray-600 dark:text-gray-400 mb-4'>
                  Speak directly with our experts
                </p>
                <Button
                  variant='outline'
                  className='w-full rounded-full border-rose-200 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-900/20 bg-transparent'
                  aria-label='Call support at 1-800-DREAM-WALLET'
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-rose-100 dark:border-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800/50'>
              <CardContent className='p-6 text-center'>
                <Mail
                  className='w-12 h-12 text-rose-500 mx-auto mb-4'
                  aria-hidden='true'
                />
                <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                  Email Support
                </h3>
                <p className='text-gray-600 dark:text-gray-400 mb-4'>
                  Send us a detailed message
                </p>
                <Link to='/contact'>
                  <Button
                    variant='outline'
                    className='w-full rounded-full border-rose-200 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-900/20 bg-transparent'
                    aria-label='Go to contact form'
                  >
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-center'
          >
            <Link to='/contact'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-3'
                aria-label='Contact our support team'
              >
                Contact Support Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
