"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Clock, Users, Search, Filter, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("ending-soon")

  const products = [
    {
      id: 1,
      title: "Vintage Mechanical Watch",
      category: "Watches",
      currentBid: 1250,
      timeLeft: "2h 34m",
      bidders: 12,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Excellent",
      seller: "LuxuryFinds",
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      title: "Professional DSLR Camera",
      category: "Electronics",
      currentBid: 1750,
      timeLeft: "1h 18m",
      bidders: 28,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Like New",
      seller: "PhotoPro",
      rating: 4.9,
      featured: false,
    },
    {
      id: 3,
      title: "Handcrafted Leather Bag",
      category: "Fashion",
      currentBid: 450,
      timeLeft: "4h 52m",
      bidders: 8,
      image: "/placeholder.svg?height=200&width=300",
      condition: "New",
      seller: "ArtisanLeather",
      rating: 4.7,
      featured: true,
    },
    {
      id: 4,
      title: "Rare Vinyl Record Collection",
      category: "Music",
      currentBid: 890,
      timeLeft: "3h 07m",
      bidders: 15,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      seller: "VinylVault",
      rating: 4.6,
      featured: false,
    },
    {
      id: 5,
      title: "Antique Wooden Desk",
      category: "Furniture",
      currentBid: 1200,
      timeLeft: "5h 22m",
      bidders: 10,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      seller: "VintageFinds",
      rating: 4.5,
      featured: false,
    },
    {
      id: 6,
      title: "Limited Edition Sneakers",
      category: "Fashion",
      currentBid: 850,
      timeLeft: "8h 15m",
      bidders: 32,
      image: "/placeholder.svg?height=200&width=300",
      condition: "New",
      seller: "SneakerHead",
      rating: 4.9,
      featured: true,
    },
    {
      id: 7,
      title: "Gaming Laptop",
      category: "Electronics",
      currentBid: 2200,
      timeLeft: "1d 4h 10m",
      bidders: 18,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Like New",
      seller: "TechDeals",
      rating: 4.7,
      featured: false,
    },
    {
      id: 8,
      title: "Diamond Engagement Ring",
      category: "Jewelry",
      currentBid: 3500,
      timeLeft: "2d 6h 45m",
      bidders: 7,
      image: "/placeholder.svg?height=200&width=300",
      condition: "New",
      seller: "LuxuryJewels",
      rating: 4.9,
      featured: true,
    },
    {
      id: 9,
      title: "Vintage Comic Book Collection",
      category: "Collectibles",
      currentBid: 950,
      timeLeft: "12h 30m",
      bidders: 14,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      seller: "ComicCollector",
      rating: 4.6,
      featured: false,
    },
    {
      id: 10,
      title: "Professional Stand Mixer",
      category: "Home & Garden",
      currentBid: 380,
      timeLeft: "1d 2h 15m",
      bidders: 9,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Excellent",
      seller: "KitchenPro",
      rating: 4.8,
      featured: false,
    },
    {
      id: 11,
      title: "Original Oil Painting",
      category: "Art",
      currentBid: 1800,
      timeLeft: "3d 8h 20m",
      bidders: 5,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Excellent",
      seller: "GalleryArt",
      rating: 4.9,
      featured: false,
    },
    {
      id: 12,
      title: "Signed Sports Memorabilia",
      category: "Collectibles",
      currentBid: 1250,
      timeLeft: "1d 18h 40m",
      bidders: 22,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      seller: "SportsLegends",
      rating: 4.7,
      featured: true,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home-garden", label: "Home & Garden" },
    { value: "collectibles", label: "Collectibles" },
    { value: "jewelry", label: "Jewelry" },
    { value: "art", label: "Art" },
    { value: "watches", label: "Watches" },
    { value: "music", label: "Music" },
    { value: "furniture", label: "Furniture" },
  ]

  const conditions = [
    { value: "all", label: "All Conditions" },
    { value: "new", label: "New" },
    { value: "like-new", label: "Like New" },
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Product Auctions</Badge>
          <h1 className="text-5xl font-bold mb-6">
            Browse Active
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Product Listings
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover unique items from trusted sellers. Bid on products that catch your eye and complete secure
            transactions all in one place.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h2>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition */}
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Condition</Label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label className="text-sm font-medium">Price Range</Label>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                    <span>$0</span>
                    <span>$5000+</span>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ending-soon">Ending Soon</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="most-bids">Most Bids</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Apply Filters Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                    product.featured ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {product.featured && (
                    <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 text-center">FEATURED</div>
                  )}

                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600">{product.category}</Badge>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-sm line-clamp-2">{product.title}</h3>

                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {product.rating} • {product.seller}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {product.condition}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-300">Current Bid</span>
                        <span className="font-semibold text-green-600">${product.currentBid.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-300">Time Left</span>
                        <span className="font-semibold text-red-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {product.timeLeft}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-300">Bidders</span>
                        <span className="font-semibold flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {product.bidders}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
                      size="sm"
                      asChild
                    >
                      <Link href={`/products/${product.id}`}>Place Bid</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-300 shadow-sm"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
