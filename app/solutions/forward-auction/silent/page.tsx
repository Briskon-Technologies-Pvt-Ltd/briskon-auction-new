"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Clock, Target, ArrowRight, Play, CheckCircle, TrendingDown, TrendingUp, ArrowUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SilentAuctionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 dark:from-orange-600/5 dark:to-red-600/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50">
              <ArrowUp className="h-4 w-4 mr-2" />
              Silent Auction Format
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              Silent Bid Auctions
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Step into a refined bidding experience where strategy unfolds in complete quiet. In silent auctions, each bid is placed privately, creating an exclusive, anticipation-driven atmosphere. Perfect for premium assets, fundraising galas, art sales, and events where sophistication and discretion elevate every transaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800 text-white"
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
                  Start Auction
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How Silent Auctions Work */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">How Silent Bid Auctions Work</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Bidders submit their offers confidentially, without visibility into others’ bids. Once the auction ends, results are revealed, blending fairness with the thrill of discovery and rewarding the most strategic participant.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Private Bidding</h3>
                <p className="text-slate-600 dark:text-slate-300">
                All bids remain confidential until the auction closes, ensuring a level playing field for all participants.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Strategic Submissions</h3>
                <p className="text-slate-600 dark:text-slate-300">
                Bidders must decide their best offer upfront, without knowing what others have submitted.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Surprise Reveal</h3>
                <p className="text-slate-600 dark:text-slate-300">
                At closing, bids are unveiled, and the highest (or most favorable) offer wins, creating suspense and excitement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Silent Bid Auction Featuress</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Advanced tools to enhance privacy, strategy, and engagement in silent auctions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  Confidential Bid Submissions 
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Secure, private channels for submitting bids without visibility into competitors’ offers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  Custom Bid Deadlines
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                  Flexible closing times to suit event flow and participant availability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  Automated Result Reveal
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                  Instant disclosure of winning bids once the auction closes, adding suspense and excitement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  Multi-Item Support
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                  Run silent auctions for single or multiple items simultaneously with ease

                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/silent-bid-process.png"
                alt="Silent Bid Auction Bidding Process"
                width={600}
                height={450}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Perfect for These Scenarios</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Silent Bid forward auctions are ideal when discretion and confidential bidding are required
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "High value assets",
                description: "Art, collectibles, luxury items, and rare goods",
                image: "/images/art.png",
              },
              {
                title: "Real Estate & Property",
                description: "Homes, land, and commercial spaces where buyer privacy is key",
                image: "/images/high-value.png",
              },
              {
                title: "Government Contracts",
                description: "Procurement where sealed offers ensure fairness",
                image: "/images/increase-sales-growth.png",
              },
              {
                title: "Business-to-Business Deals",
                description: "Exclusive equipment, licenses, or partnership agreements needing confidential negotiations",
                image: "/images/financial-securities-ipo.png",
              },
            ].map((useCase, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={useCase.image || "/placeholder.svg"}
                    alt={useCase.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">{useCase.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Silent Bid Auction?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Create fast-paced auction experiences that drive quick sales and optimal pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-slate-100 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <Link href="/get-started">
                Create Auction
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold backdrop-blur-sm bg-white/10 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
