"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Users,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Star,
  MessageSquare,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState("")
  const [watchlisted, setWatchlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: 1,
    title: "Vintage Mechanical Watch - Limited Edition",
    category: "Watches",
    currentBid: 1250,
    timeLeft: "2h 34m",
    bidders: 12,
    watchers: 24,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description: `This is a rare vintage mechanical watch in excellent condition. Features include:

• Original box and papers included
• Recently serviced and fully functional
• 17-jewel Swiss movement
• 38mm stainless steel case
• Genuine leather strap
• Exhibition caseback showing the intricate movement
• Limited edition (only 500 made)
• Serial number engraved on the back

This timepiece is a collector's item and has been carefully maintained. The watch keeps excellent time and all functions work perfectly. The crystal is scratch-free and the case shows minimal signs of wear.`,
    startingBid: 800,
    estimatedValue: "1,500 - 2,000",
    condition: "Excellent",
    seller: {
      name: "LuxuryFinds",
      rating: 4.8,
      completedSales: 150,
      memberSince: "2018",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    specifications: {
      Brand: "Swiss Precision",
      Model: "Chronograph 1962",
      Movement: "Mechanical (Manual)",
      Case: "Stainless Steel, 38mm",
      Crystal: "Sapphire",
      "Water Resistance": "30m",
      "Year Manufactured": "1962",
      "Serial Number": "SP19620384",
    },
    shipping: {
      methods: "Insured Shipping",
      cost: "$15.00",
      location: "United States",
      international: "Yes (+$25.00)",
    },
    bidHistory: [
      { bidder: "WatchCollector42", amount: 1250, time: "2 hours ago" },
      { bidder: "VintageHunter", amount: 1200, time: "4 hours ago" },
      { bidder: "TimePiece88", amount: 1150, time: "6 hours ago" },
      { bidder: "ClassicStyle", amount: 1100, time: "8 hours ago" },
      { bidder: "HorologyFan", amount: 1050, time: "12 hours ago" },
    ],
    questions: [
      {
        user: "WatchCollector42",
        question: "Does it come with the original box and papers?",
        answer: "Yes, the original box and authentication papers are included with this watch.",
        time: "1 day ago",
      },
      {
        user: "VintageHunter",
        question: "When was the watch last serviced?",
        answer: "The watch was professionally serviced 3 months ago and is keeping excellent time.",
        time: "2 days ago",
      },
    ],
  }

  const handlePlaceBid = () => {
    // Handle bid placement logic
    console.log("Placing bid:", bidAmount)
  }

  const handleBuyNow = () => {
    // Handle buy now logic
    console.log("Buy now clicked")
  }

  const handleWatchlist = () => {
    setWatchlisted(!watchlisted)
  }

  const getMinimumBid = () => {
    return product.currentBid + 50 // Minimum increment of $50
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/products" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="hover-lift transition-smooth">
              <CardContent className="p-0">
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="w-full h-96 object-contain rounded-t-lg transition-smooth hover:scale-105"
                />
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} ${index + 1}`}
                        width={100}
                        height={80}
                        className={`w-20 h-16 object-cover rounded cursor-pointer border-2 transition-smooth hover-lift ${
                          currentImageIndex === index ? "border-blue-500 scale-105" : "border-transparent"
                        } hover:border-blue-500`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {product.condition}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{product.title}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWatchlist}
                      className={watchlisted ? "text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 ${watchlisted ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Details</TabsTrigger>
                    <TabsTrigger value="bids">Bid History</TabsTrigger>
                    <TabsTrigger value="qa">Q&A</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-line">{product.description}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Product Specifications</h4>
                        <div className="space-y-2">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b">
                              <span className="font-medium">{key}</span>
                              <span className="text-gray-600 dark:text-gray-300">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Shipping Information</h4>
                        <div className="space-y-2">
                          {Object.entries(product.shipping).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b">
                              <span className="font-medium">{key}</span>
                              <span className="text-gray-600 dark:text-gray-300">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bids" className="mt-6">
                    <div className="space-y-3">
                      {product.bidHistory.map((bid, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <div>
                            <span className="font-medium">{bid.bidder}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{bid.time}</span>
                          </div>
                          <span className="font-semibold text-green-600">${bid.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="qa" className="mt-6">
                    <div className="space-y-6">
                      {product.questions.map((qa, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="mb-2">
                            <span className="font-medium">{qa.user}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{qa.time}</span>
                          </div>
                          <div className="mb-2">
                            <MessageSquare className="h-4 w-4 inline mr-2" />
                            <span>{qa.question}</span>
                          </div>
                          <div className="ml-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <CheckCircle className="h-4 w-4 inline mr-2 text-green-600" />
                            <span>{qa.answer}</span>
                          </div>
                        </div>
                      ))}

                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Ask a Question</h4>
                        <Input placeholder="Type your question here..." className="mb-3" />
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                          Submit Question
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bidding Card */}
            <Card className="hover-lift transition-smooth card-hover">
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1 animate-pulse-glow">
                    ${product.currentBid.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Current Bid</div>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1 hover-lift">
                    <Clock className="h-4 w-4 text-red-600 animate-bounce-gentle" />
                    <span className="font-semibold text-red-600">{product.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-1 hover-lift">
                    <Users className="h-4 w-4" />
                    <span>{product.bidders} bidders</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Your Bid Amount</label>
                    <Input
                      type="number"
                      placeholder={`Minimum: $${getMinimumBid().toLocaleString()}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="mt-1 transition-smooth focus:scale-105"
                    />
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-smooth hover-lift transform-3d"
                    onClick={handlePlaceBid}
                    disabled={!bidAmount || Number.parseInt(bidAmount) < getMinimumBid()}
                  >
                    Place Bid
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-smooth hover-lift"
                    onClick={handleBuyNow}
                  >
                    Buy Now - $1,800
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <AlertCircle className="h-4 w-4" />
                  <span>Minimum bid increment: $50</span>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={product.seller.avatar || "/placeholder.svg"}
                    alt={product.seller.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{product.seller.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.seller.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Member Since</span>
                    <span className="font-medium">{product.seller.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Sales</span>
                    <span className="font-medium">{product.seller.completedSales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Watchers</span>
                    <span className="font-medium">{product.watchers}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>

            {/* Product Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Starting Bid</span>
                  <span className="font-medium">${product.startingBid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Bid</span>
                  <span className="font-medium text-green-600">${product.currentBid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Value</span>
                  <span className="font-medium">${product.estimatedValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Bids</span>
                  <span className="font-medium">{product.bidders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Remaining</span>
                  <span className="font-medium text-red-600">{product.timeLeft}</span>
                </div>
              </CardContent>
            </Card>

            {/* Buyer Protection */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Buyer Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Tracked Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-smooth card-hover hover-lift">
                <Image
                  src={`/placeholder.svg?height=200&width=300&query=vintage watch ${item}`}
                  alt={`Similar product ${item}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transition-smooth hover:scale-110"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-sm">Vintage Watch Collection #{item}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-green-600 font-semibold animate-pulse-glow">
                      ${(800 + item * 100).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-600">12 bids</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-smooth hover-lift"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
