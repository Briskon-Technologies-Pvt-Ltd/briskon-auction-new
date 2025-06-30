"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Clock,
  Users,
  Gavel,
  ArrowRight,
  Star,
  Calendar,
  CheckCircle,
  MapPin,
  Phone,
  Search,
  Crown,
  Trophy,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userLocation, setUserLocation] = useState("")
  const [nearbyHouses, setNearbyHouses] = useState<any[]>([])
  const [searchingLocation, setSearchingLocation] = useState(false)
  const [showMoreFaqs, setShowMoreFaqs] = useState(false)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const liveAuctions = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      category: "Watches",
      currentBid: 8250,
      timeLeft: "2h 34m",
      bidders: 47,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Excellent",
      auctionHouse: "Heritage Auctions",
      rating: 4.9,
    },
    {
      id: 2,
      title: "1965 Ferrari 275 GTB",
      category: "Classic Cars",
      currentBid: 1750000,
      timeLeft: "1h 18m",
      bidders: 128,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Restored",
      auctionHouse: "Barrett-Jackson",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Picasso Original Sketch",
      category: "Fine Art",
      currentBid: 450000,
      timeLeft: "4h 52m",
      bidders: 89,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Authenticated",
      auctionHouse: "Sotheby's",
      rating: 5.0,
    },
    {
      id: 4,
      title: "Rare Baseball Card Collection",
      category: "Sports Memorabilia",
      currentBid: 12500,
      timeLeft: "3h 07m",
      bidders: 34,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Mint",
      auctionHouse: "Heritage Auctions",
      rating: 4.7,
    },
  ]

  const auctionHouses = [
    {
      id: 1,
      name: "Heritage Auctions",
      location: "Dallas, TX",
      distance: "2.3 miles",
      specialties: ["Collectibles", "Coins", "Sports"],
      rating: 4.8,
      activeAuctions: 156,
      image: "/placeholder.svg?height=150&width=200",
      phone: "+1 (214) 528-3500",
      nextAuction: "Today 2:00 PM",
    },
    {
      id: 2,
      name: "Sotheby's",
      location: "New York, NY",
      distance: "5.7 miles",
      specialties: ["Fine Art", "Jewelry", "Wine"],
      rating: 4.9,
      activeAuctions: 89,
      image: "/placeholder.svg?height=150&width=200",
      phone: "+1 (212) 606-7000",
      nextAuction: "Tomorrow 10:00 AM",
    },
    {
      id: 3,
      name: "Christie's",
      location: "New York, NY",
      distance: "6.1 miles",
      specialties: ["Contemporary Art", "Watches", "Handbags"],
      rating: 4.7,
      activeAuctions: 124,
      image: "/placeholder.svg?height=150&width=200",
      phone: "+1 (212) 636-2000",
      nextAuction: "Friday 6:00 PM",
    },
  ]

  const faqs = [
    {
      question: "What is an online auction?",
      answer:
        "An online auction is a digital platform where items are sold to the highest bidder. Unlike traditional auctions, online auctions take place entirely on the internet, allowing participants from around the world to bid on items without being physically present. Briskon Auctions provides a secure and transparent environment for buyers and sellers to connect and conduct transactions.",
    },
    {
      question: "How do online auctions work?",
      answer:
        "Online auctions work by listing items for a specified period during which registered users can place bids. Each auction has a starting price and minimum bid increment. As users place bids, the current price increases. When the auction ends, the highest bidder wins the item and proceeds to complete the purchase through our secure payment system. Briskon Auctions monitors all transactions to ensure fairness and security.",
    },
    {
      question: "Do I need to create an account to participate in an online auction?",
      answer:
        "Yes, you need to create a free account to participate in auctions on Briskon Auctions. Registration requires basic information and identity verification to ensure the security of all transactions. Once registered, you can browse auctions, place bids, track items you're interested in, and manage your purchases. Premium features are available with our subscription plans.",
    },
    {
      question: "What are the different types of online auctions?",
      answer:
        "Briskon Auctions offers several types of auctions: Forward Auctions (traditional ascending-price auctions), Reverse Auctions (where sellers compete for buyers), Dutch Auctions (price decreases until someone accepts), Sealed Bid Auctions (private bids revealed at deadline), and Timed Auctions (set duration with automatic closing). Each type serves different purposes and item categories.",
    },
    {
      question: "How do I place a bid in an online auction?",
      answer:
        "To place a bid, navigate to the auction listing page, enter your bid amount (meeting or exceeding the minimum bid increment), and confirm your bid. You can also set a maximum bid using our proxy bidding system, which will automatically increase your bid up to your maximum to keep you as the highest bidder. You'll receive notifications when you're outbid or when you win an auction.",
    },
    {
      question: "What happens if I win an auction?",
      answer:
        "When you win an auction, you'll receive an immediate notification via email and on your dashboard. You'll then need to complete the payment through our secure payment system within the specified timeframe (typically 48 hours). Once payment is confirmed, the seller will ship the item to you or arrange for pickup. All transactions are protected by our Buyer Protection Program.",
    },
    {
      question: "How do I know if my bid is the highest?",
      answer:
        "Our real-time bidding system instantly shows the current highest bid on each auction page. When you place a bid, you'll immediately see if you're the highest bidder. You can also set up notifications to alert you when you've been outbid. Your dashboard shows all your active bids and their current status, making it easy to track multiple auctions simultaneously.",
    },
    {
      question: "Can I withdraw my bid once it is placed?",
      answer:
        "Generally, bids are binding and cannot be withdrawn after placement. However, in exceptional circumstances (such as clear item description errors), you may request a bid retraction by contacting our customer support team immediately. Each case is reviewed individually. We strongly encourage carefully reviewing all item details before placing a bid to avoid the need for retractions.",
    },
    {
      question: "What are reserve prices and how do they work?",
      answer:
        "A reserve price is the minimum amount a seller is willing to accept for an item. If the bidding doesn't reach the reserve price, the seller is not obligated to sell the item. Reserve prices are not always disclosed to bidders, though listings will indicate whether a reserve exists. When bidding reaches or exceeds the reserve price, the system will indicate that the reserve has been met.",
    },
    {
      question: "Are there any fees associated with participating in an online auction?",
      answer:
        "Basic registration and bidding on Briskon Auctions is free. However, winning bidders may be subject to a buyer's premium (typically 10-15% of the final bid price), which is clearly stated in each auction listing. Premium subscription members enjoy reduced or waived buyer's premiums depending on their membership tier. Additional fees may apply for special services like authentication or escrow.",
    },
    {
      question: "How do I contact the seller or auction house if I have questions?",
      answer:
        "Each auction listing includes a 'Ask a Question' button that allows you to communicate directly with the seller or auction house through our messaging system. For questions about specific auction houses, you can visit their profile page and use the contact information provided. Our customer support team is also available to facilitate communication if needed.",
    },
    {
      question: "What payment methods are accepted for online auctions?",
      answer:
        "Briskon Auctions accepts major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and wire transfers. For high-value items, escrow services are available. Some auction houses may offer additional payment options, which will be specified in their terms. All payments are processed through our secure payment gateway with encryption and fraud protection.",
    },
    {
      question: "Can I participate in online auctions from anywhere?",
      answer:
        "Yes, Briskon Auctions is accessible worldwide, allowing you to participate in auctions from anywhere with an internet connection. Our platform is optimized for both desktop and mobile devices. However, please note that some auctions may have shipping restrictions to certain countries, which will be clearly stated in the listing details.",
    },
    {
      question: "What should I do if I encounter issues during the auction?",
      answer:
        "If you encounter technical issues during an auction, first try refreshing your browser or using a different device. For persistent problems, contact our 24/7 technical support team via live chat, email, or phone. If you believe there's an issue with the auction itself (such as incorrect information or suspicious activity), use the 'Report Issue' button on the auction page.",
    },
    {
      question: "How are disputes or problems with transactions handled?",
      answer:
        "Briskon Auctions has a comprehensive dispute resolution process. If you experience issues with a transaction, first attempt to resolve it directly with the other party through our messaging system. If that doesn't resolve the issue, you can file a formal dispute through your dashboard. Our dedicated resolution team will review the case, gather information from both parties, and work toward a fair resolution.",
    },
  ]

  const handleLocationSearch = () => {
    if (!userLocation.trim()) return

    setSearchingLocation(true)
    // Simulate API call to find nearby auction houses
    setTimeout(() => {
      setNearbyHouses(auctionHouses.slice(0, 2))
      setSearchingLocation(false)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
            <Gavel className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Loading Briskon Auctions</h2>
          <p className="text-gray-600 dark:text-gray-300">Preparing the ultimate auction experience...</p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white animate-pulse">
                🏆 The Ultimate Auction Experience
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
                Discover Extraordinary Items
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                Connect with the world's most prestigious auction houses. Bid on rare collectibles, fine art, luxury
                items, and unique treasures from verified sellers worldwide.
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-md border border-blue-700 transition-all duration-300"
                  asChild
                >
                  <Link href="/auctions/forward">Explore Forward Auctions</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
                  asChild
                >
                  <Link href="/auctions/reverse">Explore Reverse Auctions</Link>
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Ready to join?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                  <Button
                    variant="default"
                    className="text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 border border-blue-200 dark:border-blue-700"
                    asChild
                  >
                    <Link href="/register?type=buyer">Register as Buyer</Link>
                  </Button>
                  <Button
                    variant="default"
                    className="text-green-600 dark:text-green-400 bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800 border border-green-200 dark:border-green-700"
                    asChild
                  >
                    <Link href="/register?type=seller">Register as Seller</Link>
                  </Button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login?type=buyer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Sign in as Buyer
                  </Link>
                  {" | "}
                  <Link href="/login?type=seller" className="text-green-600 dark:text-green-400 hover:underline">
                    Sign in as Seller
                  </Link>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid md:grid-cols-4 gap-8 mt-16">
                {[
                  {
                    number: "2,847",
                    label: "Live Auctions",
                    icon: <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>,
                  },
                  { number: "150+", label: "Auction Houses", icon: <MapPin className="h-4 w-4" /> },
                  { number: "$2.5B+", label: "Total Sales", icon: <Trophy className="h-4 w-4" /> },
                  { number: "99.8%", label: "Success Rate", icon: <CheckCircle className="h-4 w-4" /> },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stat.icon}
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Info className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-8">About Briskon Auctions</h2>
            <div className="prose dark:prose-invert max-w-none text-lg text-gray-700 dark:text-gray-300 space-y-6">
              <p>
                Briskon Auctions is a premier online auction platform connecting buyers with prestigious auction houses
                and verified sellers worldwide. Our mission is to make high-quality auctions accessible to everyone,
                whether you're a seasoned collector or first-time bidder.
              </p>
              <p>
                Founded in 2005, we've revolutionized the auction industry by bringing the excitement and opportunity of
                live auctions to the digital world. Our platform hosts thousands of auctions daily across diverse
                categories including fine art, luxury watches, classic cars, collectibles, and more.
              </p>
              <p>
                What sets Briskon apart is our commitment to authentication, transparency, and user experience. Every
                item listed undergoes rigorous verification, and our advanced bidding technology ensures a seamless
                experience with real-time updates and secure transactions.
              </p>
              <p>
                For over two decades, our platform has driven auction innovation across industries, delivering modern,
                intuitive, and secure bidding experiences. Join our community of over 500,000 collectors and enthusiasts
                from 130+ countries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <Shield className="h-10 w-10 text-blue-600" />,
                  title: "Verified Authenticity",
                  description: "Every item undergoes expert verification before listing",
                },
                {
                  icon: <Gavel className="h-10 w-10 text-blue-600" />,
                  title: "Transparent Bidding",
                  description: "Real-time updates and fair bidding practices",
                },
                {
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  title: "Global Community",
                  description: "Connect with collectors and sellers worldwide",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ultimate Auction House Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Powering Auction Intelligence Since 2005
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              The SaaS Auction Engine Powering Modern Marketplaces. Exclusive access to the world's most coveted items,
              authenticated by experts and backed by our guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Shield className="h-12 w-12 text-yellow-400" />,
                title: "100% Authenticated",
                description: "Every item verified by world-class experts with certificates of authenticity",
              },
              {
                icon: <Zap className="h-12 w-12 text-yellow-400" />,
                title: "Instant Bidding",
                description: "Real-time bidding technology with millisecond response times",
              },
              {
                icon: <Crown className="h-12 w-12 text-yellow-400" />,
                title: "VIP Experience",
                description: "White-glove service with personal auction consultants and priority support",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 text-lg hover:from-yellow-300 hover:to-orange-400 shadow-md border border-yellow-500 transition-all duration-300"
              asChild
            >
              <Link href="/subscription">
                <Crown className="mr-2 h-5 w-5" />
                Join VIP Auctions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                Live Auctions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Bid now on these premium items</p>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-md transition-all duration-300"
              asChild
            >
              <Link href="/auctions/live">View All Live</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveAuctions.map((auction, index) => (
              <Card
                key={auction.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-gray-800"
              >
                <div className="relative">
                  <Image
                    src={auction.image || "/placeholder.svg"}
                    alt={auction.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-600 text-white animate-pulse">LIVE</Badge>
                  <Badge className="absolute top-2 right-2 bg-blue-600">{auction.category}</Badge>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {auction.auctionHouse}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-sm line-clamp-2">{auction.title}</h3>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      {auction.rating} • {auction.condition}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Current Bid</span>
                      <span className="font-semibold text-green-600">${auction.currentBid.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Time Left</span>
                      <span className="font-semibold text-red-600 flex items-center gap-1">
                        <Clock className="h-3 w-3 animate-pulse" />
                        {auction.timeLeft}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Bidders</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {auction.bidders}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm transition-all duration-300"
                    size="sm"
                    asChild
                  >
                    <Link href={`/auctions/${auction.id}`}>Place Bid</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Find Closest Auction Houses */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              Find Auction Houses Near You
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover prestigious auction houses in your area. Attend live events, preview items, and connect with
              experts.
            </p>
          </div>

          {/* Location Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="p-6 border border-gray-200 bg-white dark:bg-gray-800">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    placeholder="Enter your city, state, or ZIP code"
                    className="text-lg py-3 border border-gray-300"
                  />
                </div>
                <Button
                  onClick={handleLocationSearch}
                  disabled={searchingLocation}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-md transition-all duration-300"
                >
                  {searchingLocation ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Search Results */}
          {nearbyHouses.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Auction Houses Near "{userLocation}"</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {nearbyHouses.map((house) => (
                  <Card
                    key={house.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-gray-800"
                  >
                    <div className="flex">
                      <Image
                        src={house.image || "/placeholder.svg"}
                        alt={house.name}
                        width={200}
                        height={150}
                        className="w-32 h-32 object-cover"
                      />
                      <CardContent className="p-4 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{house.name}</h3>
                          <Badge variant="secondary">{house.distance}</Badge>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{house.rating}</span>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {house.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {house.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Next: {house.nextAuction}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {house.specialties.map((specialty: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm transition-all duration-300"
                          size="sm"
                          asChild
                        >
                          <Link href={`/auction-houses/${house.id}`}>View Details</Link>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Featured Auction Houses */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Featured Auction Houses</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {auctionHouses.map((house, index) => (
                <Card
                  key={house.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-gray-800"
                >
                  <Image
                    src={house.image || "/placeholder.svg"}
                    alt={house.name}
                    width={200}
                    height={150}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{house.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{house.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {house.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Gavel className="h-3 w-3" />
                        {house.activeAuctions} Active Auctions
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
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

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm transition-all duration-300"
                      size="sm"
                      asChild
                    >
                      <Link href={`/auction-houses/${house.id}`}>Explore Auctions</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
              asChild
            >
              <Link href="/auction-houses">
                View All Auction Houses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0a0e29] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-7xl font-bold mb-8">FAQ</h2>
                <p className="text-blue-100 mb-6">
                  Have a question? We are here to answer. In case if you can't find the answer to your queries, write to
                  us at{" "}
                  <a href="mailto:info@briskon.com" className="text-blue-300 hover:underline">
                    info@briskon.com
                  </a>
                </p>
              </div>

              <div className="md:col-span-3">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.slice(0, showMoreFaqs ? faqs.length : 8).map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="border-b border-blue-800 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left font-medium py-4 hover:text-blue-300 transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-100 pb-4">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {faqs.length > 8 && (
                  <div className="text-center mt-8">
                    <Button
                      variant="ghost"
                      className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/50 border border-blue-700 transition-all duration-300"
                      onClick={() => setShowMoreFaqs(!showMoreFaqs)}
                    >
                      {showMoreFaqs ? "Show less" : "Show more"}
                      {showMoreFaqs ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Auction Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of collectors, investors, and enthusiasts who trust Briskon Auctions for their most important
            purchases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg shadow-md border border-white transition-all duration-300"
              asChild
            >
              <Link href="/free-trial">Start Free Trial</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg transition-all duration-300"
              asChild
            >
              <Link href="/request-demo">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
