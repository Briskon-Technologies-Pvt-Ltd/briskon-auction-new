"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  TrendingDown,
  Users,
  Clock,
  Shield,
  Target,
  CheckCircle,
  ArrowRight,
  Play,
  Globe,
  Award,
  DollarSign,
  Building,
  Truck,
  Factory,
  ShoppingCart,
  User,
  Zap,
  Brain,
  TrendingUp,
  BookOpen,
  Eye,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReverseAuctionPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    savings: 0,
    efficiency: 0,
    suppliers: 0,
    time: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        savings: 35,
        efficiency: 78,
        suppliers: 500,
        time: 85,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const blogPosts = [
    {
      title: "Strategic Procurement: The Reverse Auction Revolution",
      excerpt: "How leading companies are transforming their procurement processes with reverse auctions.",
      image: "/placeholder.svg?height=200&width=300&text=Procurement+Revolution",
      author: "Jennifer Walsh",
      date: "Dec 14, 2024",
      readTime: "6 min read",
      category: "Strategy",
      views: "2.4k",
      comments: 18,
    },
    {
      title: "Supplier Relationship Management in Reverse Auctions",
      excerpt: "Building strong partnerships while maintaining competitive pricing through smart procurement.",
      image: "/placeholder.svg?height=200&width=300&text=Supplier+Relations",
      author: "Robert Chen",
      date: "Dec 11, 2024",
      readTime: "8 min read",
      category: "Management",
      views: "1.8k",
      comments: 12,
    },
    {
      title: "Cost Reduction Strategies That Actually Work",
      excerpt: "Proven methodologies for achieving significant cost savings without compromising quality.",
      image: "/placeholder.svg?height=200&width=300&text=Cost+Reduction",
      author: "Maria Santos",
      date: "Dec 9, 2024",
      readTime: "7 min read",
      category: "Finance",
      views: "3.1k",
      comments: 24,
    },
    {
      title: "The Future of B2B Procurement Technology",
      excerpt: "Emerging trends and technologies reshaping the procurement landscape.",
      image: "/placeholder.svg?height=200&width=300&text=Future+Procurement",
      author: "Alex Thompson",
      date: "Dec 7, 2024",
      readTime: "5 min read",
      category: "Technology",
      views: "2.7k",
      comments: 15,
    },
  ]

  const faqs = [
    {
      question: "How does Briskon's Reverse Auction ensure I get the best value, not just the lowest price?",
      answer:
        "Briskon's platform goes beyond simple price comparison. Our AI-powered evaluation system considers total cost of ownership, supplier reliability, quality metrics, delivery performance, and compliance factors. You can set weighted criteria that automatically score bids based on your priorities, ensuring you select suppliers who offer the best overall value proposition.",
    },
    {
      question: "What makes Briskon's supplier network different from other platforms?",
      answer:
        "Our supplier network is carefully curated and continuously verified. We use advanced screening processes, performance tracking, and compliance monitoring to ensure only qualified, reliable suppliers participate. Plus, our global reach means you access suppliers you might never have found otherwise, increasing competition and driving better results.",
    },
    {
      question: "How quickly can I see cost savings with Briskon's Reverse Auction platform?",
      answer:
        "Most clients see immediate savings from their first auction, typically ranging from 15-40% depending on the category. Our streamlined process means you can launch your first reverse auction within hours of setup, and with our AI-powered supplier matching, you'll have qualified bidders ready to compete for your business right away.",
    },
    {
      question: "Can Briskon handle complex procurement requirements with multiple criteria?",
      answer:
        "Briskon excels at complex, multi-criteria procurement. Our platform supports technical specifications, compliance requirements, delivery terms, service levels, and custom evaluation criteria. You can create sophisticated scoring models that automatically evaluate bids across all your requirements, not just price.",
    },
    {
      question: "How does Briskon protect my procurement information and maintain confidentiality?",
      answer:
        "Security and confidentiality are paramount. We use enterprise-grade encryption, secure data centers, and strict access controls. Supplier information is kept confidential, bid details are protected, and you control what information is shared and when. Our platform is SOC 2 compliant and meets the highest security standards.",
    },
    {
      question: "What support does Briskon provide for first-time reverse auction users?",
      answer:
        "We provide comprehensive onboarding including strategy consultation, platform training, auction setup assistance, and ongoing support. Our procurement experts help you design optimal auction strategies, identify the right suppliers, and maximize your results. You're never alone in the process.",
    },
  ]

  const nextBlog = () => {
    setCurrentBlogIndex((prev) => (prev + 1) % blogPosts.length)
  }

  const prevBlog = () => {
    setCurrentBlogIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length)
  }

  const procurementSteps = [
    {
      title: "Requirement Definition",
      description: "Buyers define their procurement needs with detailed specifications and requirements.",
      icon: <Target className="h-6 w-6" />,
      details: "AI-powered requirement analysis ensures comprehensive specifications and optimal supplier matching.",
    },
    {
      title: "Supplier Invitation",
      description: "Qualified suppliers are invited to participate in the competitive bidding process.",
      icon: <Users className="h-6 w-6" />,
      details: "Smart supplier discovery and automated invitation system with qualification verification.",
    },
    {
      title: "Competitive Bidding",
      description: "Suppliers compete by submitting lower bids, driving costs down for the buyer.",
      icon: <TrendingDown className="h-6 w-6" />,
      details: "Real-time bidding with dynamic price discovery and transparent competition tracking.",
    },
    {
      title: "Award & Contract",
      description: "The lowest qualified bidder wins the contract with automated award processing.",
      icon: <Award className="h-6 w-6" />,
      details: "Automated contract generation, compliance verification, and seamless onboarding process.",
    },
  ]

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500 dark:text-green-400" />,
      title: "Cost Reduction",
      description: "Competitive bidding drives down procurement costs significantly",
      stat: "35% average cost savings",
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
      title: "Time Efficiency",
      description: "Streamlined procurement process reduces cycle time dramatically",
      stat: "85% faster procurement",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
      title: "Supplier Network",
      description: "Access to global supplier network increases competition",
      stat: "500+ verified suppliers",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500 dark:text-orange-400" />,
      title: "Transparency",
      description: "Complete transparency in bidding process ensures fairness",
      stat: "100% audit trail",
    },
  ]

  const features = [
    {
      category: "Procurement Tools",
      items: [
        "RFQ/RFP management",
        "Supplier qualification",
        "Multi-round bidding",
        "Technical evaluation",
        "Cost analysis tools",
        "Contract templates",
      ],
    },
    {
      category: "Supplier Management",
      items: [
        "Supplier onboarding",
        "Performance tracking",
        "Rating & reviews",
        "Compliance monitoring",
        "Payment integration",
        "Communication tools",
      ],
    },
    {
      category: "Analytics & Reporting",
      items: [
        "Spend analysis",
        "Savings tracking",
        "Market intelligence",
        "Performance metrics",
        "Custom dashboards",
        "Compliance reports",
      ],
    },
  ]

  const useCases = [
    {
      title: "Manufacturing",
      description: "Raw materials, components, and equipment procurement with significant cost savings.",
      image: "/placeholder.svg?height=200&width=300&text=Manufacturing",
      results: "40% reduction in material costs",
      icon: <Factory className="h-6 w-6" />,
    },
    {
      title: "Construction",
      description: "Building materials, subcontractor services, and equipment rental optimization.",
      image: "/placeholder.svg?height=200&width=300&text=Construction",
      results: "30% savings on project costs",
      icon: <Building className="h-6 w-6" />,
    },
    {
      title: "Logistics",
      description: "Transportation, warehousing, and supply chain services procurement.",
      image: "/placeholder.svg?height=200&width=300&text=Logistics",
      results: "25% reduction in logistics costs",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      title: "Corporate Services",
      description: "IT services, consulting, marketing, and professional services procurement.",
      image: "/placeholder.svg?height=200&width=300&text=Corporate+Services",
      results: "45% savings on service contracts",
      icon: <ShoppingCart className="h-6 w-6" />,
    },
  ]

  const comparisonData = [
    {
      aspect: "Price Discovery",
      traditional: "Fixed pricing or limited quotes",
      reverse: "Dynamic competitive pricing",
    },
    {
      aspect: "Supplier Reach",
      traditional: "Limited to known suppliers",
      reverse: "Global supplier network access",
    },
    {
      aspect: "Time to Award",
      traditional: "Weeks or months",
      reverse: "Days or hours",
    },
    {
      aspect: "Transparency",
      traditional: "Limited visibility",
      reverse: "Complete process transparency",
    },
    {
      aspect: "Cost Savings",
      traditional: "Minimal negotiation power",
      reverse: "Significant competitive savings",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 dark:from-green-600/5 dark:to-blue-600/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50">
              <TrendingDown className="h-4 w-4 mr-2" />
              Briskon Reverse Auction Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Smart Procurement,
              <br />
              Smarter Savings
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Welcome to Briskon's Reverse Auction platform - where intelligent procurement meets competitive savings.
              Watch suppliers compete to win your business while our AI ensures you get the best value, not just the
              lowest price.
            </p>

            {/* Interactive Introduction Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-green-500 dark:text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">AI-Powered Intelligence</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Smart algorithms find the best suppliers and optimize your procurement
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-blue-500 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Lightning Speed</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Complete procurement cycles in hours, not weeks
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Guaranteed Results</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Proven track record of significant cost savings
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                asChild
              >
                <Link href="/demo">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                asChild
              >
                <Link href="/get-started">
                  Start Procurement
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Briskon Special */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              The Briskon Procurement Advantage
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We don't just run reverse auctions - we revolutionize how you think about procurement.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{animatedStats.savings}%</div>
              <div className="text-slate-600 dark:text-slate-300">Cost Savings</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">average reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {animatedStats.efficiency}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">Process Efficiency</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">time saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {animatedStats.suppliers}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">Suppliers</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">in our network</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">{animatedStats.time}%</div>
              <div className="text-slate-600 dark:text-slate-300">Time Reduction</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">faster cycles</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              How Briskon Reverse Auctions Work
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience the power of competitive procurement where suppliers compete to win your business
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {procurementSteps.map((step, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 border-slate-200 dark:border-slate-700 ${
                      activeStep === index
                        ? "border-green-500 dark:border-green-400 shadow-lg scale-105 bg-white dark:bg-slate-800"
                        : "hover:shadow-md hover:scale-102 bg-white dark:bg-slate-800"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            activeStep === index
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 mb-2">{step.description}</p>
                          {activeStep === index && (
                            <p className="text-sm text-green-600 dark:text-green-400">{step.details}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="relative">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      {procurementSteps[activeStep].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                      {procurementSteps[activeStep].title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">{procurementSteps[activeStep].details}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 h-2 rounded-full">
                    <div
                      className="bg-white dark:bg-slate-800 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((activeStep + 1) / procurementSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                Procurement Insights & Best Practices
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Expert guidance and industry insights to maximize your reverse auction success
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {blogPosts.map((post, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{post.author}</span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{post.date}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View All Procurement Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs Reverse Comparison */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Traditional vs Briskon Reverse Procurement
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See the dramatic difference Briskon reverse auctions make in your procurement process
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-800">
                <div className="p-4 font-semibold text-center text-slate-900 dark:text-slate-100">Aspect</div>
                <div className="p-4 font-semibold text-center border-l border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                  Traditional Procurement
                </div>
                <div className="p-4 font-semibold text-center border-l border-slate-200 dark:border-slate-700 bg-green-50 dark:bg-green-900/20 text-slate-900 dark:text-slate-100">
                  Briskon Reverse Auction
                </div>
              </div>
              {comparisonData.map((row, index) => (
                <div key={index} className="grid grid-cols-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="p-4 font-medium text-slate-900 dark:text-slate-100">{row.aspect}</div>
                  <div className="p-4 border-l border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    {row.traditional}
                  </div>
                  <div className="p-4 border-l border-slate-200 dark:border-slate-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                    {row.reverse}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">The Briskon Difference</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover the transformative benefits that make Briskon reverse auctions essential for modern procurement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <CardContent className="p-8">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{benefit.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{benefit.description}</p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  >
                    {benefit.stat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Enterprise Procurement Features</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Complete procurement solution with advanced features for enterprise-scale operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-center text-slate-900 dark:text-slate-100">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Industry Success Stories</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See how Briskon reverse auctions deliver exceptional results across various industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={useCase.image || "/placeholder.svg"}
                    alt={useCase.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      {useCase.icon}
                      <h3 className="font-semibold text-lg">{useCase.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{useCase.description}</p>
                  <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    {useCase.results}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about Briskon's Reverse Auction platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg px-6 bg-white dark:bg-slate-800"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-slate-900 dark:text-slate-100">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Procurement?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join leading organizations that have revolutionized their procurement with Briskon reverse auctions. Start
            saving today and discover the power of competitive procurement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-slate-100" asChild>
              <Link href="/get-started">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
