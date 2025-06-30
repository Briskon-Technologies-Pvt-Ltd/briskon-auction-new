"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Lock, Wifi, CheckCircle, ArrowRight, Clock, Star, Building, Database } from "lucide-react"
import Image from "next/image"

export default function EnterpriseMobilityPage() {
  const solutions = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Mobile Device Management (MDM)",
      description: "Centralized management and security for all corporate mobile devices.",
      features: ["Device Enrollment", "Policy Management", "Remote Wipe", "App Distribution"],
      benefits: ["Enhanced Security", "Compliance", "Cost Control", "Productivity"],
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Mobile Application Management (MAM)",
      description: "Secure deployment and management of enterprise mobile applications.",
      features: ["App Wrapping", "Containerization", "Data Loss Prevention", "App Analytics"],
      benefits: ["Data Protection", "App Control", "User Privacy", "Performance Monitoring"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Enterprise Mobility Management (EMM)",
      description: "Comprehensive platform for managing mobile devices, apps, and content.",
      features: ["Unified Management", "Content Management", "Identity Management", "Analytics"],
      benefits: ["Single Console", "Streamlined Operations", "Better Insights", "Scalability"],
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "Mobile Security Solutions",
      description: "Advanced security measures for mobile devices and applications.",
      features: ["VPN Integration", "Threat Detection", "Encryption", "Compliance Monitoring"],
      benefits: ["Data Security", "Threat Prevention", "Regulatory Compliance", "Risk Mitigation"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "BYOD (Bring Your Own Device)",
      description: "Secure integration of personal devices into corporate environments.",
      features: ["Device Registration", "Dual Persona", "Selective Wipe", "App Separation"],
      benefits: ["Employee Satisfaction", "Cost Savings", "Flexibility", "Productivity"],
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Enterprise App Development",
      description: "Custom mobile applications designed for enterprise workflows.",
      features: ["Native Development", "Cross-platform", "Backend Integration", "Offline Capability"],
      benefits: ["Tailored Solutions", "Better Performance", "Seamless Integration", "User Adoption"],
    },
  ]

  const platforms = [
    {
      name: "Microsoft Intune",
      logo: "/placeholder.svg?height=60&width=60",
      category: "MDM/MAM",
    },
    { name: "VMware Workspace ONE", logo: "/placeholder.svg?height=60&width=60", category: "EMM" },
    { name: "IBM MaaS360", logo: "/placeholder.svg?height=60&width=60", category: "EMM" },
    { name: "Citrix Endpoint", logo: "/placeholder.svg?height=60&width=60", category: "EMM" },
    { name: "BlackBerry UEM", logo: "/placeholder.svg?height=60&width=60", category: "EMM" },
    { name: "SOTI MobiControl", logo: "/placeholder.svg?height=60&width=60", category: "MDM" },
    { name: "Jamf Pro", logo: "/placeholder.svg?height=60&width=60", category: "Apple MDM" },
    {
      name: "Google Workspace",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Android EMM",
    },
  ]

  const caseStudies = [
    {
      title: "Healthcare EMM Implementation",
      client: "Regional Medical Center",
      description: "Comprehensive mobility solution for 2,000+ healthcare workers with HIPAA compliance",
      image: "/placeholder.svg?height=300&width=400",
      results: ["100% HIPAA compliance", "50% faster patient care", "Zero security incidents"],
      technologies: ["Microsoft Intune", "iOS/Android", "Custom Apps"],
    },
    {
      title: "Manufacturing BYOD Program",
      client: "Global Manufacturing Corp",
      description: "Secure BYOD implementation across 15 manufacturing facilities worldwide",
      image: "/placeholder.svg?height=300&width=400",
      results: ["30% cost reduction", "95% employee satisfaction", "Enhanced productivity"],
      technologies: ["VMware Workspace ONE", "Dual Persona", "VPN"],
    },
    {
      title: "Financial Services Security",
      client: "Premier Bank Group",
      description: "Enterprise-grade mobile security for banking operations and customer services",
      image: "/placeholder.svg?height=300&width=400",
      results: ["Bank-grade security", "Regulatory compliance", "24/7 monitoring"],
      technologies: ["BlackBerry UEM", "Encryption", "Threat Detection"],
    },
  ]

  const process = [
    {
      step: "01",
      title: "Assessment & Strategy",
      description: "Evaluate current mobile infrastructure, security requirements, and business objectives.",
      duration: "2-3 weeks",
    },
    {
      step: "02",
      title: "Solution Design",
      description: "Design comprehensive mobility architecture including policies, security, and governance.",
      duration: "2-4 weeks",
    },
    {
      step: "03",
      title: "Pilot Implementation",
      description: "Deploy solution to a small group for testing and refinement before full rollout.",
      duration: "3-4 weeks",
    },
    {
      step: "04",
      title: "Full Deployment",
      description: "Phased rollout across the organization with training and support.",
      duration: "4-12 weeks",
    },
    {
      step: "05",
      title: "Ongoing Management",
      description: "Continuous monitoring, updates, and optimization of the mobility platform.",
      duration: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 animate-fade-in-up">
              🏢 Enterprise Mobility Solutions
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent animate-fade-in-up">
              Secure Enterprise Mobility Management
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Empower your workforce with secure, managed mobile solutions. From device management to enterprise apps,
              we help organizations embrace mobility while maintaining security and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white border border-orange-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Mobility Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Security Assessment
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "45+", label: "EMM Projects" },
                { number: "10K+", label: "Devices Managed" },
                { number: "99.9%", label: "Security Uptime" },
                { number: "100%", label: "Compliance Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{stat.number}</div>
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
            <h2 className="text-4xl font-bold mb-4">Enterprise Mobility Solutions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive mobility management for modern enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-orange-600 dark:text-orange-400 mb-4">{solution.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{solution.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Features:</h4>
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
                    <h4 className="font-semibold mb-2 text-sm text-orange-600">Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {solution.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
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

      {/* Platforms Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">EMM Platforms & Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Leading enterprise mobility management platforms</p>
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
            <h2 className="text-4xl font-bold mb-4">Implementation Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Structured approach to enterprise mobility deployment
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-orange-200 dark:bg-orange-800 hidden lg:block"></div>
            <div className="space-y-12">
              {process.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-orange-600 rounded-full border-4 border-white dark:border-gray-900"></div>
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
            <h2 className="text-4xl font-bold mb-4">Mobility Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Enterprise mobility transformations</p>
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
      <section className="py-20 bg-orange-600 dark:bg-orange-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Enterprise Mobility?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Secure your mobile workforce and boost productivity with our enterprise mobility solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Schedule Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Get EMM Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
