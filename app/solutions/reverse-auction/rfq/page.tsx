"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, CheckCircle, ArrowRight, Play, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RFQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 dark:from-green-600/5 dark:to-blue-600/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50">
              <FileText className="h-4 w-4 mr-2" />
              Ranked Reverse Auction
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Ranked Bidding for Excellence
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Briskon’s Ranked Reverse Auction platform transforms procurement by delivering timely, competitive proposals. Ensures full visibility and operational efficiency at every stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
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
                  Create RFQ
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Process */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Efficient Ranked Bid Management</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
             Powering decisions with Ranked Reverse auctions: Suppliers submit their best offers and can rebid to improve their rank.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Invite Suppliers</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                Engage qualified vendors to participate in the ranked auction event.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Bidding Starts</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                Suppliers submit their best offers and can rebid to improve their rank
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">See Your Rank</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                Participants see whether they are ranked 1st, 2nd, 3rd, etc. — but exact bid values remain confidential.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Select Winner</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                Buyer awards the contract to the most competitive supplier based on rank and evaluation criteria
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose Briskon Ranked Reverse Auction?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Advanced capabilities that make supplier selection seamless, strategic, and transparent
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  Smart Supplier Ranking
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                  Automated evaluation system identifies and prioritizes the best-fit suppliers based on custom ranking criteria
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  Collaborative Bidding Environment
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                  Integrated communication suite enables direct engagement and real-time clarification between parties
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  Actionable Insights
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                  Advanced analytics deliver clear, data-driven recommendations for optimal procurement choices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">Transparent & Secure</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                  Full process visibility with enterprise-grade security and compliance throughout every bidding stage
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/rfq-process-diagram.png"
                alt="RFQ Process Diagram"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Smart Procurement Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start getting better quotes faster with Briskon's intelligent Ranked Reverse Auction platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              asChild
            >
              <Link href="/get-started">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="border-3 border-white text-white hover:bg-white hover:text-green-600 backdrop-blur-sm bg-white/15 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
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