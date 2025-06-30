"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Target,
  Shield,
  ArrowRight,
  Play,
  Award,
  TrendingUp,
  Clock,
  Building,
  Factory,
  Truck,
  ShoppingCart,
  Search,
  UserCheck,
  Zap,
  Brain,
} from "lucide-react"
import Link from "next/link"
import { FloatingOrb } from "@/components/floating-elements"

export default function SupplierBiddingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    suppliers: 0,
    savings: 0,
    efficiency: 0,
    satisfaction: 0,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setAnimatedStats({
        suppliers: 2500,
        savings: 42,
        efficiency: 89,
        satisfaction: 96,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const biddingProcess = [
    {
      title: "Supplier Discovery",
      description: "AI-powered supplier identification and qualification based on your specific requirements.",
      icon: <Search className="h-6 w-6" />,
      details:
        "Advanced algorithms analyze supplier capabilities, certifications, and performance history to identify the best matches.",
    },
    {
      title: "Qualification & Verification",
      description:
        "Comprehensive supplier vetting including compliance, financial stability, and capability assessment.",
      icon: <UserCheck className="h-6 w-6" />,
      details:
        "Multi-layer verification process ensures only qualified, reliable suppliers participate in your bidding process.",
    },
    {
      title: "Competitive Bidding",
      description: "Structured bidding process with real-time competition and transparent evaluation criteria.",
      icon: <Target className="h-6 w-6" />,
      details: "Dynamic bidding environment with automated scoring, real-time updates, and comprehensive bid analysis.",
    },
    {
      title: "Selection & Award",
      description: "Data-driven supplier selection with automated contract generation and onboarding.",
      icon: <Award className="h-6 w-6" />,
      details:
        "Intelligent selection algorithms consider price, quality, delivery, and strategic fit for optimal supplier choice.",
    },
  ]

  const keyFeatures = [
    {
      category: "Supplier Management",
      items: [
        "Global supplier database",
        "Automated qualification",
        "Performance tracking",
        "Compliance monitoring",
        "Risk assessment",
        "Relationship management",
      ],
    },
    {
      category: "Bidding Platform",
      items: [
        "Multi-round bidding",
        "Real-time competition",
        "Technical evaluation",
        "Cost analysis",
        "Bid comparison tools",
        "Automated scoring",
      ],
    },
    {
      category: "Analytics & Intelligence",
      items: [
        "Supplier analytics",
        "Market intelligence",
        "Performance metrics",
        "Cost optimization",
        "Risk monitoring",
        "Predictive insights",
      ],
    },
  ]

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Supplier Network Access",
      description: "Connect with pre-qualified suppliers from our global network",
      stat: "2,500+ verified suppliers",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "Cost Optimization",
      description: "Achieve significant cost savings through competitive bidding",
      stat: "42% average savings",
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Process Efficiency",
      description: "Streamlined supplier selection reduces procurement cycle time",
      stat: "89% faster selection",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Quality Assurance",
      description: "Rigorous supplier qualification ensures quality and reliability",
      stat: "96% satisfaction rate",
    },
  ]

  const useCases = [
    {
      title: "Manufacturing Procurement",
      description: "Source raw materials, components, and manufacturing services with competitive bidding.",
      image: "/placeholder.svg?height=200&width=300&text=Manufacturing+Procurement",
      results: "45% cost reduction in material sourcing",
      icon: <Factory className="h-6 w-6" />,
      challenges: ["Complex specifications", "Quality requirements", "Supply chain reliability"],
      solutions: ["Technical evaluation tools", "Quality scoring metrics", "Supplier performance tracking"],
    },
    {
      title: "Construction Projects",
      description: "Select subcontractors and material suppliers for construction and infrastructure projects.",
      image: "/placeholder.svg?height=200&width=300&text=Construction+Projects",
      results: "35% reduction in project costs",
      icon: <Building className="h-6 w-6" />,
      challenges: ["Project complexity", "Timeline constraints", "Regulatory compliance"],
      solutions: ["Project-specific bidding", "Timeline evaluation", "Compliance verification"],
    },
    {
      title: "Logistics & Transportation",
      description: "Optimize logistics costs by selecting the best transportation and warehousing providers.",
      image: "/placeholder.svg?height=200&width=300&text=Logistics+Transportation",
      results: "30% savings on logistics costs",
      icon: <Truck className="h-6 w-6" />,
      challenges: ["Route optimization", "Capacity planning", "Service reliability"],
      solutions: ["Route analysis tools", "Capacity matching", "Performance monitoring"],
    },
    {
      title: "Professional Services",
      description: "Source consulting, IT services, and other professional services through competitive bidding.",
      image: "/placeholder.svg?height=200&width=300&text=Professional+Services",
      results: "40% reduction in service costs",
      icon: <ShoppingCart className="h-6 w-6" />,
      challenges: ["Skill requirements", "Experience validation", "Cultural fit"],
      solutions: ["Skill assessment tools", "Portfolio evaluation", "Cultural matching"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5" />

        {/* Floating orbs for visual interest */}
        <FloatingOrb position="top-20 left-10" size="w-32 h-32" color="bg-blue-300/20" delay={100} />
        <FloatingOrb position="top-40 right-20" size="w-24 h-24" color="bg-purple-300/20" delay={300} />
        <FloatingOrb position="bottom-10 left-1/4" size="w-40 h-40" color="bg-indigo-300/10" delay={200} />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 animate-fade-in">
              <Users className="h-4 w-4 mr-2" />
              Briskon Supplier Bidding Platform
            </Badge>
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Intelligent Supplier
              <br />
              Selection & Bidding
            </h1>
            <p
              className={`text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Transform your supplier selection process with Briskon's AI-powered bidding platform. Connect with
              qualified suppliers, drive competitive pricing, and build resilient supply chains through intelligent
              procurement.
            </p>

            {/* Key Value Props */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700 card-hover">
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-blue-500 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">AI-Powered Matching</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Smart algorithms find and qualify the best suppliers for your needs
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700 card-hover">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-purple-500 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Competitive Bidding</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Drive down costs through structured competitive bidding
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-700 card-hover">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-green-500 dark:text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Quality Assurance</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Rigorous supplier qualification ensures reliability and quality
                  </p>
                </CardContent>
              </Card>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white hover-lift"
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
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover-lift"
                asChild
              >
                <Link href="/get-started">
                  Start Bidding Process
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100 animate-slide-in-up">
              Proven Results in Supplier Selection
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto animate-slide-in-up delay-200">
              Join thousands of organizations that have transformed their procurement with intelligent supplier bidding.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-slide-in-up delay-300">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{animatedStats.suppliers}+</div>
              <div className="text-slate-600 dark:text-slate-300">Qualified Suppliers</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">in our network</div>
            </div>
            <div className="text-center animate-slide-in-up delay-400">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{animatedStats.savings}%</div>
              <div className="text-slate-600 dark:text-slate-300">Cost Savings</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">average reduction</div>
            </div>
            <div className="text-center animate-slide-in-up delay-500">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {animatedStats.efficiency}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">Faster Selection</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">process efficiency</div>
            </div>
            <div className="text-center animate-slide-in-up delay-700">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {animatedStats.satisfaction}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">Satisfaction Rate</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">client satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white animate-slide-in-up">
              Intelligent Supplier Bidding Process
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto animate-slide-in-up delay-200">
              Our AI-powered platform streamlines supplier selection from discovery to contract award
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {biddingProcess.map((step, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 border-slate-200 dark:border-slate-700 animate-slide-in-left delay-${index * 100} ${
                      activeStep === index
                        ? "border-blue-500 dark:border-blue-400 shadow-lg scale-105 bg-white dark:bg-slate-800"
                        : "hover:shadow-md hover:scale-102 bg-white dark:bg-slate-800"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            activeStep === index
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
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
                            <p className="text-sm text-blue-600 dark:text-blue-400">{step.details}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="relative animate-slide-in-right">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700 animate-pulse-glow">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                      {biddingProcess[activeStep].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                      {biddingProcess[activeStep].title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">{biddingProcess[activeStep].details}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 h-2 rounded-full">
                    <div
                      className="bg-white dark:bg-slate-800 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((activeStep + 1) / biddingProcess.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white relative overflow-hidden">
        {/* Floating orbs for visual interest */}
        <FloatingOrb position="top-10 left-1/4" size="w-40 h-40" color="bg-white/5" delay={100} />
        <FloatingOrb position="bottom-20 right-1/3" size="w-32 h-32" color="bg-white/5" delay={300} />
        <FloatingOrb position="top-1/2 right-1/4" size="w-24 h-24" color="bg-white/5" delay={200} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 animate-slide-in-up">Ready to Optimize Your Supplier Selection?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-slide-in-up delay-200">
            Join leading organizations that have transformed their procurement with intelligent supplier bidding. Start
            building better supplier relationships today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up delay-400">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="/get-started">
                Start Supplier Bidding
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-3 border-white text-white hover:bg-white/20 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm px-8 py-6 text-lg"
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
