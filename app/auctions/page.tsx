"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  Search,
  Star,
  Calendar,
  CheckCircle,
  MapPin,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Eye,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type AuctionItem = {
  id: string;
  title: string;
  category: string;
  image: string; // First URL from productimages or placeholder
  auctiontype: "forward" | "reverse";
  status: "live" | "upcoming" | "closed";
  location: string;
  featured?: boolean;
  verified?: boolean;
  currentBid?: number;
  timeLeft?: string;
  bidders?: number;
  seller?: string;
  rating?: number;
  targetPrice?: number;
  deadline?: string;
  proposals?: number;
  buyer?: string;
  startingBid?: number;
  startsIn?: string;
  finalBid?: number;
  endedAgo?: string;
  winner?: string;
  views?: number;
  watchers?: number;
  productimages?: string[]; // Array of Supabase Storage URLs
  productdocuments?: string[]; // Array of Supabase Storage URLs
  createdat?: string; // Added for sorting consistency
  auctionsubtype?: string; // Added to handle sealed auctions
};

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "watches", label: "Watches" },
  { value: "collectibles", label: "Collectibles" },
  { value: "automotive", label: "Automotive" },
  { value: "services", label: "Services" },
  { value: "office-supplies", label: "Office Supplies" },
  { value: "technology", label: "Technology" },
];

const locations = [
  { value: "all", label: "All Locations" },
  { value: "New York, USA", label: "New York, USA" },
  { value: "London, UK", label: "London, UK" },
  { value: "Paris, France", label: "Paris, France" },
  { value: "San Francisco, USA", label: "San Francisco, USA" },
  { value: "Chicago, USA", label: "Chicago, USA" },
  { value: "Detroit, USA", label: "Detroit, USA" },
  { value: "Austin, USA", label: "Austin, USA" },
  { value: "Seattle, USA", label: "Seattle, USA" },
  { value: "Bordeaux, France", label: "Bordeaux, France" },
];

const auctiontypes = [
  { value: "all", label: "All Types" },
  { value: "forward", label: "Forward Auctions" },
  { value: "reverse", label: "Reverse Auctions" },
];

function LiveTimer({ time }: { time: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const end = new Date(time);
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <span className="font-semibold text-green-600 flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {timeLeft}
    </span>
  );
}

