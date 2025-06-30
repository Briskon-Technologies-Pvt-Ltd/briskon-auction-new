"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Bell,
  Shield,
  Smartphone,
  BarChart3,
  Globe,
  Zap,
  Users,
  Lock,
  CreditCard,
  Package,
  HeartHandshake,
  Info,
  ChevronRight,
} from "lucide-react"

interface FeatureDetail {
  title: string
  description: string
  benefits: string[]
  howItWorks: string[]
  availability: string
}

const featureDetails: Record<string, FeatureDetail> = {
  search: {
    title: "Advanced Search & Discovery",
    description: "Find exactly what you're looking for with our powerful search tools",
    benefits: [
      "Save time with precise filtering options",
      "Discover items you didn't know existed",
      "Get personalized recommendations",
      "Track market trends and pricing",
    ],
    howItWorks: [
      "Use filters for category, price, location, era, condition",
      "Save searches and get alerts for new matches",
      "AI-powered similar item suggestions",
      "Visual search using image uploads",
    ],
    availability: "Available to all users",
  },
  notifications: {
    title: "Real-Time Notifications",
    description: "Never miss an important auction moment",
    benefits: [
      "Stay competitive with instant outbid alerts",
      "Plan ahead with auction reminders",
      "Track all activity in one place",
      "Customize notification preferences",
    ],
    howItWorks: [
      "Push notifications to mobile devices",
      "Email alerts for saved searches",
      "SMS for critical auction moments",
      "In-app notification center",
    ],
    availability: "Free with account registration",
  },
  authentication: {
    title: "Expert Authentication",
    description: "Buy with confidence knowing items are verified",
    benefits: [
      "Avoid counterfeit items",
      "Preserve investment value",
      "Access detailed condition reports",
      "Get certificates of authenticity",
    ],
    howItWorks: [
      "Third-party expert verification",
      "Detailed photography and documentation",
      "Blockchain-backed certificates",
      "Money-back authenticity guarantee",
    ],
    availability: "Included for items over $1,000",
  },
  mobile: {
    title: "Mobile Bidding",
    description: "Full auction access from anywhere",
    benefits: [
      "Bid from anywhere in the world",
      "Never miss closing moments",
      "Faster than desktop bidding",
      "Offline mode for poor connections",
    ],
    howItWorks: [
      "Native iOS and Android apps",
      "Biometric authentication for security",
      "One-tap bidding shortcuts",
      "Background bid monitoring",
    ],
    availability: "Free app download",
  },
  analytics: {
    title: "Market Analytics",
    description: "Make informed decisions with data insights",
    benefits: [
      "Understand fair market values",
      "Track price trends over time",
      "Identify investment opportunities",
      "Benchmark against similar sales",
    ],
    howItWorks: [
      "Historical price databases",
      "Real-time market indicators",
      "Comparative analysis tools",
      "Export data for deeper analysis",
    ],
    availability: "VIP members only",
  },
  global: {
    title: "Global Marketplace",
    description: "Access auctions worldwide from one platform",
    benefits: [
      "Discover unique international items",
      "Compete with global collectors",
      "Access exclusive regional auctions",
      "Simplified cross-border transactions",
    ],
    howItWorks: [
      "Multi-currency support",
      "Automatic translation services",
      "International shipping coordination",
      "Customs and duty calculations",
    ],
    availability: "Available to all users",
  },
}

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const features = [
    {
      icon: Search,
      title: "Advanced Search & Discovery",
      description: "AI-powered search with visual recognition and smart filters",
      badge: "Enhanced",
      key: "search",
    },
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description: "Instant alerts for bids, auctions, and watchlist items",
      badge: "Essential",
      key: "notifications",
    },
    {
      icon: Shield,
      title: "Expert Authentication",
      description: "Third-party verification for high-value items",
      badge: "Premium",
      key: "authentication",
    },
    {
      icon: Smartphone,
      title: "Mobile Bidding",
      description: "Full-featured iOS and Android apps for bidding on-the-go",
      badge: "Free",
      key: "mobile",
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Historical data and price trends for informed bidding",
      badge: "VIP",
      key: "analytics",
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Access auctions from 50+ countries in one platform",
      badge: "Essential",
      key: "global",
    },
  ]

  const additionalFeatures = [
    {
      icon: Zap,
      title: "Lightning-Fast Bidding",
      description: "Sub-second bid processing",
    },
    {
      icon: Users,
      title: "Social Features",
      description: "Follow collectors and share finds",
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description: "Bank-level encryption and fraud protection",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Multiple payment options and financing",
    },
    {
      icon: Package,
      title: "White-Glove Service",
      description: "Premium shipping and handling",
    },
    {
      icon: HeartHandshake,
      title: "Concierge Support",
      description: "24/7 expert assistance",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Forward Auction Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools and features designed to give you the competitive edge in every auction
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Core Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedFeature(feature.key)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <feature.icon className="h-10 w-10 text-primary" />
                    <Badge variant={feature.badge === "VIP" ? "default" : "secondary"}>{feature.badge}</Badge>
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {feature.title}
                    <Info className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 border border-transparent group-hover:border-blue-200 shadow-sm group-hover:shadow-md transition-all duration-200 p-0 h-auto font-normal text-primary"
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Access by Membership</h2>
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="free" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="free">Free Account</TabsTrigger>
                  <TabsTrigger value="premium">Premium</TabsTrigger>
                  <TabsTrigger value="vip">VIP</TabsTrigger>
                </TabsList>
                <TabsContent value="free" className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Free Account Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Basic search and browse
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Mobile app access
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Email notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Basic bid history
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="premium" className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Premium Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Everything in Free, plus:
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Advanced search filters
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Push notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Saved searches (up to 10)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Priority customer support
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="vip" className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-4">VIP All-Access Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Everything in Premium, plus:
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Market analytics dashboard
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Unlimited saved searches
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Early access to auctions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Dedicated account manager
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        API access for power users
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Platform Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Experience All Features Today</h2>
              <p className="text-xl mb-8 text-white/90">Start with a free account and upgrade anytime</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Create Free Account
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Compare Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feature Detail Dialog */}
      <Dialog open={selectedFeature !== null} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedFeature && featureDetails[selectedFeature] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{featureDetails[selectedFeature].title}</DialogTitle>
                <DialogDescription className="text-base">
                  {featureDetails[selectedFeature].description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="font-semibold mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {featureDetails[selectedFeature].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">How It Works</h3>
                  <ul className="space-y-2">
                    {featureDetails[selectedFeature].howItWorks.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-medium text-primary">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Availability:</strong> {featureDetails[selectedFeature].availability}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
