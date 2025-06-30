"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ShoppingCart,
  TrendingUp,
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
  Globe,
  Package,
} from "lucide-react"

export default function RetailEcommerceCaseStudyPage() {
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
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Global Retail Chain Supply Optimization
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  How a Fortune 500 retailer reduced procurement costs by 35% and improved supplier performance across
                  2,800 stores
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                18 min read
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                11.2K views
              </div>
              <div>Published: October 2024</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Executive Summary */}
          <Card className="mb-8 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                MegaRetail Corp, a Fortune 500 retail chain with 2,800 stores across North America, transformed their
                supplier procurement using Briskon's reverse auction platform. The implementation resulted in 35% cost
                reduction, 60% faster supplier onboarding, and improved product quality across all categories including
                private label, store fixtures, and operational supplies.
              </p>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">35%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cost Reduction</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">60%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Faster Onboarding</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">2,800</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Stores Optimized</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">$180M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</div>
              </CardContent>
            </Card>
          </div>

          {/* Organization Profile */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
              Organization Profile
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Company Details</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Company:</strong> MegaRetail Corp
                      </li>
                      <li>
                        <strong>Industry:</strong> Retail & E-commerce
                      </li>
                      <li>
                        <strong>Stores:</strong> 2,800 locations
                      </li>
                      <li>
                        <strong>Employees:</strong> 450,000+
                      </li>
                      <li>
                        <strong>Annual Revenue:</strong> $85 billion
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Procurement Scope</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Annual Procurement:</strong> $12 billion
                      </li>
                      <li>
                        <strong>Suppliers:</strong> 25,000+ active
                      </li>
                      <li>
                        <strong>Categories:</strong> Private Label, Fixtures, Operations
                      </li>
                      <li>
                        <strong>SKUs:</strong> 180,000+ managed
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
                  As one of the largest retail chains in North America, MegaRetail faced complex procurement challenges
                  that were impacting their competitive position and profitability:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Supply Chain Complexity</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Managing 25,000+ suppliers across multiple categories
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Inconsistent pricing across regional suppliers
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Long supplier onboarding cycles (6+ months)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Limited visibility into supplier performance
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Operational Inefficiencies</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Manual RFP processes taking 90+ days
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Fragmented procurement across store regions
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Rising procurement costs impacting margins
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        Quality issues with private label products
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <img
                    src="/images/warehouse-worker.png"
                    alt="Supply Chain Operations"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                    Modern supply chain operations require efficient digital procurement solutions
                  </p>
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
                  MegaRetail implemented Briskon's comprehensive procurement platform with a focus on supplier
                  optimization, cost reduction, and quality improvement across their entire supply chain.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 1: Platform Deployment (Months 1-4)
                    </h4>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Deployed Briskon across all regional procurement centers</li>
                        <li>• Integrated with existing ERP and inventory management systems</li>
                        <li>• Trained 200+ procurement professionals</li>
                        <li>• Established standardized procurement categories and processes</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 2: Supplier Migration (Months 5-8)
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Migrated 25,000+ suppliers to the digital platform</li>
                        <li>• Implemented supplier performance tracking and scorecards</li>
                        <li>• Established automated supplier qualification processes</li>
                        <li>• Created regional supplier networks for local sourcing</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Phase 3: Optimization & Scale (Months 9-12)
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Launched reverse auctions for major procurement categories</li>
                        <li>• Implemented AI-powered supplier matching and recommendations</li>
                        <li>• Deployed real-time spend analytics and cost optimization tools</li>
                        <li>• Established automated contract management and renewals</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h4 className="text-xl font-semibold mb-3">Advanced Auction Interface</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          MegaRetail's suppliers now use Briskon's intuitive auction interface to participate in
                          competitive bidding processes, resulting in better pricing and improved supplier engagement.
                        </p>
                      </div>
                      <div>
                        <img
                          src="/images/auction-interface.png"
                          alt="Briskon Auction Interface"
                          className="w-full h-auto rounded-lg shadow-lg"
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
                        <span className="text-sm">Cost Reduction</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Annual Savings</span>
                        <span className="font-semibold">$180M</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">ROI Achievement</span>
                        <span className="font-semibold">420%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Operational Improvements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Supplier Onboarding Speed</span>
                        <span className="font-semibold">60% faster</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Process Automation</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Quality Improvement</span>
                        <span className="font-semibold">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Category-Specific Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Package className="h-4 w-4 text-purple-600" />
                      Private Label Products
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 38% cost reduction on manufacturing</li>
                      <li>• 45% improvement in quality scores</li>
                      <li>• 30% faster time-to-market</li>
                      <li>• 25% increase in supplier diversity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      Store Fixtures & Equipment
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 32% savings on store renovations</li>
                      <li>• 50% reduction in installation time</li>
                      <li>• Standardized fixture specifications</li>
                      <li>• Improved vendor service levels</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Operational Supplies
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 28% cost reduction on supplies</li>
                      <li>• 60% improvement in delivery times</li>
                      <li>• Consolidated supplier relationships</li>
                      <li>• Automated inventory replenishment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Testimonial */}
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                  "Briskon has transformed how we manage our supply chain. The cost savings have been remarkable, but
                  more importantly, we've improved our supplier relationships and product quality. Our customers are
                  seeing the benefits through better products at competitive prices."
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src="/images/business-executive.png"
                    alt="James Chen"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">James Chen</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Chief Procurement Officer, MegaRetail Corp
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Next Steps */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Transform Your Retail Procurement</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Discover how Briskon can help your retail organization achieve similar cost savings and operational
              improvements.
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
