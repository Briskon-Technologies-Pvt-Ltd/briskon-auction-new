"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Server, Shield, Code, CheckCircle, ArrowRight, Download, Database, Lock } from "lucide-react"
import Link from "next/link"

export default function OnPremisePage() {
  const deploymentOptions = [
    {
      title: "Standard Deployment",
      description: "Complete auction platform with all core features for enterprise use.",
      price: "$50,000",
      timeline: "4-6 weeks",
      features: [
        "Full source code access",
        "Complete platform installation",
        "Basic customization",
        "Standard integrations",
        "Documentation package",
        "90-day support",
      ],
      bestFor: "Organizations with standard requirements",
    },
    {
      title: "Enterprise Deployment",
      description: "Advanced deployment with custom configurations and enterprise features.",
      price: "$85,000",
      timeline: "6-8 weeks",
      features: [
        "Everything in Standard",
        "Custom configurations",
        "Advanced security setup",
        "Multiple environment setup",
        "Custom integrations",
        "1-year premium support",
      ],
      bestFor: "Large enterprises with complex needs",
      popular: true,
    },
    {
      title: "High-Availability Deployment",
      description: "Mission-critical deployment with redundancy and disaster recovery.",
      price: "$120,000",
      timeline: "8-10 weeks",
      features: [
        "Everything in Enterprise",
        "High-availability architecture",
        "Disaster recovery setup",
        "Load balancing configuration",
        "24/7 monitoring setup",
        "Dedicated support team",
      ],
      bestFor: "Mission-critical applications",
    },
  ]

  const technicalSpecs = [
    {
      category: "Infrastructure Requirements",
      items: [
        "Linux/Windows Server 2019+",
        "Minimum 16GB RAM (32GB recommended)",
        "100GB+ storage space",
        "Docker & Kubernetes support",
        "Load balancer capability",
        "SSL certificate management",
      ],
    },
    {
      category: "Database Support",
      items: [
        "PostgreSQL 12+ (recommended)",
        "MySQL 8.0+",
        "Microsoft SQL Server 2019+",
        "Oracle Database 19c+",
        "MongoDB 4.4+",
        "Redis for caching",
      ],
    },
    {
      category: "Security Features",
      items: [
        "End-to-end encryption",
        "Role-based access control",
        "Multi-factor authentication",
        "Audit logging",
        "Data masking capabilities",
        "Compliance reporting",
      ],
    },
  ]

  const implementationProcess = [
    {
      phase: "Planning & Assessment",
      duration: "1-2 weeks",
      description: "Infrastructure assessment, requirements gathering, and deployment planning.",
      deliverables: [
        "Infrastructure assessment report",
        "Deployment architecture design",
        "Security configuration plan",
        "Integration requirements document",
      ],
    },
    {
      phase: "Environment Setup",
      duration: "2-3 weeks",
      description: "Server provisioning, software installation, and basic configuration.",
      deliverables: [
        "Production environment setup",
        "Development/staging environments",
        "Database configuration",
        "Security hardening",
      ],
    },
    {
      phase: "Configuration & Customization",
      duration: "1-2 weeks",
      description: "Platform configuration, customization, and integration setup.",
      deliverables: [
        "Platform configuration",
        "Custom feature implementation",
        "Third-party integrations",
        "User interface customization",
      ],
    },
    {
      phase: "Testing & Training",
      duration: "1-2 weeks",
      description: "Comprehensive testing, user training, and documentation delivery.",
      deliverables: [
        "System testing completion",
        "User training sessions",
        "Administrator documentation",
        "Go-live readiness assessment",
      ],
    },
  ]

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Complete Control",
      description: "Full control over your data, security policies, and system configurations.",
    },
    {
      icon: <Lock className="h-8 w-8 text-green-500" />,
      title: "Enhanced Security",
      description: "Deploy within your secure network with custom security configurations.",
    },
    {
      icon: <Code className="h-8 w-8 text-purple-500" />,
      title: "Source Code Access",
      description: "Complete source code access for unlimited customization possibilities.",
    },
    {
      icon: <Database className="h-8 w-8 text-orange-500" />,
      title: "Data Sovereignty",
      description: "Keep all your data within your infrastructure and jurisdiction.",
    },
  ]

  const faqs = [
    {
      question: "What infrastructure do I need for on-premise deployment?",
      answer:
        "You'll need a modern server environment with at least 16GB RAM, 100GB storage, and support for containerization. We provide detailed infrastructure requirements during the planning phase and can help with sizing recommendations based on your expected usage.",
    },
    {
      question: "How long does the on-premise installation take?",
      answer:
        "Standard deployments typically take 4-6 weeks from contract signing to go-live. This includes planning, installation, configuration, testing, and training. Complex enterprise deployments may take 6-10 weeks depending on customization requirements.",
    },
    {
      question: "Do you provide ongoing support after installation?",
      answer:
        "Yes, all on-premise deployments include support packages ranging from 90 days to 1 year depending on the deployment tier. We also offer extended support contracts and managed services for ongoing maintenance and updates.",
    },
    {
      question: "Can I customize the platform after installation?",
      answer:
        "Absolutely. With source code access, you have complete freedom to customize the platform. We also provide development documentation and can offer consulting services for major customizations or new feature development.",
    },
    {
      question: "How do updates and new features work with on-premise deployment?",
      answer:
        "We provide regular updates and new features as part of your support package. You control when and how to apply updates to ensure they align with your change management processes and maintenance windows.",
    },
    {
      question: "What compliance standards does the platform support?",
      answer:
        "The platform is designed to support various compliance standards including SOC 2, GDPR, HIPAA, and industry-specific regulations. We can configure the platform to meet your specific compliance requirements during deployment.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              <Server className="h-4 w-4 mr-2" />
              On-Premise Installation
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Deploy Briskon
              <br />
              On Your Infrastructure
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Take complete control of your auction platform with our comprehensive on-premise deployment solution. Get
              full source code access, unlimited customization, and enterprise-grade security within your own
              infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/contact">
                  <Download className="h-5 w-5 mr-2" />
                  Request Deployment
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">
                  Schedule Consultation
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
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose On-Premise Deployment</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Perfect for organizations that need complete control, enhanced security, and unlimited customization
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

      {/* Deployment Options */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Deployment Options</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Choose the deployment package that best fits your organization's needs and requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {deploymentOptions.map((option, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  option.popular ? "ring-2 ring-blue-500 scale-105" : ""
                }`}
              >
                {option.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">{option.title}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">{option.description}</CardDescription>
                  <div className="mt-4">
                    {/* <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">{option.price}</span> */}
                    {/* <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{option.timeline}</div> */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong>Best for:</strong> {option.bestFor}
                    </p>
                  </div>

                  <Button
                    className={`w-full ${option.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={option.popular ? "default" : "outline"}
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

      {/* Technical Specifications */}
      {/* <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Technical Specifications</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Comprehensive technical requirements and supported technologies for successful deployment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technicalSpecs.map((spec, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-center text-slate-900 dark:text-slate-100">
                    {spec.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {spec.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Implementation Process */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Implementation Process</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our proven methodology ensures smooth deployment and successful adoption
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {implementationProcess.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{phase.phase}</h3>
                        <Badge variant="secondary">{phase.duration}</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">{phase.description}</p>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Key Deliverables:</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {deliverable}
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

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about on-premise deployment
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg px-6"
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Deploy Briskon On-Premise?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Take complete control of your auction platform with our comprehensive on-premise deployment solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100" asChild>
              <Link href="/contact">
                Request Deployment
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100" asChild>
              <Link href="/demo">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
