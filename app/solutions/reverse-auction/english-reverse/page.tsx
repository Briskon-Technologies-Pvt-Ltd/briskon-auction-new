"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Users, Target, ArrowRight, Play, CheckCircle, TrendingDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EnglishReverseAuctionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 dark:from-green-600/5 dark:to-emerald-600/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50">
              <ArrowDown className="h-4 w-4 mr-2" />
              English Reverse Auction Format
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              English Reverse Auctions 
            </h1>
           

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Experience competitive procurement where suppliers bid down prices in real-time. Perfect for services,
              commodities, and standardized products where price competition drives optimal value for buyers.
              </p>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Simplify your procurement with Briskon's intelligent RFQ platform. Get competitive quotes quickly and efficiently while maintaining complete transparency throughout the process.
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
                  Start Procurement
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How English Reverse Auctions Work */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              How English Reverse Auctions Work
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Suppliers compete by bidding down prices in real-time, driving costs lower for buyers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingDown className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Descending Bids</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Suppliers compete by submitting progressively lower bids to win the contract
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Real-time Competition</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  All suppliers can see current lowest bid and compete openly in real-time
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Lowest Bidder Wins</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  The supplier with the lowest qualifying bid wins the contract
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">English Reverse Auction Features</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Advanced features designed for optimal reverse auction procurement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                    Live Price Discovery
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Real-time bidding with instant price updates and notifications
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                    Supplier Qualification
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Pre-qualified supplier network ensures quality and reliability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                    Multi-Criteria Evaluation
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Evaluate bids on price, quality, delivery, and other factors
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                    Automatic Extensions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Smart time extensions prevent last-second manipulation
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/business-partnership-handshake.png"
                alt="Business Partnership and Deal Making"
                width={500}
                height={400}
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
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Perfect for These Procurements</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              English reverse auctions excel for standardized products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Professional Services",
                description: "Consulting, IT services, and professional contracts",
                image: "/images/business-partnership-handshake.png",
              },
              {
                title: "Commodities",
                description: "Raw materials, energy, and commodity procurement",
                image: "/images/commodities-trading.png",
              },
              {
                title: "Transportation",
                description: "Logistics, shipping, and transportation services",
                image: "/images/logistics-transportation.png",
              },
              {
                title: "Manufacturing",
                description: "Components, parts, and manufacturing services",
                image: "/images/manufacturing-facility.png",
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your English Reverse Auction?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Create competitive procurement experiences that drive down costs while maintaining quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              asChild
            >
              <Link href="/get-started">
                Start Procurement
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