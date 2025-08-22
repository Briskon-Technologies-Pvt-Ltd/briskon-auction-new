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
import { useRouter } from "next/navigation";
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
  Trash,
  Edit,
  Lock,
  Trash2,
  Hourglass,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import CreateAuction from "@/app/seller-panel/create-listing/page";
import LiveTimer from "@/app/livetimer/page";
import SellerBidLeaderboard from "@/app/seller-bid-leader-board/page";
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
  bidId: string;
  auctionType: string | null;
  startAmount: number;
  winningBidAmount: number;
  targetPrice?: number; // Optional field for target price
  productimage: string;
  categoryid: string;
  auctionSubtype: string;
  currentbid: number;
  bidAmount: number;
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
interface closedAuctionItem {
  id: string;
  productname: string;
  currentbid: number | null;
  productimages: string;
  startprice: number;
  auctiontype: string;
  auctionsubtype: string;
  categoryid: string;
  bidder_count: number;
  scheduledstart: string;
  targetprice: number;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
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
export default function BuyerDashboard() {
  const [stats, setStats] = useState({
    activeBids: 0,
    wonAuctions: 0,
    lostAuctions: 0,
    totalSpend: 0,
    recentActivities: [],
  });

  const [selectedSection, setSelectedSection] = useState<
    | "activeBids"
    | "wonAuctions"
    | "lostAuctions"
    | "reverseAuctions"
    | "bidsRecevied"
    | "awardedAuctions"
    | "closedAuctions"
    | "createAuction"
  >("activeBids");
  const router = useRouter();
  const [isLoadingBids, setIsLoadingBids] = useState(true);
  const [bids, setBids] = useState<Bid[]>([]);
  const { user, isLoading } = useAuth();
  const [activeBids, setActiveBids] = useState<ActiveBid[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [now, setNow] = useState(new Date());
  const [forwardBids, setForwardBids] = useState<Bid[]>([]);
  const [wonAuctions, setWonAuctions] = useState<WonAuctionEntry[]>([]);
  const [bidRecevied, setBidRecevied] = useState<bidRecevied[]>([]);
  const [awardedAuctions, setAwardedAuctions] = useState<bidRecevied[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [closedAuctions, setClosedAuctions] = useState<closedAuctionItem[]>([]);
  const [lostAuctions, setLostAuctions] = useState<LostAuctionEntry[]>([]);
  const [liveAuctions, setLiveAuctions] = useState<LiveAuction[]>([]);
  const [showSellerLeaderboard, setShowSellerLeaderboard] = useState(false);
  const [allAuctionItems, setAllAuctionItems] = useState([]);
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(
    null
  );
  const [approvalPendings, setApprovalPendings] = useState<
    approvalPendingItem[]
  >([]);
  const [approvalRejected, setApprovalRejected] = useState<
    approvalRejectedItem[]
  >([]);
  const [auctionCount, setAuctionCount] = useState(0);
  const [awardedAuctionsMap, setAwardedAuctionsMap] = useState<{
    [auctionId: string]: string;
  }>({});
  const [manageAuctionTab, setManageAuctionTab] = useState<
    "live" | "upcoming" | "pending" | "closed" | "rejected" | "create"
  >("live");
  const [liveCount, setLiveCount] = useState(0);
  // const [upcomingCount, setUpcomingCount] = useState(0);
  const [upcomingAuctions, setUpcomingAuctions] = useState<
    upcomingAuctionItem[]
  >([]);
  const [reverseBids, setReverseBids] = useState<Bid[]>([]);
  // const auctionsWithBids = reverseAuction.filter((a) => a.bidder_count > 0);
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
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/buyer/manage-auction?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setAuctionCount(data.count);
      }
    };
    if (user) fetchAuctions();
  }, [user]);
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
        `/api/buyer/live-auctions?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setLiveAuctions(data.data || []);
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
      } catch (err) {
        console.error("Error fetching auctions:", err);
      }
    };
    fetchAuctions();
  }, []);

  const fetchAwardedAuctions = async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `/api/buyer/awarded-auctions?email=${encodeURIComponent(user.email)}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch awarded auctions");
      }
      const data = await res.json();
      // Ensure API returns an array
      setAwardedAuctions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching awarded auctions:", err);
    }
  };
  useEffect(() => {
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/buyer/approval-rejected?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setApprovalRejected(data.data || []);
      }
    };
    if (user) fetchAuctions();
  }, [user]);

  useEffect(() => {
    if (user) fetchAwardedAuctions();
  }, [user]);

  const fetchSellerUpcomingCount = async (email: string) => {
    try {
      const response = await fetch(
        `/api/buyer/upcoming-auctions?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to load live auctions");
      }

      setUpcomingAuctions(data.data);
      setError(null);
    } catch (err) {
      console.error(" Network error while fetching upcoming count:", err);
    }
  };
  useEffect(() => {
    if (!isLoading && user?.email) {
      fetchSellerUpcomingCount(user.email);
    }
  }, [user?.email, isLoading]);

    const handleAcceptBid = async (auctionId: string, bidId: string) => {
      if (!user) return;

      try {
        const url = `/api/buyer/awarded-auctions?email=${encodeURIComponent(
          user.email
        )}&auctionId=${encodeURIComponent(auctionId)}&bidId=${encodeURIComponent(
          bidId
        )}`;

        const res = await fetch(url, { method: "POST" });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to accept bid");
        }
        const data = await res.json();
        setAwardedAuctions(data);
        // Optimistically add to awardedAuctions state
        setAwardedAuctions((prev) => [
          ...prev,
          bidRecevied.find((b) => b.auctionId === auctionId)!,
        ]);
        setAwardedAuctionsMap((prev) => ({ ...prev, [auctionId]: bidId }));
      } catch (err: any) {
        console.error(err);
        alert(`Error accepting bid: ${err.message}`);
      }
  };
  useEffect(() => {
    const fetchAuctions = async () => {
      if (!user?.email) throw new Error("User email is missing");
      const response = await fetch(
        `/api/buyer/closed-auctions?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      if (data.success) {
        setClosedAuctions(data.data || []);
      }
    };
    if (user) fetchAuctions();
  }, [user]);

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
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    router.push(path);
  };
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
            onClick={() => {
              setSelectedSection("reverseAuctions");
              setManageAuctionTab("live"); // ensure it always opens listings
            }}
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
                <div className="text-2xl font-bold">{auctionCount}</div>
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
                <div className="text-2xl font-bold">
                  {awardedAuctions.length}
                </div>
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
                <div className="text-2xl font-bold">
                  {closedAuctions.length}
                </div>
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
          {selectedSection === "createAuction" && <CreateAuction />}
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
          ) : null}
          {selectedSection === "reverseAuctions" ? (
            <div>
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
                    Live Auctions ({liveAuctions.length})
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
                    Upcoming Auctions ({upcomingAuctions.length})
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
                            <th className="px-4 py-2 text-left">
                              Auction Name
                            </th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Type </th>
                            <th className="px-4 py-2 text-left">Format</th>
                            <th className="px-4 py-2 text-left">
                              Starting Bid
                            </th>
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
                            <th className="px-4 py-2 text-left">
                              Auction Name
                            </th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Type </th>
                            <th className="px-4 py-2 text-left">Format</th>
                            <th className="px-4 py-2 text-left">
                              Starting Bid
                            </th>
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
                              <td className="px-4 py-2">
                                {upcoming.categoryid}
                              </td>
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
                                onClick={() => {
                                  const confirmed = window.confirm(
                                    "Are you sure you want to delete this auction?"
                                  );
                                  if (confirmed) {
                                    // handleDelete(auction.id);
                                  }
                                }}
                                className="text-red-600 hover:text-red-700 p-1 w-6 h-6"
                              >
                                <Trash className="w-3 h-3" />
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
                            <th className="px-4 py-2 text-left">
                              Auction Name
                            </th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Type </th>
                            <th className="px-4 py-2 text-left">Format</th>
                            <th className="px-4 py-2 text-left">
                              Starting Bid
                            </th>
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
                                  onClick={() => {
                                    const confirmed = window.confirm(
                                      "Are you sure you want to delete this auction?"
                                    );
                                    if (confirmed) {
                                      // handleDelete(auction.id);
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-700 p-1 w-6 h-6"
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
                            <th className="px-4 py-2 text-left">
                              Auction Name
                            </th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Type </th>
                            <th className="px-4 py-2 text-left">Format</th>
                            <th className="px-4 py-2 text-left">
                              Starting Bid
                            </th>
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
                              <td className="px-4 py-2">
                                {upcoming.categoryid}
                              </td>
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
                              {/* 
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
                            </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">No Auctions.</p>
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
          {selectedSection === "bidsRecevied" ? (
            bidRecevied.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left px-4 p-2">Auction Name</th>
                      <th className="text-left px-4 p-2">Seller Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="text-left px-4 p-2">Type</th>
                      <th className="text-left px-4 py-2 ">Format</th>
                      <th className="text-left px-4 py-2 ">Target Price</th>
                      <th className="text-left px-4 p-2">Starting Bid</th>
                      <th className="text-left px-4 p-2">Bid Amount</th>
                      <th className="text-center px-4 p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidRecevied.map((BidRecive, index) => {
                      const isAwarded = awardedAuctions.some(
                        (a) => a.auctionId === BidRecive.auctionId
                      );

                      return (
                        <tr
                          key={`${BidRecive.bidId}-${index}`}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } dark:bg-transparent`}
                        >
                          <td className="p-2">
                            <Link
                              href={`/auctions/reverse/${BidRecive.auctionId}`}
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                            >
                              <img
                                src={BidRecive.productimage}
                                alt={BidRecive.productName}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              {BidRecive.productName}
                            </Link>
                          </td>
                          <td className="p-2 capitalize text-gray-600">
                            {BidRecive.sellerName}
                          </td>
                          <td className="p-2 capitalize text-gray-600">
                            {BidRecive.categoryid}
                          </td>
                          <td className="p-2 text-gray-600">
                            {BidRecive.auctionType}
                          </td>
                          <td className="p-2 text-gray-600">
                            {BidRecive.auctionSubtype}
                          </td>
                          <td className="p-2 text-gray-600">
                            {BidRecive.targetPrice}
                          </td>
                          <td className="p-2 text-gray-600">
                            {BidRecive.startAmount}
                          </td>
                          <td className="p-2 text-gray-600">
                            {BidRecive.bidAmount}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              className={`px-2 py-1 rounded text-white text-sm ${
                                awardedAuctionsMap[BidRecive.auctionId]
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-green-500 hover:bg-green-600"
                              }`}
                              disabled={
                                !!awardedAuctionsMap[BidRecive.auctionId]
                              }
                              onClick={() =>
                                handleAcceptBid(
                                  BidRecive.auctionId,
                                  BidRecive.bidId
                                )
                              }
                            >
                              {awardedAuctionsMap[BidRecive.auctionId] ===
                              BidRecive.bidId
                                ? "Accepted"
                                : awardedAuctionsMap[BidRecive.auctionId]
                                ? "Closed"
                                : "Accept"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No Bids Recevied.</p>
            )
          ) : selectedSection === "awardedAuctions" ? (
            awardedAuctions.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="text-left px-4 p-2">Auction Name</th>
                      <th className="text-left px-4 p-2">Seller Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="text-left px-4 p-2">Type</th>
                      <th className="text-left px-4 py-2 ">Format</th>
                      <th className="text-left px-4 py-2 ">Target Price</th>
                      <th className="text-left px-4 p-2">Starting Bid</th>
                      <th className="text-left px-4 p-2">Bid Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {awardedAuctions.map((award, index) => (
                      <tr
                        key={award.auctionId}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
                      >
                        <td className="p-2">
                          <Link
                            href={`/auctions/${award.auctionId}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:underline"
                          >
                            <img
                              // src={award.productimage}
                              alt={award.productName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            {award.productName}
                          </Link>
                        </td>
                        <td className="p-2 text-gray-600">
                          {award.sellerName}
                        </td>
                        <td className="p-2 text-gray-600">
                          {award.categoryid}
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {award.auctionType}
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {award.auctionSubtype}
                        </td>
                        <td className="p-2 text-gray-600">
                          {award.targetPrice}
                        </td>
                        <td className="p-2 text-gray-600">
                          {award.startAmount.toLocaleString("en-IN")}
                        </td>
                        {/* <td className="p-2 text-gray-600">
                          {award.userBidAmount?.toLocaleString("en-IN")}
                        </td> */}
                        <td className="p-2 text-gray-600">
                          {award.currentbid}
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
            closedAuctions.length > 0 ? (
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
                      <th className="text-left px-4 p-2">Bidders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {closedAuctions.map((closed, index) => (
                      <tr
                        key={closed.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } dark:bg-transparent`}
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
                        <td className="p-2 capitalize text-gray-600">
                          {closed.categoryid}
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {closed.auctiontype}
                        </td>
                        <td className="p-2 capitalize text-gray-600">
                          {closed.auctionsubtype}
                        </td>

                        <td className="p-2 text-gray-600">
                          {closed.targetprice}
                        </td>
                        <td className="p-2 text-gray-600">
                          {closed.startprice}
                        </td>
                        <td className="p-2 text-gray-600">
                          {closed.bidder_count}
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
