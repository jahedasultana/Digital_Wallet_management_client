import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, BarChart3, Settings, Zap, CheckCircle, TrendingUp } from "lucide-react";

export default function AgentServicePage() {
  const services = [
    {
      icon: <UserCheck className="h-8 w-8 text-blue-600" />,
      title: "Customer Management",
      description: "Comprehensive tools to manage and support your customers effectively",
      features: ["Customer profiles", "Support ticketing", "Communication tools", "Activity tracking"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Analytics & Reporting",
      description: "Detailed insights and reports to track performance and growth",
      features: ["Transaction analytics", "Performance metrics", "Custom reports", "Data visualization"]
    },
    {
      icon: <Settings className="h-8 w-8 text-purple-600" />,
      title: "Agent Dashboard",
      description: "Powerful dashboard with all the tools you need to succeed",
      features: ["Real-time monitoring", "Task management", "Quick actions", "Customizable interface"]
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Advanced Features",
      description: "Premium features designed for professional agents",
      features: ["Bulk operations", "API access", "White-label options", "Priority support"]
    }
  ];

  const benefits = [
    "Higher commission rates",
    "Dedicated account manager",
    "Advanced training programs",
    "Marketing support materials",
    "Performance bonuses",
    "24/7 technical support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <UserCheck className="h-4 w-4 mr-2" />
            Agent Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Agent Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empower your business with our comprehensive agent platform. Access advanced tools, 
            analytics, and support to grow your customer base and maximize earnings.
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

        {/* Benefits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Agent Benefits
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Become a Agent Today
          </h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Join our network of successful agents and start earning with our comprehensive platform. 
            Get access to exclusive tools and dedicated support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-2xl">
              Apply Now
            </Button>
           
          </div>
        </div>
      </div>
    </div>
  );
}