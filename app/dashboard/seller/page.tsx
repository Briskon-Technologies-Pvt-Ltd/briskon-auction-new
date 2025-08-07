"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

interface Winner {
  id: string;
  productname: string;
  productimages: string;
  soldprice: number;
  buyername: string;
  buyeremail: string;
  closedat: string;
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
  }[];
}

interface RecentAuction {
  id: string;
  title: string;
  productname?: string; // Added as optional in case it's not always present
  currentbid: number;
}

export default function SellerDashboard() {
  const { user, isLoading } = useAuth();
const [winners, setWinners] = useState<Winner[]>([]);


  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState<string | null>(null);
  const [recentAuctions, setRecentAuctions] = useState<RecentAuction[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [errorInsights, setErrorInsights] = useState<string | null>(null);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [liveCount, setLiveCount] = useState(0);


  const [selectedSection, setSelectedSection] = useState<
    "leaderboard" | "activeBids" | "winners" | "liveAuction"
  >("leaderboard");
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

      setStats(data.data); // ✅ Sets stats if API succeeded
    } catch (err) {
      console.error("❌ Stats fetch error:", err); // ✅ Add this
      setErrorStats(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoadingStats(false);
    }
  };

 const fetchSellerLiveCount = async (email: string) => {
  try {
    const response = await fetch(`/api/seller/live-auctions?email=${encodeURIComponent(email)}`);
    const json = await response.json();
    if (json.success) {
      setLiveCount(json.count);
    } else {
      console.error("❌ Server error while fetching live count:", json.error);
    }
  } catch (err) {
    console.error("❌ Network error while fetching live count:", err);
  }
};
const fetchSellerUpcomingCount = async (email: string) => {
  try {
    const response = await fetch(`/api/seller/upcoming-auctions?email=${encodeURIComponent(email)}`);
    const json = await response.json();
    if (json.success) {
      setUpcomingCount(json.count);
    } else {
      console.error("❌ Server error while fetching upcoming count:", json.error);
    }
  } catch (err) {
    console.error("❌ Network error while fetching upcoming count:", err);
  }
};

useEffect(() => {
  if (!isLoading && user?.email) {
    fetchStats(); // your other API
    fetchSellerLiveCount(user.email);
    fetchSellerUpcomingCount(user.email);
  }
}, [user?.email, isLoading]);

  // }, [user?.email, isLoading]);

useEffect(() => {
  const fetchWinners = async () => {
    // const res = await fetch(`/api/seller/winners?email=${userEmail}`);
    const res = await fetch(
      `/api/seller/winners?email=${user?.email}`
    );
    const json = await res.json();
    if (json.success) {
      setWinners(json.data);  // <== Confirm this line is being hit
    } else {
      console.error("Failed to fetch winners", json.error);
    }
  };
  if (selectedSection === "winners") {
    fetchWinners();
  }
}, [selectedSection,user?.email]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

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
  // {user.fname || user.lname || "Seller"}
  // <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
  // <div className="container mx-auto px-4">
  //   {/* Summary Cards */}
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
  //     {/* Active Bids */}
  //     <Card
  //       onClick={() => setSelectedSection("activeBids")}
  //       className={`cursor-pointer transition-shadow hover:shadow-lg ${
  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {/* Active Bids */}
          <Card
            onClick={() => setSelectedSection("leaderboard")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "leaderboard" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-blue-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Leader board
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl  font-bold">
                  {stats?.activeListings || 0}
                </div>
                <p className="text-xs text-gray-500">Track Live Bids</p>
              </div>
            </CardHeader>
          </Card>

          {/* Auctions Won */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Manage Auctions
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl  font-bold">{7}</div>
                <p className="text-xs text-gray-500">Create New</p>
              </div>
            </CardHeader>
          </Card>
          {/* Lost Auctions */}
        
            <Card
              className={`cursor-pointer transition-shadow hover:shadow-lg ${
                selectedSection === "liveAuction"
                  ? "ring-2 text-orange-400"
                  : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-orange-500 animate-bounce" />
                  <CardTitle className="text-sm font-medium">
                    Live Auctions
                  </CardTitle>
                </div>
                <div className="mt-1">
                  <div className="text-2xl font-bold">{liveCount}</div>
                  <p className="text-xs text-gray-500">Ongoing now</p>
                </div>
              </CardHeader>
            </Card>
      
          {/* Live Auctions */}
          
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 animate-bounce" />
                  <CardTitle className="text-sm font-medium">
                    Upcoming Auctions
                  </CardTitle>
                </div>
                <div className="mt-1">
                  <div className="text-2xl font-bold">{upcomingCount}</div>
                  <p className="text-xs text-gray-500">All Time</p>
                </div>
              </CardHeader>
            </Card>
         
          {/* Upcoming Auction*/}
          
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 animate-bounce" />
                  <CardTitle className="text-sm font-medium">
                    Approval Pending
                  </CardTitle>
                </div>
                <div className="mt-1">
                  <div className="text-2xl font-bold">{7}</div>
                  <p className="text-xs text-gray-500">View details</p>
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
                    Admin Rejected
                  </CardTitle>
                </div>
                <div className="mt-1">
                  <div className="text-xs font-bold invisible">1</div>
                  <p className="text-xs text-gray-500">View details</p>
                </div>
              </CardHeader>
            </Card>
          </Link>
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
                <div className="text-2xl font-bold">
                  ${stats?.totalSales || 0}
                </div>
                <p className="text-xs text-gray-500">View Winners</p>
              </div>
            </CardHeader>
          </Card>

          {/* Auctions Won */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Items Unsold
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl  font-bold"></div>
                <p className="text-xs text-gray-500">Relist Now</p>
              </div>
            </CardHeader>
          </Card>
          {/* Lost Auctions */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-gray-500">View Details</p>
              </div>
            </CardHeader>
          </Card>
          {/* Live Auctions */}
          <Link href="/auctions">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-orange-500 animate-bounce" />
                  <CardTitle className="text-sm font-medium">
                    Avg. Bids per Auction
                  </CardTitle>
                </div>
                <div className="mt-1">
                  <div className="text-2xl font-bold">{4}</div>
                  <p className="text-xs text-gray-500">View Details</p>
                </div>
              </CardHeader>
            </Card>
          </Link>
          {/* Upcoming Auction*/}
          <Link href="/auctions?tab=upcoming">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 animate-bounce" />
                  <CardTitle className="text-sm font-medium">Q&A</CardTitle>
                </div>
                <div className="mt-1">
                  <div className="text-2xl font-bold">{5}</div>
                  <p className="text-xs text-gray-500">Respond Now</p>
                </div>
              </CardHeader>
            </Card>
          </Link>

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
                  <div className="text-xs font-bold invisible">1</div>
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
                          <td className="px-4 py-2 text-green-700">
                            ${auction.gain?.toFixed(2) || "0.00"}
                          </td>
                          <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
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
        {selectedSection === "winners" && (
  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <PackageCheck className="w-5 h-5 text-green-600" />
      Sold Items (Winners)
    </h2>
    {winners.length === 0 ? (
      <p className="text-sm text-gray-500">No sold items yet.</p>
    ) : (
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Final Bid</th>
              <th className="p-3">Winner</th>
              <th className="p-3">Sold On</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {winners.map((a) => (
  <tr key={a.id} className="border-b hover:bg-gray-50 transition-colors">
    <td className="p-3 font-medium text-gray-800">{a.productname}</td>
    <td className="p-3">₹{a.soldprice}</td>
    <td className="p-3">
      <div className="text-sm">{a.buyername}</div>
      <div className="text-xs text-gray-500">{a.buyeremail}</div>
    </td>
    <td className="p-3">
      {a.closedat ? new Date(a.closedat).toLocaleDateString() : "-"}
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
    </div>
  );
}
