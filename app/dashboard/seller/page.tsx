"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Package,
  DollarSign,
  TrendingUp,
  Settings,
  Trophy,
  Gavel,
  Calendar,
  XCircle,
  PackageCheck,
  Archive,
  BarChart,
  BarChart3,
  MessageCircle,
  CheckCircle,
  Hourglass,
  Ban,
  LucideVault,
  Plus,
  Eye,
  Trash,
  Trash2,
  Edit,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import LiveTimer from "@/app/livetimer/page";
import CreateAuction from "@/app/seller-panel/create-listing/page";
import SellerBidLeaderboard from "@/app/seller-bid-leader-board/page";

interface Winner {
  id: string;
  productname: string;
  productimages: string;
  soldprice: number;
  buyername: string;
  buyeremail: string;
  closedat: string;
}

// types.ts (optional)
interface Sale {
  id: string;
  productname: string;
  productimages: string;
  salePrice: number;
  buyer: string;
  category: string;
  type: string;
  format: string;
  starting_bid: number;
  saleDate: string | null;
  bidder_count: number;
}

interface UnsoldSale {
  id: string;
  productname: string;
  auction_type: string;
  auction_subtype: string;
  productimages: string;
  salePrice: number;
  buyer: string;
  auction_category: string;
  saleDate: string | null;
  starting_bid: number;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  scheduledstart: string;
}

interface Stats {
  activeListings: number;
  totalSales: number;
  totalBids: number;
  topAuctions: {
    id: string;
    productname: string;
    productimages: string;
    category: string;
    type: string;
    format: string;
    starting_bid: number;
    current_bid: number;
    gain: number;
    bidders: number;
    auctionduration?: { days?: number; hours?: number; minutes?: number };
    scheduledstart: string;
  }[];
}
interface LiveAuction {
  id: string;
  productname: string;
  currentbid: number | null;
  productimages: string;
  startprice: number;
  auctiontype: string;
  auctionsubtype: string;
  categoryid: number;
  bidder_count: number;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  scheduledstart: string;
}
interface upcomingAuctionItem {
  id: string;
  productname: string;
  currentbid: number | null;
  productimages: string;
  startprice: number;
  auctiontype: string;
  auctionsubtype: string;
  categoryid: string;
  scheduledstart: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
}
interface closedAuctionItem {
  id: string;
  productname: string;
  currentbid: number | null;
  productimages: string;
  startprice: number;
  auctiontype: string;
  auctionsubtype: string;
  categoryid: string;
  scheduledstart: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
}
interface AuctionItem {
  id: string;
  productname: string;
  productimages: string;
  salePrice: number;
  starting_bid: number;
  category: string;
  type: string | number;
  format: string | number;
  created_at: string;
}
interface approvalPendingItem {
  id: string;
  productname: string;
  productimages: string;
  salePrice: number;
  starting_bid: number;
  category: string;
  type: string | number;
  format: string | number;
  created_at: string;
  scheduledstart: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
}
interface approvalRejectedItem {
  id: string;
  productname: string;
  productimages: string;
  salePrice: number;
  starting_bid: number;
  category: string;
  type: string | number;
  format: string | number;
  created_at: string;
  scheduledstart: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
}

interface RecentAuction {
  id: string;
  title: string;
  productname?: string; // Added as optional in case it's not always present
  currentbid: number;
}

