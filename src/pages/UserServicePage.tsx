import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Shield, CreditCard, Headphones, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function UserServicePage() {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "Digital Wallet Management",
      description: "Secure and easy-to-use digital wallet for all your financial needs",
      features: ["Multi-currency support", "Instant transfers", "Transaction history", "Budget tracking"]
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Security & Protection",
      description: "Advanced security measures to protect your funds and personal information",
      features: ["Two-factor authentication", "Biometric login", "Fraud detection", "Insurance coverage"]
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your queries and concerns",
      features: ["Live chat support", "Phone assistance", "Email support", "Video calls"]
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Quick Services",
      description: "Fast and efficient services to save your valuable time",
      features: ["Instant account setup", "Quick verification", "Fast transactions", "Real-time notifications"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Users className="h-4 w-4 mr-2" />
            User Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Comprehensive User Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience premium digital wallet services designed specifically for individual users. 
            Manage your finances with confidence and convenience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {service.icon}
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of satisfied users who trust our platform for their digital wallet needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-2xl cursor-pointer " onClick={() => navigate('/register/user')}>
              Create Account
            </Button>
           
          </div>
        </div>
      </div>
    </div>
  );
}