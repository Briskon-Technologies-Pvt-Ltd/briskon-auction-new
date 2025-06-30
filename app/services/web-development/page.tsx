"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Code,
  Smartphone,
  Zap,
  Shield,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Star,
} from "lucide-react"
import Image from "next/image"

export default function WebDevelopmentPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const technologies = [
    { name: "React", logo: "/placeholder.svg?height=60&width=60", category: "Frontend" },
    { name: "Next.js", logo: "/placeholder.svg?height=60&width=60", category: "Framework" },
    { name: "Node.js", logo: "/placeholder.svg?height=60&width=60", category: "Backend" },
    { name: "TypeScript", logo: "/placeholder.svg?height=60&width=60", category: "Language" },
    { name: "MongoDB", logo: "/placeholder.svg?height=60&width=60", category: "Database" },
    { name: "AWS", logo: "/placeholder.svg?height=60&width=60", category: "Cloud" },
    { name: "Docker", logo: "/placeholder.svg?height=60&width=60", category: "DevOps" },
    { name: "GraphQL", logo: "/placeholder.svg?height=60&width=60", category: "API" },
  ]

  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Custom Web Applications",
      description: "Scalable, secure web applications built with modern frameworks and best practices.",
      features: ["Progressive Web Apps", "Single Page Applications", "Multi-tenant Architecture", "API Integration"],
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Responsive Design",
      description: "Mobile-first designs that work seamlessly across all devices and screen sizes.",
      features: [
        "Mobile Optimization",
        "Cross-browser Compatibility",
        "Touch-friendly Interfaces",
        "Performance Optimization",
      ],
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Frontend Development",
      description: "Modern, interactive user interfaces using cutting-edge frontend technologies.",
      features: ["React/Vue/Angular", "Component Libraries", "State Management", "Real-time Updates"],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Backend Development",
      description: "Robust server-side solutions with scalable architecture and secure APIs.",
      features: ["RESTful APIs", "Microservices", "Database Design", "Authentication Systems"],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Performance",
      description: "Enterprise-grade security measures and performance optimization.",
      features: ["SSL/TLS Encryption", "Data Protection", "Load Balancing", "CDN Integration"],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Monitoring",
      description: "Comprehensive tracking and monitoring solutions for data-driven insights.",
      features: ["Google Analytics", "Performance Monitoring", "Error Tracking", "User Behavior Analysis"],
    },
  ]

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description:
        "We analyze your requirements, target audience, and business goals to create a comprehensive project roadmap.",
      duration: "1-2 weeks",
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Creating wireframes, mockups, and interactive prototypes to visualize the final product.",
      duration: "2-3 weeks",
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development with continuous integration, testing, and quality assurance.",
      duration: "4-12 weeks",
    },
    {
      step: "04",
      title: "Deployment & Launch",
      description: "Seamless deployment to production with monitoring and performance optimization.",
      duration: "1 week",
    },
    {
      step: "05",
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and feature enhancements to keep your application current.",
      duration: "Ongoing",
    },
  ]

  const caseStudies = [
    {
      title: "E-commerce Platform",
      client: "TechMart Solutions",
      description: "Built a scalable e-commerce platform handling 10,000+ daily transactions",
      image: "/placeholder.svg?height=300&width=400",
      results: ["300% increase in sales", "50% faster load times", "99.9% uptime"],
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
    },
    {
      title: "Healthcare Portal",
      client: "MediCare Plus",
      description: "HIPAA-compliant patient management system with telemedicine capabilities",
      image: "/placeholder.svg?height=300&width=400",
      results: ["5,000+ patients onboarded", "40% reduction in admin time", "HIPAA compliant"],
      technologies: ["Next.js", "PostgreSQL", "Docker", "Azure"],
    },
    {
      title: "Financial Dashboard",
      client: "InvestPro Analytics",
      description: "Real-time financial analytics dashboard with advanced charting and reporting",
      image: "/placeholder.svg?height=300&width=400",
      results: ["Real-time data processing", "Advanced analytics", "Mobile responsive"],
      technologies: ["Vue.js", "Python", "Redis", "AWS"],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 animate-fade-in-up">
              🌐 Web Development Services
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in-up">
              Custom Web Development Solutions
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Build powerful, scalable web applications with modern technologies. From concept to deployment, we deliver
              exceptional digital experiences that drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                View Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "120+", label: "Web Projects" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "24/7", label: "Support" },
                { number: "5+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
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
            <h2 className="text-4xl font-bold mb-4">Our Web Development Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Cutting-edge technologies for modern web development
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <Image
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    width={60}
                    height={60}
                    className="mx-auto mb-3"
                  />
                  <h4 className="font-semibold text-sm">{tech.name}</h4>
                  <p className="text-xs text-gray-500">{tech.category}</p>
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
            <h2 className="text-4xl font-bold mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A proven methodology that ensures project success
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-800 hidden lg:block"></div>
            <div className="space-y-12">
              {process.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Real projects, real results</p>
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
                  <Badge className="mb-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {study.client}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
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

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Investment Options</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Flexible pricing to match your project needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$5,000",
                description: "Perfect for small businesses and startups",
                features: [
                  "5-page responsive website",
                  "Content Management System",
                  "Mobile optimization",
                  "Basic SEO setup",
                  "3 months support",
                ],
              },
              {
                name: "Professional",
                price: "$15,000",
                description: "Ideal for growing businesses",
                features: [
                  "Custom web application",
                  "Database integration",
                  "User authentication",
                  "API development",
                  "6 months support",
                  "Performance optimization",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large-scale applications",
                features: [
                  "Complex web applications",
                  "Microservices architecture",
                  "Advanced security",
                  "Third-party integrations",
                  "12 months support",
                  "Dedicated team",
                ],
              },
            ].map((plan, index) => (
              <Card key={index} className={`p-6 ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{plan.price}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600" : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"} shadow-sm hover:shadow-md transition-all duration-200`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Your Web Application?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution that drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-blue-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
