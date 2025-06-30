"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Building,
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
  Hammer,
  Shield,
} from "lucide-react"

export default function ConstructionCaseStudyPage() {
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
              <Building className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Major Infrastructure Project Optimization
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  How a $2.5B transportation project reduced costs by 22% and improved contractor performance through
                  strategic procurement
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                16 min read
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                9.4K views
              </div>
              <div>Published: September 2024</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Executive Summary */}
          <Card className="mb-8 border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The Metropolitan Transit Authority's $2.5 billion rail expansion project leveraged Briskon's procurement
                platform to optimize contractor selection and material sourcing. The implementation resulted in 22% cost
                savings, 40% faster contractor onboarding, and improved project delivery timelines while maintaining the
                highest safety and quality standards.
              </p>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">22%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cost Reduction</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Faster Onboarding</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">18 months</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">$550M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Savings</div>
              </CardContent>
            </Card>
          </div>

          {/* Project Profile */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Building className="h-6 w-6 text-orange-600" />
              Project Profile
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Project Details</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Project:</strong> Metro Rail Expansion Phase III
                      </li>
                      <li>
                        <strong>Client:</strong> Metropolitan Transit Authority
                      </li>
                      <li>
                        <strong>Value:</strong> $2.5 billion
                      </li>
                      <li>
                        <strong>Duration:</strong> 6 years
                      </li>
                      <li>
                        <strong>Scope:</strong> 15 miles of new rail, 12 stations
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Procurement Scope</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Contractors:</strong> 450+ qualified
                      </li>
                      <li>
                        <strong>Suppliers:</strong> 1,200+ materials vendors
                      </li>
                      <li>
                        <strong>Categories:</strong> Construction, Materials, Equipment
                      </li>
                      <li>
                        <strong>Contracts:</strong> 180+ major contracts
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <div className="mt-6">
                <img
                  src="/images/warehouse-worker.png"
                  alt="Construction Project Management"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                  Efficient project management and supplier coordination are critical for large infrastructure projects
                </p>
              </div>
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
                  Managing procurement for a $2.5 billion infrastructure project presented unique challenges that
                  required innovative solutions to ensure project success:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Procurement Complexity</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Managing 450+ contractors across multiple specialties
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Complex qualification requirements and certifications
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Coordinating material deliveries across 12 construction sites
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Ensuring minority and local business participation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Project Constraints</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Strict budget limitations and public oversight
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Aggressive timeline with penalty clauses
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        High safety and quality standards requirements
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Environmental compliance and sustainability goals
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
                  The Metropolitan Transit Authority implemented Briskon's comprehensive procurement platform with
                  specialized features for large-scale infrastructure projects, focusing on transparency, efficiency,
                  and compliance.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 1: Platform Setup & Integration (Months 1-2)
                    </h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Deployed Briskon with custom infrastructure project modules</li>
                        <li>• Integrated with existing project management and financial systems</li>
                        <li>• Configured compliance tracking for government regulations</li>
                        <li>• Established multi-tier approval workflows</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 2: Contractor & Supplier Onboarding (Months 3-5)
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Onboarded 450+ pre-qualified contractors</li>
                        <li>• Implemented digital credential verification system</li>
                        <li>• Created specialized categories for infrastructure trades</li>
                        <li>• Established minority and local business tracking</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 3: Procurement Execution (Months 6-72)
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Launched reverse auctions for major construction packages</li>
                        <li>• Implemented real-time bid monitoring and evaluation</li>
                        <li>• Deployed automated compliance checking and reporting</li>
                        <li>• Established performance tracking and contractor scorecards</li>
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
                        <span className="font-semibold">22%</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Total Savings</span>
                        <span className="font-semibold">$550M</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">ROI Achievement</span>
                        <span className="font-semibold">285%</span>
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
                    Project Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Contractor Onboarding Speed</span>
                        <span className="font-semibold">40% faster</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Schedule Improvement</span>
                        <span className="font-semibold">18 months</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Quality Score</span>
                        <span className="font-semibold">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <img
                      src="/images/executive-presentation.png"
                      alt="Project Leadership"
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Executive Leadership</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Strong leadership and clear communication were key factors in the successful implementation of
                      Briskon across this massive infrastructure project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Construction Category Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Hammer className="h-4 w-4 text-orange-600" />
                      General Construction
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 25% cost reduction on major contracts</li>
                      <li>• 35% improvement in contractor performance</li>
                      <li>• 50% reduction in change orders</li>
                      <li>• 30% increase in minority contractor participation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      Materials & Equipment
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 18% savings on steel and concrete</li>
                      <li>• 40% improvement in delivery schedules</li>
                      <li>• Reduced material waste by 25%</li>
                      <li>• Enhanced quality control processes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      Specialized Services
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 20% cost reduction on engineering services</li>
                      <li>• Improved safety compliance by 45%</li>
                      <li>• Faster environmental approvals</li>
                      <li>• Enhanced project coordination</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Testimonial */}
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                  "Briskon's platform was instrumental in delivering this massive infrastructure project on time and
                  under budget. The transparency and efficiency gains have set a new standard for how we approach
                  large-scale procurement. The cost savings allowed us to add additional community benefits to the
                  project."
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src="/images/business-executive.png"
                    alt="David Martinez"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">David Martinez</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Project Director, Metropolitan Transit Authority
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
                      <h4 className="font-semibold">Months 1-2: Platform Setup</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        System deployment, integration, and configuration for infrastructure projects
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Months 3-5: Stakeholder Onboarding</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Contractor qualification, supplier registration, and compliance setup
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Months 6-72: Project Execution</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Active procurement, performance monitoring, and continuous optimization
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Next Steps */}
          <section className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Infrastructure Projects?</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Learn how Briskon can help your organization achieve similar results on large-scale construction and
              infrastructure projects.
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
