"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Search,
  Rocket,
  ArrowRight,
  Users,
  Target,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router";

const teamMembers = [
  {
    name: "Sarwar Hossain",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ayesha Rahman",
    role: "CTO",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Ahmed",
    role: "Lead Designer",
    img: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Nusrat Jahan",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  return (
    <main className='w-full text-gray-900 dark:text-gray-100' role='main'>
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-rose-600 text-white px-4 py-2 rounded-md z-50'
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section
        className='relative bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-purple-50/80 dark:from-rose-950/20 dark:via-pink-950/15 dark:to-purple-950/20 backdrop-blur-md py-24 px-6 text-center'
        aria-labelledby='hero-heading'
      >
        <div className='max-w-4xl mx-auto'>
          <motion.h1
            id='hero-heading'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className='text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight'
          >
            About{" "}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600'>
              Dream Wallet
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className='max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed font-medium'
          >
            Secure. Fast. Reliable. Empowering people with financial freedom
            through innovative digital solutions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div id='main-content'>
        {/* Our Story */}
        <section
          className='py-20 px-6 md:px-12 text-center max-w-5xl mx-auto'
          aria-labelledby='story-heading'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className='flex items-center justify-center gap-3 mb-8'>
              <BookOpen
                className='w-8 h-8 text-rose-600 dark:text-rose-400'
                aria-hidden='true'
              />
              <h2
                id='story-heading'
                className='text-3xl md:text-4xl lg:text-5xl font-bold'
              >
                Our Story
              </h2>
            </div>
            <div className='max-w-4xl mx-auto space-y-6'>
              <p className='text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed'>
                Dream Wallet started with a simple vision: to make digital
                transactions accessible and effortless for everyone. From small
                businesses to individuals, our mission is to bring seamless
                financial services to your fingertips with transparency and
                trust.
              </p>
              <p className='text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed'>
                Founded by a team of fintech experts and security specialists,
                we've built our platform from the ground up with user experience
                and security as our core principles.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section
          className='py-20 px-6 md:px-12 bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-purple-50/50 dark:from-rose-950/10 dark:via-pink-950/5 dark:to-purple-950/10'
          aria-labelledby='mission-heading'
        >
          <div className='max-w-7xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className='mb-16'
            >
              <div className='flex items-center justify-center gap-3 mb-8'>
                <Target
                  className='w-8 h-8 text-rose-600 dark:text-rose-400'
                  aria-hidden='true'
                />
                <h2
                  id='mission-heading'
                  className='text-3xl md:text-4xl lg:text-5xl font-bold'
                >
                  Our Mission
                </h2>
              </div>
            </motion.div>

            <motion.div
              className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'
              variants={staggerContainer}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                {
                  title: "Financial Inclusion",
                  desc: "Secure wallet access for everyone, everywhere, regardless of background or location.",
                  icon: CreditCard,
                  color: "from-rose-500 to-pink-500",
                },
                {
                  title: "Transparency",
                  desc: "Clear fees, fair policies, no surprises. Complete visibility into all transactions.",
                  icon: Search,
                  color: "from-pink-500 to-purple-500",
                },
                {
                  title: "Innovation",
                  desc: "Cutting-edge features and technology for the future of digital finance.",
                  icon: Rocket,
                  color: "from-purple-500 to-rose-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  className='group p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-xl rounded-3xl transition-all duration-300 hover:shadow-2xl border border-rose-100/50 dark:border-rose-800/30'
                  role='article'
                  aria-labelledby={`mission-${i}-title`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} p-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <item.icon
                      className='w-full h-full text-white'
                      aria-hidden='true'
                    />
                  </div>
                  <h3
                    id={`mission-${i}-title`}
                    className='text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100'
                  >
                    {item.title}
                  </h3>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg'>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className='py-20 px-6 md:px-12' aria-labelledby='team-heading'>
          <div className='max-w-7xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className='mb-16'
            >
              <div className='flex items-center justify-center gap-3 mb-8'>
                <Users
                  className='w-8 h-8 text-rose-600 dark:text-rose-400'
                  aria-hidden='true'
                />
                <h2
                  id='team-heading'
                  className='text-3xl md:text-4xl lg:text-5xl font-bold'
                >
                  Meet the Team
                </h2>
              </div>
              <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
                Our diverse team of experts brings together decades of
                experience in fintech, security, and user experience design.
              </p>
            </motion.div>

            <motion.div
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
              variants={staggerContainer}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true, margin: "-100px" }}
            >
              {teamMembers.map((member, i) => (
                <motion.article
                  key={i}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className='group flex flex-col items-center text-center p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100/30 dark:border-rose-800/20'
                  role='article'
                  aria-labelledby={`team-member-${i}`}
                >
                  <div className='relative mb-6'>
                    <Avatar className='w-24 h-24 ring-4 ring-rose-200/60 dark:ring-rose-700/40 group-hover:ring-rose-300/80 dark:group-hover:ring-rose-600/60 transition-all duration-300'>
                      <AvatarImage
                        src={member.img || "/placeholder.svg"}
                        alt={`Portrait of ${member.name}, ${member.role}`}
                        className='object-cover'
                      />
                      <AvatarFallback className='bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold text-lg'>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3
                    id={`team-member-${i}`}
                    className='font-bold text-lg md:text-xl mb-2 text-gray-900 dark:text-gray-100'
                  >
                    {member.name}
                  </h3>
                  <p className='text-sm md:text-base text-rose-600 dark:text-rose-400 font-medium'>
                    {member.role}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          className='py-24 px-6 md:px-12 text-center bg-gradient-to-br from-rose-100/60 via-pink-100/40 to-purple-100/60 dark:from-rose-950/20 dark:via-pink-950/15 dark:to-purple-950/20 backdrop-blur-md'
          aria-labelledby='cta-heading'
        >
          <div className='max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                id='cta-heading'
                className='text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100'
              >
                Join Us on the Journey
              </h2>
              <p className='max-w-2xl mx-auto mb-12 text-lg md:text-xl opacity-90 text-gray-700 dark:text-gray-300 leading-relaxed'>
                Be part of the digital wallet revolution. Sign up today and
                experience the future of secure, seamless transactions.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size='lg'
                  className='bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl group'
                  aria-describedby='cta-description'
                >
                  <Link to='/signup' className='flex items-center gap-2'>
                    Get Started
                    <ArrowRight
                      className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-200'
                      aria-hidden='true'
                    />
                  </Link>
                </Button>
              </motion.div>
              <p id='cta-description' className='sr-only'>
                Click to navigate to the signup page and create your Dream
                Wallet account
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
