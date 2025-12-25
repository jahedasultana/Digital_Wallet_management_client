import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Globe, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative gradient edges */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <main className="relative z-10 flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              About <span className="text-primary">TrustPay</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              TrustPay is a secure, modern digital wallet designed to simplify
              everyday payments. Send, receive, and manage your money with
              confidence—anytime, anywhere.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-3xl shadow-lg backdrop-blur bg-card/80">
              <CardHeader className="flex flex-col items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Wallet</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Store and manage your funds digitally with real-time balance and
                transaction tracking.
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-lg backdrop-blur bg-card/80">
              <CardHeader className="flex flex-col items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Trusted Security</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Built with strong encryption and role-based protection to keep
                your money and data safe.
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-lg backdrop-blur bg-card/80">
              <CardHeader className="flex flex-col items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Global Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Empowering users and businesses with fast, transparent digital
                payments across regions.
              </CardContent>
            </Card>
          </div>

          {/* Mission & Vision */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="rounded-3xl shadow-xl bg-card/90">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                To provide a seamless and transparent way for people to store,
                transfer, and access money digitally—building trust through
                simplicity and reliability.
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-xl bg-card/90">
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                To become the most trusted digital wallet platform, redefining
                how individuals and businesses experience financial freedom.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
