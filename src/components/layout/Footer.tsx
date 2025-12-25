import { Link } from "react-router";
import { Button } from "../ui/button";
import { Facebook, Twitter, Github, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";
import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth";

export default function Footer() {
  const { data } = useUserInfoQuery();
  
  const quickLinks = [
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing", hideWhenLoggedIn: true },
    { to: "/faq", label: "FAQ" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const services = [
    { to: "/services/user-service", label: "User Service" },
    { to: "/services/agent-service", label: "Agent Service" },
    { to: data ? `/${data.role}/wallet` : "/register/user", label: data ? "My Wallet" : "Get Started" },
    { to: data ? `/${data.role}/transactions` : "/login", label: data ? "Transactions" : "Login" },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/jahedasultana/",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-600"
    },
    {
      href: "https://github.com/jahedasultana",
      icon: Github,
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      href: "https://www.facebook.com/share/16dzwV1Pb3/",
      icon: Facebook,
      label: "Facebook",
      color: "hover:text-blue-500"
    },
    {
      href: "https://twitter.com/",
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-blue-400"
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <Logo />
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Your trusted digital wallet for secure, fast, and reliable financial transactions. 
                  Join thousands of satisfied users worldwide.
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Quick Links</h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => {
                  if (link.hideWhenLoggedIn && data) return null;
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => window.scrollTo(0, 0)}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Services</h4>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.to}>
                    <Link
                      to={service.to}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white mt-0.5">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a 
                      href="mailto:support@trustpay.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@trustpay.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white mt-0.5">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a 
                      href="tel:+8801234567890" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +880 1234-567890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
              <p className="text-muted-foreground">Get the latest updates and offers directly in your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Button className="rounded-2xl bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white border-0 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} TrustPay. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by Jaheda Sultana</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/privacy" 
                onClick={() => window.scrollTo(0, 0)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                onClick={() => window.scrollTo(0, 0)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                onClick={() => window.scrollTo(0, 0)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}