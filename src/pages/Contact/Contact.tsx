"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Mail, Phone, MapPin, Send } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "support@dreamwallet.com",
      href: "mailto:support@dreamwallet.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1234 567890",
      href: "tel:+8801234567890",
      description: "Call us during business hours",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Dream Street, Dhaka, Bangladesh",
      href: "https://maps.google.com",
      description: "Visit our office",
    },
  ];

  return (
    <div className='w-full'>
      <section
        className='relative bg-gradient-to-r from-pink-100/50 via-rose-100/40 to-purple-100/50 backdrop-blur-md py-20 px-6 text-center rounded-xl'
        role='banner'
        aria-labelledby='contact-title'
      >
        <motion.h1
          id='contact-title'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100'
        >
          Contact <span className='text-rose-500'>Us</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='max-w-2xl mx-auto text-lg md:text-xl opacity-90 text-gray-700 dark:text-gray-300'
          aria-describedby='contact-title'
        >
          Have questions or feedback? We'd love to hear from you. Get in touch
          and we'll respond as soon as possible.
        </motion.p>
      </section>

      <div className='max-w-6xl mx-auto px-6 md:px-12 py-16'>
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className='bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border-rose-200/50 shadow-xl'>
              <CardContent className='p-8'>
                <div className='mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                    Send us a Message
                  </h2>
                  <p className='text-gray-600 dark:text-gray-400'>
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    className='flex flex-col gap-6'
                    noValidate
                    aria-label='Contact form'
                    action={`https://formbold.com/s/${
                      import.meta.env.VITE_FORM_BOLD
                    }`}
                    method='POST'
                    encType='multipart/form-data'
                  >
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name='name'
                      rules={{
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700 dark:text-gray-300'>
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter your full name'
                              {...field}
                              aria-describedby={
                                form.formState.errors.name
                                  ? `name-error`
                                  : undefined
                              }
                              className='focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                            />
                          </FormControl>
                          <FormMessage id='name-error' />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name='email'
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700 dark:text-gray-300'>
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder='your@email.com'
                              {...field}
                              aria-describedby={
                                form.formState.errors.email
                                  ? `email-error`
                                  : undefined
                              }
                              className='focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                            />
                          </FormControl>
                          <FormMessage id='email-error' />
                        </FormItem>
                      )}
                    />

                    {/* Subject */}
                    <FormField
                      control={form.control}
                      name='subject'
                      rules={{
                        required: "Subject is required",
                        minLength: {
                          value: 5,
                          message: "Subject must be at least 5 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700 dark:text-gray-300'>
                            Subject *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='What is this regarding?'
                              {...field}
                              aria-describedby={
                                form.formState.errors.subject
                                  ? `subject-error`
                                  : undefined
                              }
                              className='focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                            />
                          </FormControl>
                          <FormMessage id='subject-error' />
                        </FormItem>
                      )}
                    />

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name='message'
                      rules={{
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700 dark:text-gray-300'>
                            Message *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder='Tell us more about your inquiry...'
                              {...field}
                              aria-describedby={
                                form.formState.errors.message
                                  ? `message-error`
                                  : undefined
                              }
                              className='focus:ring-2 focus:ring-rose-500 focus:border-rose-500 resize-none'
                            />
                          </FormControl>
                          <FormMessage id='message-error' />
                        </FormItem>
                      )}
                    />

                    {/* Submit */}
                    <Button
                      type='submit'
                      size='lg'
                      className='bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                      aria-describedby='submit-status'
                    >
                      <Send className='w-4 h-4 mr-2' />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='space-y-8'
          >
            <div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                Get in Touch
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mb-8'>
                Choose the best way to reach us. We're here to help and answer
                any questions you might have.
              </p>
            </div>

            <div className='space-y-6'>
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className='bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border-rose-200/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 group'>
                      <CardContent className='p-6'>
                        <a
                          href={method.href}
                          className='flex items-start gap-4 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors'
                          aria-label={`${method.label}: ${method.value}`}
                        >
                          <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200'>
                            <IconComponent className='w-6 h-6' />
                          </div>
                          <div className='flex-1'>
                            <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-1'>
                              {method.label}
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400 text-sm mb-1'>
                              {method.description}
                            </p>
                            <p className='text-gray-800 dark:text-gray-200 font-medium'>
                              {method.value}
                            </p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <Card className='bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                  Business Hours & Response Times
                </h3>
                <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                  <p>
                    <strong>Business Hours:</strong> Monday - Friday, 9:00 AM -
                    6:00 PM (GMT+6)
                  </p>
                  <p>
                    <strong>Email Response:</strong> Within 24 hours
                  </p>
                  <p>
                    <strong>Phone Support:</strong> During business hours
                  </p>
                  <p>
                    <strong>Emergency Support:</strong> Available for premium
                    users
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
