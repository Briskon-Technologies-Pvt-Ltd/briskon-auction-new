"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Zap,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  BarChart3,
  FileText,
  Calendar,
  Award,
  Target,
  Lightbulb,
  Battery,
  Wind,
} from "lucide-react"

export default function EnergyUtilitiesCaseStudyPage() {
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
              <Zap className="h-8 w-8 text-yellow-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Regional Utility Grid Modernization
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  How a major utility company reduced equipment costs by 31% while accelerating renewable energy
                  integration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                14 min read
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                8.7K views
              </div>
              <div>Published: August 2024</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Executive Summary */}
          <Card className="mb-8 border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                PowerGrid Regional, serving 2.3 million customers across three states, modernized their procurement
                operations using Briskon's platform to support a $1.8 billion grid modernization initiative. The
                implementation achieved 31% cost reduction on equipment procurement, 50% faster vendor qualification,
                and accelerated renewable energy integration by 18 months.
              </p>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">31%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Equipment Cost Reduction</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Faster Vendor Qualification</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">18 months</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accelerated Timeline</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">$558M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Savings</div>
              </CardContent>
            </Card>
          </div>

          {/* Organization Profile */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-600" />
              Organization Profile
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Company Details</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Company:</strong> PowerGrid Regional
                      </li>
                      <li>
                        <strong>Service Area:</strong> 3 states, 45,000 sq miles
                      </li>
                      <li>
                        <strong>Customers:</strong> 2.3 million
                      </li>
                      <li>
                        <strong>Employees:</strong> 8,500
                      </li>
                      <li>
                        <strong>Generation Capacity:</strong> 12,500 MW
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Modernization Project</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Project Value:</strong> $1.8 billion
                      </li>
                      <li>
                        <strong>Timeline:</strong> 5 years
                      </li>
                      <li>
                        <strong>Scope:</strong> Smart grid, renewables, storage
                      </li>
                      <li>
                        <strong>Suppliers:</strong> 800+ qualified vendors
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
                  PowerGrid Regional faced significant challenges in modernizing their aging infrastructure while
                  managing costs and integrating new renewable energy sources:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Technical Challenges</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Aging grid infrastructure requiring complete overhaul
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Complex integration of renewable energy sources
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Need for advanced smart grid technologies
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Stringent reliability and safety requirements
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Procurement Issues</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Limited qualified suppliers for specialized equipment
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Long lead times for critical infrastructure components
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Rising equipment costs impacting project budget
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Complex regulatory compliance requirements
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
              <Lightbulb className="h-6 w-6 text-green-600" />
              The Solution
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  PowerGrid Regional implemented Briskon's specialized utility procurement platform with features
                  designed for complex infrastructure projects and regulatory compliance in the energy sector.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 1: Platform Deployment (Months 1-3)
                    </h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Deployed Briskon with utility-specific modules and compliance features</li>
                        <li>• Integrated with existing asset management and grid control systems</li>
                        <li>• Configured specialized categories for power generation and transmission equipment</li>
                        <li>• Established regulatory compliance tracking and documentation</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 2: Supplier Ecosystem Development (Months 4-6)
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Onboarded 800+ specialized utility equipment suppliers</li>
                        <li>• Implemented rigorous supplier qualification and certification processes</li>
                        <li>• Created performance scorecards for reliability and delivery metrics</li>
                        <li>• Established strategic partnerships with renewable energy technology providers</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 3: Modernization Execution (Months 7-60)
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Launched competitive bidding for major equipment packages</li>
                        <li>• Implemented real-time project tracking and milestone management</li>
                        <li>• Deployed predictive analytics for demand forecasting and procurement planning</li>
                        <li>• Established automated compliance monitoring and reporting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h4 className="text-xl font-semibold mb-3">Technology Integration</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          PowerGrid Regional's IT team worked closely with Briskon specialists to ensure seamless
                          integration with existing utility management systems and regulatory compliance tools.
                        </p>
                      </div>
                      <div>
                        <img
                          src="/images/tech-professional.png"
                          alt="Technology Integration"
                          className="w-full h-48 object-cover rounded-lg shadow-lg"
                        />
                      </div>
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
                    Financial Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Equipment Cost Reduction</span>
                        <span className="font-semibold">31%</span>
                      </div>
                      <Progress value={31} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Total Project Savings</span>
                        <span className="font-semibold">$558M</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">ROI Achievement</span>
                        <span className="font-semibold">380%</span>
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
                        <span className="text-sm">Vendor Qualification Speed</span>
                        <span className="font-semibold">50% faster</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Project Acceleration</span>
                        <span className="font-semibold">18 months</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Compliance Score</span>
                        <span className="font-semibold">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <img
                      src="/images/platform-showcase.png"
                      alt="Utility Procurement Platform"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Modernized Procurement Platform</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      The customized Briskon platform now serves as PowerGrid Regional's central hub for all procurement
                      activities, from smart grid equipment to renewable energy components.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Modernization Category Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      Smart Grid Infrastructure
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 35% cost reduction on smart meters</li>
                      <li>• 40% faster deployment timeline</li>
                      <li>• Enhanced grid monitoring capabilities</li>
                      <li>• Improved outage response times</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Wind className="h-4 w-4 text-green-600" />
                      Renewable Energy Integration
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 28% savings on solar panel procurement</li>
                      <li>• 45% reduction in wind turbine costs</li>
                      <li>• Accelerated renewable capacity addition</li>
                      <li>• Improved grid stability with renewables</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Battery className="h-4 w-4 text-blue-600" />
                      Energy Storage Systems
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 32% cost reduction on battery systems</li>
                      <li>• Enhanced grid reliability and stability</li>
                      <li>• Improved peak demand management</li>
                      <li>• Advanced energy storage optimization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Testimonial */}
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                  "Briskon's platform was crucial to the success of our grid modernization project. The cost savings and
                  efficiency gains allowed us to accelerate our renewable energy integration timeline while maintaining
                  the highest standards of reliability and safety. Our customers are already seeing the benefits through
                  improved service and lower rates."
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src="/images/business-executive.png"
                    alt="Sarah Thompson"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">Sarah Thompson</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Chief Operating Officer, PowerGrid Regional
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Next Steps */}
          <section className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Modernize Your Utility Procurement</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Discover how Briskon can help your utility organization achieve similar results in grid modernization and
              renewable energy integration.
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
