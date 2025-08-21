"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Gavel,
  TrendingUp,
  Heart,
  ShoppingBag,
  History,
  Bell,
  Settings,
  Trophy,
  XCircle,
  Calendar,
  Clock,
  TrendingDown,
  Eye,
  ArrowUpIcon,
  ArrowDownIcon,
  Repeat,
  Inbox,
  Medal,
  Award,
  AlarmClockOff,
  CirclePlus,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import CreateAuction from "@/app/seller-panel/create-listing/page";
import LiveTimer from "@/app/livetimer/page";
type Bid = {
  id: string;
  auction_name: string;
  your_bid: number;
  seller_name: string;
  current_bid: number;
  auctionSubtype: string | null;
  status: string;
  scheduledstart?: string | null;
  position?: number;
  productimage: string;
  auctionduration?: {
    days?: number;
    hours?: number;
    minutes?: number;
  } | null;
};

interface ActiveBid {
  sellerName: string;
  auctionId: string;
  productName: string;
  auctionType: string | null;
  auctionSubtype: string | null;
  bidAmount: number;
  totalBids: number;
  isWinningBid: boolean;
  position: number;
  scheduledstart?: string | null; //
  productimage: string;
  auctionduration?: {
    days?: number;
    hours?: number;
    minutes?: number;
  } | null;
}

type WonAuction = {
  id: string;
  sellerName: string;
  auctionId: string;
  productName: string;
  auctionType: "forward" | "reverse" | string;
  startAmount: number;
  targetprice?: number;
  winningBidAmount: number;
};
interface WonAuctionEntry {
  sellerName: string;
  auctionId: string;
  productName: string;
  auctionType: string | null;
  startAmount: number;
  winningBidAmount: number;
  targetprice?: number; // Optional field for target price
  productimage: string;
}
interface bidRecevied {
  sellerName: string;
  auctionId: string;
  productName: string;
  auctionType: string | null;
  startAmount: number;
  winningBidAmount: number;
  targetprice?: number; // Optional field for target price
  productimage: string;
  categoryid:string;
  auctionsubtype:string;
  currentbid:number;
}
interface reverseAuction {
  id: string;
  productname: string;
  productimages: string;
  category: string;
  targetprice: number;
  type: string;
  format: string;
  starting_bid: number;
  current_bid: number | null;
  created_at: string;
  bidder_count: number;
  scheduledstart: string;
  auctionduration: { days?: number; hours?: number; minutes?: number };
}

type LostAuctionEntry = {
  auctionId: string;
  sellerName: string;
  productName: string;
  auctionType: string | null;
  startAmount: number;
  userBidAmount: number | null;
  winningBidAmount: number;
  productimage: string;
};

