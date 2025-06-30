"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  GraduationCap,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  BarChart3,
  FileText,
  Calendar,
  Award,
  Target,
  Zap,
} from "lucide-react"

export default function EducationCaseStudyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <section className="pt-24 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Resources
                </Link>
              </Button>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <BarChart3 className="h-3 w-3 mr-1" />
                Case Study
              </Badge>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  University System Procurement Transformation
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  How a major state university system reduced procurement costs by 28% while improving vendor diversity
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                15 min read
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                7.8K views
              </div>
              <div>Published: November 2024</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Executive Summary */}
          <Card className="mb-8 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The California State University System, serving over 485,000 students across 23 campuses, transformed
                their procurement operations using Briskon's reverse auction platform. Within 18 months, they achieved a
                28% reduction in procurement costs, improved vendor diversity by 45%, and streamlined their procurement
                cycle from 120 days to 45 days average.
              </p>
            </CardContent>
          </Card>

          {/* Platform Showcase */}
          <section className="mb-8">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Briskon Platform in Action</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    See how the California State University System leveraged Briskon's comprehensive auction platform to
                    transform their procurement operations across all 23 campuses.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      100% customizable to university branding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Mobile-optimized for on-the-go procurement
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Integrated forward and reverse auction capabilities
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src="/images/platform-showcase.png"
                    alt="Briskon Platform Interface"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">28%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cost Reduction</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Vendor Diversity Increase</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">75 days</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cycle Time Reduction</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">$47M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</div>
              </CardContent>
            </Card>
          </div>

          {/* Organization Profile */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              Organization Profile
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Organization Details</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>System:</strong> California State University
                      </li>
                      <li>
                        <strong>Campuses:</strong> 23 locations
                      </li>
                      <li>
                        <strong>Students:</strong> 485,000+
                      </li>
                      <li>
                        <strong>Employees:</strong> 56,000+
                      </li>
                      <li>
                        <strong>Annual Budget:</strong> $5.2 billion
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Procurement Scope</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Annual Procurement:</strong> $1.8 billion
                      </li>
                      <li>
                        <strong>Vendors:</strong> 12,000+ active
                      </li>
                      <li>
                        <strong>Categories:</strong> IT, Facilities, Food Service, Research
                      </li>
                      <li>
                        <strong>Transactions:</strong> 45,000+ annually
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Challenge */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-6 w-6 text-red-600" />
              The Challenge
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The university system faced significant procurement challenges that were impacting their ability to
                  serve students effectively while maintaining fiscal responsibility:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Operational Challenges</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Manual procurement processes taking 120+ days
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Limited vendor participation due to complex bidding
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Inconsistent pricing across 23 campuses
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Paper-based documentation and approvals
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Financial Impact</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Higher costs due to limited competition
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Budget overruns in multiple departments
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Lack of spend visibility and control
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Compliance issues with state regulations
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Solution */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-green-600" />
              The Solution
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  The university system implemented Briskon's comprehensive procurement platform with a phased approach
                  across all 23 campuses, focusing on transparency, efficiency, and vendor diversity.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 1: Platform Implementation (Months 1-3)
                    </h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Deployed Briskon platform across all 23 campuses</li>
                        <li>• Integrated with existing ERP and financial systems</li>
                        <li>• Trained 150+ procurement staff members</li>
                        <li>• Established standardized procurement categories</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 2: Vendor Onboarding (Months 4-6)
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Onboarded 2,500+ vendors to the platform</li>
                        <li>• Implemented vendor diversity tracking</li>
                        <li>• Created vendor performance scorecards</li>
                        <li>• Established automated vendor communications</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 3: Process Optimization (Months 7-12)
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Implemented reverse auctions for major categories</li>
                        <li>• Automated approval workflows</li>
                        <li>• Deployed real-time spend analytics</li>
                        <li>• Established contract management processes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Results */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Results & Impact
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Financial Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Cost Reduction</span>
                        <span className="font-semibold">28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Annual Savings</span>
                        <span className="font-semibold">$47M</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">ROI Achievement</span>
                        <span className="font-semibold">340%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Operational Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Cycle Time Reduction</span>
                        <span className="font-semibold">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Vendor Diversity</span>
                        <span className="font-semibold">+45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Process Automation</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Achievements by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">IT & Technology</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 32% cost reduction on software licensing</li>
                      <li>• 45% faster hardware procurement</li>
                      <li>• Improved vendor competition (8 vs 3 bidders avg)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Facilities & Maintenance</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 25% savings on construction projects</li>
                      <li>• 50% reduction in emergency purchases</li>
                      <li>• Standardized maintenance contracts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Food Services</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 22% cost reduction on food procurement</li>
                      <li>• Increased local vendor participation</li>
                      <li>• Improved sustainability metrics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Research Equipment</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 18% savings on lab equipment</li>
                      <li>• Faster research project initiation</li>
                      <li>• Better vendor service levels</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Testimonial */}
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                  "Briskon has revolutionized our procurement operations. We've not only achieved significant cost
                  savings but also improved our vendor diversity and compliance with state regulations. The platform's
                  transparency and efficiency have been game-changing for our university system."
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src="/images/business-executive.png"
                    alt="Maria Rodriguez"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">Maria Rodriguez</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Chief Procurement Officer, California State University System
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Implementation Timeline */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-purple-600" />
              Implementation Timeline
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Months 1-3: Foundation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Platform deployment, system integration, and staff training
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Months 4-6: Vendor Onboarding</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Vendor registration, diversity programs, and performance tracking
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Months 7-12: Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Process automation, analytics deployment, and continuous improvement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Months 13-18: Scale & Expand</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Advanced features, strategic sourcing, and performance optimization
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Next Steps */}
          <section className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Procurement?</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              See how Briskon can help your educational institution achieve similar results with modern procurement
              solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/demo">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/resources/case-studies">
                  <FileText className="h-5 w-5 mr-2" />
                  More Case Studies
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
