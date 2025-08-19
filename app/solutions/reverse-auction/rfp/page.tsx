"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileCheck, Users, Target, ArrowRight, Play, CheckCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RFPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-600/5 dark:to-indigo-600/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50">
              <FileCheck className="h-4 w-4 mr-2" />
              Selaed Bid Reverse Auction
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Comprehensive RFP Process - Sealed Bid
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Transform your complex procurement with our intelligent Sealed Bid Reverse Auction ( best suited for RFP's) platform. Manage comprehensive proposals
              with detailed evaluations, ensuring you select the best partners for strategic initiatives and complex
              projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                asChild
              >
                <Link href="/demo">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                asChild
              >
                <Link href="/get-started">
                  Create RFP
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RFP Process */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Comprehensive RFP Management</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From detailed requirements to proposal evaluation and supplier/vendor selection
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Detailed Requirements</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Create comprehensive requirement documents with specifications and criteria.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Supplier/Vendor Outreach</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Invite qualified suppliers/vendors and manage the proposal submission using sealed bid process.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Proposal Evaluation</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Comprehensive evaluation using proposal and documents submitted by suppliers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Supplier/Vendor Selection</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Select the best supplier/vendor based on comprehensive evaluation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose Briskon Sealed Bid Reverse Auctions?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Advanced features that streamline complex proposal management and evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                    Structured Evaluation Framework
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Built-in evaluation templates and scoring matrices for consistent, fair assessment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                    Collaborative Review Process
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Multi-stakeholder review workflows with role-based access and approval processes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">Document Management</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Centralized document repository with version control and secure sharing
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">Compliance & Audit</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Complete audit trails and compliance reporting for regulatory requirements
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/rfp-process-workflow.png"
                alt="RFP Process Workflow"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RFP Types */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">RFP Categories We Support</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Specialized RFP templates and processes for different types of complex procurement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Technology RFPs",
                description: "Software, hardware, and IT service implementations",
                image: "/images/rfp-document-icon.png",
                features: ["Technical specifications", "Integration requirements", "Security compliance"],
              },
              {
                title: "Professional Services",
                description: "Consulting, legal, and specialized service engagements",
                image: "/images/professional-services-interface.png",
                features: ["Expertise evaluation", "Case studies", "Team qualifications"],
              },
              {
                title: "Construction Projects",
                description: "Building, infrastructure, and construction management",
                image: "/images/construction-facility-complex.png",
                features: ["Project timelines", "Safety records", "Licensing verification"],
              },
              {
                title: "Strategic Partnerships",
                description: "Long-term partnerships and joint venture agreements",
                image: "/images/strategic-partnership-gears.png",
                features: ["Strategic alignment", "Cultural fit", "Partnership terms"],
              },
            ].map((rfpType, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={rfpType.image || "/placeholder.svg"}
                    alt={rfpType.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">{rfpType.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{rfpType.description}</p>
                  <div className="space-y-2">
                    {rfpType.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your RFP Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Transform complex procurement with intelligent RFP management that ensures the best outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              asChild
            >
              <Link href="/get-started">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="border-3 border-white text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm bg-white/15 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
