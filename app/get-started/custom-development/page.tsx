"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Code,
  Palette,
  Zap,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Users,
  Target,
  Building,
  Rocket,
  Brain,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function CustomDevelopmentPage() {
  const developmentPackages = [
    {
      title: "Feature Enhancement",
      description: "Add specific features or modify existing functionality to meet your unique requirements.",
      price: "$25,000",
      timeline: "4-6 weeks",
      features: [
        "Custom feature development",
        "UI/UX modifications",
        "Integration development",
        "Testing & documentation",
        "Deployment support",
        "30-day support",
      ],
      bestFor: "Organizations needing specific features",
    },
    {
      title: "Complete Custom Solution",
      description: "Full custom auction platform built from the ground up for your specific business model.",
      price: "$75,000",
      timeline: "8-12 weeks",
      features: [
        "Custom platform architecture",
        "Bespoke user experience",
        "Advanced integrations",
        "Custom business logic",
        "Comprehensive testing",
        "6-month support",
      ],
      bestFor: "Unique business models and workflows",
      popular: true,
    },
    {
      title: "Enterprise Custom Platform",
      description: "Large-scale custom development with advanced features and enterprise-grade architecture.",
      price: "$150,000+",
      timeline: "12-16 weeks",
      features: [
        "Everything in Complete Custom",
        "Microservices architecture",
        "Advanced analytics platform",
        "Multi-tenant capabilities",
        "AI/ML integrations",
        "1-year premium support",
      ],
      bestFor: "Large enterprises with complex requirements",
    },
  ]

  const developmentAreas = [
    {
      category: "User Experience",
      icon: <Palette className="h-6 w-6" />,
      items: [
        "Custom UI/UX design",
        "Brand integration",
        "Mobile app development",
        "Accessibility compliance",
        "Multi-language support",
        "Responsive design",
      ],
    },
    {
      category: "Business Logic",
      icon: <Brain className="h-6 w-6" />,
      items: [
        "Custom auction types",
        "Pricing algorithms",
        "Workflow automation",
        "Business rule engine",
        "Custom notifications",
        "Approval processes",
      ],
    },
    {
      category: "Integrations",
      icon: <Zap className="h-6 w-6" />,
      items: [
        "ERP system integration",
        "Payment gateway setup",
        "Third-party APIs",
        "Data synchronization",
        "SSO implementation",
        "Webhook development",
      ],
    },
    {
      category: "Advanced Features",
      icon: <Rocket className="h-6 w-6" />,
      items: [
        "AI-powered recommendations",
        "Advanced analytics",
        "Real-time collaboration",
        "Document management",
        "Compliance automation",
        "Performance optimization",
      ],
    },
  ]

  const developmentProcess = [
    {
      phase: "Discovery & Planning",
      duration: "1-2 weeks",
      description: "Deep dive into your requirements, business processes, and technical constraints.",
      activities: [
        "Stakeholder interviews",
        "Requirements gathering",
        "Technical architecture design",
        "Project planning & timeline",
      ],
    },
    {
      phase: "Design & Prototyping",
      duration: "2-3 weeks",
      description: "Create detailed designs, prototypes, and technical specifications for your custom solution.",
      activities: [
        "UI/UX design creation",
        "Interactive prototypes",
        "Technical specifications",
        "Architecture documentation",
      ],
    },
    {
      phase: "Development & Testing",
      duration: "4-8 weeks",
      description: "Agile development with regular reviews, testing, and iterative improvements.",
      activities: [
        "Sprint-based development",
        "Regular progress reviews",
        "Quality assurance testing",
        "Performance optimization",
      ],
    },
    {
      phase: "Deployment & Training",
      duration: "1-2 weeks",
      description: "Production deployment, user training, and knowledge transfer.",
      activities: ["Production deployment", "User training sessions", "Documentation delivery", "Go-live support"],
    },
  ]

  const customizationExamples = [
    {
      title: "Multi-Tier Auction Platform",
      description: "Custom platform supporting multiple auction types with tier-based access controls.",
      image: "/placeholder.svg?height=200&width=300&text=Multi-Tier+Platform",
      features: ["Tier-based access", "Custom pricing models", "Advanced reporting"],
      industry: "B2B Marketplace",
      timeline: "10 weeks",
    },
    {
      title: "Real Estate Auction System",
      description: "Specialized platform for real estate auctions with property management integration.",
      image: "/placeholder.svg?height=200&width=300&text=Real+Estate+System",
      features: ["Property listings", "Virtual tours", "Legal compliance"],
      industry: "Real Estate",
      timeline: "12 weeks",
    },
    {
      title: "Art & Collectibles Platform",
      description: "Luxury auction platform with authentication and provenance tracking.",
      image: "/placeholder.svg?height=200&width=300&text=Art+Collectibles",
      features: ["Authentication system", "Provenance tracking", "High-res imaging"],
      industry: "Art & Collectibles",
      timeline: "14 weeks",
    },
  ]

  const benefits = [
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Perfect Fit",
      description: "Solutions tailored exactly to your business requirements and processes.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-green-500" />,
      title: "Competitive Advantage",
      description: "Unique features that differentiate you from competitors in the market.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Dedicated Team",
      description: "Experienced developers focused exclusively on your project.",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Future-Proof",
      description: "Scalable architecture that grows with your business needs.",
    },
  ]

  const faqs = [
    {
      question: "How do you ensure the custom solution meets our exact requirements?",
      answer:
        "We follow a comprehensive discovery process including stakeholder interviews, requirements workshops, and iterative prototyping. Our agile development approach includes regular reviews and feedback sessions to ensure the solution aligns perfectly with your needs.",
    },
    {
      question: "Can you integrate with our existing systems and databases?",
      answer:
        "Absolutely. Our team has extensive experience integrating with various ERP systems, databases, and third-party applications. We'll analyze your current technology stack and design seamless integrations that preserve data integrity and workflow continuity.",
    },
    {
      question: "What happens if we need changes during development?",
      answer:
        "Our agile development methodology accommodates changes throughout the project. We provide regular demos and feedback sessions, allowing you to request modifications. While major scope changes may affect timeline and cost, we're flexible in adapting to your evolving needs.",
    },
    {
      question: "Do you provide ongoing support after the custom development is complete?",
      answer:
        "Yes, all custom development projects include support packages ranging from 30 days to 1 year depending on the project scope. We also offer extended support contracts, maintenance services, and additional feature development as your needs evolve.",
    },
    {
      question: "How do you handle intellectual property and code ownership?",
      answer:
        "Upon project completion and final payment, you receive full ownership of all custom code developed specifically for your project. We provide complete source code, documentation, and deployment instructions. Core platform components remain under our standard licensing terms.",
    },
    {
      question: "Can you help with scaling the solution as our business grows?",
      answer:
        "Absolutely. We design all custom solutions with scalability in mind, using modern architectures that can handle growth. We also offer ongoing development services to add new features, optimize performance, and scale infrastructure as your business expands.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
              <Code className="h-4 w-4 mr-2" />
              Custom Development
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Tailored Solutions
              <br />
              For Your Vision
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Transform your unique business requirements into reality with our custom development services. From
              specialized auction types to complex integrations, we build exactly what you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                <Link href="/contact">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Discuss Your Project
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">
                  View Custom Examples
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose Custom Development</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              When standard solutions don't fit, custom development delivers exactly what your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{benefit.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Packages */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Development Packages</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Choose the level of customization that matches your project scope and requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {developmentPackages.map((package_, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  package_.popular ? "ring-2 ring-purple-500 scale-105" : ""
                }`}
              >
                {package_.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">{package_.title}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {package_.description}
                  </CardDescription>
                  <div className="mt-4">
                    {/* <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">{package_.price}</span> */}
                    {/* <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{package_.timeline}</div> */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {package_.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong>Best for:</strong> {package_.bestFor}
                    </p>
                  </div>

                  <Button
                    className={`w-full ${package_.popular ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                    variant={package_.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Areas */}
      {/* <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Custom Development Areas</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We can customize and develop any aspect of your auction platform to meet your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-600 dark:text-purple-400">{area.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">{area.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {area.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Development Process */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Our Development Process</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Agile methodology with regular feedback loops ensures your vision becomes reality
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {developmentProcess.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{phase.phase}</h3>
                        <Badge variant="secondary">{phase.duration}</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">{phase.description}</p>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Key Activities:</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {phase.activities.map((activity, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Examples */}
      {/* <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Custom Development Examples</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Real-world examples of custom auction platforms we've built for various industries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {customizationExamples.map((example, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={example.image || "/placeholder.svg"}
                    alt={example.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-700 backdrop-blur-sm">{example.timeline}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-purple-600 dark:text-purple-400">{example.industry}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100">{example.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{example.description}</p>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Custom Features:</h4>
                    <ul className="space-y-1">
                      {example.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about custom development services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg px-6 bg-white dark:bg-slate-800"
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Custom Solution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss your unique requirements and create a custom auction platform that perfectly fits your
            business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-slate-100" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-slate-100" asChild>
              <Link href="/demo">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
