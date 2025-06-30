"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingDown,
  Shield,
  Clock,
  BarChart3,
  Users,
  Globe,
  Zap,
  Lock,
  MessageSquare,
  FileText,
  Target,
  CheckCircle,
  Star,
  Timer,
  Eye,
  Smartphone,
  Database,
  Workflow,
} from "lucide-react"

export default function ReverseAuctionFeatures() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const featureCategories = [
    { id: "all", name: "All Features", count: 16 },
    { id: "bidding", name: "Bidding & Competition", count: 5 },
    { id: "management", name: "Auction Management", count: 4 },
    { id: "analytics", name: "Analytics & Reporting", count: 3 },
    { id: "security", name: "Security & Compliance", count: 4 },
  ]

  const features = [
    {
      id: 1,
      category: "bidding",
      title: "Real-Time Competitive Bidding",
      description: "Live bidding interface with instant price updates",
      icon: TrendingDown,
      color: "bg-red-500",
      availability: "All Plans",
      details: {
        overview:
          "Experience the thrill of real-time competitive bidding where suppliers compete to offer you the best prices.",
        keyFeatures: [
          "Live bidding interface with real-time updates",
          "Anonymous bidding to maintain fair competition",
          "Automatic bid notifications and alerts",
          "Mobile-responsive bidding platform",
          "Bid history tracking and analytics",
        ],
        benefits: [
          "Drives maximum cost savings through competition",
          "Creates urgency that motivates better pricing",
          "Transparent process builds supplier trust",
          "Real-time feedback improves decision making",
        ],
        howItWorks:
          "Suppliers see the current leading bid (without knowing who placed it) and can submit lower bids in real-time. The system automatically updates rankings and notifies all participants of new bids.",
      },
    },
    {
      id: 2,
      category: "management",
      title: "Automated Vendor Qualification",
      description: "Pre-screen suppliers based on your criteria",
      icon: Shield,
      color: "bg-blue-500",
      availability: "Professional+",
      details: {
        overview:
          "Ensure only qualified, reliable suppliers participate in your auctions through automated screening processes.",
        keyFeatures: [
          "Customizable qualification criteria",
          "Automated document verification",
          "Financial stability checks",
          "Performance history analysis",
          "Compliance certification tracking",
        ],
        benefits: [
          "Reduces risk of working with unreliable suppliers",
          "Saves time on manual vendor screening",
          "Ensures quality standards are maintained",
          "Builds a database of trusted suppliers",
        ],
        howItWorks:
          "Set your qualification criteria once, and the system automatically screens all potential bidders against these requirements before allowing them to participate in your auctions.",
      },
    },
    {
      id: 3,
      category: "analytics",
      title: "Advanced Auction Analytics",
      description: "Comprehensive insights and performance metrics",
      icon: BarChart3,
      color: "bg-green-500",
      availability: "Professional+",
      details: {
        overview: "Get deep insights into your auction performance with comprehensive analytics and reporting tools.",
        keyFeatures: [
          "Real-time auction performance dashboards",
          "Cost savings analysis and tracking",
          "Supplier participation metrics",
          "Market pricing intelligence",
          "Custom report generation",
        ],
        benefits: [
          "Identify opportunities for further cost savings",
          "Track ROI on procurement activities",
          "Understand market dynamics and trends",
          "Make data-driven procurement decisions",
        ],
        howItWorks:
          "Our analytics engine processes all auction data to provide actionable insights, helping you optimize future auctions and negotiate better terms with suppliers.",
      },
    },
    {
      id: 4,
      category: "security",
      title: "Enterprise-Grade Security",
      description: "Bank-level security for sensitive procurement data",
      icon: Lock,
      color: "bg-purple-500",
      availability: "All Plans",
      details: {
        overview:
          "Protect your sensitive procurement information with military-grade security measures and compliance standards.",
        keyFeatures: [
          "256-bit SSL encryption for all data",
          "Multi-factor authentication",
          "Role-based access controls",
          "Audit trails and compliance logging",
          "GDPR and SOC 2 compliance",
        ],
        benefits: [
          "Protects confidential business information",
          "Ensures regulatory compliance",
          "Builds trust with suppliers and stakeholders",
          "Prevents unauthorized access to sensitive data",
        ],
        howItWorks:
          "All data is encrypted in transit and at rest, with comprehensive access controls ensuring only authorized personnel can view sensitive information.",
      },
    },
    {
      id: 5,
      category: "bidding",
      title: "Auto-Bidding & Proxy Bidding",
      description: "Automated bidding strategies for suppliers",
      icon: Zap,
      color: "bg-yellow-500",
      availability: "Professional+",
      details: {
        overview: "Enable suppliers to use automated bidding strategies while maintaining competitive dynamics.",
        keyFeatures: [
          "Proxy bidding with maximum price limits",
          "Automatic bid increments",
          "Time-based bidding strategies",
          "Competitive response automation",
          "Bid optimization algorithms",
        ],
        benefits: [
          "Increases supplier participation",
          "Maintains competitive pressure",
          "Reduces manual bidding effort",
          "Optimizes final pricing outcomes",
        ],
        howItWorks:
          "Suppliers set their bidding parameters and the system automatically places bids on their behalf, ensuring they remain competitive while respecting their pricing limits.",
      },
    },
    {
      id: 6,
      category: "management",
      title: "Multi-Round Auction Support",
      description: "Complex auction formats for sophisticated procurement",
      icon: Timer,
      color: "bg-indigo-500",
      availability: "Enterprise",
      details: {
        overview:
          "Conduct sophisticated multi-round auctions for complex procurement scenarios requiring detailed evaluation.",
        keyFeatures: [
          "Multiple bidding rounds with different criteria",
          "Technical and commercial evaluation phases",
          "Weighted scoring across multiple factors",
          "Supplier feedback between rounds",
          "Progressive qualification rounds",
        ],
        benefits: [
          "Handles complex procurement requirements",
          "Balances price with quality factors",
          "Allows for supplier improvement between rounds",
          "Ensures best overall value selection",
        ],
        howItWorks:
          "Structure your auction in multiple phases, allowing suppliers to improve their offers based on feedback while maintaining competitive pressure throughout the process.",
      },
    },
    {
      id: 7,
      category: "analytics",
      title: "Market Intelligence Dashboard",
      description: "Real-time market pricing and trend analysis",
      icon: Globe,
      color: "bg-teal-500",
      availability: "Professional+",
      details: {
        overview:
          "Access comprehensive market intelligence to make informed procurement decisions and negotiate better terms.",
        keyFeatures: [
          "Real-time market pricing data",
          "Industry benchmarking tools",
          "Price trend analysis and forecasting",
          "Supplier market share insights",
          "Competitive landscape mapping",
        ],
        benefits: [
          "Make informed pricing decisions",
          "Identify market opportunities",
          "Negotiate from position of knowledge",
          "Predict future market movements",
        ],
        howItWorks:
          "Our platform aggregates pricing data from thousands of auctions to provide you with real-time market intelligence and benchmarking capabilities.",
      },
    },
    {
      id: 8,
      category: "management",
      title: "Collaborative Evaluation Tools",
      description: "Team-based supplier evaluation and selection",
      icon: Users,
      color: "bg-pink-500",
      availability: "Professional+",
      details: {
        overview: "Enable your entire procurement team to collaborate on supplier evaluation and selection processes.",
        keyFeatures: [
          "Multi-user evaluation scorecards",
          "Collaborative commenting system",
          "Weighted scoring methodologies",
          "Approval workflow management",
          "Evaluation history tracking",
        ],
        benefits: [
          "Improves decision quality through collaboration",
          "Ensures all stakeholders have input",
          "Creates transparent evaluation process",
          "Maintains audit trail of decisions",
        ],
        howItWorks:
          "Team members can independently evaluate suppliers using customizable scorecards, with the system aggregating scores and facilitating discussion to reach consensus.",
      },
    },
    {
      id: 9,
      category: "bidding",
      title: "Dynamic Auction Extensions",
      description: "Automatic time extensions for active bidding",
      icon: Clock,
      color: "bg-orange-500",
      availability: "All Plans",
      details: {
        overview: "Prevent auction sniping and ensure fair competition with intelligent time extension algorithms.",
        keyFeatures: [
          "Automatic time extensions for last-minute bids",
          "Configurable extension rules",
          "Anti-sniping protection",
          "Fair closing mechanisms",
          "Transparent timing notifications",
        ],
        benefits: [
          "Ensures fair competition until the end",
          "Maximizes cost savings potential",
          "Prevents gaming of auction timing",
          "Builds supplier confidence in process",
        ],
        howItWorks:
          "When bids are placed near the auction end time, the system automatically extends the auction to allow other suppliers to respond, ensuring true market pricing.",
      },
    },
    {
      id: 10,
      category: "security",
      title: "Audit Trail & Compliance",
      description: "Complete documentation for regulatory compliance",
      icon: FileText,
      color: "bg-gray-500",
      availability: "Professional+",
      details: {
        overview: "Maintain comprehensive audit trails and compliance documentation for all procurement activities.",
        keyFeatures: [
          "Complete bid history logging",
          "User action tracking",
          "Document version control",
          "Compliance report generation",
          "Regulatory requirement mapping",
        ],
        benefits: [
          "Ensures regulatory compliance",
          "Provides legal protection",
          "Supports internal audits",
          "Demonstrates fair procurement practices",
        ],
        howItWorks:
          "Every action in the system is logged with timestamps and user identification, creating an immutable record of the entire procurement process.",
      },
    },
    {
      id: 11,
      category: "bidding",
      title: "Supplier Communication Hub",
      description: "Centralized messaging and Q&A platform",
      icon: MessageSquare,
      color: "bg-blue-600",
      availability: "All Plans",
      details: {
        overview: "Facilitate clear communication between buyers and suppliers throughout the auction process.",
        keyFeatures: [
          "Centralized Q&A system",
          "Broadcast messaging to all suppliers",
          "Private supplier communications",
          "Document sharing capabilities",
          "Communication history tracking",
        ],
        benefits: [
          "Ensures all suppliers have equal information",
          "Reduces miscommunication and errors",
          "Streamlines the clarification process",
          "Maintains transparency in communications",
        ],
        howItWorks:
          "Suppliers can ask questions that are answered publicly to ensure fairness, while private communications are available for sensitive discussions.",
      },
    },
    {
      id: 12,
      category: "analytics",
      title: "ROI Tracking & Reporting",
      description: "Measure and report on procurement savings",
      icon: Target,
      color: "bg-green-600",
      availability: "Professional+",
      details: {
        overview: "Track and demonstrate the return on investment from your reverse auction activities.",
        keyFeatures: [
          "Automated savings calculations",
          "ROI dashboard and metrics",
          "Custom reporting templates",
          "Stakeholder reporting tools",
          "Historical performance tracking",
        ],
        benefits: [
          "Demonstrates procurement value to leadership",
          "Justifies platform investment",
          "Identifies most successful strategies",
          "Supports budget planning and forecasting",
        ],
        howItWorks:
          "The system automatically calculates savings by comparing winning bids to baseline prices, providing comprehensive ROI reporting for stakeholders.",
      },
    },
    {
      id: 13,
      category: "management",
      title: "Template & Workflow Automation",
      description: "Streamline repetitive auction processes",
      icon: Workflow,
      color: "bg-purple-600",
      availability: "Professional+",
      details: {
        overview: "Automate repetitive tasks and standardize processes with customizable templates and workflows.",
        keyFeatures: [
          "Auction template library",
          "Automated workflow triggers",
          "Custom approval processes",
          "Notification automation",
          "Process standardization tools",
        ],
        benefits: [
          "Reduces setup time for new auctions",
          "Ensures process consistency",
          "Minimizes human error",
          "Improves operational efficiency",
        ],
        howItWorks:
          "Create reusable templates for common auction types and set up automated workflows that guide users through standardized processes.",
      },
    },
    {
      id: 14,
      category: "security",
      title: "Data Privacy & GDPR Compliance",
      description: "Complete data protection and privacy controls",
      icon: Shield,
      color: "bg-red-600",
      availability: "All Plans",
      details: {
        overview: "Ensure complete data privacy and GDPR compliance with comprehensive data protection measures.",
        keyFeatures: [
          "GDPR compliance framework",
          "Data anonymization tools",
          "Right to be forgotten implementation",
          "Consent management system",
          "Data retention policies",
        ],
        benefits: [
          "Ensures legal compliance",
          "Protects supplier and buyer data",
          "Builds trust with stakeholders",
          "Reduces regulatory risk",
        ],
        howItWorks:
          "Built-in privacy controls ensure all personal data is handled according to GDPR requirements, with automated compliance monitoring and reporting.",
      },
    },
    {
      id: 15,
      category: "bidding",
      title: "Mobile Bidding Platform",
      description: "Full-featured mobile app for on-the-go bidding",
      icon: Smartphone,
      color: "bg-indigo-600",
      availability: "All Plans",
      details: {
        overview:
          "Enable suppliers to participate in auctions from anywhere with our full-featured mobile application.",
        keyFeatures: [
          "Native iOS and Android apps",
          "Real-time bid notifications",
          "Mobile-optimized bidding interface",
          "Offline capability for viewing",
          "Push notification system",
        ],
        benefits: [
          "Increases supplier participation",
          "Enables bidding from anywhere",
          "Improves response times",
          "Enhances user experience",
        ],
        howItWorks:
          "Suppliers download our mobile app and receive push notifications for auction updates, allowing them to bid and monitor auctions from their mobile devices.",
      },
    },
    {
      id: 16,
      category: "security",
      title: "Integration & API Security",
      description: "Secure integration with existing enterprise systems",
      icon: Database,
      color: "bg-teal-600",
      availability: "Enterprise",
      details: {
        overview:
          "Securely integrate with your existing ERP, procurement, and financial systems through our robust API framework.",
        keyFeatures: [
          "RESTful API with OAuth 2.0",
          "Pre-built ERP integrations",
          "Secure data synchronization",
          "Webhook support for real-time updates",
          "API rate limiting and monitoring",
        ],
        benefits: [
          "Seamless integration with existing systems",
          "Automated data synchronization",
          "Reduced manual data entry",
          "Enhanced security through API controls",
        ],
        howItWorks:
          "Our secure APIs allow your systems to automatically sync auction data, supplier information, and results with your existing enterprise infrastructure.",
      },
    },
  ]

  const filteredFeatures =
    selectedCategory === "all" ? features : features.filter((feature) => feature.category === selectedCategory)

  const membershipPlans = [
    {
      name: "Basic",
      price: "Free",
      features: ["Real-Time Bidding", "Basic Security", "Mobile Access", "Email Support"],
      highlight: false,
    },
    {
      name: "Professional",
      price: "$299/month",
      features: ["All Basic Features", "Advanced Analytics", "Vendor Qualification", "Priority Support", "API Access"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Professional Features",
        "Multi-Round Auctions",
        "Custom Integrations",
        "Dedicated Support",
        "SLA Guarantee",
      ],
      highlight: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
              Reverse Auction Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Powerful Features for Buyers
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the comprehensive suite of tools designed to help buyers achieve maximum cost savings and
              procurement efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-sm hover:shadow-md transition-all duration-200"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {featureCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-sm"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                }
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Dialog key={feature.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {feature.availability}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
                          {feature.title}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="ghost"
                          className="w-full group-hover:bg-red-50 group-hover:text-red-600 border border-transparent group-hover:border-red-200 shadow-sm group-hover:shadow-md transition-all duration-200"
                        >
                          Learn More <Eye className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        {feature.title}
                        <Badge variant="outline" className="ml-auto">
                          {feature.availability}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription className="text-base">{feature.details.overview}</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="features" className="mt-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="benefits">Benefits</TabsTrigger>
                        <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                      </TabsList>
                      <TabsContent value="features" className="space-y-4">
                        <div className="space-y-3">
                          {feature.details.keyFeatures.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="benefits" className="space-y-4">
                        <div className="space-y-3">
                          {feature.details.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="how-it-works" className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <p>{feature.details.howItWorks}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              Select the plan that best fits your procurement needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.highlight ? "ring-2 ring-red-500 scale-105" : ""}`}>
                {plan.highlight && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-red-600">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full mt-6 shadow-sm hover:shadow-md transition-all duration-200 ${plan.highlight ? "bg-red-600 hover:bg-red-700 text-white border border-red-600" : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    {plan.price === "Free" ? "Get Started" : plan.price === "Custom" ? "Contact Sales" : "Start Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Procurement?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of buyers who have revolutionized their procurement with reverse auctions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-red-600 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Request Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
