import { AboutSection } from "./about-section";
import { CTASection } from "./cta-section";
import { FeaturesSection } from "./features-section";
import { HeroSection } from "./hero-section";
import { PricingSection } from "./pricing-section";
import { TestimonialsSection } from "./testimonials-section";

export default function Home() {
  return (
    <main className='relative flex flex-col items-center min-h-screen'>
      {/* Background gradient */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-rose-100/40 dark:from-rose-900/30 to-background' />

      {/* Skip to main content link for screen readers */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-rose-600 text-white px-4 py-2 rounded-md z-50 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
      >
        Skip to main content
      </a>

      <div id='main-content'>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </div>
    </main>
  );
}
