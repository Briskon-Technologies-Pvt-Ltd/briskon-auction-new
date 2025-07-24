"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

// import { TrendingDown } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  Search,
  Facebook,
  Instagram,
  Twitter,
  Star,
  CalendarPlus,
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
  Share,
  Timer,
  X,
  Hourglass,
  Gavel,
  CircleStop,
  PersonStanding,
  Currency,
  AlertCircle,
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
  fname: string;
  featured?: boolean;
  verified?: boolean;
  currentBid?: number;
  timeLeft?: string;
  bidders?: number;
  seller?: string;
  rating?: number;
  targetPrice?: number;
  bidincrementtype?: "fixed" | "percentage";
  minimumincrement?: number;
  deadline?: string;
  proposals?: number;
  buyer?: string;
  currency?: string;
  startingBid?: number;
  startsIn?: string;
  finalBid?: number;
  ended?: boolean;
  endedAgo?: string;
  winner?: string;
  views?: number;
  percent?: number;
  bidder_count?: number;
  watchers?: number;
  productimages?: string[]; // Array of Supabase Storage URLs
  productdocuments?: string[]; // Array of Supabase Storage URLs
  createdat?: string; // Added for sorting consistency
  auctionsubtype?: string; // Added to handle sealed auctions
  scheduledstart?: string; // <-- match what comes from the DB
  auctionduration?: { days?: number; hours?: number; minutes?: number };
};

const categories = [{ value: "all", label: "Category" }];

const subtypes = [
  { value: "all", label: "Auction Style" },
  { value: "sealed", label: "Sealed" },
  { value: "silent", label: "Silent" },
  { value: "dutch", label: "Dutch" },
  { value: "english", label: "English" },
];
// const auctiontypes = [
//   { value: "all", label: "Auction Type" },
//   { value: "forward", label: "Forward Auctions" },
//   { value: "reverse", label: "Reverse Auctions" },
// ];
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
      setTimeLeft(`${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`);
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <span className="font-semibold text-red-600 flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {timeLeft}
    </span>
  );
}
function formatDateTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

function getEndDate(
  start: Date,
  duration: { days?: number; hours?: number; minutes?: number }
) {
  const end = new Date(start);
  if (duration.days) end.setDate(end.getDate() + duration.days);
  if (duration.hours) end.setHours(end.getHours() + duration.hours);
  if (duration.minutes) end.setMinutes(end.getMinutes() + duration.minutes);
  return end;
}

