"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Video,
  BookOpen,
  Code,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Clock,
  Eye,
  Star,
  ArrowRight,
  Play,
  Globe,
  Lightbulb,
  CheckCircle,
} from "lucide-react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const resourceCategories = [
    { id: "all", label: "All Resources", icon: <Globe className="h-4 w-4" /> },
    { id: "documentation", label: "Documentation", icon: <BookOpen className="h-4 w-4" /> },
    { id: "case-studies", label: "Case Studies", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "white-papers", label: "White Papers", icon: <FileText className="h-4 w-4" /> },
    { id: "videos", label: "Videos", icon: <Video className="h-4 w-4" /> },
    { id: "webinars", label: "Webinars", icon: <Calendar className="h-4 w-4" /> },
    { id: "developer", label: "Developer", icon: <Code className="h-4 w-4" /> },
  ]

  const featuredResources = [
    {
      id: 1,
      title: "Complete Platform Documentation",
      description: "Comprehensive guide to implementing and managing Briskon auction solutions",
      category: "documentation",
      type: "Guide",
      readTime: "45 min",
      views: "12.5K",
      rating: 4.9,
      image: "/images/platform-showcase.png",
      href: "/resources/documentation/platform-guide",
      featured: true,
    },
    {
      id: 2,
      title: "Fortune 500 Procurement Transformation",
      description: "How a global manufacturer reduced procurement costs by 23% using reverse auctions",
      category: "case-studies",
      type: "Case Study",
      readTime: "12 min",
      views: "8.2K",
      rating: 4.8,
      image: "/images/business-executive.png",
      href: "/resources/case-studies/fortune-500-procurement",
      featured: true,
    },
    {
      id: 3,
      title: "The Future of Digital Auctions",
      description: "Industry insights and trends shaping the next generation of auction platforms",
      category: "white-papers",
      type: "White Paper",
      readTime: "25 min",
      views: "15.3K",
      rating: 4.9,
      image: "/images/auction-interface.png",
      href: "/resources/white-papers/future-digital-auctions",
      featured: true,
    },
  ]

  const allResources = [
    // Documentation
    {
      id: 4,
      title: "API Reference Guide",
      description: "Complete API documentation with examples and best practices",
      category: "developer",
      type: "API Docs",
      readTime: "30 min",
      views: "5.8K",
      rating: 4.7,
      href: "/resources/developer/api-reference",
      tags: ["API", "Integration", "Development"],
    },
    {
      id: 5,
      title: "Installation & Setup Guide",
      description: "Step-by-step guide for on-premise installation and configuration",
      category: "documentation",
      type: "Setup Guide",
      readTime: "20 min",
      views: "9.1K",
      rating: 4.8,
      href: "/resources/documentation/installation-guide",
      tags: ["Installation", "Setup", "Configuration"],
    },
    {
      id: 6,
      title: "User Administration Manual",
      description: "Complete guide to user management, roles, and permissions",
      category: "documentation",
      type: "Manual",
      readTime: "35 min",
      views: "6.4K",
      rating: 4.6,
      href: "/resources/documentation/user-admin",
      tags: ["Administration", "Users", "Security"],
    },

    // Case Studies
    {
      id: 7,
      title: "Healthcare Supply Chain Optimization",
      description: "Regional hospital network streamlines procurement with 31% cost savings",
      category: "case-studies",
      type: "Case Study",
      readTime: "15 min",
      views: "7.3K",
      rating: 4.9,
      href: "/resources/case-studies/healthcare-supply-chain",
      tags: ["Healthcare", "Supply Chain", "Cost Reduction"],
    },
    {
      id: 8,
      title: "Government Procurement Modernization",
      description: "State government achieves transparency and efficiency in public procurement",
      category: "case-studies",
      type: "Case Study",
      readTime: "18 min",
      views: "11.2K",
      rating: 4.8,
      href: "/resources/case-studies/government-procurement",
      tags: ["Government", "Public Sector", "Transparency"],
    },
    {
      id: 9,
      title: "Manufacturing Vendor Management",
      description: "Automotive manufacturer optimizes supplier relationships and reduces costs",
      category: "case-studies",
      type: "Case Study",
      readTime: "14 min",
      views: "6.8K",
      rating: 4.7,
      href: "/resources/case-studies/manufacturing-vendor",
      tags: ["Manufacturing", "Automotive", "Vendor Management"],
    },
    {
      id: 18,
      title: "University System Procurement Transformation",
      description: "State university system reduces costs by 28% while improving vendor diversity",
      category: "case-studies",
      type: "Case Study",
      readTime: "15 min",
      views: "7.8K",
      rating: 4.9,
      href: "/resources/case-studies/education-procurement",
      tags: ["Education", "Universities", "Vendor Diversity"],
    },
    {
      id: 19,
      title: "Global Retail Chain Supply Optimization",
      description: "Fortune 500 retailer achieves 35% cost reduction across 2,800 stores",
      category: "case-studies",
      type: "Case Study",
      readTime: "18 min",
      views: "11.2K",
      rating: 4.8,
      href: "/resources/case-studies/retail-ecommerce",
      tags: ["Retail", "E-commerce", "Supply Chain"],
    },
    {
      id: 20,
      title: "Major Infrastructure Project Optimization",
      description: "$2.5B transportation project reduces costs by 22% with improved performance",
      category: "case-studies",
      type: "Case Study",
      readTime: "16 min",
      views: "9.4K",
      rating: 4.7,
      href: "/resources/case-studies/construction-infrastructure",
      tags: ["Construction", "Infrastructure", "Transportation"],
    },
    {
      id: 21,
      title: "Regional Utility Grid Modernization",
      description: "Utility company reduces equipment costs by 31% while accelerating renewable integration",
      category: "case-studies",
      type: "Case Study",
      readTime: "14 min",
      views: "8.7K",
      rating: 4.8,
      href: "/resources/case-studies/energy-utilities",
      tags: ["Energy", "Utilities", "Smart Grid"],
    },

    // White Papers
    {
      id: 10,
      title: "AI in Procurement: Opportunities & Challenges",
      description: "Exploring artificial intelligence applications in modern procurement processes",
      category: "white-papers",
      type: "White Paper",
      readTime: "28 min",
      views: "13.7K",
      rating: 4.9,
      href: "/resources/white-papers/ai-procurement",
      tags: ["AI", "Machine Learning", "Procurement"],
    },
    {
      id: 11,
      title: "Cybersecurity in Online Auctions",
      description: "Best practices for securing digital auction platforms and protecting data",
      category: "white-papers",
      type: "White Paper",
      readTime: "22 min",
      views: "8.9K",
      rating: 4.8,
      href: "/resources/white-papers/cybersecurity-auctions",
      tags: ["Security", "Cybersecurity", "Data Protection"],
    },
    {
      id: 12,
      title: "ROI Analysis: Digital vs Traditional Procurement",
      description: "Comprehensive analysis of cost savings and efficiency gains",
      category: "white-papers",
      type: "White Paper",
      readTime: "32 min",
      views: "10.4K",
      rating: 4.7,
      href: "/resources/white-papers/roi-analysis",
      tags: ["ROI", "Cost Analysis", "Efficiency"],
    },

    // Videos & Webinars
    {
      id: 13,
      title: "Platform Demo: Complete Walkthrough",
      description: "45-minute comprehensive demonstration of all platform features",
      category: "videos",
      type: "Demo Video",
      readTime: "45 min",
      views: "18.5K",
      rating: 4.9,
      href: "/resources/videos/platform-demo",
      tags: ["Demo", "Features", "Tutorial"],
    },
    {
      id: 14,
      title: "Webinar: Best Practices in Reverse Auctions",
      description: "Expert panel discussion on optimizing reverse auction strategies",
      category: "webinars",
      type: "Webinar",
      readTime: "60 min",
      views: "12.1K",
      rating: 4.8,
      href: "/resources/webinars/reverse-auction-best-practices",
      tags: ["Best Practices", "Strategy", "Expert Panel"],
    },
    {
      id: 15,
      title: "Quick Start Video Series",
      description: "5-part video series for new users to get started quickly",
      category: "videos",
      type: "Tutorial Series",
      readTime: "25 min",
      views: "14.3K",
      rating: 4.7,
      href: "/resources/videos/quick-start-series",
      tags: ["Tutorial", "Getting Started", "Training"],
    },

    // Developer Resources
    {
      id: 16,
      title: "SDK & Integration Examples",
      description: "Code samples and SDKs for popular programming languages",
      category: "developer",
      type: "SDK",
      readTime: "40 min",
      views: "7.2K",
      rating: 4.8,
      href: "/resources/developer/sdk-examples",
      tags: ["SDK", "Code Samples", "Integration"],
    },
    {
      id: 17,
      title: "Webhook Implementation Guide",
      description: "Complete guide to implementing and managing webhooks",
      category: "developer",
      type: "Dev Guide",
      readTime: "25 min",
      views: "4.9K",
      rating: 4.6,
      href: "/resources/developer/webhook-guide",
      tags: ["Webhooks", "Real-time", "Events"],
    },
  ]

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "guide":
      case "manual":
      case "setup guide":
        return <BookOpen className="h-4 w-4" />
      case "case study":
        return <TrendingUp className="h-4 w-4" />
      case "white paper":
        return <FileText className="h-4 w-4" />
      case "demo video":
      case "tutorial series":
        return <Video className="h-4 w-4" />
      case "webinar":
        return <Calendar className="h-4 w-4" />
      case "api docs":
      case "sdk":
      case "dev guide":
        return <Code className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "guide":
      case "manual":
      case "setup guide":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "case study":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "white paper":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "demo video":
      case "tutorial series":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "webinar":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "api docs":
      case "sdk":
      case "dev guide":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <Lightbulb className="h-4 w-4" />
              Knowledge Center
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Resources &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up">
              Everything you need to succeed with Briskon. From comprehensive guides to real-world case studies, explore
              our extensive library of resources designed to help you maximize your auction platform investment.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8 animate-fade-in-up">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search resources, guides, case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 shadow-lg"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Guides & Docs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Case Studies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">White Papers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">100K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Experience the Power of Briskon
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Our comprehensive auction platform delivers results across industries. From education to energy,
                  retail to construction - see how organizations worldwide are transforming their procurement
                  operations.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">100% Customizable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Mobile Optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Forward & Reverse Auctions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Your Brand & Domain</span>
                  </div>
                </div>
                <Button size="lg" asChild>
                  <Link href="/demo">
                    <Play className="h-5 w-5 mr-2" />
                    See Platform Demo
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/images/auction-interface.png"
                  alt="Briskon Auction Platform Interface"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              {resourceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm rounded-lg"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Resources</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our most popular and comprehensive resources to get you started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {featuredResources.map((resource, index) => (
              <Card
                key={resource.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-slate-800 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getTypeColor(resource.type)} border-0`}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(resource.type)}
                        {resource.type}
                      </div>
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/20 text-white border-0">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {resource.rating}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {resource.views}
                      </div>
                    </div>
                  </div>
                  <Button asChild className="w-full group/btn">
                    <Link href={resource.href}>
                      Access Resource
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === "all"
                ? "All Resources"
                : resourceCategories.find((cat) => cat.id === selectedCategory)?.label}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">{filteredResources.length} resources found</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <Card
                key={resource.id}
                className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-0 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${getTypeColor(resource.type)} border-0 text-xs`}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(resource.type)}
                        {resource.type}
                      </div>
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      {resource.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {resource.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {resource.views}
                      </div>
                    </div>
                  </div>

                  {resource.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button asChild variant="outline" className="w-full group/btn">
                    <Link href={resource.href}>
                      View Resource
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or browse a different category
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our expert team is ready to help you implement and optimize your auction platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/contact">
                  <Users className="h-5 w-5 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/demo">
                  <Play className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
