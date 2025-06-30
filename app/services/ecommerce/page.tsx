"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  CreditCard,
  Truck,
  BarChart3,
  Users,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Clock,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"

export default function EcommercePage() {
  const ecommerceServices = [
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Custom E-commerce Development",
      description: "Tailored online stores built with modern technologies for optimal performance and user experience.",
      features: ["Custom Design", "Product Catalog", "Shopping Cart", "Order Management"],
      platforms: ["Custom Build", "Headless Commerce", "Progressive Web Apps"],
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Payment Gateway Integration",
      description: "Secure payment processing with multiple payment options and fraud protection.",
      features: ["Multiple Payment Methods", "Secure Transactions", "Fraud Detection", "PCI Compliance"],
      platforms: ["Stripe", "PayPal", "Square", "Razorpay"],
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Commerce",
      description: "Mobile-optimized shopping experiences and native mobile apps for iOS and Android.",
      features: ["Responsive Design", "Mobile Apps", "Touch Optimization", "Offline Capability"],
      platforms: ["React Native", "Flutter", "PWA", "Native Apps"],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "E-commerce Analytics",
      description: "Comprehensive analytics and reporting to track performance and optimize conversions.",
      features: ["Sales Analytics", "Customer Insights", "Conversion Tracking", "Performance Reports"],
      platforms: ["Google Analytics", "Custom Dashboards", "Business Intelligence"],
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Inventory & Logistics",
      description: "Integrated inventory management and shipping solutions for streamlined operations.",
      features: ["Inventory Tracking", "Order Fulfillment", "Shipping Integration", "Warehouse Management"],
      platforms: ["ERP Integration", "Shipping APIs", "Warehouse Systems"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Experience",
      description: "Enhanced customer experience with personalization, reviews, and support features.",
      features: ["Personalization", "Product Reviews", "Wishlist", "Customer Support"],
      platforms: ["AI Recommendations", "Live Chat", "Help Desk Integration"],
    },
  ]

  const ecommercePlatforms = [
    { name: "Shopify", logo: "/placeholder.svg?height=60&width=60", category: "Platform" },
    { name: "WooCommerce", logo: "/placeholder.svg?height=60&width=60", category: "WordPress" },
    { name: "Magento", logo: "/placeholder.svg?height=60&width=60", category: "Enterprise" },
    { name: "BigCommerce", logo: "/placeholder.svg?height=60&width=60", category: "SaaS" },
    { name: "Stripe", logo: "/placeholder.svg?height=60&width=60", category: "Payments" },
    { name: "PayPal", logo: "/placeholder.svg?height=60&width=60", category: "Payments" },
    {
      name: "Salesforce Commerce",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Enterprise",
    },
    {
      name: "Commercetools",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Headless",
    },
  ]

  const caseStudies = [
    {
      title: "Fashion E-commerce Platform",
      client: "StyleHub Fashion",
      description: "Complete e-commerce solution with advanced product customization and AR try-on features",
      image: "/placeholder.svg?height=300&width=400",
      results: ["300% increase in sales", "50% higher conversion rate", "40% mobile traffic growth"],
      technologies: ["Custom Platform", "AR Integration", "Mobile App"],
    },
    {
      title: "B2B Marketplace",
      client: "IndustrialSupply Pro",
      description: "Multi-vendor B2B marketplace with complex pricing and bulk ordering capabilities",
      image: "/placeholder.svg?height=300&width=400",
      results: ["500+ vendors onboarded", "200% order volume increase", "Streamlined procurement"],
      technologies: ["Custom Marketplace", "ERP Integration", "Bulk Ordering"],
    },
    {
      title: "Grocery Delivery Platform",
      client: "FreshMart Express",
      description: "On-demand grocery delivery platform with real-time tracking and inventory management",
      image: "/placeholder.svg?height=300&width=400",
      results: ["10,000+ daily orders", "30-minute delivery", "99% customer satisfaction"],
      technologies: ["Mobile Apps", "Real-time Tracking", "Inventory System"],
    },
  ]

  const developmentProcess = [
    {
      step: "01",
      title: "Business Analysis",
      description: "Understand your business model, target audience, and e-commerce requirements.",
      duration: "1-2 weeks",
    },
    {
      step: "02",
      title: "Platform Selection & Design",
      description: "Choose the right platform and create user-centered design for optimal shopping experience.",
      duration: "2-3 weeks",
    },
    {
      step: "03",
      title: "Development & Integration",
      description: "Build the e-commerce platform with payment, shipping, and third-party integrations.",
      duration: "6-12 weeks",
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Comprehensive testing including security, performance, and user acceptance testing.",
      duration: "2-3 weeks",
    },
    {
      step: "05",
      title: "Marketing & Optimization",
      description: "Launch marketing campaigns and continuously optimize for better performance.",
      duration: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 animate-fade-in-up">
              🛒 E-commerce Solutions
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent animate-fade-in-up">
              Powerful E-commerce Platforms That Drive Sales
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Build successful online stores with our comprehensive e-commerce solutions. From custom platforms to
              marketplace integrations, we help you sell more and grow faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Selling Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                View E-commerce Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "110+", label: "E-commerce Projects" },
                { number: "$50M+", label: "Sales Generated" },
                { number: "250%", label: "Avg. Sales Increase" },
                { number: "99.9%", label: "Platform Uptime" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">E-commerce Development Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Complete e-commerce solutions to launch and scale your online business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecommerceServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-emerald-600 dark:text-emerald-400 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Features:</h4>
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
                    <h4 className="font-semibold mb-2 text-sm text-emerald-600">Platforms:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.platforms.map((platform, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* E-commerce Platforms */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">E-commerce Platforms & Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Leading platforms and payment solutions for online commerce
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {ecommercePlatforms.map((platform, index) => (
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

      {/* Development Process */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">E-commerce Development Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Structured approach to building successful online stores
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-emerald-200 dark:bg-emerald-800 hidden lg:block"></div>
            <div className="space-y-12">
              {developmentProcess.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-emerald-600 rounded-full border-4 border-white dark:border-gray-900"></div>
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
            <h2 className="text-4xl font-bold mb-4">E-commerce Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Online stores that drive real business results</p>
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
                    {study.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
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
      <section className="py-20 bg-emerald-600 dark:bg-emerald-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Launch Your Online Store?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Transform your business with a powerful e-commerce platform that drives sales and delights customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Start E-commerce Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-emerald-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Get E-commerce Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