export default function SellerDashboard() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [winners, setWinners] = useState<Winner[]>([]);
  const [manageAuctionTab, setManageAuctionTab] = useState<
    "live" | "upcoming" | "pending" | "closed" | "rejected" | "create"
  >("live");
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(
    null
  );
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState<string | null>(null);
  const [recentAuctions, setRecentAuctions] = useState<RecentAuction[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [errorInsights, setErrorInsights] = useState<string | null>(null);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [unsoldCount, setUnsoldCount] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [liveAuctions, setLiveAuctions] = useState<LiveAuction[]>([]);
  const [approvalPendings, setApprovalPendings] = useState<
    approvalPendingItem[]
  >([]);
  const [approvalRejected, setApprovalRejected] = useState<
    approvalRejectedItem[]
  >([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState<
    upcomingAuctionItem[]
  >([]);
  const [closedAuctions, setClosedAuctions] = useState<closedAuctionItem[]>([]);
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [showSellerLeaderboard, setShowSellerLeaderboard] = useState(false);

  const [auctionCount, setAuctionCount] = useState(0);
  const [sales, setSales] = useState<Sale[]>([]);
  const [unsoldSales, setUnsoldSale] = useState<UnsoldSale[]>([]);
  const [isLoadingSales, setIsLoadingSales] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<
    | "leaderboard"
    | "activeBids"
    | "winners"
    | "liveAuction"
    | "upcomingAuctions"
    | "itemUnsold"
    | "manageAuction"
    | "approvalPending"
  >("leaderboard");
  // start and end time logic
  function formatDateTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(" at ", ", "); // remove "at"
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
  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const response = await fetch(
        `/api/seller/stats?email=${encodeURIComponent(user?.email || "")}`
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to load stats");
      }

      setStats(data.data);
    } catch (err) {
      console.error("Stats fetch error:", err);
      setErrorStats(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchSellerLiveAuctions = async (email: string) => {
    try {
      const response = await fetch(
        `/api/seller/live-auctions?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to load live auctions");
      }

      // Use data directly without interface
      setLiveCount(data.count);
      setLiveAuctions(data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching live auctions:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const fetchSellerUpcomingCount = async (email: string) => {
    try {
      const response = await fetch(
        `/api/seller/upcoming-auctions?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to load live auctions");
      }

      setUpcomingCount(data.count);
      setUpcomingAuctions(data.data);
      setError(null);
    } catch (err) {
      console.error(" Network error while fetching upcoming count:", err);
    }
  };

  useEffect(() => {
    if (!isLoading && user?.email) {
      fetchStats(); // your other API
      fetchSellerLiveAuctions(user.email);
      fetchSellerUpcomingCount(user.email);
    }
  }, [user?.email, isLoading]);

  // }, [user?.email, isLoading]);

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoadingSales(true);
      try {
        console.log("User object:", user); // Debug user object
        if (!user?.email) throw new Error("User email is missing");
        const response = await fetch(
          `/api/seller/sales-history?email=${encodeURIComponent(user.email)}`
        );
        console.log("Fetch response status:", response.status); // Debug status
        if (!response.ok)
          throw new Error(
            `Failed to fetch sales history: ${response.statusText}`
          );
        const data = await response.json();
        console.log("Fetch response data:", data); // Debug full response
        if (!data.success)
          throw new Error(data.error || "Failed to load sales history");
        setSales(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Fetch error:", err); // Debug error
      } finally {
        setIsLoadingSales(false);
      }
    };

    if (user) fetchSales();
  }, [user]);

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoadingSales(true);
      try {
        if (!user?.email) throw new Error("User email is missing");
        const response = await fetch(
          `/api/seller/unsold-items?email=${encodeURIComponent(user.email)}`
        );
        console.log("Fetch response status:", response.status); // Debug status
        if (!response.ok)
          throw new Error(
            `Failed to fetch sales history: ${response.statusText}`
          );
        const data = await response.json();
        if (!data.success)
          throw new Error(data.error || "Failed to load sales history");
        setUnsoldSale(data.data || []);
        setUnsoldCount((data.data || []).length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoadingSales(false);
      }
    };

    if (user) fetchSales();
  }, [user]);

  // Manage-auctions
  useEffect(() => {
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/seller/manage-auction?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setAuctions(data.data || []);
        setAuctionCount(data.count);
      }
    };
    if (user) fetchAuctions();
  }, [user]);

  useEffect(() => {
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/seller/approval-Pending?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setApprovalPendings(data.data || []);
      }
    };
    if (user) fetchAuctions();
  }, [user]);

  useEffect(() => {
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/seller/approval-rejected?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setApprovalRejected(data.data || []);
      }
    };
    if (user) fetchAuctions();
  }, [user]);

  useEffect(() => {
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/seller/closed-auctions?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setClosedAuctions(data.data || []);
      }
    };
    if (user) fetchAuctions();
  }, [user]);

  // if (isLoading || isLoadingSales) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Not logged in. Please log in to access the seller dashboard.</p>
      </div>
    );
  }

  if (user.role !== "seller" && user.role !== "both") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access Denied. This dashboard is for sellers.</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }
  function smoothScrollBy(distance: number, duration = 800) {
    const start = window.scrollY;
    const startTime = performance.now();

    function easeInOutQuad(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function scroll() {
      const now = performance.now();
      let time = (now - startTime) / duration;
      time = Math.min(1, time);

      if (time < 0.05) {
        // Jump instantly 10% of distance in first 5% of duration
        window.scrollTo(0, start + distance * 0.1);
      } else {
        // Smoothly animate the remaining 90%
        const adjTime = (time - 0.05) / 0.95;
        const easedTime = easeInOutQuad(adjTime);
        window.scrollTo(0, start + distance * (0.1 + easedTime * 0.9));
      }

      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    }

    requestAnimationFrame(scroll);
  }
  // const filteredAuctions = auctions.filter((auction) => {
  //   const approvedMatch = filterApproved === "all" || (filterApproved === "approved" ? auction.approved : !auction.approved);
  //   const editableMatch = filterEditable === "all" || (filterEditable === "editable" ? auction.editable : !auction.editable);
  //   return approvedMatch && editableMatch;
  // }
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    router.push(path);
  };

  //   const handleDelete = async (id: string) => {
  //   if (confirm("Are you sure you want to delete this listing?")) {
  //     try {
  //       const res = await fetch(`/api/listings/${id}`, {
  //         method: "DELETE",
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //       const data = await res.json();
  //       if (data.success) {
  //         setAuctions(auctions.filter((auction) => auction.id !== id));
  //         setStats((prev) => ({
  //           ...prev,
  //           totalAuctions: prev.totalAuctions - 1,
  //           approvedAuctions: prev.approvedAuctions - (auctions.find(a => a.id === id)?.approved ? 1 : 0),
  //           pendingAuctions: prev.pendingAuctions - (!auctions.find(a => a.id === id)?.approved ? 1 : 0),
  //           editableAuctions: prev.editableAuctions - (auctions.find(a => a.id === id)?.editable ? 1 : 0),
  //           nonEditableAuctions: prev.nonEditableAuctions - (!auctions.find(a => a.id === id)?.editable ? 1 : 0),
  //         }));
  //         window.location.reload(); // Reload the page after deletion
  //       } else {
  //         console.error("Delete error:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Failed to delete auction:", error);
  //     }
  //   }
  // };
  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
          {/* Active Bids */}
          <Card
            onClick={() => setSelectedSection("leaderboard")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "leaderboard" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Leader Board
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl  font-bold">
                  {stats?.activeListings || 0}
                </div>
                <p className="text-xs text-gray-500 mt-5">Track Live Bids</p>
              </div>
            </CardHeader>
          </Card>
          {/* Auctions Won */}
          <Card
            onClick={() => {
              setSelectedSection("manageAuction");
              setManageAuctionTab("live"); // ensure it always opens listings
            }}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "manageAuction" ? "ring-2 ring-blue-500" : ""
            } relative`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-green-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  My Listings
                </CardTitle>
              </div>
              <div className="mt-1 flex items-center gap-3">
                <div className="text-2xl font-bold">{auctionCount}</div>
              </div>
            </CardHeader>

            <div className="absolute bottom-2 left-4 text-xs text-gray-500">
              Create New
            </div>
          </Card>
          {/* My Profile */}
          {/* <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-500 animate-bounce" />

                <CardTitle className="text-sm font-medium">
                  Admin Rejected
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">{0}</div>
                <div className="text-xs font-bold invisible">1</div>
                <p className="text-xs text-gray-500">View Details</p>
              </div>
            </CardHeader>
          </Card> */}

          <Card
            onClick={() => setSelectedSection("winners")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "winners" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-blue-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Items Sold
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold flex items-center gap-4">
                  <span>{sales.length}</span>
                  <span className="text-base font-normal text-gray-600">
                    $({stats ? stats.totalSales : 0})
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-4">View Details</p>
              </div>
            </CardHeader>
          </Card>

          {/* Auctions Won */}
          <Card
            onClick={() => setSelectedSection("itemUnsold")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "itemUnsold" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-red-500 animate-bounce" />

                <CardTitle className="text-sm font-medium">
                  Items Unsold
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">{unsoldCount}</div>
                <div className="text-2xl  font-bold"></div>
                <p className="text-xs text-gray-500 mt-4">Relist Now</p>
              </div>
            </CardHeader>
          </Card>
          {/* Lost Auctions */}

          {/* Upcoming Auction*/}
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-500 animate-bounce" />

                <CardTitle className="text-sm font-medium">Q&A</CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">{5}</div>
                <p className="text-xs text-gray-500 mt-4">Respond Now</p>
              </div>
            </CardHeader>
          </Card>
          {/* My Profile */}
          <Link href="/settings/profile">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600 animate-bounce" />
                  <CardTitle className="text-sm font-medium">
                    My Profile
                  </CardTitle>
                </div>
                <div className="mt-1">
                  <div className="h-10">
                    <div className="text-2xl font-bold invisible">1</div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Edit Profile & Change Password
                  </p>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
        {selectedSection === "leaderboard" && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white mb-4">
              <Trophy className="w-5 h-5 text-yellow-500 animate-bounce" />
              <span>Leader Board</span>
            </div>

            {/* Replace with your actual leaderboard data */}
            {selectedSection === "leaderboard" &&
              (!stats ? (
                <p className="text-gray-500 italic">Loading stats...</p>
              ) : stats.topAuctions.length === 0 ? (
                <p className="text-gray-500 italic">
                  No leaderboard data available.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-md mt-6">
                  <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">Auction Name</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Format</th>
                        <th className="px-4 py-2 text-left">Starting Bid</th>
                        <th className="px-4 py-2 text-left">Current Bid</th>
                        <th className="px-4 py-2 text-left">Gain</th>
                        <th className="px-4 py-2 text-left">Ends In</th>
                        <th className="px-4 py-2 text-left">Total Bidders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topAuctions.map((auction, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="p-2">
                            <Link
                              href={`/auctions/${auction.id}`}
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                            >
                              <img
                                src={auction.productimages}
                                alt={auction.productname}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              {auction.productname}
                            </Link>
                          </td>

                          <td className="px-4 py-2">{auction.category}</td>
                          <td className="px-4 py-2 capitalize">
                            {auction.type}
                          </td>
                          <td className="px-4 py-2 capitalize">
                            {auction.format}
                          </td>
                          <td className="px-4 py-2">${auction.starting_bid}</td>
                          <td className="px-4 py-2">${auction.current_bid}</td>
                          <td className="px-4 py-2 font-semibold text-green-700">
                            ${auction.gain?.toFixed(2) || "0.00"}
                          </td>
                          <td className="px-4 py-2">
                            {
                              <LiveTimer
                                startTime={auction.scheduledstart}
                                duration={auction.auctionduration}
                              />
                            }
                          </td>
                          <td
                            className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-semibold flex items-center gap-1"
                            onClick={() => {
                              setSelectedAuctionId(auction.id);
                              setShowSellerLeaderboard(true);
                            }}
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                            {auction.bidders}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        )}
        {/* Table here */}
        {showSellerLeaderboard && selectedAuctionId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
              <button
                onClick={() => setShowSellerLeaderboard(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <SellerBidLeaderboard auctionId={selectedAuctionId} />
            </div>
          </div>
        )}

        {selectedSection === "winners" && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-blue-500 animate-bounce" />
              Sold Items (Winners)
            </h2>
            {sales.length === 0 ? (
              <p className="text-sm text-gray-500">No sold items yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-md mt-6">
                <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Auction Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Format</th>
                      <th className="px-4 py-2 text-left">Starting Bid</th>
                      <th className="px-4 py-2 text-left">Winning Bid </th>
                      <th className="px-4 py-2 text-left">Winner</th>
                      <th className="px-4 py-2 text-left">Sold On</th>
                      <th className="px-4 py-2 text-left">Bidders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${sale.id}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              src={sale.productimages}
                              alt={sale.productname}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {sale.productname}
                          </Link>
                        </td>
                        <td className="px-4 py-2">{sale.category}</td>
                        <td className="px-4 py-2">{sale.type}</td>
                        <td className="px-4 py-2">{sale.format}</td>
                        <td className="px-4 py-2">{sale.starting_bid}</td>
                        <td className="px-4 py-2 font-semibold text-green-700">
                          ${sale.salePrice}
                        </td>
                        <td className="px-4 py-2">
                          {/* <div className="text-sm">{sale.buyername}</div> */}
                          {/* <div className="p-2 text-gray-600"> */}
                          {sale.buyer}
                          {/* </div> */}
                        </td>
                        <td className="px-4 py-2">
                          {sale.saleDate
                            ? DateTime.fromISO(sale.saleDate).toLocaleString(
                                DateTime.DATETIME_MED
                              )
                            : "N/A"}
                        </td>
                        <td
                          className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-semibold flex items-center gap-1"
                          onClick={() => {
                            setSelectedAuctionId(sale.id);
                            setShowSellerLeaderboard(true);
                          }}
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                          {sale.bidder_count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {selectedSection === "itemUnsold" && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Archive className="h-5 w-5 text-red-500 animate-bounce" />
              Unsold Items
            </h2>
            {unsoldSales.length === 0 ? (
              <p className="text-sm text-gray-500">No sold items yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-md mt-6">
                <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Auction Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Type </th>
                      <th className="px-4 py-2 text-left">Format</th>
                      <th className="px-4 py-2 text-left">Starting Bid</th>
                      <th className="px-4 py-2 text-left">Closed On</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unsoldSales.map((unsoldSale, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${unsoldSale.id}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              src={unsoldSale.productimages}
                              alt={unsoldSale.productname}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {unsoldSale.productname}
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          {unsoldSale.auction_category}
                        </td>
                        <td className="px-4 py-2 ">
                          {unsoldSale.auction_type}
                        </td>
                        <td className="px-4 py-2">
                          {unsoldSale.auction_subtype}
                        </td>
                        <td className="px-4 py-2">{unsoldSale.starting_bid}</td>
                        <td className="px-4 py-2">
                          {formatDateTime(
                            getEndDate(
                              new Date(unsoldSale.scheduledstart),
                              unsoldSale.auctionduration ?? {}
                            )
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <Link
                            href={`/seller-panel/my-listings/edit/${unsoldSale.id}`}
                            className="   text-blue-500 hover:text-blue-500 p-1 w-16 h-6 flex items-center justify-center"
                          >
                            Re-list
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {selectedSection === "manageAuction" && (
          <div>
            <div className="flex justify-end pb-2 pr-5">
              {manageAuctionTab !== "create" && (
                <button
                  onClick={() => {
                    setManageAuctionTab("create");
                    // Scroll the window down by 200px smoothly
                    smoothScrollBy(200, 400);
                  }}
                  className="flex items-center gap-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 
    hover:from-green-600 hover:via-green-700 hover:to-green-800 
    text-white font-semibold px-4 py-2 rounded-lg shadow-md 
    hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 
    transition-all duration-300 ease-in-out"
                >
                  <Plus size={15} strokeWidth={3} />
                  Create New Auction
                </button>
              )}
            </div>

            {manageAuctionTab !== "create" && (
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setManageAuctionTab("live")}
                  className={`px-2 py-2 rounded-md font-normal text-sm shadow-sm 
          ${
            manageAuctionTab === "live"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
              : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300"
          }`}
                >
                  Live Auctions ({liveCount})
                </button>

                <button
                  onClick={() => setManageAuctionTab("upcoming")}
                  className={`px-2 py-2 rounded-md font-normal text-sm shadow-sm 
          ${
            manageAuctionTab === "upcoming"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
              : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300"
          }`}
                >
                  Upcoming Auctions ({upcomingCount})
                </button>
                <button
                  onClick={() => setManageAuctionTab("pending")}
                  className={`px-2 py-2 rounded-md font-normal text-sm shadow-sm 
          ${
            manageAuctionTab === "pending"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
              : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300"
          }`}
                >
                  Pending Approval ({approvalPendings.length})
                </button>

                <button
                  onClick={() => setManageAuctionTab("rejected")}
                  className={`px-2 py-2 rounded-md font-normal text-sm shadow-sm 
          ${
            manageAuctionTab === "rejected"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
              : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300"
          }`}
                >
                  Admin Rejected ({approvalRejected.length})
                </button>
                <button
                  onClick={() => setManageAuctionTab("closed")}
                  className={`px-2 py-2 rounded-md font-normal text-sm shadow-sm 
          ${
            manageAuctionTab === "closed"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
              : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300"
          }`}
                >
                  Closed Auctions ({closedAuctions.length})
                </button>
              </div>
            )}

            {manageAuctionTab === "create" ? <CreateAuction /> : null}
            {manageAuctionTab === "live" && (
              <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-orange-500 animate-bounce" />
                    Live Auctions
                  </h2>
                </div>
                {liveAuctions.length === 0 ? (
                  <p className="text-sm text-gray-500">No sold items yet.</p>
                ) : (
                  <div className="overflow-x-auto rounded-md mt-6">
                    <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left">Auction Name</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Type </th>
                          <th className="px-4 py-2 text-left">Format</th>
                          <th className="px-4 py-2 text-left">Starting Bid</th>
                          <th className="px-4 py-2 text-left">Curent Bid</th>
                          <th className="px-4 py-2 text-left">Ends In</th>
                          <th className="px-4 py-2 text-left">Bidders</th>
                          {/* <th className="px-4 py-2 text-left">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {liveAuctions.map((liveAuction, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="p-2">
                              <Link
                                href={`/auctions/${liveAuction.id}`}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                              >
                                <img
                                  src={liveAuction.productimages}
                                  alt={liveAuction.productname}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                {liveAuction.productname}
                              </Link>
                            </td>
                            <td className="px-4 py-2">
                              {liveAuction.categoryid}
                            </td>
                            <td className="px-4 py-2 ">
                              {liveAuction.auctiontype}
                            </td>
                            <td className="px-4 py-2">
                              {liveAuction.auctionsubtype}
                            </td>
                            <td className="px-4 py-2">
                              ${liveAuction.startprice}
                            </td>

                            <td className="px-4 py-2 font-bold text-green-600">
                              ${liveAuction.currentbid}
                            </td>
                            <td className="px-4 py-2">
                              {
                                <LiveTimer
                                  startTime={liveAuction.scheduledstart}
                                  duration={liveAuction.auctionduration}
                                />
                              }
                            </td>

                            <td
                              className="px-4 py-2 flex items-center gap-1 font-bold text-blue-600 cursor-pointer hover:underline"
                              onClick={() => {
                                setSelectedAuctionId(liveAuction.id);
                                setShowSellerLeaderboard(true);
                              }}
                            >
                              <Eye className="w-4 h-4 text-blue-500" />
                              {liveAuction.bidder_count}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {manageAuctionTab === "upcoming" && (
              <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 animate-bounce" />
                    Upcoming Auctions
                  </h2>
                </div>
                {upcomingAuctions.length === 0 ? (
                  <p className="text-sm text-gray-500">Upcoming Auction</p>
                ) : (
                  <div className="overflow-x-auto rounded-md mt-6">
                    <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left">Auction Name</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Type </th>
                          <th className="px-4 py-2 text-left">Format</th>
                          <th className="px-4 py-2 text-left">Starting Bid</th>
                          <th className="px-4 py-2 text-left">Starts In</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                          {/* <th className="px-4 py-2 text-left">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingAuctions.map((upcoming, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="p-2">
                              <Link
                                href={`/auctions/${upcoming.id}`}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                              >
                                <img
                                  src={upcoming.productimages}
                                  alt={upcoming.productname}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                {upcoming.productname}
                              </Link>
                            </td>
                            <td className="px-4 py-2">{upcoming.categoryid}</td>
                            <td className="px-4 py-2 ">
                              {upcoming.auctiontype}
                            </td>
                            <td className="px-4 py-2">
                              {upcoming.auctionsubtype}
                            </td>
                            <td className="px-4 py-2">
                              ${upcoming.startprice}
                            </td>
                            <td>
                              <LiveTimer
                              className="text-green-500 font-bold"
                                startTime={upcoming.scheduledstart}
                                duration={upcoming.auctionduration}
                              />
                            </td>
                            <td className="p-2 flex space-x-1">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleNavigate(
                                    `/seller-panel/my-listings/edit/${upcoming.id}`
                                  )
                                }
                                className="text-green-600 hover:text-green-700 p-1 w-6 h-6 flex items-center justify-center"
                                // disabled={!auction.editable}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                // onClick={() => handleDelete(auction.id)}
                                className="text-red-600 hover:text-red-700 p-1 w-6 h-6  "
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {manageAuctionTab === "closed" && (
              <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Lock className="h-4 w-4 text-red-500  animate-bounce" />
                    Closed Auctions
                  </h2>
                </div>
                {closedAuctions.length === 0 ? (
                  <p className="text-sm text-gray-500">Closed Auction</p>
                ) : (
                  <div className="overflow-x-auto rounded-md mt-6">
                    <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left">Auction Name</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Type </th>
                          <th className="px-4 py-2 text-left">Format</th>
                          <th className="px-4 py-2 text-left">Starting Bid</th>
                          <th className="px-4 py-2 text-left">Start date</th>
                          <th className="px-4 py-2 text-left">End Date</th>
                          {/* <th className="px-4 py-2 text-left">Actions</th> */}
                          {/* <th className="px-4 py-2 text-left">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {closedAuctions.map((upcoming, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="p-2">
                              <Link
                                href={`/auctions/${upcoming.id}`}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                              >
                                <img
                                  src={upcoming.productimages}
                                  alt={upcoming.productname}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                {upcoming.productname}
                              </Link>
                            </td>
                            <td className="px-4 py-2">{upcoming.categoryid}</td>
                            <td className="px-4 py-2 ">
                              {upcoming.auctiontype}
                            </td>
                            <td className="px-4 py-2">
                              {upcoming.auctionsubtype}
                            </td>
                            <td className="px-4 py-2">
                              ${upcoming.startprice}
                            </td>
                            <td className="px-4 py-2">
                              {formatDateTime(
                                new Date(upcoming.scheduledstart)
                              )}
                            </td>

                            <td className="px-4 py-2">
                              {formatDateTime(
                                getEndDate(
                                  new Date(upcoming.scheduledstart),
                                  upcoming.auctionduration ?? {}
                                )
                              )}
                            </td>

                            {/* <td className="p-2 flex space-x-1">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleNavigate(
                                    `/seller-panel/my-listings/edit/${upcoming.id}`
                                  )
                                }
                                className="text-green-600 hover:text-green-700 p-1 w-6 h-6 flex items-center justify-center"
                                // disabled={!auction.editable}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                // onClick={() => handleDelete(auction.id)}
                                className="text-red-600 hover:text-red-700 p-1 w-6 h-6  "
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {manageAuctionTab === "pending" && (
              <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Hourglass className="h-4 w-4 text-yellow-500 animate-bounce" />
                    Approval Pending
                  </h2>
                </div>
                {approvalPendings.length === 0 ? (
                  <p className="text-sm text-gray-500">Approval Pending</p>
                ) : (
                  <div className="overflow-x-auto rounded-md mt-6">
                    <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left">Auction Name</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Type </th>
                          <th className="px-4 py-2 text-left">Format</th>
                          <th className="px-4 py-2 text-left">Starting Bid</th>
                          <th className="px-4 py-2 text-left">Start Date</th>
                          <th className="px-4 py-2 text-left">End Date</th>
                          <th className="px-4 py-2 text-left">Actions</th>

                          {/* <th className="px-4 py-2 text-left">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {approvalPendings.map((approval, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="p-2">
                              <Link
                                href={`/auctions/${approval.id}`}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                              >
                                <img
                                  src={approval.productimages}
                                  alt={approval.productname}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                {approval.productname}
                              </Link>
                            </td>
                            <td className="px-4 py-2">{approval.category}</td>
                            <td className="px-4 py-2 ">{approval.type}</td>
                            <td className="px-4 py-2">{approval.format}</td>
                            <td className="px-4 py-2">
                              ${approval.starting_bid}
                            </td>
                            <td className="px-4 py-2">
                              {formatDateTime(
                                new Date(approval.scheduledstart)
                              )}
                            </td>
                            <td className="px-4 py-2">
                              {formatDateTime(
                                getEndDate(
                                  new Date(approval.scheduledstart),
                                  approval.auctionduration ?? {}
                                )
                              )}
                            </td>
                            <td className="p-2 flex space-x-1">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleNavigate(
                                    `/seller-panel/my-listings/edit/${approval.id}`
                                  )
                                }
                                className="text-green-600 hover:text-green-700 p-1 w-6 h-6 flex items-center justify-center"
                                // disabled={!auction.editable}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                // onClick={() => handleDelete(auction.id)}
                                className="text-red-600 hover:text-red-700 p-1 w-6 h-6  "
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {manageAuctionTab === "rejected" && (
              <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500 animate-bounce" />
                    Rejected
                  </h2>
                </div>
                {approvalRejected.length === 0 ? (
                  <p className="text-sm text-gray-500">Rejected </p>
                ) : (
                  <div className="overflow-x-auto rounded-md mt-6">
                    <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left">Auction Name</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Type </th>
                          <th className="px-4 py-2 text-left">Format</th>
                          <th className="px-4 py-2 text-left">Starting Bid</th>
                          <th className="px-4 py-2 text-left">Start Date</th>
                          <th className="px-4 py-2 text-left">End Date</th>
                          <th className="px-4 py-2 text-left">Actions</th>

                          {/* <th className="px-4 py-closed text-left">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {approvalRejected.map((closed, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="p-2">
                              <Link
                                href={`/auctions/${closed.id}`}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                              >
                                <img
                                  src={closed.productimages}
                                  alt={closed.productname}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                {closed.productname}
                              </Link>
                            </td>
                            <td className="px-4 py-2">{closed.category}</td>
                            <td className="px-4 py-2 ">{closed.type}</td>
                            <td className="px-4 py-2">{closed.format}</td>
                            <td className="px-4 py-2">
                              ${closed.starting_bid}
                            </td>
                            <td className="px-4 py-2">
                              {formatDateTime(new Date(closed.scheduledstart))}
                            </td>
                            <td className="px-4 py-2">
                              {formatDateTime(
                                getEndDate(
                                  new Date(closed.scheduledstart),
                                  closed.auctionduration ?? {}
                                )
                              )}
                            </td>
                            <td className="px-4 py-2">
                              <Link
                                href={`/seller-panel/my-listings/edit/${closed.id}`}
                                className="   text-blue-500 hover:text-blue-500 p-1 w-16 h-6 flex items-center justify-center"
                              >
                                Re-list
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
