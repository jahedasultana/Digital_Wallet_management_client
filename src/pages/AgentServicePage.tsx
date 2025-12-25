import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, BarChart3, Settings, Zap, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export default function AgentServicePage() {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: <UserCheck className="h-8 w-8 text-primary" />,
      title: "Customer Management",
      description: "Comprehensive tools to manage and support your customers effectively",
      features: ["Customer profiles", "Support ticketing", "Communication tools", "Activity tracking"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Analytics & Reporting",
      description: "Detailed insights and reports to track performance and growth",
      features: ["Transaction analytics", "Performance metrics", "Custom reports", "Data visualization"]
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Agent Dashboard",
      description: "Powerful dashboard with all the tools you need to succeed",
      features: ["Real-time monitoring", "Task management", "Quick actions", "Customizable interface"]
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <UserCheck className="h-4 w-4 mr-2" />
            Agent Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
            Professional Agent Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empower your business with our comprehensive agent platform. Access advanced tools, 
            analytics, and support to grow your customer base and maximize earnings.
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

        {/* Benefits Section */}
        <Card className="mb-16 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/10">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Agent Benefits
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-background/50 hover:bg-background/80 transition-colors">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-2xl">
          <CardContent className="p-12">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-12 w-12 text-primary-foreground/80" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become an Agent Today
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Join our network of successful agents and start earning with our comprehensive platform. 
              Get access to exclusive tools and dedicated support.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="rounded-2xl px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform" 
              onClick={() => navigate('/register/agent')}
            >
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}