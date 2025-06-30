"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Globe,
  Users,
  Shield,
  Zap,
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  TrendingUp,
  DollarSign,
  Building,
  ShoppingCart,
  Network,
  Layers,
  Settings,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Sparkles,
  Rocket,
  Heart,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    vendors: 0,
    transactions: 0,
    categories: 0,
    satisfaction: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        vendors: 1000,
        transactions: 50000,
        categories: 200,
        satisfaction: 96,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const blogPosts = [
    {
      title: "Building Successful Multi-Vendor Marketplaces",
      excerpt: "Essential strategies for creating thriving marketplace ecosystems that benefit all participants.",
      image: "/placeholder.svg?height=200&width=300&text=Marketplace+Success",
      author: "Lisa Chang",
      date: "Dec 13, 2024",
      readTime: "9 min read",
      category: "Strategy",
    },
    {
      title: "The Network Effect: How Marketplaces Scale",
      excerpt: "Understanding how successful marketplaces leverage network effects to create exponential value.",
      image: "/placeholder.svg?height=200&width=300&text=Network+Effects",
      author: "Marcus Johnson",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      category: "Growth",
    },
    {
      title: "Trust and Safety in Digital Marketplaces",
      excerpt: "Building confidence and security measures that protect both buyers and sellers.",
      image: "/placeholder.svg?height=200&width=300&text=Trust+Safety",
      author: "Sarah Kim",
      date: "Dec 8, 2024",
      readTime: "6 min read",
      category: "Security",
    },
    {
      title: "Marketplace Revenue Models That Work",
      excerpt: "Proven monetization strategies for sustainable marketplace growth and profitability.",
      image: "/placeholder.svg?height=200&width=300&text=Revenue+Models",
      author: "David Rodriguez",
      date: "Dec 6, 2024",
      readTime: "8 min read",
      category: "Business",
    },
  ]

  const faqs = [
    {
      question: "What makes Briskon's Marketplace platform different from other marketplace solutions?",
      answer:
        "Briskon's Marketplace platform uniquely combines forward and reverse auctions in a single ecosystem, powered by AI-driven vendor matching and intelligent pricing. Our platform offers advanced multi-vendor management, automated compliance monitoring, and sophisticated analytics that help marketplace operators maximize value for all participants while maintaining complete control over their ecosystem.",
    },
    {
      question: "How quickly can I launch my marketplace with Briskon?",
      answer:
        "With Briskon's rapid deployment system, you can have a fully functional marketplace live in as little as 2-4 weeks. Our pre-built templates, automated vendor onboarding, and comprehensive setup assistance mean you can start generating revenue quickly while we handle the technical complexities behind the scenes.",
    },
    {
      question: "Can Briskon's platform handle both B2B and B2C marketplace models?",
      answer:
        "Briskon's flexible architecture supports any marketplace model - B2B, B2C, C2C, or hybrid models. Our platform adapts to your specific requirements with customizable vendor verification processes, payment terms, user interfaces, and business rules that match your target market's needs.",
    },
    {
      question: "How does Briskon ensure quality control and vendor compliance in my marketplace?",
      answer:
        "We provide comprehensive quality control through automated vendor verification, performance monitoring, compliance tracking, and intelligent fraud detection. Our AI-powered systems continuously monitor vendor behavior, product quality, and customer satisfaction to maintain high marketplace standards and protect your brand reputation.",
    },
    {
      question: "What kind of support does Briskon provide for marketplace growth and scaling?",
      answer:
        "Briskon offers end-to-end growth support including vendor acquisition strategies, marketing automation, performance optimization, and scaling guidance. Our dedicated marketplace success team works with you to implement growth strategies, optimize conversion rates, and expand into new categories or markets as your business evolves.",
    },
    {
      question: "How does Briskon handle international marketplaces and multi-currency transactions?",
      answer:
        "Our platform is built for global operations with native multi-currency support, localization features, international payment processing, and compliance with regional regulations. We handle the complexities of cross-border transactions, tax calculations, and regulatory requirements so you can focus on growing your international marketplace.",
    },
  ]

  const nextBlog = () => {
    setCurrentBlogIndex((prev) => (prev + 1) % blogPosts.length)
  }

  const prevBlog = () => {
    setCurrentBlogIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length)
  }

  const marketplaceFeatures = [
    {
      title: "Multi-Vendor Management",
      description: "Comprehensive vendor onboarding, verification, and management system",
      icon: <Users className="h-6 w-6" />,
      details: "Advanced vendor qualification, performance tracking, and automated compliance monitoring.",
    },
    {
      title: "Unified Auction Platform",
      description: "Support for both forward and reverse auctions in a single marketplace",
      icon: <Globe className="h-6 w-6" />,
      details: "Seamless switching between auction types with unified bidding interface and management.",
    },
    {
      title: "Category Management",
      description: "Organized product and service categories with specialized auction rules",
      icon: <Layers className="h-6 w-6" />,
      details: "Dynamic category creation, custom rules, and automated product classification.",
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive marketplace analytics and business intelligence",
      icon: <BarChart3 className="h-6 w-6" />,
      details: "Real-time dashboards, predictive analytics, and detailed performance insights.",
    },
  ]

  const benefits = [
    {
      icon: <Network className="h-8 w-8 text-blue-500" />,
      title: "Network Effects",
      description: "More vendors and buyers create exponential value for all participants",
      stat: "1000+ active vendors",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Revenue Growth",
      description: "Multiple revenue streams from commissions, subscriptions, and services",
      stat: "300% revenue increase",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      title: "Global Reach",
      description: "Connect buyers and sellers across geographical boundaries",
      stat: "50+ countries served",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Trust & Security",
      description: "Built-in trust mechanisms and secure transaction processing",
      stat: "99.9% secure transactions",
    },
  ]

  const marketplaceTypes = [
    {
      title: "B2B Marketplace",
      description: "Business-to-business auction marketplace for industrial goods and services",
      features: ["Bulk ordering", "Contract management", "Credit terms", "Volume discounts"],
      image: "/placeholder.svg?height=200&width=300&text=B2B+Marketplace",
      icon: <Building className="h-6 w-6" />,
    },
    {
      title: "B2C Marketplace",
      description: "Consumer marketplace for retail goods, collectibles, and personal items",
      features: ["Consumer protection", "Rating system", "Mobile app", "Social features"],
      image: "/placeholder.svg?height=200&width=300&text=B2C+Marketplace",
      icon: <ShoppingCart className="h-6 w-6" />,
    },
    {
      title: "Specialized Markets",
      description: "Niche marketplaces for specific industries or product categories",
      features: ["Industry expertise", "Specialized tools", "Compliance features", "Expert verification"],
      image: "/placeholder.svg?height=200&width=300&text=Specialized+Markets",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Government Procurement",
      description: "Public sector marketplace for transparent government procurement",
      features: ["Compliance tracking", "Audit trails", "Transparency reports", "Vendor certification"],
      image: "/placeholder.svg?height=200&width=300&text=Government+Procurement",
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  const auctionTypes = [
    {
      title: "Forward Auctions",
      description: "Traditional ascending-price auctions where buyers compete to purchase items",
      icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
      examples: ["English Auction", "Dutch Auction", "Sealed Bid", "Yankee Auction"],
      benefits: "Maximize seller revenue through competitive bidding",
      href: "/solutions/forward-auction",
    },
    {
      title: "Reverse Auctions",
      description: "Procurement-focused auctions where sellers compete to win buyer's business",
      icon: <TrendingDown className="h-10 w-10 text-green-500" />,
      examples: ["RFQ", "RFP", "English Reverse", "Supplier Bidding"],
      benefits: "Reduce procurement costs through supplier competition",
      href: "/solutions/reverse-auction",
    },
    {
      title: "Hybrid Auctions",
      description: "Combining elements of both forward and reverse auctions for specialized needs",
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      examples: ["Multi-attribute", "Two-stage", "Combinatorial", "Dynamic pricing"],
      benefits: "Flexible auction formats tailored to specific business requirements",
      href: "/solutions/marketplace/hybrid",
    },
  ]

  const platformCapabilities = [
    {
      category: "Marketplace Management",
      items: [
        "Vendor onboarding & verification",
        "Product catalog management",
        "Category & taxonomy setup",
        "Commission & fee management",
        "Multi-currency support",
        "Localization features",
      ],
    },
    {
      category: "Auction Features",
      items: [
        "Forward & reverse auctions",
        "Dutch auctions",
        "Sealed bid auctions",
        "Multi-round bidding",
        "Proxy bidding",
        "Real-time notifications",
      ],
    },
    {
      category: "Business Intelligence",
      items: [
        "Marketplace analytics",
        "Vendor performance metrics",
        "Revenue tracking",
        "Market insights",
        "Predictive analytics",
        "Custom reporting",
      ],
    },
  ]

  const successStories = [
    {
      title: "Industrial Equipment Marketplace",
      description: "Global marketplace for heavy machinery and industrial equipment with $500M+ in transactions.",
      metrics: {
        vendors: "2,500+",
        transactions: "$500M+",
        growth: "400%",
      },
      image: "/placeholder.svg?height=200&width=300&text=Industrial+Equipment",
    },
    {
      title: "Art & Collectibles Platform",
      description: "Premium marketplace for fine art, antiques, and collectibles with authenticated items.",
      metrics: {
        vendors: "800+",
        transactions: "$200M+",
        growth: "250%",
      },
      image: "/placeholder.svg?height=200&width=300&text=Art+Collectibles",
    },
    {
      title: "Government Procurement Hub",
      description: "Transparent procurement platform serving multiple government agencies and departments.",
      metrics: {
        vendors: "5,000+",
        transactions: "$1B+",
        growth: "180%",
      },
      image: "/placeholder.svg?height=200&width=300&text=Government+Hub",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50">
              <Globe className="h-4 w-4 mr-2" />
              Briskon Marketplace Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
              Your Marketplace Empire
              <br />
              Starts Here
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Welcome to Briskon's Marketplace platform - where ambitious entrepreneurs build thriving ecosystems.
              Create a marketplace that brings together vendors and buyers from around the world, powered by our
              cutting-edge auction technology and AI-driven insights.
            </p>

            {/* Interactive Introduction Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Rocket className="h-8 w-8 text-purple-500 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Launch in Weeks</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    From concept to live marketplace faster than ever before
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 text-blue-500 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">AI-Powered Growth</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Intelligent vendor matching and automated optimization
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-red-500 dark:text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Built for Success</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Every feature designed to maximize marketplace value
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
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
                  Launch Marketplace
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
              Why Choose Briskon Marketplace?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We don't just build marketplaces - we create thriving ecosystems that generate exponential value.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {animatedStats.vendors}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">Active Vendors</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">in our network</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {animatedStats.transactions.toLocaleString()}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">Transactions</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">processed successfully</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {animatedStats.categories}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">Categories</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {animatedStats.satisfaction}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">Satisfaction</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">user happiness</div>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Types Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Unified Auction Ecosystem</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              The only platform that seamlessly integrates multiple auction formats in a single marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {auctionTypes.map((type, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 group border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">{type.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">{type.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">{type.description}</p>

                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2 text-slate-700 dark:text-slate-300">Popular Formats:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {type.examples.map((example, i) => (
                        <Badge key={i} variant="outline" className="bg-white dark:bg-slate-800">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-6">{type.benefits}</p>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={type.href}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Overview */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Complete Marketplace Ecosystem</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Build a comprehensive marketplace that brings together buyers, sellers, and service providers in a unified
              platform powered by Briskon's advanced technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketplaceFeatures.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{feature.description}</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">{feature.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Carousel */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Marketplace Mastery Insights</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Expert strategies and insights for building successful marketplaces
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentBlogIndex * 100}%)` }}
              >
                {blogPosts.map((post, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="mx-4 overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            >
                              {post.category}
                            </Badge>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{post.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{post.title}</h3>
                          <p className="text-slate-600 dark:text-slate-300 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-slate-400" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">{post.author}</span>
                              <Calendar className="h-4 w-4 text-slate-400 ml-2" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">{post.date}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                            >
                              Read More <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-slate-800 shadow-lg border-slate-200 dark:border-slate-700"
              onClick={prevBlog}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-slate-800 shadow-lg border-slate-200 dark:border-slate-700"
              onClick={nextBlog}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex justify-center mt-6 gap-2">
              {blogPosts.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentBlogIndex
                      ? "bg-purple-600 dark:bg-purple-400 w-8"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  onClick={() => setCurrentBlogIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Types */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Marketplace Solutions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Tailored marketplace solutions for different business models and industry requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {marketplaceTypes.map((type, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={type.image || "/placeholder.svg"}
                    alt={type.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      {type.icon}
                      <h3 className="font-semibold text-lg">{type.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              The Briskon Marketplace Advantage
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover why marketplace models create exponential value for all participants
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <CardContent className="p-8">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{benefit.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{benefit.description}</p>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  >
                    {benefit.stat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Platform Capabilities</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Comprehensive feature set designed for enterprise-scale marketplace operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {platformCapabilities.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
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
                        <CheckCircle className="h-5 w-5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
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

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Marketplace Success Stories</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Real-world examples of thriving marketplaces built on Briskon's platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">{story.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{story.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-bold text-purple-600 dark:text-purple-400">{story.metrics.vendors}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Vendors</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-600 dark:text-green-400">{story.metrics.transactions}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Volume</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600 dark:text-blue-400">{story.metrics.growth}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Marketplace Implementation</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our proven methodology ensures successful marketplace launch and growth
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  Planning
                </TabsTrigger>
                <TabsTrigger
                  value="setup"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  Setup
                </TabsTrigger>
                <TabsTrigger
                  value="launch"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  Launch
                </TabsTrigger>
                <TabsTrigger
                  value="growth"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  Growth
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <Target className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Strategic Planning</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Market Analysis</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Target audience identification</li>
                          <li>• Competitive landscape analysis</li>
                          <li>• Revenue model design</li>
                          <li>• Success metrics definition</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Platform Design</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• User experience mapping</li>
                          <li>• Feature prioritization</li>
                          <li>• Integration requirements</li>
                          <li>• Scalability planning</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="setup" className="mt-8">
                <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <Settings className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                        Platform Configuration
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Technical Setup</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Platform deployment</li>
                          <li>• Database configuration</li>
                          <li>• Payment gateway integration</li>
                          <li>• Security implementation</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">
                          Business Configuration
                        </h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Category structure setup</li>
                          <li>• Commission rules configuration</li>
                          <li>• Vendor onboarding process</li>
                          <li>• Quality control measures</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="launch" className="mt-8">
                <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <Zap className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Market Launch</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Vendor Acquisition</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Initial vendor recruitment</li>
                          <li>• Onboarding support</li>
                          <li>• Training programs</li>
                          <li>• Incentive programs</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Buyer Engagement</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Marketing campaigns</li>
                          <li>• User acquisition strategies</li>
                          <li>• Community building</li>
                          <li>• Feedback collection</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="growth" className="mt-8">
                <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <TrendingUp className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Scale & Optimize</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">
                          Performance Optimization
                        </h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• Analytics implementation</li>
                          <li>• A/B testing programs</li>
                          <li>• Conversion optimization</li>
                          <li>• User experience improvements</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Market Expansion</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                          <li>• New category introduction</li>
                          <li>• Geographic expansion</li>
                          <li>• Feature enhancements</li>
                          <li>• Partnership development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about Briskon's Marketplace platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Marketplace Empire?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Create a thriving ecosystem that connects buyers and sellers worldwide. Start building your marketplace
            empire today with Briskon's proven platform and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-slate-100" asChild>
              <Link href="/get-started">
                Launch Marketplace
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
              asChild
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