export default function AuctionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedauctiontype, setSelectedauctiontype] = useState("all");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [allAuctionItems, setAllAuctionItems] = useState<AuctionItem[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch("/api/auctions");
        const json = await res.json();
        if (!json.success) return;

        const mapped: AuctionItem[] = (json.data || []).map((a: any) => {
          // Calculate start and end times
          const start = a.scheduledstart ? new Date(a.scheduledstart) : null;
          const duration = a.auctionduration
            ? ((durationObj) => (
                ((durationObj.days || 0) * 24 * 60 * 60) +
                ((durationObj.hours || 0) * 60 * 60) +
                ((durationObj.minutes || 0) * 60)
              ))(a.auctionduration)
            : 0;
          const end = start ? new Date(start.getTime() + duration * 1000) : null;
          const now = new Date();

          let status: "live" | "upcoming" | "closed" = "upcoming";
          if (start && end) {
            if (now < start) status = "upcoming";
            else if (now >= start && now < end) status = "live";
            else if (now >= end) status = "closed";
          }

          return {
            id: a.id,
            title: a.productname || a.title || "Untitled Auction",
            category: a.categoryid || "",
            image: Array.isArray(a.productimages) && a.productimages.length > 0
              ? a.productimages[0] // Use first URL from productimages
              : "/placeholder.svg",
            auctiontype: a.auctiontype,
            status,
            location: a.location || "",
            scheduledStart: a.scheduledstart || "",
            auctionDuration: a.auctionduration || "",
            featured: a.featured || false,
            verified: a.verified || false,
            currentBid: a.currentbid ?? undefined,
            timeLeft: end && status === "live" ? end.toISOString() : "",
            bidders: a.bidcount ?? undefined,
            seller: a.createdby || "",
            rating: a.rating ?? undefined,
            targetPrice: a.targetprice ?? undefined,
            deadline: "", // You can calculate this if you have end time
            proposals: a.proposals ?? undefined,
            buyer: a.buyer || "",
            startingBid: a.startprice ?? undefined,
            startsIn: start && status === "upcoming" ? start.toISOString() : "",
            finalBid: a.finalbid ?? undefined,
            endedAgo: "", // You can calculate this if you have end time
            winner: a.winner || "",
            views: a.views ?? undefined,
            watchers: a.watchers ?? undefined,
            productimages: a.productimages || [], // Array of Supabase Storage URLs
            productdocuments: a.productdocuments || [], // Array of Supabase Storage URLs
            createdat: a.createdat || "", // For sorting if needed
            auctionsubtype: a.auctionsubtype || undefined, // Map auctionsubtype
          };
        });
        setAllAuctionItems(mapped);
      } catch (error) {
        console.error("Failed to fetch auctions:", error);
      }
    };
    fetchAuctions();
  }, []);

  const filterAndSortAuctions = (status: "live" | "upcoming" | "closed") => {
    let items = allAuctionItems.filter((item) => item.status === status);

    if (searchTerm) {
      items = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      items = items.filter(
        (item) => item.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }
    if (selectedLocation !== "all") {
      items = items.filter((item) => item.location === selectedLocation);
    }
    if (selectedauctiontype !== "all") {
      items = items.filter((item) => item.auctiontype === selectedauctiontype);
    }

    // Sorting logic
    if (status === "live") {
      if (sortBy === "ending-soon") {
        items.sort((a, b) =>
          a.timeLeft && b.timeLeft ? a.timeLeft.localeCompare(b.timeLeft) : 0
        );
      } else if (sortBy === "price-high") {
        items.sort(
          (a, b) =>
            (b.currentBid || b.targetPrice || 0) - (a.currentBid || a.targetPrice || 0)
        );
      } else if (sortBy === "price-low") {
        items.sort(
          (a, b) =>
            (a.currentBid || a.targetPrice || 0) - (b.currentBid || b.targetPrice || 0)
        );
      } else if (sortBy === "most-bids") {
        items.sort(
          (a, b) => (b.bidders || b.proposals || 0) - (a.bidders || a.proposals || 0)
        );
      } else if (sortBy === "most-watched") {
        items.sort((a, b) => (b.watchers || 0) - (a.watchers || 0));
      } else if (sortBy === "newest") {
        items.sort((a, b) =>
          a.createdat && b.createdat ? b.createdat.localeCompare(a.createdat) : 0
        );
      }
    }

    return items;
  };

  const liveAuctions = useMemo(
    () => filterAndSortAuctions("live"),
    [searchTerm, selectedCategory, selectedLocation, selectedauctiontype, sortBy, allAuctionItems]
  );
  const upcomingAuctions = useMemo(
    () => filterAndSortAuctions("upcoming"),
    [searchTerm, selectedCategory, selectedLocation, selectedauctiontype, sortBy, allAuctionItems]
  );
  const closedAuctions = useMemo(
    () => filterAndSortAuctions("closed"),
    [searchTerm, selectedCategory, selectedLocation, selectedauctiontype, sortBy, allAuctionItems]
  );

  const AuctionCard = ({ auction }: { auction: AuctionItem }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (auction.productimages && auction.productimages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === auction.productimages!.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [auction.productimages]);

  const currentImage = useMemo(() => {
    return auction.productimages && auction.productimages.length > 0
      ? auction.productimages[currentImageIndex]
      : auction.image || "/placeholder.svg";
  }, [auction.productimages, currentImageIndex, auction.image]);

  const auctionPath = auction.auctiontype === "reverse" ? `/auctions/reverse/${auction.id}` : `/auctions/${auction.id}`;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group relative border border-gray-200 bg-white dark:bg-gray-800">
      {auction.featured && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
            FEATURED
          </Badge>
        </div>
      )}

      <div className="relative">
        <Image
          src={currentImage}
          alt={auction.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {auction.status === "live" && (
            <Badge className="bg-green-500 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
              LIVE
            </Badge>
          )}
          {auction.status === "upcoming" && (
            <Badge className="bg-blue-500 text-white">
              <Calendar className="h-3 w-3 mr-1" />
              UPCOMING
            </Badge>
          )}
          {auction.status === "closed" && (
            <Badge className="bg-gray-500 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              CLOSED
            </Badge>
          )}
        </div>

        {/* Auction Type Badge */}
        <div className="absolute bottom-2 left-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-white/90 backdrop-blur-sm"
          >
            {auction.auctiontype === "forward" ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-blue-500" />
            )}
            {auction.auctiontype === "forward" ? "Selling" : "Buying"}
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
          >
            <Heart className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {auction.category}
            </Badge>
            {auction.verified && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="h-3 w-3" />
            {auction.views}
          </div>
        </div>

        <h3 className="font-semibold mb-2 text-sm line-clamp-2 group-hover:text-brand-600 transition-colors">
          {auction.title}
        </h3>

        <div className="flex items-center gap-1 mb-3 text-xs text-gray-600">
          <MapPin className="h-3 w-3" />
          {auction.location}
        </div>

        {/* Common Auction Details */}
        <div className="space-y-2 mb-4">
          {auction.status === "live" && auction.timeLeft && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Time Left</span>
              <LiveTimer time={auction.timeLeft} />
            </div>
          )}
          {auction.status === "upcoming" && auction.startsIn && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Starts In</span>
              <LiveTimer time={auction.startsIn} />
            </div>
          )}
          {(auction.status === "live" || auction.status === "closed") &&
            auction.bidders !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Bidders</span>
                <span className="font-semibold flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {auction.bidders}
                </span>
              </div>
            )}
          {auction.watchers && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Watching</span>
              <span className="font-semibold flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {auction.watchers}
              </span>
            </div>
          )}
        </div>

        {/* Type-Specific Details */}
        {auction.auctiontype === "forward" && (
          <>
            {(auction.seller || auction.rating) && (
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">
                  {auction.rating} • {auction.seller}
                </span>
              </div>
            )}
            <div className="space-y-2 mb-4">
              {auction.status === "live" && auction.auctionsubtype === "sealed" && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Status</span>
                  <span className="font-bold text-gray-800">Sealed Auction</span>
                </div>
              )}
              {auction.status === "live" && auction.auctionsubtype !== "sealed" && auction.currentBid !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Current Bid</span>
                  <span className="font-bold text-green-600">
                    {auction.bidders === 0 ? "N/A" : `$${auction.currentBid.toLocaleString()}`}
                  </span>
                </div>
              )}
              {auction.status === "upcoming" && auction.startingBid !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Starting Bid</span>
                  <span className="font-bold text-blue-600">${auction.startingBid.toLocaleString()}</span>
                </div>
              )}
            </div>
          </>
        )}

        {auction.auctiontype === "reverse" && (
          <>
            {auction.buyer && (
              <div className="flex items-center gap-1 mb-3">
                <Briefcase className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-gray-600">Buyer: {auction.buyer}</span>
              </div>
            )}
            <div className="space-y-2 mb-4">
              {auction.targetPrice !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Target Budget</span>
                  <span className="font-bold text-blue-600">${auction.targetPrice.toLocaleString()}</span>
                </div>
              )}
              {auction.status === "live" && auction.deadline && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Deadline</span>
                  <span className="font-semibold text-red-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {auction.deadline}
                  </span>
                </div>
              )}
              {auction.proposals !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Proposals</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {auction.proposals}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {auction.status === "closed" && auction.winner && (
          <div className="flex justify-between items-center text-xs mb-4 p-2 bg-green-50 rounded">
            <span className="text-gray-600">Winner</span>
            <span className="font-semibold text-green-600">{auction.winner}</span>
          </div>
        )}

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm transition-all duration-300"
          size="sm"
          asChild
        >
          <Link href={auctionPath}>
            {auction.status === "live" ? "Place Bid" : "View Auction"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Live Auction Marketplace
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Discover Amazing Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of buyers and sellers in our dynamic marketplace. Find unique items, great deals, and business opportunities.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-600">{liveAuctions.length}</div>
              <div className="text-sm text-gray-600">Live Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{upcomingAuctions.length}</div>
              <div className="text-sm text-gray-600">Starting Soon</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,247</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$2.4M</div>
              <div className="text-sm text-gray-600">Total Volume</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg border border-gray-200 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search auctions, brands, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border border-gray-300"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedauctiontype} onValueChange={setSelectedauctiontype}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {auctiontypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                >
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-blue-600 hover:bg-blue-700 text-white border border-blue-700"
                      : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-blue-600 hover:bg-blue-700 text-white border border-blue-700"
                      : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="most-bids">Most Bids</SelectItem>
                    <SelectItem value="most-watched">Most Watched</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                >
                  <SortAsc className="h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Auction Tabs */}
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm h-12 border border-gray-200">
            <TabsTrigger
              value="live"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Auctions ({liveAuctions.length})
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <Calendar className="h-4 w-4" />
              Starting Soon ({upcomingAuctions.length})
            </TabsTrigger>
            <TabsTrigger
              value="closed"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-700"
            >
              <CheckCircle className="h-4 w-4" />
              Recently Closed ({closedAuctions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-8">
            {liveAuctions.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {liveAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <TrendingUp className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No live auctions found
                </h3>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            {upcomingAuctions.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {upcomingAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Calendar className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No upcoming auctions found
                </h3>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="closed" className="mt-8">
            {closedAuctions.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {closedAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CheckCircle className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No closed auctions found
                </h3>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
          >
            Load More Auctions
          </Button>
        </div>
      </div>
    </div>
  );
}