export default function BuyerDashboard() {
  const [stats, setStats] = useState({
    activeBids: 0,
    wonAuctions: 0,
    lostAuctions: 0,
    totalSpend: 0,
    recentActivities: [],
  });

  const [selectedSection, setSelectedSection] = useState<
    | "liveAuction"
    | "activeBids"
    | "wonAuctions"
    | "lostAuctions"
    | "reverseAuctions"
    | "bidsRecevied"
    | "awardedAuctions"
    | "closedAuctions"
    | "createAuction"
  >("activeBids");

  const [isLoadingBids, setIsLoadingBids] = useState(true);
  const [bids, setBids] = useState<Bid[]>([]);
  const { user, isLoading } = useAuth();
  const [activeBids, setActiveBids] = useState<ActiveBid[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [now, setNow] = useState(new Date());
  const [forwardBids, setForwardBids] = useState<Bid[]>([]);
  const [wonAuctions, setWonAuctions] = useState<WonAuctionEntry[]>([]);
  const [bidRecevied, setBidRecevied] = useState<bidRecevied[]>([]);
  const [lostAuctions, setLostAuctions] = useState<LostAuctionEntry[]>([]);
  const [reverseAuction, setReverseAuction] = useState<reverseAuction[]>([]);
  const [allAuctionItems, setAllAuctionItems] = useState([]);
  const [liveCount, setLiveCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [reverseBids, setReverseBids] = useState<Bid[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  function getEndDate(
    start: Date,
    duration: { days?: number; hours?: number; minutes?: number }
  ) {
    const end = new Date(start.getTime());
    if (duration.days) end.setUTCDate(end.getUTCDate() + duration.days);
    if (duration.hours) end.setUTCHours(end.getUTCHours() + duration.hours);
    if (duration.minutes)
      end.setUTCMinutes(end.getUTCMinutes() + duration.minutes);
    return end;
  }

  function formatDuration(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`;
  }
  function getTimeLeftLabel(
    now: Date,
    startTime: string,
    duration: { days?: number; hours?: number; minutes?: number }
  ): string {
    const start = new Date(startTime);
    const end = getEndDate(start, duration);

    if (now < start) {
      return "Starts in " + formatDuration(start.getTime() - now.getTime());
    } else if (now >= start && now < end) {
      return formatDuration(end.getTime() - now.getTime());
    } else {
      return "";
    }
  }

  useEffect(() => {
    if (!user?.id || !user?.email) return;
    const fetchActiveBids = async () => {
      setIsLoadingBids(true);
      try {
        const response = await fetch(
          `/api/buyer/active-bids?id=${user.id}&email=${user.email}`
        );
        if (!response.ok) throw new Error("Failed to fetch active bids");
        const data = await response.json();
        setActiveBids(data);
        setStats((prevStats) => ({
          ...prevStats,
          activeBids: Array.isArray(data) ? data.length : 0,
        }));
      } catch (error) {
        console.error("Error fetching active bids:", error);
        setActiveBids([]);
        setStats((prevStats) => ({ ...prevStats, activeBids: 0 }));
      } finally {
        setIsLoadingBids(false);
      }
    };
    fetchActiveBids();
  }, [user]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        if (selectedSection === "activeBids") {
          // Split active bids by type
          const forward = activeBids
            .filter((a) => a.auctionType === "forward")
            .map((a) => ({
              id: a.auctionId,
              auction_name: a.productName,
              seller_name: a.sellerName,
              your_bid: a.bidAmount,
              current_bid: a.currentbid ?? 0,
              status: a.isWinningBid ? "leading" : "outbid",
              scheduledstart: a.scheduledstart ?? null,
              auctionduration: a.auctionduration ?? null,
              auctionSubtype: a.auctionSubtype,
              position: a.position,
              productimage: a.productimage,
            }));

          const reverse = activeBids
            .filter((a) => a.auctionType === "reverse")
            .map((a) => ({
              id: a.auctionId,
              auction_name: a.productName,
              seller_name: a.sellerName,
              your_bid: a.bidAmount,
              current_bid: a.currentbid ?? 0,
              status: a.isWinningBid ? "leading" : "outbid",
              scheduledstart: a.scheduledstart ?? null,
              auctionduration: a.auctionduration ?? null,
              auctionSubtype: a.auctionSubtype,
              productimage: a.productimage,
            }));

          setForwardBids(forward);
          setReverseBids(reverse);
          return;
        }

        let endpoint = "";
        switch (selectedSection) {
          case "wonAuctions":
            endpoint = "/api/buyer/won-auctions";
            break;
          case "lostAuctions":
            endpoint = "/api/buyer/lost-auctions";
            break;
          default:
            return;
        }
        const res = await fetch(endpoint);
        const data = await res.json();
        const filtered =
          selectedSection === "lostAuctions"
            ? Array.isArray(data)
              ? data.filter((item: any) => item.status === "lost")
              : []
            : data;

        setBids(filtered);
      } catch (err) {
        console.error("Error loading detail data:", err);
        setBids([]);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [selectedSection, activeBids]);

  useEffect(() => {
    const fetchWonAuctions = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `/api/buyer/won-auctions?email=${encodeURIComponent(
            user.email
          )}&id=${encodeURIComponent(user.id)}`
        );
        const data = await res.json();
        setWonAuctions(data || []);
        setStats((prevStats) => ({
          ...prevStats,
          wonAuctions: Array.isArray(data) ? data.length : 0,
        }));
      } catch (error) {
        console.error("Error fetching won auctions:", error);
      }
    };
    fetchWonAuctions();
  }, [user]);

  useEffect(() => {
    const fetchWonAuctions = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `/api/buyer/bid-recevied?email=${encodeURIComponent(
            user.email
          )}&id=${encodeURIComponent(user.id)}`
        );
        const data = await res.json();
        setBidRecevied(data || []);
        // setStats((prevStats) => ({
        //   ...prevStats,
        //   wonAuctions: Array.isArray(data) ? data.length : 0,
        // }));
      } catch (error) {
        console.error("Error fetching won auctions:", error);
      }
    };
    fetchWonAuctions();
  }, [user]);

  useEffect(() => {
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/buyer/reverse-auction?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setReverseAuction(data.data || []);
      }
    };
    if (user) fetchAuctions();
  }, [user]);

  useEffect(() => {
    const fetchLostAuctions = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `/api/buyer/lost-auctions?email=${encodeURIComponent(
            user.email
          )}&id=${encodeURIComponent(user.id)}`
        );
        const data = await res.json();
        setLostAuctions(data || []);
        setStats((prevStats) => ({
          ...prevStats,
          lostAuctions: Array.isArray(data) ? data.length : 0,
        }));
      } catch (error) {
        console.error("Error fetching lost auctions:", error);
      }
    };

    fetchLostAuctions();
  }, [user]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch("/api/auctions");
        const json = await res.json();
        if (!json.success) return;

        const now = new Date();

        let live = 0;
        let upcoming = 0;

        (json.data || []).forEach((a: any) => {
          const start = a.scheduledstart ? new Date(a.scheduledstart) : null;
          const durationInSeconds = a.auctionduration
            ? ((d: any) =>
                (d.days || 0) * 86400 +
                (d.hours || 0) * 3600 +
                (d.minutes || 0) * 60)(a.auctionduration)
            : 0;
          const end = start
            ? new Date(start.getTime() + durationInSeconds * 1000)
            : null;

          if (start && end) {
            if (now < start) {
              upcoming += 1;
            } else if (now >= start && now < end) {
              live += 1;
            }
          }
        });

        setLiveCount(live);
        setUpcomingCount(upcoming);
      } catch (err) {
        console.error("Error fetching auctions:", err);
      }
    };

    fetchAuctions();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user and dashboard data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Not logged in. Please log in to access the buyer dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {/* Active Bids */}
          <Card
            onClick={() => setSelectedSection("activeBids")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "activeBids" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-blue-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  My Active Bids
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl  font-bold">{stats.activeBids}</div>
                <p className="text-xs text-gray-500">All Forward Bids</p>
              </div>
            </CardHeader>
          </Card>

          {/* Auctions Won */}
          <Card
            onClick={() => setSelectedSection("wonAuctions")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "wonAuctions" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-500 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Auctions Won
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl  font-bold">{stats.wonAuctions}</div>
                <p className="text-xs text-gray-500">Forward Auctions Won</p>
              </div>
            </CardHeader>
          </Card>
          {/* Lost Auctions */}
          <Card
            onClick={() => setSelectedSection("lostAuctions")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "lostAuctions" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Lost Auctions
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">{stats.lostAuctions}</div>
                <p className="text-xs text-gray-500">Forward Auctions Lost</p>
              </div>
            </CardHeader>
          </Card>
          {/* My Reverse Auction */}
          <Card
            onClick={() => setSelectedSection("reverseAuctions")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "reverseAuctions"
                ? "ring-2 ring-blue-500"
                : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Repeat className="h-5 w-5 text-orange-400 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  My Reverse Auction
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">
                  {reverseAuction.length}
                </div>
                <p className="text-xs text-gray-500">Auction I Created</p>
              </div>
            </CardHeader>
          </Card>
          {/* Bids Recevied */}
          <Card
            onClick={() => setSelectedSection("bidsRecevied")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "bidsRecevied" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Inbox className="h-5 w-5 text-lime-700 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Bids Recevied
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">{bidRecevied.length}</div>
                <p className="text-xs text-gray-500">Total Supplier Bids</p>
              </div>
            </CardHeader>
          </Card>
          {/* awarded auctions */}
          <Card
            onClick={() => setSelectedSection("awardedAuctions")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "awardedAuctions"
                ? "ring-2 ring-blue-500"
                : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Awarded Auctions
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">{5}</div>
                <p className="text-xs text-gray-500">Reverse Auction Awarded</p>
              </div>
            </CardHeader>
          </Card>
          {/* closed auctions */}
          <Card
            onClick={() => setSelectedSection("closedAuctions")}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedSection === "closedAuctions" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlarmClockOff className="h-5 w-5 text-red-950 animate-bounce" />
                <CardTitle className="text-sm font-medium">
                  Closed Auctions
                </CardTitle>
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold">{6}</div>
                <p className="text-xs text-gray-500">
                  Completed Reverse Auction
                </p>
              </div>
            </CardHeader>
          </Card>
          {/* Live Auctions */}
          {/* <Link href="/auctions">
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
          </Link> */}
          {/* Upcoming Auction*/}
          {/* <Link href="/auctions?tab=upcoming">
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
          </Link> */}

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
                  <div className="text-xs font-bold invisible">1</div>
                  <p className="text-xs text-gray-500">
                    Edit Profile & Change Password
                  </p>
                </div>
              </CardHeader>
            </Card>
          </Link>
          <Card
            className="cursor-pointer hover:shadow-lg transition-all flex flex-col items-center justify-center p-4 text-center bg-blue-600 text-white"
            onClick={() => {
              setSelectedSection("createAuction");
            }}
          >
            <CirclePlus className="h-5 w-5 mb-3 text-white" />
            <CardTitle className="text-sm font-semibold">
              Create Auction
            </CardTitle>
            <p className="text-xs opacity-90">start a reverse auction</p>
          </Card>
        </div>
        {/* Section Table */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
          {selectedSection === "createAuction" && (
            <div className="mt-4">
              <CreateAuction />
            </div>
          )}
          {loadingDetails ? (
            <p>Loading...</p>
          ) : selectedSection === "activeBids" ? (
            <div className="">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800 dark:text-blue-300 mt-2 mb-4">
                {/* Icon with soft blue background */}
                <span className="inline-flex items-center justify-center dark:bg-blue-900">
                  <TrendingUp className="h-3 w-3 text-gray-500" />
                </span>

                {/* Heading Text */}
                <span>
                  Active Bids:
                  <span className="ml-2 px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 font-semibold">
                    Forward Auctions
                  </span>
                </span>
              </h3>

              {forwardBids.length === 0 ? (
                <p className="text-gray-500 italic">No Forward auction bids.</p>
              ) : (
                <div className="overflow-x-auto rounded-md">
                  <table className="min-w-full text-sm border border-gray-100 dark:border-gray-800">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">Auction Name</th>
                        <th className="px-4 py-2 text-left">Seller</th>
                        <th className="px-4 py-2 text-left">Time Left</th>
                        <th className="px-4 py-2 text-left">Your Bid</th>
                        <th className="px-4 py-2 text-left">Current Bid</th>
                        <th className="px-4 py-2 text-left">Your Position</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forwardBids.map((bid, idx) => (
                        <tr
                          key={bid.id}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-2">
                            <Link
                              href={`/auctions/${bid.id}`}
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                            >
                              <img
                                src={bid.productimage}
                                alt={bid.auction_name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              {bid.auction_name}
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {bid.seller_name}
                          </td>
                          <td className="px-4 py-2 text-red-700">
                            {bid.scheduledstart && bid.auctionduration
                              ? getTimeLeftLabel(
                                  now,
                                  bid.scheduledstart,
                                  bid.auctionduration
                                )
                              : "N/A"}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            ${bid.your_bid.toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {bid.auctionSubtype &&
                            ["sealed", "silent"].includes(
                              bid.auctionSubtype.toLowerCase()
                            ) ? (
                              <span className="text-gray-600">
                                Confidential
                              </span>
                            ) : (
                              `$${bid.current_bid.toLocaleString("en-IN")}`
                            )}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {bid.position === 1 ? (
                              <span className="text-green-600 font-semibold flex items-center gap-1">
                                <ArrowUpIcon size={16} />
                                Leading - Position 1
                              </span>
                            ) : bid.position ? (
                              <span className="text-red-600 font-semibold flex items-center gap-1">
                                <ArrowDownIcon size={16} />
                                Trailing - Position {bid.position}
                              </span>
                            ) : (
                              <span className="text-gray-600">No Rank</span>
                            )}
                          </td>
                          <td className="p-2">
                            <Link
                              href={`/auctions/${bid.id}`}
                              className="flex items-center gap-1 text-gray-700 hover:underline transition-colors"
                            >
                              {bid.status === "leading" ? (
                                <>
                                  <Eye className="w-4 h-4" />
                                  View Bid
                                </>
                              ) : (
                                <>
                                  <Gavel className="w-4 h-4" />
                                  Bid
                                </>
                              )}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : selectedSection === "wonAuctions" ? (
            wonAuctions.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left p-2">Auction Name</th>
                      <th className="text-left p-2">Auction Type</th>
                      <th className="text-left p-2">Seller</th>
                      <th className="text-left p-2">Starting Bid</th>
                      <th className="text-left p-2">Winning Bid</th>
                      <th className="text-left p-2">Payment and Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wonAuctions.map((auction, index) => (
                      <tr
                        key={auction.auctionId}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${auction.auctionId}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              src={auction.productimage}
                              alt={auction.productName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {auction.productName}
                          </Link>
                        </td>

                        <td className="p-2 capitalize text-gray-600">
                          {auction.auctionType || "standard"}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.sellerName}
                        </td>
                        <td className="p-2 text-gray-600">
                          $
                          {(auction.auctionType === "reverse"
                            ? auction.targetprice
                            : auction.startAmount
                          )?.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 font-semibold text-green-700">
                          ${auction.winningBidAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2  text-gray-600">
                          Contact Admin/Seller
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No auctions won.</p>
            )
          ) : selectedSection === "lostAuctions" ? (
            lostAuctions.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left p-2">Auction Name</th>
                      <th className="text-left p-2">Auction Type</th>
                      <th className="text-left p-2">Seller</th>
                      <th className="text-left p-2">Starting Bid</th>
                      <th className="text-left p-2">Your Bid</th>
                      <th className="text-left p-2">Winning Bid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lostAuctions.map((auction, index) => (
                      <tr
                        key={auction.auctionId}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${auction.auctionId}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              src={auction.productimage}
                              alt={auction.productName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {auction.productName}
                          </Link>
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {auction.auctionType}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.sellerName}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.startAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.userBidAmount?.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.winningBidAmount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No lost Auctions.</p>
            )
          ) : selectedSection === "reverseAuctions" ? (
            reverseAuction.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left px-4 p-2">Auction Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="text-left px-4 p-2">Type</th>
                      <th className="text-left px-4 py-2 ">Format</th>
                      <th className="text-left px-4 py-2 ">Target Price</th>
                      <th className="text-left px-4 p-2">Starting Bid</th>
                      <th className="text-left px-4 p-2">Current Bid</th>
                      <th className="text-left px-4 p-2">Ends In</th>
                      <th className="text-left px-4 py-2 ">Bidders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reverseAuction.map((auction, index) => (
                      <tr
                        key={auction.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
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
                        <td className="p-2 px-4 text-gray-600">
                          {auction.category}
                        </td>
                        <td className="p-2 px-4 capitalize text-gray-600">
                          {auction.type}
                        </td>
                        <td className="p-2 px-4 text-gray-600">
                          {auction.format}
                        </td>
                        <td className="p-2 px-4 text-gray-600">
                          {auction.targetprice}
                        </td>
                        <td className="p-2 px-4 text-gray-600">
                          {auction.starting_bid.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.current_bid}
                        </td>
                        <td className="px-4 py-2">
                          {
                            <LiveTimer
                              startTime={auction.scheduledstart}
                              duration={auction.auctionduration}
                            />
                          }
                        </td>
                        <td className="p-2 px-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>{auction.bidder_count}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No Reverse Auctions.</p>
            )
          ) : selectedSection === "bidsRecevied" ? (
            bidRecevied.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left px-4 p-2">Auction Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="text-left px-4 p-2">Type</th>
                      <th className="text-left px-4 py-2 ">Format</th>
                      <th className="text-left px-4 py-2 ">Target Price</th>
                      <th className="text-left px-4 p-2">Starting Bid</th>
                      <th className="text-left px-4 p-2">Current Bid</th>
                
                    </tr>
                  </thead>
                  <tbody>
                    
                    {bidRecevied.map((auction, index) => (
                      <tr
                        key={auction.auctionId}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${auction.auctionId}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              src={auction.productimage}
                              alt={auction.productName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {auction.productName}
                          </Link>
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {auction.categoryid}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.auctionType}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.auctionsubtype}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.targetprice}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.startAmount}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.currentbid}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No Bids Recevied.</p>
            )
          ) : selectedSection === "awardedAuctions" ? (
            lostAuctions.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left p-2">Auction Name</th>
                      <th className="text-left p-2">Auction Type</th>
                      <th className="text-left p-2">Seller</th>
                      <th className="text-left p-2">Starting Bid</th>
                      <th className="text-left p-2">Your Bid</th>
                      <th className="text-left p-2">Winning Bid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lostAuctions.map((auction, index) => (
                      <tr
                        key={auction.auctionId}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${auction.auctionId}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              src={auction.productimage}
                              alt={auction.productName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {auction.productName}
                          </Link>
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {auction.auctionType}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.sellerName}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.startAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.userBidAmount?.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.winningBidAmount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No Awarded Auction.</p>
            )
          ) : selectedSection === "closedAuctions" ? (
            lostAuctions.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left p-2">Auction Name</th>
                      <th className="text-left p-2">Auction Type</th>
                      <th className="text-left p-2">Seller</th>
                      <th className="text-left p-2">Starting Bid</th>
                      <th className="text-left p-2">Your Bid</th>
                      <th className="text-left p-2">Winning Bid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lostAuctions.map((auction, index) => (
                      <tr
                        key={auction.auctionId}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${auction.auctionId}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              src={auction.productimage}
                              alt={auction.productName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {auction.productName}
                          </Link>
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {auction.auctionType}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.sellerName}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.startAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.userBidAmount?.toLocaleString("en-IN")}
                        </td>
                        <td className="p-2 text-gray-600">
                          {auction.winningBidAmount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No Closed Auction.</p>
            )
          ) : null}
        </div>
        {/* Notifications and Account */}
      </div>
    </div>
  );
}
