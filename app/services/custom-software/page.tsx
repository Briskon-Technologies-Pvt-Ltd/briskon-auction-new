"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud, Shield, Zap, Settings, CheckCircle, ArrowRight, Clock, Users, Star } from "lucide-react"
import Image from "next/image"

export default function CustomSoftwarePage() {
  const solutions = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Enterprise Applications",
      description: "Scalable business applications tailored to your specific workflows and requirements.",
      features: ["Custom Business Logic", "Workflow Automation", "Integration Capabilities", "Scalable Architecture"],
      industries: ["Manufacturing", "Healthcare", "Finance", "Retail"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Management Systems",
      description: "Comprehensive data solutions for collection, processing, and analysis.",
      features: ["Data Warehousing", "ETL Processes", "Real-time Analytics", "Data Visualization"],
      industries: ["Analytics", "Research", "E-commerce", "IoT"],
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud-Native Solutions",
      description: "Modern applications built for cloud environments with microservices architecture.",
      features: ["Microservices", "Container Orchestration", "Auto-scaling", "DevOps Integration"],
      industries: ["SaaS", "Startups", "Enterprise", "Government"],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security-First Applications",
      description: "Applications with enterprise-grade security and compliance features.",
      features: ["End-to-end Encryption", "Multi-factor Authentication", "Audit Trails", "Compliance Ready"],
      industries: ["Banking", "Healthcare", "Legal", "Government"],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "API Development",
      description: "Robust APIs for system integration and third-party connectivity.",
      features: ["RESTful APIs", "GraphQL", "Webhook Integration", "API Documentation"],
      industries: ["Integration", "Platforms", "Mobile Apps", "IoT"],
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Legacy System Modernization",
      description: "Transform outdated systems into modern, efficient applications.",
      features: ["System Migration", "Architecture Redesign", "Performance Optimization", "Technology Upgrade"],
      industries: ["Enterprise", "Government", "Manufacturing", "Healthcare"],
    },
  ]

  const technologies = [
    { name: "Python", logo: "/placeholder.svg?height=60&width=60", category: "Backend" },
    { name: "Java", logo: "/placeholder.svg?height=60&width=60", category: "Backend" },
    { name: ".NET", logo: "/placeholder.svg?height=60&width=60", category: "Backend" },
    { name: "Node.js", logo: "/placeholder.svg?height=60&width=60", category: "Backend" },
    { name: "React", logo: "/placeholder.svg?height=60&width=60", category: "Frontend" },
    { name: "React", logo: "/placeholder.svg?height=60&width=60", category: "Frontend" },
    { name: "Angular", logo: "/placeholder.svg?height=60&width=60", category: "Frontend" },
    { name: "PostgreSQL", logo: "/placeholder.svg?height=60&width=60", category: "Database" },
    { name: "MongoDB", logo: "/placeholder.svg?height=60&width=60", category: "Database" },
    { name: "AWS", logo: "/placeholder.svg?height=60&width=60", category: "Cloud" },
    { name: "Docker", logo: "/placeholder.svg?height=60&width=60", category: "DevOps" },
    { name: "Kubernetes", logo: "/placeholder.svg?height=60&width=60", category: "DevOps" },
  ]

  const caseStudies = [
    {
      title: "Hospital Management System",
      client: "MediCare Health Network",
      description: "Comprehensive HIPAA-compliant system for patient management and medical records",
      image: "/placeholder.svg?height=300&width=400",
      results: ["50% reduction in admin time", "99.9% system uptime", "HIPAA compliance achieved"],
      technologies: ["Python", "PostgreSQL", "React", "AWS"],
    },
    {
      title: "Supply Chain Platform",
      client: "GlobalTrade Solutions",
      description: "End-to-end supply chain management platform with real-time tracking",
      image: "/placeholder.svg?height=300&width=400",
      results: ["30% cost reduction", "Real-time visibility", "Multi-vendor integration"],
      technologies: ["Java", "MongoDB", "Angular", "Kubernetes"],
    },
    {
      title: "Financial Analytics Tool",
      client: "InvestPro Analytics",
      description: "Advanced financial modeling and risk assessment platform",
      image: "/placeholder.svg?height=300&width=400",
      results: ["Advanced risk modeling", "Real-time data processing", "Regulatory compliance"],
      technologies: [".NET", "SQL Server", "React", "Azure"],
    },
  ]

  const process = [
    {
      step: "01",
      title: "Requirements Analysis",
      description:
        "Deep dive into your business processes, challenges, and technical requirements to define the project scope.",
      duration: "2-4 weeks",
    },
    {
      step: "02",
      title: "Architecture Design",
      description: "Design scalable system architecture, database schema, and integration points.",
      duration: "2-3 weeks",
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development with continuous testing, code reviews, and quality assurance.",
      duration: "8-24 weeks",
    },
    {
      step: "04",
      title: "Deployment & Integration",
      description: "Seamless deployment with system integration and data migration if required.",
      duration: "2-4 weeks",
    },
    {
      step: "05",
      title: "Training & Support",
      description: "User training, documentation, and ongoing maintenance and support.",
      duration: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 animate-fade-in-up">
              ⚙️ Custom Software Development
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in-up">
              Tailored Software Solutions
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Build custom software applications that perfectly fit your business needs. From enterprise systems to
              specialized tools, we create solutions that drive efficiency and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                View Solutions
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "95+", label: "Custom Solutions" },
                { number: "99.5%", label: "System Uptime" },
                { number: "24/7", label: "Support Available" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Custom Software Solutions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive software development services for every business need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-indigo-600 dark:text-indigo-400 mb-4">{solution.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{solution.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold mb-2 text-sm text-indigo-600">Industries:</h4>
                    <div className="flex flex-wrap gap-1">
                      {solution.industries.map((industry, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {industry}
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

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Development Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Enterprise-grade technologies for robust software solutions
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
            <h2 className="text-4xl font-bold mb-4">Development Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Structured approach to custom software development
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-200 dark:bg-indigo-800 hidden lg:block"></div>
            <div className="space-y-12">
              {process.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900"></div>
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
            <h2 className="text-4xl font-bold mb-4">Software Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Custom solutions that transformed businesses</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Your Custom Solution?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a custom software solution that drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Get Project Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
