import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Shield, CreditCard, Headphones, Clock, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export default function UserServicePage() {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Digital Wallet Management",
      description: "Secure and easy-to-use digital wallet for all your financial needs",
      features: ["Multi-currency support", "Instant transfers", "Transaction history", "Budget tracking"]
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Security & Protection",
      description: "Advanced security measures to protect your funds and personal information",
      features: ["Two-factor authentication", "Biometric login", "Fraud detection", "Insurance coverage"]
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your queries and concerns",
      features: ["Live chat support", "Phone assistance", "Email support", "Video calls"]
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Quick Services",
      description: "Fast and efficient services to save your valuable time",
      features: ["Instant account setup", "Quick verification", "Fast transactions", "Real-time notifications"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Users className="h-4 w-4 mr-2" />
            User Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
            Comprehensive User Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience premium digital wallet services designed specifically for individual users. 
            Manage your finances with confidence and convenience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-primary/10 hover:border-primary/30 bg-gradient-to-br from-background to-secondary/5">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-2xl">
          <CardContent className="p-12">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-12 w-12 text-primary-foreground/80" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Join thousands of satisfied users who trust our platform for their digital wallet needs.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="rounded-2xl px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform" 
              onClick={() => navigate('/register/user')}
            >
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}