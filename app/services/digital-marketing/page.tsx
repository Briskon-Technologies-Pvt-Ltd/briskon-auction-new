"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Search,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  MousePointer,
  Share2,
  Mail,
} from "lucide-react"
import Image from "next/image"

export default function DigitalMarketingPage() {
  const services = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Search Engine Optimization (SEO)",
      description: "Improve your website's visibility and organic search rankings.",
      features: ["Keyword Research", "On-page Optimization", "Technical SEO", "Link Building"],
      metrics: ["300% increase in organic traffic", "Top 3 rankings for target keywords"],
    },
    {
      icon: <MousePointer className="h-8 w-8" />,
      title: "Pay-Per-Click (PPC) Advertising",
      description: "Drive immediate traffic and conversions with targeted ad campaigns.",
      features: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Campaign Optimization"],
      metrics: ["150% ROI improvement", "50% reduction in cost per click"],
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: "Social Media Marketing",
      description: "Build brand awareness and engage with your audience on social platforms.",
      features: ["Content Strategy", "Community Management", "Influencer Marketing", "Social Advertising"],
      metrics: ["500% follower growth", "200% engagement increase"],
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Marketing",
      description: "Nurture leads and retain customers with personalized email campaigns.",
      features: ["Campaign Design", "Automation", "Segmentation", "A/B Testing"],
      metrics: ["45% open rate", "12% click-through rate"],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Reporting",
      description: "Track performance and optimize campaigns with data-driven insights.",
      features: ["Google Analytics", "Custom Dashboards", "ROI Tracking", "Performance Reports"],
      metrics: ["Real-time insights", "Actionable recommendations"],
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Conversion Rate Optimization",
      description: "Maximize your website's potential to convert visitors into customers.",
      features: ["A/B Testing", "Landing Page Optimization", "User Experience Analysis", "Funnel Optimization"],
      metrics: ["35% conversion improvement", "25% revenue increase"],
    },
  ]

  const platforms = [
    { name: "Google Ads", logo: "/placeholder.svg?height=60&width=60", category: "Search" },
    { name: "Facebook", logo: "/placeholder.svg?height=60&width=60", category: "Social" },
    { name: "Instagram", logo: "/placeholder.svg?height=60&width=60", category: "Social" },
    { name: "LinkedIn", logo: "/placeholder.svg?height=60&width=60", category: "Professional" },
    { name: "YouTube", logo: "/placeholder.svg?height=60&width=60", category: "Video" },
    { name: "Twitter", logo: "/placeholder.svg?height=60&width=60", category: "Social" },
    { name: "TikTok", logo: "/placeholder.svg?height=60&width=60", category: "Video" },
    { name: "Pinterest", logo: "/placeholder.svg?height=60&width=60", category: "Visual" },
  ]

  const caseStudies = [
    {
      title: "E-commerce Growth Campaign",
      client: "TechGadgets Store",
      description: "Comprehensive digital marketing strategy for online electronics retailer",
      image: "/placeholder.svg?height=300&width=400",
      results: ["400% increase in online sales", "250% growth in organic traffic", "180% improvement in ROAS"],
      channels: ["SEO", "Google Ads", "Social Media"],
    },
    {
      title: "B2B Lead Generation",
      client: "CloudTech Solutions",
      description: "Multi-channel lead generation campaign for SaaS company",
      image: "/placeholder.svg?height=300&width=400",
      results: ["300% increase in qualified leads", "150% improvement in conversion rate", "50% reduction in CAC"],
      channels: ["LinkedIn Ads", "Content Marketing", "Email Marketing"],
    },
    {
      title: "Local Business Expansion",
      client: "Urban Fitness Centers",
      description: "Local SEO and social media campaign for fitness franchise",
      image: "/placeholder.svg?height=300&width=400",
      results: ["200% increase in local searches", "150% growth in membership", "90% improvement in online reviews"],
      channels: ["Local SEO", "Facebook Ads", "Google My Business"],
    },
  ]

  const process = [
    {
      step: "01",
      title: "Strategy & Planning",
      description:
        "Analyze your business goals, target audience, and competitive landscape to create a comprehensive marketing strategy.",
      duration: "1-2 weeks",
    },
    {
      step: "02",
      title: "Campaign Setup",
      description: "Set up tracking, create campaigns, and implement necessary tools and integrations.",
      duration: "1 week",
    },
    {
      step: "03",
      title: "Content Creation",
      description: "Develop compelling content, ad creatives, and marketing materials aligned with your brand.",
      duration: "2-3 weeks",
    },
    {
      step: "04",
      title: "Launch & Monitor",
      description: "Launch campaigns across selected channels and monitor performance in real-time.",
      duration: "Ongoing",
    },
    {
      step: "05",
      title: "Optimize & Scale",
      description: "Continuously optimize campaigns based on data insights and scale successful strategies.",
      duration: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 animate-fade-in-up">
              📈 Digital Marketing Services
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
              Growth-Driven Digital Marketing
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Accelerate your business growth with data-driven digital marketing strategies. From SEO to social media,
              we help you reach and convert your target audience effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white border border-green-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Growing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                View Case Studies
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "200+", label: "Campaigns Launched" },
                { number: "350%", label: "Average ROI" },
                { number: "50M+", label: "Impressions Generated" },
                { number: "98%", label: "Client Retention" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Digital Marketing Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital marketing solutions to drive traffic, generate leads, and increase revenue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-green-600 dark:text-green-400 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">What's Included:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold mb-2 text-sm text-green-600">Typical Results:</h4>
                    {service.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        {metric}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Marketing Platforms</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We leverage the best platforms to reach your audience where they are
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <Image
                    src={platform.logo || "/placeholder.svg"}
                    alt={platform.name}
                    width={60}
                    height={60}
                    className="mx-auto mb-3"
                  />
                  <h4 className="font-semibold text-sm">{platform.name}</h4>
                  <p className="text-xs text-gray-500">{platform.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Marketing Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A systematic approach to digital marketing success
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200 dark:bg-green-800 hidden lg:block"></div>
            <div className="space-y-12">
              {process.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Marketing Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Real campaigns, real results</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {study.client}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {study.channels.map((channel, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Accelerate Your Growth?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Let's create a custom digital marketing strategy that drives real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Get Free Marketing Audit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-green-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Schedule Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
