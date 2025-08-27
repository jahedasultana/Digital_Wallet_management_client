"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelancer",
    text: "Dream Wallet changed how I get paid globally. The instant transfers and low fees are game-changing.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Entrepreneur",
    text: "Fast, reliable, and transparent. Exactly what I need for my growing business operations.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Student",
    text: "Sending money home is stress-free and instant. The interface is so intuitive and accessible.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section
      className='w-full bg-gradient-to-br from-rose-50/80 dark:from-rose-950/20 to-transparent px-6 py-20'
      aria-labelledby='testimonials-heading'
    >
      <motion.h2
        id='testimonials-heading'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className='text-3xl font-bold text-center mb-12'
      >
        What People Say
      </motion.h2>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -5,
              transition: { duration: 0.3 },
            }}
          >
            <Card className='h-full p-6 backdrop-blur-sm bg-white/80 dark:bg-gray-800/60 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border-rose-100 dark:border-rose-900/50'>
              <CardContent className='flex flex-col items-center text-center space-y-4 p-0'>
                <Quote
                  className='h-8 w-8 text-rose-400 opacity-60'
                  aria-hidden='true'
                />

                <Avatar className='h-16 w-16 ring-2 ring-rose-200 dark:ring-rose-800'>
                  <AvatarImage
                    src={`/professional-headshot.png?height=64&width=64&query=professional headshot ${testimonial.name}`}
                    alt={`${testimonial.name}'s profile picture`}
                  />
                  <AvatarFallback className='bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 text-lg font-semibold'>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <blockquote className='italic text-muted-foreground leading-relaxed'>
                  "{testimonial.text}"
                </blockquote>

                <div
                  className='flex text-rose-400'
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className='text-lg' aria-hidden='true'>
                      ★
                    </span>
                  ))}
                </div>

                <div className='text-center'>
                  <h4 className='font-semibold text-rose-900 dark:text-rose-100'>
                    {testimonial.name}
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
