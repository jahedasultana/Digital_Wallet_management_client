"use client"

import { motion } from "framer-motion"

export const AboutSection = () => {
  return (
    <section id="about" className="px-6 py-20 w-full max-w-6xl" aria-labelledby="about-heading">
      <motion.h2
        id="about-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold text-center mb-12"
      >
        About Dream Wallet
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-lg group"
        >
          <img
            src="/image/wallet-illustration.jpg"
            alt="Digital Wallet Interface - Modern and secure financial technology"
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-rose-900/80 via-rose-800/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center space-y-2 p-4"
            >
              <h3 className="text-xl font-bold">Your Money, Secured</h3>
              <p className="text-sm opacity-90 leading-relaxed">Experience seamless transactions with Dream Wallet</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center md:text-left space-y-4"
        >
          <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            We're building the next-generation <strong className="text-foreground">fintech platform</strong> where
            <span className="text-rose-600 dark:text-rose-400 font-medium"> security</span>,{" "}
            <span className="text-rose-600 dark:text-rose-400 font-medium">accessibility</span>, and{" "}
            <span className="text-rose-600 dark:text-rose-400 font-medium">simplicity</span> come first.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're a <strong className="text-foreground">User</strong> managing your money, an{" "}
            <strong className="text-foreground">Agent</strong> helping the community, or an{" "}
            <strong className="text-foreground">Admin</strong> overseeing the system, Dream Wallet empowers you with
            tools to transact and grow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
