"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Clock, Star, Search, Filter } from "lucide-react"
import Image from "next/image"

export default function AuctionHousesPage() {
  const [location, setLocation] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const featuredAuctionHouses = [
    {
      id: 1,
      name: "Heritage Auctions",
      address: "3500 Maple Ave, Dallas, TX 75219",
      phone: "+1 (214) 528-3500",
      rating: 4.8,
      specialties: ["Art", "Collectibles", "Coins"],
      image: "/placeholder.svg?height=200&width=300",
      distance: "2.3 miles",
      nextAuction: "Today, 2:00 PM",
      activeAuctions: 12,
    },
    {
      id: 2,
      name: "Sotheby's",
      address: "1334 York Ave, New York, NY 10021",
      phone: "+1 (212) 606-7000",
      rating: 4.9,
      specialties: ["Fine Art", "Jewelry", "Real Estate"],
      image: "/placeholder.svg?height=200&width=300",
      distance: "5.7 miles",
      nextAuction: "Tomorrow, 10:00 AM",
      activeAuctions: 8,
    },
    {
      id: 3,
      name: "Christie's",
      address: "20 Rockefeller Plaza, New York, NY 10020",
      phone: "+1 (212) 636-2000",
      rating: 4.7,
      specialties: ["Contemporary Art", "Watches", "Wine"],
      image: "/placeholder.svg?height=200&width=300",
      distance: "6.1 miles",
      nextAuction: "Friday, 6:00 PM",
      activeAuctions: 15,
    },
    {
      id: 4,
      name: "Bonhams",
      address: "580 Madison Ave, New York, NY 10022",
      phone: "+1 (212) 644-9001",
      rating: 4.6,
      specialties: ["Motorcars", "Furniture", "Books"],
      image: "/placeholder.svg?height=200&width=300",
      distance: "7.2 miles",
      nextAuction: "Saturday, 1:00 PM",
      activeAuctions: 6,
    },
    {
      id: 5,
      name: "Phillips",
      address: "450 Park Ave, New York, NY 10022",
      phone: "+1 (212) 940-1200",
      rating: 4.5,
      specialties: ["Design", "Photography", "Editions"],
      image: "/placeholder.svg?height=200&width=300",
      distance: "8.0 miles",
      nextAuction: "Monday, 11:00 AM",
      activeAuctions: 9,
    },
    {
      id: 6,
      name: "Barrett-Jackson",
      address: "19601 N 27th Ave, Phoenix, AZ 85027",
      phone: "+1 (480) 421-6694",
      rating: 4.4,
      specialties: ["Classic Cars", "Automobilia", "Motorcycles"],
      image: "/placeholder.svg?height=200&width=300",
      distance: "12.5 miles",
      nextAuction: "Next Week",
      activeAuctions: 4,
    },
  ]

  const handleLocationSearch = () => {
    if (!location.trim()) return

    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setSearchResults(featuredAuctionHouses.slice(0, 3))
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Auction Houses</Badge>
          <h1 className="text-5xl font-bold mb-6">
            Find Auction Houses
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Near You
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover trusted auction houses in your area. Browse upcoming auctions, view specialties, and connect with
            professional auctioneers.
          </p>
        </div>

        {/* Location Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Search by Location
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="location">Enter your city, state, or ZIP code</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., New York, NY or 10001"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleLocationSearch}
                    disabled={isSearching}
                    className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200 px-8"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Search Results for "{location}"</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((house) => (
                <Card key={house.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src={house.image || "/placeholder.svg"}
                    alt={house.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{house.name}</h3>
                      <Badge variant="secondary">{house.distance}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{house.rating}</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {house.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {house.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Next: {house.nextAuction}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {house.specialties.map((specialty: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Featured Auction Houses */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Auction Houses</h2>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter & Sort
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuctionHouses.map((house) => (
              <Card key={house.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={house.image || "/placeholder.svg"}
                  alt={house.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{house.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{house.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {house.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {house.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Next: {house.nextAuction}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {house.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {house.activeAuctions} Auctions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team to help you find the perfect auction house for your needs or to list your own auction house
            on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4"
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4"
            >
              List Your Auction House
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
