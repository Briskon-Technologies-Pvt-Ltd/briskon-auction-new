"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Eye, Users, Smartphone, Monitor, Zap, CheckCircle, ArrowRight, Clock, Heart } from "lucide-react"
import Image from "next/image"

export default function UIUXDesignPage() {
  const designServices = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "User Experience (UX) Design",
      description: "Research-driven UX design that creates intuitive and engaging user journeys.",
      features: ["User Research", "Journey Mapping", "Wireframing", "Usability Testing"],
      deliverables: ["User Personas", "User Flows", "Wireframes", "Prototypes"],
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "User Interface (UI) Design",
      description: "Beautiful, functional interfaces that align with your brand and delight users.",
      features: ["Visual Design", "Design Systems", "Responsive Design", "Micro-interactions"],
      deliverables: ["High-fidelity Mockups", "Design System", "Style Guide", "Assets"],
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Design",
      description: "Native mobile experiences optimized for iOS and Android platforms.",
      features: ["Platform Guidelines", "Touch Interactions", "Gesture Design", "App Store Assets"],
      deliverables: ["Mobile Mockups", "Interactive Prototypes", "App Icons", "Screenshots"],
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Web Design",
      description: "Responsive web designs that work seamlessly across all devices and browsers.",
      features: ["Responsive Design", "Cross-browser Compatibility", "Performance Optimization", "Accessibility"],
      deliverables: ["Desktop/Mobile Designs", "Component Library", "Style Guide", "Assets"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Design Research",
      description: "In-depth user research to understand your audience and validate design decisions.",
      features: ["User Interviews", "Surveys", "Analytics Analysis", "Competitive Research"],
      deliverables: ["Research Reports", "User Insights", "Recommendations", "Personas"],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Prototyping & Testing",
      description: "Interactive prototypes and usability testing to validate and refine designs.",
      features: ["Interactive Prototypes", "Usability Testing", "A/B Testing", "Iteration"],
      deliverables: ["Clickable Prototypes", "Test Results", "Recommendations", "Iterations"],
    },
  ]

  const designTools = [
    { name: "Figma", logo: "/placeholder.svg?height=60&width=60", category: "Design" },
    { name: "Adobe XD", logo: "/placeholder.svg?height=60&width=60", category: "Design" },
    { name: "Sketch", logo: "/placeholder.svg?height=60&width=60", category: "Design" },
    { name: "InVision", logo: "/placeholder.svg?height=60&width=60", category: "Prototyping" },
    { name: "Principle", logo: "/placeholder.svg?height=60&width=60", category: "Animation" },
    { name: "Framer", logo: "/placeholder.svg?height=60&width=60", category: "Prototyping" },
    { name: "Miro", logo: "/placeholder.svg?height=60&width=60", category: "Collaboration" },
    { name: "Hotjar", logo: "/placeholder.svg?height=60&width=60", category: "Analytics" },
  ]

  const caseStudies = [
    {
      title: "E-commerce Mobile App Redesign",
      client: "Fashion Forward",
      description: "Complete UX/UI redesign of mobile shopping app resulting in increased conversions",
      image: "/placeholder.svg?height=300&width=400",
      results: ["150% increase in conversions", "40% higher user engagement", "4.8 App Store rating"],
      designAreas: ["User Research", "Mobile UI", "Prototyping"],
    },
    {
      title: "SaaS Dashboard Redesign",
      client: "DataTech Solutions",
      description: "Enterprise dashboard redesign focusing on data visualization and user workflow",
      image: "/placeholder.svg?height=300&width=400",
      results: ["60% reduction in task completion time", "90% user satisfaction", "Improved data insights"],
      designAreas: ["UX Research", "Data Visualization", "Design System"],
    },
    {
      title: "Healthcare Patient Portal",
      client: "MediCare Plus",
      description: "Patient-centered design for healthcare portal with accessibility focus",
      image: "/placeholder.svg?height=300&width=400",
      results: ["80% patient adoption", "WCAG AA compliance", "Reduced support calls"],
      designAreas: ["Accessibility Design", "User Testing", "Healthcare UX"],
    },
  ]

  const designProcess = [
    {
      step: "01",
      title: "Discovery & Research",
      description:
        "Understand users, business goals, and technical constraints through research and stakeholder interviews.",
      duration: "1-2 weeks",
    },
    {
      step: "02",
      title: "Strategy & Planning",
      description: "Define design strategy, user personas, and create project roadmap with clear deliverables.",
      duration: "1 week",
    },
    {
      step: "03",
      title: "Wireframing & Prototyping",
      description: "Create low-fidelity wireframes and interactive prototypes to test concepts and user flows.",
      duration: "2-3 weeks",
    },
    {
      step: "04",
      title: "Visual Design",
      description: "Develop high-fidelity designs, design system, and create pixel-perfect mockups.",
      duration: "3-4 weeks",
    },
    {
      step: "05",
      title: "Testing & Iteration",
      description: "Conduct usability testing, gather feedback, and iterate on designs based on insights.",
      duration: "1-2 weeks",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 animate-fade-in-up">
              🎨 UI/UX Design Services
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-fade-in-up">
              User-Centered Design Excellence
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Create exceptional user experiences that drive engagement and business success. From research to
              implementation, we design digital products that users love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-pink-600 hover:bg-pink-700 text-white border border-pink-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Design Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                View Design Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "150+", label: "Design Projects" },
                { number: "95%", label: "User Satisfaction" },
                { number: "40%", label: "Avg. Conversion Lift" },
                { number: "4.9★", label: "Design Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">UI/UX Design Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive design services to create exceptional user experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-pink-600 dark:text-pink-400 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">What We Do:</h4>
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
                    <h4 className="font-semibold mb-2 text-sm text-pink-600">Deliverables:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.deliverables.map((deliverable, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {deliverable}
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

      {/* Design Tools */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Design Tools & Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Industry-leading tools for professional design workflows
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {designTools.map((tool, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <Image
                    src={tool.logo || "/placeholder.svg"}
                    alt={tool.name}
                    width={60}
                    height={60}
                    className="mx-auto mb-3"
                  />
                  <h4 className="font-semibold text-sm">{tool.name}</h4>
                  <p className="text-xs text-gray-500">{tool.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Design Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Human-centered design methodology for exceptional results
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-pink-200 dark:bg-pink-800 hidden lg:block"></div>
            <div className="space-y-12">
              {designProcess.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-pink-600 rounded-full border-4 border-white dark:border-gray-900"></div>
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
            <h2 className="text-4xl font-bold mb-4">Design Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Designs that drive results and delight users</p>
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
                          <Heart className="h-4 w-4 text-red-500" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {study.designAreas.map((area, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {area}
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
      <section className="py-20 bg-pink-600 dark:bg-pink-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Create Amazing User Experiences?</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Let's design digital experiences that your users will love and that drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Start Design Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-pink-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
