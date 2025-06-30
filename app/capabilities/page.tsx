"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowUp,
  ArrowDown,
  Eye,
  TrendingDown,
  Zap,
  Crown,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CapabilitiesPage() {
  const [selectedAuctions, setSelectedAuctions] = useState<string[]>([])
  const [showRecommendation, setShowRecommendation] = useState(false)

  const auctionTypes = [
    {
      id: "forward",
      name: "Forward Auction",
      description: "Traditional ascending-price auction where bidders compete by increasing the price",
      icon: <ArrowUp className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      features: [
        "Starting price set by seller",
        "Bidders compete by raising price",
        "Highest bid wins at auction end",
        "Real-time bidding updates",
        "Automatic bid increments",
      ],
      useCases: ["Art and collectibles", "Luxury items", "Real estate", "Antiques", "Rare memorabilia"],
      minSubscription: "basic",
      image: "/placeholder.svg?height=300&width=400",
      example: {
        item: "Vintage Rolex Watch",
        startPrice: "$5,000",
        currentBid: "$8,750",
        timeLeft: "2h 15m",
        bidders: 23,
      },
    },
    {
      id: "reverse",
      name: "Reverse Auction",
      description: "Suppliers compete by lowering prices to win business from buyers",
      icon: <ArrowDown className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Buyer sets maximum budget",
        "Suppliers bid lower prices",
        "Lowest qualified bid wins",
        "Quality criteria enforcement",
        "Supplier verification system",
      ],
      useCases: [
        "Business services",
        "Construction projects",
        "Bulk purchasing",
        "Professional services",
        "Manufacturing contracts",
      ],
      minSubscription: "premium",
      image: "/placeholder.svg?height=300&width=400",
      example: {
        item: "Website Development Project",
        maxBudget: "$15,000",
        currentBid: "$8,500",
        timeLeft: "1d 8h",
        bidders: 12,
      },
    },
    {
      id: "dutch",
      name: "Dutch Auction",
      description: "Price starts high and decreases until a bidder accepts the current price",
      icon: <TrendingDown className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      features: [
        "High starting price",
        "Automatic price reduction",
        "First to accept wins",
        "Time-based price drops",
        "Strategic timing element",
      ],
      useCases: [
        "Perishable goods",
        "Inventory clearance",
        "Time-sensitive items",
        "Bulk commodities",
        "Seasonal products",
      ],
      minSubscription: "premium",
      image: "/placeholder.svg?height=300&width=400",
      example: {
        item: "Designer Handbag Collection",
        startPrice: "$2,500",
        currentPrice: "$1,850",
        nextDrop: "5 minutes",
        reduction: "$50",
      },
    },
    {
      id: "sealed",
      name: "Sealed Bid Auction",
      description: "Bidders submit private bids without knowing others' offers",
      icon: <Eye className="h-8 w-8" />,
      color: "from-purple-500 to-indigo-500",
      features: [
        "Private bid submission",
        "No bid visibility",
        "Single round bidding",
        "Highest bid wins",
        "Strategic bidding required",
      ],
      useCases: [
        "Government contracts",
        "Real estate",
        "High-value assets",
        "Corporate acquisitions",
        "Exclusive items",
      ],
      minSubscription: "elite",
      image: "/placeholder.svg?height=300&width=400",
      example: {
        item: "Commercial Property",
        minBid: "$500,000",
        deadline: "3 days",
        bidders: "Confidential",
        status: "Active",
      },
    },
    {
      id: "reserve",
      name: "Reserve Auction",
      description: "Seller sets a minimum price that must be met for the sale to proceed",
      icon: <Shield className="h-8 w-8" />,
      color: "from-teal-500 to-green-500",
      features: [
        "Hidden reserve price",
        "Seller protection",
        "Reserve met indicator",
        "Conditional sale",
        "Price floor guarantee",
      ],
      useCases: ["High-value collectibles", "Fine art", "Luxury vehicles", "Rare items", "Investment pieces"],
      minSubscription: "basic",
      image: "/placeholder.svg?height=300&width=400",
      example: {
        item: "Original Painting",
        currentBid: "$12,000",
        reserve: "Not Met",
        timeLeft: "6h 30m",
        bidders: 18,
      },
    },
    {
      id: "live",
      name: "Live Auction",
      description: "Real-time auction with live auctioneer and instant bidding",
      icon: <Zap className="h-8 w-8" />,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Live auctioneer",
        "Real-time video stream",
        "Instant bid recognition",
        "Interactive participation",
        "Professional presentation",
      ],
      useCases: ["Estate sales", "Art galleries", "Charity events", "Specialty collections", "Premium items"],
      minSubscription: "premium",
      image: "/placeholder.svg?height=300&width=400",
      example: {
        item: "Estate Jewelry Collection",
        liveTime: "Today 3:00 PM EST",
        previewBids: 45,
        registered: 156,
        status: "Starting Soon",
      },
    },
  ]

  const subscriptionPlans = {
    basic: {
      name: "Auction Explorer",
      price: "$19/month",
      color: "from-blue-500 to-cyan-500",
      features: ["Forward Auctions", "Reserve Auctions", "Basic Support"],
    },
    premium: {
      name: "VIP Collector",
      price: "$79/month",
      color: "from-purple-500 to-pink-500",
      features: ["All Basic Features", "Reverse Auctions", "Dutch Auctions", "Live Auctions", "Priority Support"],
    },
    elite: {
      name: "Auction Royalty",
      price: "$199/month",
      color: "from-yellow-400 to-orange-500",
      features: ["All Premium Features", "Sealed Bid Auctions", "Private Auctions", "Concierge Service"],
    },
  }

  const handleAuctionSelect = (auctionId: string) => {
    setSelectedAuctions((prev) => {
      const newSelection = prev.includes(auctionId) ? prev.filter((id) => id !== auctionId) : [...prev, auctionId]

      if (newSelection.length > 0) {
        setShowRecommendation(true)
      } else {
        setShowRecommendation(false)
      }

      return newSelection
    })
  }

  const getRecommendedPlan = () => {
    if (selectedAuctions.length === 0) return null

    const selectedTypes = selectedAuctions.map((id) => auctionTypes.find((type) => type.id === id)?.minSubscription)

    if (selectedTypes.includes("elite")) return "elite"
    if (selectedTypes.includes("premium")) return "premium"
    return "basic"
  }

  const recommendedPlan = getRecommendedPlan()

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white animate-pulse">
              🚀 Advanced Auction Capabilities
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Auction Types We Support
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Discover the full range of auction formats available on Briskon. From traditional forward auctions to
              sophisticated sealed bid processes, we support every type of auction to meet your specific needs.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
              <p className="text-lg text-blue-800 dark:text-blue-200">
                <Sparkles className="inline h-5 w-5 mr-2" />
                Select the auction types you're interested in below to get a personalized subscription recommendation!
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto mb-12">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Auction Capabilities Overview"
                width={800}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Auction Types Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {auctionTypes.map((auction, index) => (
              <Card
                key={auction.id}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  selectedAuctions.includes(auction.id) ? "ring-4 ring-blue-500 scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className={`bg-gradient-to-r ${auction.color} text-white relative`}>
                  <div className="absolute top-4 right-4">
                    <Checkbox
                      checked={selectedAuctions.includes(auction.id)}
                      onCheckedChange={() => handleAuctionSelect(auction.id)}
                      className="bg-white border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">{auction.icon}</div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{auction.name}</CardTitle>
                      <p className="text-white/90 mt-2">{auction.description}</p>
                    </div>
                  </div>
                  <Badge className="self-start bg-white/20 text-white border-white/30">
                    Requires: {subscriptionPlans[auction.minSubscription as keyof typeof subscriptionPlans].name}
                  </Badge>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Image */}
                    <div className="order-2 md:order-1">
                      <Image
                        src={auction.image || "/placeholder.svg"}
                        alt={auction.name}
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>

                    {/* Content */}
                    <div className="order-1 md:order-2">
                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {auction.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Cases */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          Best For
                        </h4>
                        <ul className="space-y-2">
                          {auction.useCases.map((useCase, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Example */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-3">Live Example</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(auction.example).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize text-gray-600 dark:text-gray-400">
                            {key.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className={`w-full mt-4 bg-gradient-to-r ${auction.color} hover:opacity-90 transform hover:scale-105 transition-all duration-200`}
                    asChild
                  >
                    <Link href={`/auctions?type=${auction.id}`}>
                      Explore {auction.name}s
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendation Section */}
      {showRecommendation && recommendedPlan && (
        <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-bounce mb-6">
                <Crown className="h-16 w-16 text-yellow-400 mx-auto" />
              </div>
              <h2 className="text-4xl font-bold mb-6">Perfect Plan Recommendation</h2>
              <p className="text-xl text-blue-100 mb-8">
                Based on your selected auction types, we recommend the{" "}
                <span className="font-bold text-yellow-400">
                  {subscriptionPlans[recommendedPlan as keyof typeof subscriptionPlans].name}
                </span>{" "}
                plan
              </p>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">
                      {subscriptionPlans[recommendedPlan as keyof typeof subscriptionPlans].name}
                    </h3>
                    <div className="text-3xl font-bold">
                      {subscriptionPlans[recommendedPlan as keyof typeof subscriptionPlans].price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {subscriptionPlans[recommendedPlan as keyof typeof subscriptionPlans].features.map(
                      (feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>{feature}</span>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Your Selected Auction Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAuctions.map((auctionId) => {
                        const auction = auctionTypes.find((a) => a.id === auctionId)
                        return (
                          <Badge key={auctionId} className="bg-blue-500 text-white">
                            {auction?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-200"
                    asChild
                  >
                    <Link href="/subscription">
                      <Crown className="mr-2 h-5 w-5" />
                      Get This Plan Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Auction Type Comparison</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Compare features and requirements across all auction types
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-4 text-left font-semibold">Auction Type</th>
                  <th className="p-4 text-center font-semibold">Complexity</th>
                  <th className="p-4 text-center font-semibold">Min. Subscription</th>
                  <th className="p-4 text-center font-semibold">Best For</th>
                  <th className="p-4 text-center font-semibold">Avg. Duration</th>
                </tr>
              </thead>
              <tbody>
                {auctionTypes.map((auction, index) => (
                  <tr
                    key={auction.id}
                    className={`border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selectedAuctions.includes(auction.id) ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`bg-gradient-to-r ${auction.color} p-2 rounded-full text-white`}>
                          {auction.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{auction.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {auction.description.slice(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        {[
                          ...Array(
                            auction.minSubscription === "basic" ? 1 : auction.minSubscription === "premium" ? 2 : 3,
                          ),
                        ].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge
                        className={`bg-gradient-to-r ${subscriptionPlans[auction.minSubscription as keyof typeof subscriptionPlans].color} text-white`}
                      >
                        {subscriptionPlans[auction.minSubscription as keyof typeof subscriptionPlans].name}
                      </Badge>
                    </td>
                    <td className="p-4 text-center text-sm">{auction.useCases[0]}</td>
                    <td className="p-4 text-center text-sm">
                      {auction.id === "live"
                        ? "2-4 hours"
                        : auction.id === "dutch"
                          ? "1-6 hours"
                          : auction.id === "sealed"
                            ? "1-7 days"
                            : "3-7 days"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Auction Journey?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Choose from our comprehensive auction types and find the perfect format for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href="/subscription">View All Plans</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg text-white border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href="/auctions">Browse Active Auctions</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=350&width=450"
                alt="Start Your Auction Journey"
                width={450}
                height={350}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
