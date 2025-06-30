"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Shield,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Users,
  Download,
  Globe,
  Code,
} from "lucide-react"
import Image from "next/image"

export default function MobileDevelopmentPage() {
  const platforms = [
    {
      name: "iOS Development",
      icon: <Smartphone className="h-8 w-8" />,
      description: "Native iOS apps using Swift and Objective-C",
      features: ["App Store Optimization", "iOS Design Guidelines", "Core Data Integration", "Push Notifications"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Android Development",
      icon: <Tablet className="h-8 w-8" />,
      description: "Native Android apps using Kotlin and Java",
      features: ["Google Play Store", "Material Design", "Firebase Integration", "Background Services"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Cross-Platform",
      icon: <Monitor className="h-8 w-8" />,
      description: "React Native and Flutter applications",
      features: ["Code Reusability", "Faster Development", "Single Codebase", "Native Performance"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const services = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Native App Development",
      description: "Platform-specific apps that leverage device capabilities for optimal performance.",
      features: ["iOS & Android Native", "Device Hardware Access", "Platform-specific UI", "App Store Optimization"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cross-Platform Development",
      description: "Single codebase applications that run seamlessly on multiple platforms.",
      features: ["React Native", "Flutter", "Xamarin", "Code Sharing"],
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Progressive Web Apps",
      description: "Web applications that provide native app-like experience across devices.",
      features: ["Offline Functionality", "Push Notifications", "App-like Interface", "Cross-platform"],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "App Modernization",
      description: "Update and enhance existing mobile applications with modern technologies.",
      features: ["Legacy App Migration", "Performance Optimization", "UI/UX Redesign", "Feature Enhancement"],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Mobility",
      description: "Secure mobile solutions for enterprise environments and workflows.",
      features: ["MDM Integration", "Enterprise Security", "Custom Workflows", "Backend Integration"],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "App Analytics & Monitoring",
      description: "Comprehensive tracking and performance monitoring for mobile applications.",
      features: ["User Analytics", "Crash Reporting", "Performance Metrics", "A/B Testing"],
    },
  ]

  const technologies = [
    {
      name: "React Native",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Cross-Platform",
    },
    { name: "Flutter", logo: "/placeholder.svg?height=60&width=60", category: "Cross-Platform" },
    { name: "Swift", logo: "/placeholder.svg?height=60&width=60", category: "iOS" },
    { name: "Kotlin", logo: "/placeholder.svg?height=60&width=60", category: "Android" },
    { name: "Firebase", logo: "/placeholder.svg?height=60&width=60", category: "Backend" },
    { name: "AWS Mobile", logo: "/placeholder.svg?height=60&width=60", category: "Cloud" },
    { name: "Xamarin", logo: "/placeholder.svg?height=60&width=60", category: "Cross-Platform" },
    { name: "Ionic", logo: "/placeholder.svg?height=60&width=60", category: "Hybrid" },
  ]

  const caseStudies = [
    {
      title: "FinTech Mobile App",
      client: "SecurePay Solutions",
      description: "Secure mobile banking application with biometric authentication",
      image: "/placeholder.svg?height=300&width=400",
      results: ["50,000+ downloads", "4.8 App Store rating", "Bank-grade security"],
      technologies: ["React Native", "Firebase", "Biometric Auth"],
    },
    {
      title: "Healthcare App",
      client: "MediConnect",
      description: "Telemedicine app connecting patients with healthcare providers",
      image: "/placeholder.svg?height=300&width=400",
      results: ["10,000+ consultations", "HIPAA compliant", "Real-time video calls"],
      technologies: ["Flutter", "WebRTC", "AWS"],
    },
    {
      title: "E-learning Platform",
      client: "EduTech Pro",
      description: "Interactive learning app with offline content and progress tracking",
      image: "/placeholder.svg?height=300&width=400",
      results: ["100,000+ students", "Offline learning", "Gamification features"],
      technologies: ["Native iOS/Android", "SQLite", "Video Streaming"],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 animate-fade-in-up">
              📱 Mobile App Development
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
              Native & Cross-Platform Mobile Apps
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Create powerful mobile applications that engage users and drive business growth. From iOS to Android, we
              build apps that deliver exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white border border-purple-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Your App Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                View App Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "85+", label: "Apps Developed" },
                { number: "4.8★", label: "Average Rating" },
                { number: "1M+", label: "Downloads" },
                { number: "99%", label: "Client Retention" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Options */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Platform Expertise</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We develop for all major mobile platforms using the latest technologies and best practices
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <Image
                  src={platform.image || "/placeholder.svg"}
                  alt={platform.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-purple-600 dark:text-purple-400">{platform.icon}</div>
                    <h3 className="text-xl font-semibold">{platform.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{platform.description}</p>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
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

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mobile Development Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive mobile solutions for every business need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-purple-600 dark:text-purple-400 mb-4">{service.icon}</div>
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

      {/* Technologies */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mobile Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Latest frameworks and tools for mobile app development
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

      {/* Case Studies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">App Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Mobile apps that made a difference</p>
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
                          <Download className="h-4 w-4 text-blue-500" />
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
      <section className="py-20 bg-purple-600 dark:bg-purple-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Your Mobile App?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Transform your idea into a powerful mobile application that users love. Let's discuss your project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-purple-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Get App Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