export default function AuctionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const [locations, setLocations] = useState([
    { value: "all", label: "Locations" },
  ]);
  const [selectedauctiontype, setSelectedauctiontype] = useState("all");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubtype, setSelectedSubtype] = useState("all");
  const [allAuctionItems, setAllAuctionItems] = useState<AuctionItem[]>([]);
  // const [showShareMenu, setShowShareMenu] = useState(false);
  const [auctionStyleSearch, setAuctionStyleSearch] = useState("");
  const [visibleLive, setVisibleLive] = useState(8);
  const [visibleUpcoming, setVisibleUpcoming] = useState(8);
  const [visibleClosed, setVisibleClosed] = useState(8);
  const [tab, setTab] = useState<"live" | "upcoming" | "closed">("live");
  const upcomingTabRef = useRef<HTMLButtonElement>(null);

  const [dbCategories, setDbCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const liveAuctionsCount = allAuctionItems.filter(
    (item) => item.status === "live"
  );

  const categoryCounts: Record<string, number> = liveAuctionsCount.reduce(
    (acc, item) => {
      const category = item.category || "uncategorized"; // adjust this key if needed
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const mergedCategories = [
    ...categories,
    ...dbCategories
      .filter((dbCat) => !categories.some((cat) => cat.value === dbCat.value))
      .map((cat) => ({
        ...cat,
        label: `${cat.label} (${categoryCounts[cat.value] || 0})`, // append count
      })),
  ];

  const liveTypeCounts = liveAuctionsCount.reduce(
    (acc, item) => {
      if (item.auctiontype === "forward") acc.forward += 1;
      else if (item.auctiontype === "reverse") acc.reverse += 1;
      return acc;
    },
    { forward: 0, reverse: 0 }
  );
  const auctiontypes = [
    { value: "all", label: "Auction Type" },
    { value: "forward", label: `Forward Auctions (${liveTypeCounts.forward})` },
    { value: "reverse", label: `Reverse Auctions (${liveTypeCounts.reverse})` },
  ];

  const locationCounts = allAuctionItems.reduce<Record<string, number>>(
    (acc, item) => {
      if (item.status === "live" && item.location?.trim()) {
        acc[item.location] = (acc[item.location] || 0) + 1;
      }
      return acc;
    },
    {}
  );
  const locationsCount = [
    { value: "all", label: "Location" },
    ...Object.entries(locationCounts).map(([loc, count]) => ({
      value: loc,
      label: `${loc} (${count})`,
    })),
  ];

  const liveSubtypeCounts: Record<string, number> = allAuctionItems
    .filter((item) => item.status === "live")
    .reduce((acc, item) => {
      const subtype = item.auctionsubtype || "unknown";
      acc[subtype] = (acc[subtype] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  const subtypesWithCounts = subtypes.map((sub) => ({
    ...sub,
    label:
      sub.value === "all"
        ? sub.label
        : `${sub.label} (${liveSubtypeCounts[sub.value] || 0})`,
  }));

  useEffect(() => {
    if (allAuctionItems.length === 0) return;

    const uniqueCategoryIds = Array.from(
      new Set(allAuctionItems.map((item) => item.category).filter(Boolean))
    );

    const dbCats = uniqueCategoryIds.map((catId) => ({
      value: catId,
      label: catId.charAt(0).toUpperCase() + catId.slice(1).replace(/-/g, " "),
    }));

    setDbCategories([{ value: "all", label: "All Categories" }, ...dbCats]);
  }, [allAuctionItems]);
  useEffect(() => {
    if (allAuctionItems.length === 0) return;

    const uniqueLocations = Array.from(
      new Set(
        allAuctionItems
          .map((item) => item.location)
          .filter((loc) => loc && loc !== "")
      )
    );

    const dbLocations = uniqueLocations.map((loc) => ({
      value: loc,
      label: loc.charAt(0).toUpperCase() + loc.slice(1),
    }));

    setLocations([{ value: "all", label: "Location" }, ...dbLocations]);
  }, [allAuctionItems]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch("/api/auctions");
        const json = await res.json();
        // console.log("Fetched auctions:", json.data); // Debug log
        if (!json.success) return;

        const mapped: AuctionItem[] = (json.data || []).map((a: any) => {
          // Calculate start and end times
          const start = a.scheduledstart ? new Date(a.scheduledstart) : null;
          const duration = a.auctionduration
            ? ((durationObj) =>
                (durationObj.days || 0) * 24 * 60 * 60 +
                (durationObj.hours || 0) * 60 * 60 +
                (durationObj.minutes || 0) * 60)(a.auctionduration)
            : 0;
          const end = start
            ? new Date(start.getTime() + duration * 1000)
            : null;
          const now = new Date();

          let status: "live" | "upcoming" | "closed" = "upcoming";
          if (start && end) {
            if (now < start) status = "upcoming";
            else if (now >= start && now < end) status = "live";
            else if (now >= end) status = "closed";
          }

          /////////////////////////////////////////////////////////

          return {
            id: a.id,
            title: a.productname || a.title || "Untitled Auction",
            category: a.categoryid || "",
            image:
              Array.isArray(a.productimages) && a.productimages.length > 0
                ? a.productimages[0] // Use first URL from productimages
                : "/placeholder.svg",
            auctiontype: a.auctiontype,
            status,
            // location: a.profiles?.location || "",
            scheduledstart: a.scheduledstart || "",
            auctionduration: a.auctionduration || "",
            featured: a.featured || false,
            verified: a.verified || false,
            bidincrementtype: a.bidincrementtype,
            percent: a.percent,
            currentBid: a.currentbid ?? undefined,
            timeLeft: end && status === "live" ? end.toISOString() : "",
            bidders: a.bidcount ?? undefined,
            // seller: a.createdby || "",
            seller: a.seller || "", // This is now a UUID
            fname: a.profiles?.fname || "",
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
            views: a.views,
            bidder_count: a.bidder_count,
            minimumincrement: a.minimumincrement,
            currency: a.currency,
            watchers: a.watchers ?? undefined,
            productimages: a.productimages || [], // Array of Supabase Storage URLs
            productdocuments: a.productdocuments || [], // Array of Supabase Storage URLs
            createdat: a.createdat || "", // For sorting if needed
            auctionsubtype: a.auctionsubtype || undefined, // Map auctionsubtype
            location: a.profiles?.location || a.location || "",
            // fname: a.profiles?.fname || "", // add this
          };
        });
        setAllAuctionItems(mapped);
      } catch (error) {
        console.error("Failed to fetch auctions:", error);
      }
    };
    fetchAuctions();
  }, []);

  const filterAndSortAuctions = (
    status: "live" | "upcoming" | "closed",
    auctiontype?: "forward" | "reverse"
  ) => {
    let items = allAuctionItems.filter((item) => {
      return (
        item.status === status &&
        (auctiontype ? item.auctiontype === auctiontype : true)
      );
    });

    if (searchTerm) {
      items = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      items = items.filter(
        (item) =>
          item.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }
    if (selectedLocation !== "all") {
      items = items.filter((item) => item.location === selectedLocation);
    }
    if (!auctiontype && selectedauctiontype !== "all") {
      items = items.filter((item) => item.auctiontype === selectedauctiontype);
    }
    if (selectedSubtype !== "all") {
      items = items.filter((item) => item.auctionsubtype === selectedSubtype);
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
            (b.currentBid || b.targetPrice || 0) -
            (a.currentBid || a.targetPrice || 0)
        );
      } else if (sortBy === "price-low") {
        items.sort(
          (a, b) =>
            (a.currentBid || a.targetPrice || 0) -
            (b.currentBid || b.targetPrice || 0)
        );
      } else if (sortBy === "most-bids") {
        items.sort(
          (a, b) =>
            (b.bidders || b.proposals || 0) - (a.bidders || a.proposals || 0)
        );
      } else if (sortBy === "most-watched") {
        items.sort((a, b) => (b.watchers || 0) - (a.watchers || 0));
      } else if (sortBy === "newest") {
        items.sort((a, b) =>
          a.createdat && b.createdat
            ? b.createdat.localeCompare(a.createdat)
            : 0
        );
      }
    }

    return items;
  };

  const liveAuctions = useMemo(
    () => filterAndSortAuctions("live"),
    [
      searchTerm,
      selectedCategory,
      selectedLocation,
      selectedauctiontype,
      selectedSubtype,
      sortBy,
      allAuctionItems,
    ]
  );
  const upcomingAuctions = useMemo(
    () => filterAndSortAuctions("upcoming"),
    [
      searchTerm,
      selectedCategory,
      selectedLocation,
      selectedauctiontype,
      selectedSubtype,
      sortBy,
      allAuctionItems,
    ]
  );
  const liveForwardAuctions = useMemo(
    () => filterAndSortAuctions("live", "forward"),
    [
      searchTerm,
      selectedCategory,
      selectedLocation,
      selectedauctiontype,
      selectedSubtype,
      sortBy,
      allAuctionItems,
    ]
  );
  const liveReverseAuctions = useMemo(
    () => filterAndSortAuctions("live", "reverse"),
    [
      searchTerm,
      selectedCategory,
      selectedLocation,
      // selectedauctiontype,
      selectedSubtype,
      sortBy,
      allAuctionItems,
    ]
  );
  const upcomingForwardAuctions = useMemo(
    () => filterAndSortAuctions("upcoming", "forward"),
    [
      searchTerm,
      selectedCategory,
      selectedLocation,
      selectedauctiontype,
      selectedSubtype,
      sortBy,
      allAuctionItems,
    ]
  );
  const upcomingReverseAuctions = useMemo(
    () => filterAndSortAuctions("upcoming", "reverse"),
    [
      searchTerm,
      selectedCategory,
      selectedLocation,
      selectedSubtype,
      // selectedauctiontype,
      sortBy,
      allAuctionItems,
    ]
  );

  const closedAuctions = useMemo(
    () => filterAndSortAuctions("closed"),
    [
      searchTerm,
      selectedCategory,
      selectedLocation,
      selectedauctiontype,
      selectedSubtype,
      sortBy,
      allAuctionItems,
    ]
  );
  const AuctionCard = ({ auction }: { auction: AuctionItem }) => {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const currencySymbols: { [key: string]: string } = {
      USD: "$",
      INR: "₹",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "CA$",
      AUD: "A$",
      // Add more if needed
    };
    const currencySymbol = auction.currency
      ? currencySymbols[auction.currency] ?? ""
      : "";

    useEffect(() => {
      if (auction.productimages && auction.productimages.length > 1) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) =>
            prev === auction.productimages!.length - 1 ? 0 : prev + 1
          );
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [auction.productimages]);

    const currentImage = useMemo(() => {
      return auction.productimages?.length
        ? auction.productimages[currentImageIndex]
        : auction.image || "/placeholder.svg";
    }, [auction.productimages, currentImageIndex, auction.image]);

    const auctionPath =
      auction.auctiontype === "reverse"
        ? `/auctions/reverse/${auction.id}`
        : `/auctions/${auction.id}`;

    return (
      <Card className="flex flex-col justify-between h-full overflow-hidden border border-gray-200 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group relative">
        {/* Featured Badge */}
        {auction.featured && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
              FEATURED
            </Badge>
          </div>
        )}
        {/* Image Section with consistent aspect ratio */}
        <div className="relative w-full aspect-[4/3] group overflow-hidden rounded-t">
          {/* Subtype Badge */}
          <div className="absolute top-0 left-0 bg-slate-900 bg-opacity-80 text-white text-[12px] px-2 py-1 rounded z-20">
            {auction.auctionsubtype
              ? auction.auctionsubtype.charAt(0).toUpperCase() +
                auction.auctionsubtype.slice(1)
              : ""}
          </div>

          {/* Status Badge */}
          <div className="absolute top-2 right-2 z-20">
            {auction.status === "live" && (
              <Badge className="bg-green-500 text-white animate-pulse flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                LIVE
              </Badge>
            )}
            {auction.status === "upcoming" && (
              <Badge className="bg-blue-500 text-white flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                UPCOMING
              </Badge>
            )}
            {auction.status === "closed" && (
              <Badge className="bg-gray-500 text-white flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                CLOSED
              </Badge>
            )}
          </div>

          {/* Type Badge */}
          <div className="absolute bottom-2 left-2 z-20">
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
          {/* <div className="relative"> */}
          <div className="absolute bottom-2 right-2 flex gap-1 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 flex items-center justify-center"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {showShareMenu && (
            <div className="absolute bottom-12 right-2 bg-white border shadow-lg rounded-md p-2 z-30 flex gap-3">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 text-blue-600 hover:scale-110 transition" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-pink-500 hover:scale-110 transition" />
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://yourdomain.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 text-blue-400 hover:scale-110 transition" />
              </a>
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex gap-1 group-hover:opacity-100 transition-opacity duration-300 z-20">
            {/* Calendar Button */}
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 flex items-center justify-center"
              onClick={() => {
                window.open(
                  `https://www.google.com/calendar/render?action=TEMPLATE&text=Auction+Event&dates=20250711T180000Z/20250711T190000Z&details=Join+the+auction+at+https://yourdomain.com&location=https://yourdomain.com`,
                  "_blank"
                );
              }}
            >
              <CalendarPlus className="h-4 w-4 text-green-600" />
            </Button>

            {/* Share Button */}
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 flex items-center justify-center"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {showShareMenu && (
            <div className="absolute bottom-12 right-2 bg-white border shadow-lg rounded-md p-2 z-30 flex gap-3">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 text-blue-600 hover:scale-110 transition" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-pink-500 hover:scale-110 transition" />
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://yourdomain.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 text-blue-400 hover:scale-110 transition" />
              </a>
            </div>
          )}

          {/* Image */}
          <Link href={auctionPath} className="block h-full w-full">
            <Image
              src={currentImage}
              alt={auction.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            />
          </Link>
        </div>

        {/* Card Content */}
        <CardContent className="flex flex-col justify-between flex-grow p-4">
          {/* Top Info */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {/* <Badge variant="outline" className="text-xs">
                {auction.category}
              </Badge> */}
              <Badge
                variant="outline"
                className="text-xs cursor-pointer hover:bg-blue-100 transition"
                onClick={() => setSelectedCategory(auction.category)}
              >
                {auction.category}
              </Badge>
              {auction.verified && (
                <Badge
                  variant="outline"
                  className="text-xs text-green-600 border-green-200"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            {/* <div className="flex items-center gap-1 text-xs text-gray-500">
              <Eye className="h-3 w-3" />
              {auction.views ?? 0}
            </div> */}
          </div>
          {/* Title */}
          <h3 className="font-semibold mb-2 text-sm line-clamp-2 min-h-[40px] group-hover:text-brand-600 transition-colors">
            {auction.title}
          </h3>

          {/* Location */}
          {/* <div className="flex items-center gap-1 mb-3 text-xs text-gray-600">
          <MapPin className="h-3 w-3" />
          {auction.location}
         </div> */}
          {auction.auctiontype === "forward" && (
            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 mb-2">
              {/* Seller Row */}
              {auction.fname && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <PersonStanding className="w-3 h-3 text-green-500" />
                    <span className="font-medium">Seller:</span>
                  </div>
                  <span className="font-medium">{auction.fname}</span>
                </div>
              )}
            </div>
          )}

          {/* Timings */}
          {auction.scheduledstart && auction.auctionduration && (
            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 mb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Timer className="w-[12px] h[12px] text-green-500" />
                  <span className="font-medium">Starts:</span>
                </div>
                <span>{formatDateTime(new Date(auction.scheduledstart))}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <CircleStop className="w-[11px] h-[11px] text-red-500" />
                  <span className="font-medium">Ends:</span>
                </div>
                <span>
                  {formatDateTime(
                    getEndDate(
                      new Date(auction.scheduledstart),
                      auction.auctionduration
                    )
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Timers / Bidders / Watchers */}
          <div className="space-y-2 mb-3">
            {auction.status === "live" && auction.timeLeft && (
              <div className="flex justify-between items-center">
                {/* <span className="text-xs text-gray-600 font-medium">
                  Ends In:
                </span> */}
                <div className="flex items-center gap-1">
                  <Hourglass className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-gray-600 font-medium">
                    Ends In:
                  </span>
                </div>
                <LiveTimer time={auction.timeLeft} />
              </div>
            )}

            {auction.status === "upcoming" && auction.startsIn && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 ml-[2.5px]">
                  Starts In
                </span>
                <LiveTimer time={auction.startsIn} />
              </div>
            )}

            {auction.watchers && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 ml-[2.5px]">
                  Watching
                </span>
                <span className="font-semibold flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {auction.watchers}
                </span>
              </div>
            )}
          </div>

          {/* Forward-specific details */}
          {auction.auctiontype === "forward" && (
            <>
              {/* sealed and silent   */}
              {(auction.status === "live" || auction.status === "upcoming") &&
                // auction.auctionsubtype !== "sealed" &&
                // auction.auctionsubtype !== "silent" &&
                auction.startingBid !== undefined && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600 font-semibold ml-[2.5px]">
                      Starting Bid:
                    </span>
                    <span className="font-bold text-green-600">
                      {currencySymbol}
                      {auction.startingBid.toLocaleString()}
                    </span>
                  </div>
                )}

              {isLoggedIn && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Min Bid Increment:
                    </span>
                  </div>
                  <span className="font-semibold text-base text-gray-700 dark:text-gray-100 text-sm">
                    {currencySymbol}
                    {auction.bidincrementtype === "percentage" &&
                    auction.percent &&
                    auction.currentBid
                      ? (
                          auction.currentBid *
                          (auction.percent / 100)
                        ).toLocaleString()
                      : auction.minimumincrement?.toLocaleString() || "0"}
                  </span>
                </div>
              )}

              {auction.status === "live" &&
                auction.auctionsubtype !== "sealed" &&
                auction.auctionsubtype !== "silent" &&
                auction.currentBid !== undefined && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600 font-semibold ml-[2.5px]">
                      Current Bid:
                    </span>
                    <span className="font-bold text-blue-600">
                      {currencySymbol}
                      {auction.currentBid.toLocaleString()}
                    </span>
                  </div>
                )}
              {/* {(auction.auctionsubtype === "sealed" ||
                auction.auctionsubtype === "silent") &&
                auction.status === "live" && (
                  <div className="h-[22px] mb-2" /> // fake current bid spacer
                )} */}
              <div className="mb-2 mt-[0px]">
                {auction.status == "live" &&
                  (auction.auctionsubtype === "sealed" ||
                    auction.auctionsubtype === "silent") && (
                    <span className="text-xs text-gray-600 font-semibold ml-[2.5px] pb-2">
                      Bids are confidential until opening
                    </span>
                  )}
              </div>

              {(auction.status === "live" || auction.status === "closed") &&
                auction.bidders !== undefined && (
                  <div className="flex mt-auto justify-between items-center">
                    <span className="text-xs text-gray-600 ml-[2.5px]">
                      Bidders count:
                    </span>
                    <span className="font-semibold flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {auction.bidder_count}
                    </span>
                  </div>
                )}
            </>
          )}

          {/* Reverse-specific details */}
          {auction.auctiontype === "reverse" && (
            <>
              {auction.buyer && (
                <div className="flex items-center gap-1 mb-2">
                  <Briefcase className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-gray-600">
                    Buyer: {auction.buyer}
                  </span>
                </div>
              )}
              {auction.targetPrice !== undefined && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Target Budget</span>
                  <span className="font-bold text-blue-600">
                    ${auction.targetPrice.toLocaleString()}
                  </span>
                </div>
              )}
              {auction.status === "live" && auction.deadline && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Deadline</span>
                  <span className="font-semibold text-red-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {auction.deadline}
                  </span>
                </div>
              )}
              {auction.proposals !== undefined && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Proposals</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {auction.proposals}
                  </span>
                </div>
              )}
            </>
          )}

          {/* Winner */}
          {auction.status === "closed" && auction.winner && (
            <div className="flex justify-between items-center text-xs mb-3 p-2 bg-green-50 rounded">
              <span className="text-gray-600">Winner</span>
              <span className="font-semibold text-green-600">
                {auction.winner}
              </span>
            </div>
          )}

          {/* Button at the bottom */}
          <div className="mt-auto pt-3">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm transition-all duration-300"
              size="sm"
              asChild
            >
              <Link href={auctionPath}>
                {auction.status === "closed"
                  ? "Auction Summary"
                  : auction.status === "live"
                  ? isLoggedIn
                    ? "View & Bid"
                    : "View Auction"
                  : "View Auction"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  const handleLoadMore = (tab: "live" | "upcoming" | "closed") => {
    if (tab === "live") {
      setVisibleLive((prev) => {
        const next = prev + 8;
        return next >= liveAuctions.length ? liveAuctions.length : next;
      });
    }
    if (tab === "upcoming") {
      setVisibleUpcoming((prev) => {
        const next = prev + 8;
        return next >= upcomingAuctions.length ? upcomingAuctions.length : next;
      });
    }
    if (tab === "closed") {
      setVisibleClosed((prev) => {
        const next = prev + 8;
        return next >= closedAuctions.length ? closedAuctions.length : next;
      });
    }
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
            Join thousands of buyers and sellers in our dynamic marketplace.
            Find unique items, great deals, and business opportunities.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div
              onClick={() => {
                setTab("live");
                setSelectedauctiontype("forward");
              }}
              className={`text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden break-words shadow-sm
         ${
           tab === "live" && selectedauctiontype === "forward"
             ? "bg-blue-100 shadow-md ring-2 ring-blue-300"
             : "bg-white"
         }
         hover:bg-blue-200 hover:shadow-lg`}
            >
              <div className="text-xl font-bold text-orange-600 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                {liveForwardAuctions.length}
              </div>
              <div className="text-sm text-gray-700 mt-1">
                Live Forward Auctions
              </div>
            </div>

            <div
              onClick={() => {
                setTab("live"); // Switch to live tab
                setSelectedauctiontype("reverse"); // Set filter
              }}
              className={`text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden break-words shadow-sm ${
                tab === "live" && selectedauctiontype === "reverse"
                  ? "bg-blue-100 shadow-md ring-2 ring-blue-300"
                  : "bg-white"
              }  hover:bg-blue-200 hover:shadow-lg`}
            >
              <div className="text-xl font-bold text-teal-600 flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4 text-gray-600" />
                {liveReverseAuctions.length}
              </div>
              <div className="text-sm text-gray-600">Live Reverse Auctions</div>
            </div>

            <div
              onClick={() => {
                setTab("upcoming"); // Switch to upcoming tab
                setSelectedauctiontype("forward"); // Set filter
              }}
              className={`text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden break-words shadow-sm ${
                tab === "upcoming" && selectedauctiontype === "forward"
                  ? "bg-blue-100 shadow-md ring-2 ring-blue-300"
                  : "bg-white"
              } hover:bg-blue-200 hover:shadow-lg`}
            >
              <div className="text-xl font-bold text-orange-600 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                {upcomingForwardAuctions.length}
              </div>
              <div className="text-sm text-gray-600">
                Upcoming Forward Auctions
              </div>
            </div>

            <div
              onClick={() => {
                setTab("upcoming"); // Switch to "Starting Soon" tab
                setSelectedauctiontype("reverse"); // Set filter to reverse
              }}
              className={`text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden break-words shadow-sm  ${
                tab === "upcoming" && selectedauctiontype === "reverse"
                  ? "bg-blue-100 shadow-md ring-2 ring-blue-300"
                  : "bg-white"
              } hover:bg-blue-200 hover:shadow-lg`}
            >
              <div className="text-xl font-bold text-teal-600 flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4 text-gray-600" />
                {upcomingReverseAuctions.length}
              </div>
              <div className="text-sm text-gray-600">
                Upcoming Reverse Auctions
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}

        <Card className="mb-8 shadow-lg border border-gray-200 bg-white overflow-x-hidden ">
          <CardContent className="p-4 ">
            <div className="flex flex-col lg:flex-row gap-4 items-center overflow-x-hidden">
              {/* Search and Filters */}
              <div className="flex-1 flex flex-wrap gap-2 items-center overflow-x-hidden">
                {/* Search Input */}
                <div className="relative flex-grow min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search auctions, brands, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border border-gray-300 w-full"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* Location Filter */}
                  <div className="flex gap-2 flex-wrap">
                    <Select
                      value={selectedauctiontype}
                      onValueChange={setSelectedauctiontype}
                    >
                      <SelectTrigger className="w-40 h-12 max-w-full">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="z-50 text-left">
                        {auctiontypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="w-40 h-12 max-w-full">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        {locationsCount.map((location) => (
                          <SelectItem
                            key={location.value}
                            value={location.value}
                          >
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-40 h-12 max-w-full">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        {mergedCategories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Select
                  value={selectedSubtype}
                  onValueChange={setSelectedSubtype}
                >
                  <SelectTrigger className="w-40 h-12 max-w-full">
                    <SelectValue placeholder="Auction style" />
                  </SelectTrigger>
                  <SelectContent className="z-50 text-left">
                    {subtypesWithCounts.map((subtype) => (
                      <SelectItem
                        key={subtype.value}
                        value={subtype.value}
                        className="pl-8 pr-2 text-sm"
                      >
                        {subtype.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-40 h-12 max-w-full">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="most-bids">Most Bids</SelectItem>
                    <SelectItem value="most-watched">Most Watched</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auction Tabs */}
        <Tabs
          value={tab}
          onValueChange={(value) => {
            if (
              value === "live" ||
              value === "upcoming" ||
              value === "closed"
            ) {
              setTab(value);
            }
          }}
          className="w-full"
        >
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
              ref={upcomingTabRef} // <-- Attach ref here
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
                className={`grid gap-6 ${"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
              >
                {liveAuctions.slice(0, visibleLive).map((auction) => (
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
                <p className="text-gray-500">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
            {visibleLive < liveAuctions.length && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                  onClick={() => handleLoadMore("live")}
                >
                  Load More Auctions
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            {upcomingAuctions.length > 0 ? (
              <div
                className={`grid gap-6 ${"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
              >
                {upcomingAuctions.slice(0, visibleUpcoming).map((auction) => (
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
                <p className="text-gray-500">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
            {visibleUpcoming < upcomingAuctions.length && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                  onClick={() => handleLoadMore("upcoming")}
                >
                  Load More Auctions
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="closed" className="mt-8">
            {closedAuctions.length > 0 ? (
              <div
                className={`grid gap-6 ${"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
              >
                {closedAuctions.slice(0, visibleClosed).map((auction) => (
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
                <p className="text-gray-500">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
            {visibleClosed < closedAuctions.length && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                  onClick={() => handleLoadMore("closed")}
                >
                  Load More Auctions
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
