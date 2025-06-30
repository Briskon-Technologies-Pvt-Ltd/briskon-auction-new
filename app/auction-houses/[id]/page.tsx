"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Clock, Star, Globe, Users, Gavel, Calendar, CheckCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AuctionHouseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("live")

  // Mock data - would come from API based on params.id
  const auctionHouse = {
    id: 1,
    name: "Heritage Auctions",
    description:
      "America's largest collectibles auction house, specializing in rare coins, comics, sports memorabilia, and fine art.",
    address: "3500 Maple Ave, Dallas, TX 75219",
    phone: "+1 (214) 528-3500",
    website: "www.ha.com",
    rating: 4.8,
    totalReviews: 2847,
    established: 1976,
    specialties: ["Coins", "Comics", "Sports Memorabilia", "Fine Art", "Jewelry", "Vintage Guitars"],
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    stats: {
      totalAuctions: 15000,
      totalSales: "$5.2B",
      activeAuctions: 156,
      registeredBidders: 125000,
    },
  }

  const liveAuctions = [
    {
      id: 1,
      title: "Rare Baseball Card Collection",
      currentBid: 12500,
      timeLeft: "2h 34m",
      bidders: 34,
      image: "/placeholder.svg?height=150&width=200",
      category: "Sports Memorabilia",
    },
    {
      id: 2,
      title: "Vintage Comic Book Lot",
      currentBid: 8750,
      timeLeft: "1h 18m",
      bidders: 28,
      image: "/placeholder.svg?height=150&width=200",
      category: "Comics",
    },
    {
      id: 3,
      title: "Morgan Silver Dollar Set",
      currentBid: 3200,
      timeLeft: "4h 52m",
      bidders: 19,
      image: "/placeholder.svg?height=150&width=200",
      category: "Coins",
    },
  ]

  const upcomingAuctions = [
    {
      id: 4,
      title: "Fine Art & Antiques",
      startDate: "March 15, 2024",
      startTime: "10:00 AM CST",
      estimatedItems: 250,
      category: "Fine Art",
    },
    {
      id: 5,
      title: "Vintage Guitar Auction",
      startDate: "March 20, 2024",
      startTime: "2:00 PM CST",
      estimatedItems: 85,
      category: "Musical Instruments",
    },
  ]

  const closedAuctions = [
    {
      id: 6,
      title: "Sports Legends Memorabilia",
      finalDate: "March 1, 2024",
      totalSales: "$2.4M",
      topSale: "$450,000 - Babe Ruth Signed Baseball",
      itemsSold: 189,
      category: "Sports Memorabilia",
    },
    {
      id: 7,
      title: "Rare Coin Spectacular",
      finalDate: "February 25, 2024",
      totalSales: "$1.8M",
      topSale: "$125,000 - 1909-S VDB Lincoln Cent",
      itemsSold: 156,
      category: "Coins",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/auction-houses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Auction Houses
          </Link>
        </Button>

        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Image
              src={auctionHouse.image || "/placeholder.svg"}
              alt={auctionHouse.name}
              width={600}
              height={400}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{auctionHouse.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{auctionHouse.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-300">
                ({auctionHouse.totalReviews.toLocaleString()} reviews)
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{auctionHouse.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{auctionHouse.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{auctionHouse.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{auctionHouse.website}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Established {auctionHouse.established}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {auctionHouse.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>

            <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
              Contact Auction House
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Visit Website
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Auctions",
              value: auctionHouse.stats.totalAuctions.toLocaleString(),
              icon: <Gavel className="h-5 w-5" />,
            },
            { label: "Total Sales", value: auctionHouse.stats.totalSales, icon: <Star className="h-5 w-5" /> },
            {
              label: "Active Auctions",
              value: auctionHouse.stats.activeAuctions.toString(),
              icon: <Clock className="h-5 w-5" />,
            },
            {
              label: "Registered Bidders",
              value: auctionHouse.stats.registeredBidders.toLocaleString(),
              icon: <Users className="h-5 w-5" />,
            },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-2 text-blue-600">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Auctions Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Live Auctions ({liveAuctions.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming ({upcomingAuctions.length})
            </TabsTrigger>
            <TabsTrigger value="closed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Closed ({closedAuctions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveAuctions.map((auction) => (
                <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src={auction.image || "/placeholder.svg"}
                    alt={auction.title}
                    width={200}
                    height={150}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-red-600">LIVE</Badge>
                    <h3 className="font-semibold mb-2">{auction.title}</h3>
                    <div className="space-y-1 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Current Bid</span>
                        <span className="font-semibold text-green-600">${auction.currentBid.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Time Left</span>
                        <span className="font-semibold text-red-600">{auction.timeLeft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Bidders</span>
                        <span className="font-semibold">{auction.bidders}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
                      asChild
                    >
                      <Link href={`/auctions/${auction.id}`}>Place Bid</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingAuctions.map((auction) => (
                <Card key={auction.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{auction.title}</CardTitle>
                      <Badge variant="outline">{auction.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Start Date</span>
                        <span className="font-semibold">{auction.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Start Time</span>
                        <span className="font-semibold">{auction.startTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Estimated Items</span>
                        <span className="font-semibold">{auction.estimatedItems}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Set Reminder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="closed" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {closedAuctions.map((auction) => (
                <Card key={auction.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{auction.title}</CardTitle>
                      <Badge variant="secondary">CLOSED</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Final Date</span>
                        <span className="font-semibold">{auction.finalDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Total Sales</span>
                        <span className="font-semibold text-green-600">{auction.totalSales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Items Sold</span>
                        <span className="font-semibold">{auction.itemsSold}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Top Sale:</span>
                        <p className="font-semibold text-sm">{auction.topSale}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      View Results
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
