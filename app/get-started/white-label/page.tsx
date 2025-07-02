"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Palette,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Building,
  Rocket,
  Shield,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function WhiteLabelPage() {
  const whiteLabelPackages = [
    {
      title: "Starter White Label",
      description: "Quick deployment with essential branding and customization features.",
      price: "$25,000",
      timeline: "2-4 weeks",
      features: [
        "Complete brand customization",
        "Custom domain setup",
        "Logo and color scheme",
        "Basic UI modifications",
        "Mobile responsive design",
        "3-month support",
      ],
      bestFor: "Small to medium businesses",
    },
    {
      title: "Professional White Label",
      description: "Advanced branding with custom features and enhanced user experience.",
      price: "$45,000",
      timeline: "4-6 weeks",
      features: [
        "Everything in Starter",
        "Custom mobile apps",
        "Advanced UI customization",
        "Marketing materials",
        "SEO optimization",
        "6-month support",
      ],
      bestFor: "Growing businesses and marketplaces",
      popular: true,
    },
    {
      title: "Enterprise White Label",
      description: "Complete white label solution with advanced features and full customization.",
      price: "$75,000",
      timeline: "6-8 weeks",
      features: [
        "Everything in Professional",
        "Multi-tenant architecture",
        "Advanced analytics dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "1-year premium support",
      ],
      bestFor: "Large enterprises and platforms",
    },
  ]

  const brandingFeatures = [
    {
      category: "Visual Identity",
      icon: <Palette className="h-6 w-6" />,
      items: [
        "Custom logo integration",
        "Brand color schemes",
        "Typography selection",
        "Custom iconography",
        "Brand guidelines compliance",
        "Visual consistency",
      ],
    },
    {
      category: "User Experience",
      icon: <Users className="h-6 w-6" />,
      items: [
        "Custom user interface",
        "Branded user journeys",
        "Personalized dashboards",
        "Custom notifications",
        "Branded email templates",
        "User onboarding flows",
      ],
    },
    {
      category: "Mobile Applications",
      icon: <Smartphone className="h-6 w-6" />,
      items: [
        "iOS app development",
        "Android app development",
        "App store optimization",
        "Push notifications",
        "Offline capabilities",
        "App analytics",
      ],
    },
    {
      category: "Marketing Assets",
      icon: <TrendingUp className="h-6 w-6" />,
      items: [
        "Marketing website",
        "Landing page templates",
        "Social media assets",
        "Email campaigns",
        "SEO optimization",
        "Content management",
      ],
    },
  ]

  const deploymentProcess = [
    {
      phase: "Brand Discovery",
      duration: "3-5 days",
      description: "Understanding your brand identity, target audience, and market positioning.",
      deliverables: ["Brand analysis report", "Design requirements", "Technical specifications", "Project timeline"],
    },
    {
      phase: "Design & Development",
      duration: "2-4 weeks",
      description: "Creating your branded platform with custom design and functionality.",
      deliverables: [
        "Custom design system",
        "Branded platform deployment",
        "Mobile app development",
        "Quality assurance testing",
      ],
    },
    {
      phase: "Launch Preparation",
      duration: "3-5 days",
      description: "Final testing, training, and preparation for market launch.",
      deliverables: [
        "Platform testing completion",
        "Team training sessions",
        "Marketing materials",
        "Launch strategy guide",
      ],
    },
    {
      phase: "Go-Live & Support",
      duration: "Ongoing",
      description: "Platform launch with ongoing support and optimization.",
      deliverables: [
        "Live platform deployment",
        "Performance monitoring",
        "User support setup",
        "Continuous optimization",
      ],
    },
  ]

  const successStories = [
    {
      title: "AuctionPro Marketplace",
      description: "B2B marketplace for industrial equipment with custom branding and mobile apps.",
      image: "/placeholder.svg?height=200&width=300&text=AuctionPro+Marketplace",
      results: "300% increase in user engagement",
      industry: "Industrial Equipment",
      timeline: "5 weeks",
      features: ["Custom mobile apps", "Industry-specific features", "Advanced analytics"],
    },
    {
      title: "ArtBid Platform",
      description: "Luxury art auction platform with sophisticated branding and user experience.",
      image: "/placeholder.svg?height=200&width=300&text=ArtBid+Platform",
      results: "250% growth in premium sales",
      industry: "Art & Collectibles",
      timeline: "6 weeks",
      features: ["Luxury design", "High-res image galleries", "Provenance tracking"],
    },
    {
      title: "AgriTrade Exchange",
      description: "Agricultural commodity trading platform with farmer-focused design.",
      image: "/placeholder.svg?height=200&width=300&text=AgriTrade+Exchange",
      results: "400% increase in farmer adoption",
      industry: "Agriculture",
      timeline: "4 weeks",
      features: ["Mobile-first design", "Commodity tracking", "Weather integration"],
    },
  ]

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-green-500" />,
      title: "Rapid Market Entry",
      description: "Launch your branded auction platform in weeks, not months.",
    },
    {
      icon: <Building className="h-8 w-8 text-blue-500" />,
      title: "Complete Brand Control",
      description: "Full customization to match your brand identity and values.",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Proven Technology",
      description: "Built on our battle-tested platform with enterprise-grade reliability.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-orange-500" />,
      title: "Scalable Solution",
      description: "Grows with your business from startup to enterprise scale.",
    },
  ]

  const faqs = [
    {
      question: "How quickly can we launch our white label platform?",
      answer:
        "Our white label solutions can be deployed in as little as 2-4 weeks for standard packages. The timeline depends on the level of customization required. We provide a detailed timeline during the initial consultation based on your specific requirements.",
    },
    {
      question: "Can we customize the platform beyond just branding?",
      answer:
        "Absolutely. While our white label solution focuses on branding and user experience, we can also customize functionality, add new features, and integrate with your existing systems. Our Professional and Enterprise packages include various levels of functional customization.",
    },
    {
      question: "Do you provide mobile apps as part of the white label solution?",
      answer:
        "Yes, our Professional and Enterprise white label packages include custom mobile apps for both iOS and Android. The apps are fully branded with your identity and include all the core auction platform functionality optimized for mobile use.",
    },
    {
      question: "What ongoing support do you provide after launch?",
      answer:
        "All white label packages include ongoing support ranging from 3 months to 1 year depending on the package. This includes technical support, platform updates, performance monitoring, and assistance with any issues. Extended support contracts are also available.",
    },
    {
      question: "Can we add our own features and integrations later?",
      answer:
        "Yes, the platform is designed to be extensible. You can add new features, integrations, and customizations as your business grows. We provide APIs and development documentation, and our team can assist with additional development as needed.",
    },
    {
      question: "How do you handle data ownership and privacy?",
      answer:
        "You maintain complete ownership of your data and customer information. The platform can be deployed on your infrastructure or our secure cloud with strict data isolation. We comply with all major privacy regulations including GDPR and CCPA.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              <Palette className="h-4 w-4 mr-2" />
              White Label Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Your Brand,
              <br />
              Our Technology
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Launch your own branded auction platform with our comprehensive white label solution. Get to market
              quickly with a fully customized platform that reflects your brand identity and values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link href="/contact">
                  <Rocket className="h-5 w-5 mr-2" />
                  Launch Your Platform
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">
                  View Examples
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
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose White Label</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              The fastest way to launch your own auction platform with complete brand control
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

      {/* White Label Packages */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">White Label Packages</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Choose the package that best fits your brand requirements and business goals
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {whiteLabelPackages.map((package_, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  package_.popular ? "ring-2 ring-green-500 scale-105" : ""
                }`}
              >
                {package_.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
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
                    className={`w-full ${package_.popular ? "bg-green-600 hover:bg-green-700" : ""}`}
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

      {/* Branding Features */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Complete Branding Customization</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Every aspect of the platform can be customized to reflect your brand identity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandingFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-green-600 dark:text-green-400">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">{feature.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Process */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Deployment Process</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From concept to launch in just a few weeks with our streamlined process
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {deploymentProcess.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{phase.phase}</h3>
                        <Badge variant="secondary">{phase.duration}</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">{phase.description}</p>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Deliverables:</h4>
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

      {/* Success Stories */}
      {/* <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">White Label Success Stories</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See how businesses have successfully launched their branded auction platforms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-700 backdrop-blur-sm">{story.timeline}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400">{story.industry}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100">{story.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{story.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {story.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      {story.results}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about our white label solution
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Branded Platform?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get to market quickly with a fully branded auction platform that reflects your unique identity and values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-slate-100" asChild>
              <Link href="/contact">
                Launch Your Platform
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-slate-100" asChild>
              <Link href="/demo">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
