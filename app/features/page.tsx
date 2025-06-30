import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Users,
  Clock,
  Sparkles,
  Globe,
  BarChart3,
  Shield,
  Smartphone,
  Database,
  Webhook,
  CreditCard,
  Bot,
} from "lucide-react"
import Image from "next/image"

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Multi-Format Auctions",
      description: "Support for both forward and reverse auction formats",
      details: [
        "Forward auctions for selling assets",
        "Reverse auctions for procurement",
        "Dutch auctions with declining prices",
        "Sealed bid auctions for confidential processes",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Role-Based User Management",
      description: "Comprehensive user onboarding and management system",
      details: [
        "Auctioneer dashboard with full control",
        "Bidder registration and verification",
        "Administrator oversight and reporting",
        "Custom role creation and permissions",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-Time Bidding Engine",
      description: "WebSocket-powered live bidding with instant updates",
      details: [
        "Sub-second bid processing",
        "Live participant counters",
        "Automatic bid increments",
        "Real-time notifications and alerts",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Auction Builder Wizard",
      description: "Intuitive interface to create complex auction workflows",
      details: [
        "Drag-and-drop auction creation",
        "Template library for common scenarios",
        "Custom field configuration",
        "Preview and testing capabilities",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const advancedFeatures = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "White-Labelling",
      description: "Complete customization with your brand identity",
      details: [
        "Custom domain and SSL",
        "Brand colors and logos",
        "Custom email templates",
        "Personalized user experience",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Reporting",
      description: "Comprehensive insights and performance metrics",
      details: [
        "Real-time auction analytics",
        "Bidder behavior insights",
        "Revenue and performance reports",
        "Export capabilities (PDF, Excel)",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Recommendations",
      description: "Machine learning powered optimization suggestions",
      details: [
        "Optimal auction timing recommendations",
        "Price prediction algorithms",
        "Bidder engagement insights",
        "Performance optimization tips",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Subscription Monetization",
      description: "Flexible pricing models for your platform",
      details: [
        "Tiered subscription plans",
        "Usage-based billing",
        "Commission fee structures",
        "Revenue sharing options",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const technicalFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security and compliance",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Responsive",
      description: "Optimized for all devices and screen sizes",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Scalable Infrastructure",
      description: "Auto-scaling to handle traffic spikes",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: <Webhook className="h-8 w-8" />,
      title: "API Integration",
      description: "RESTful APIs for seamless integration",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Platform Features
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Successful Auctions
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            From simple bidding to complex procurement workflows, our platform provides all the tools you need to run
            efficient, transparent, and profitable auctions.
          </p>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Briskon Platform Features Overview"
              width={800}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Core Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Features</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
                        <div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                  <div className="flex items-center">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Advanced Capabilities</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
                        <div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Excellence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalFeatures.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md mx-auto"
                    />
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900 rounded-2xl p-12 text-center">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Experience the power of our platform with a personalized demo tailored to your use case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  Book a Demo
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4">
                  Try Interactive Demo
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Platform Demo"
                width={500}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
