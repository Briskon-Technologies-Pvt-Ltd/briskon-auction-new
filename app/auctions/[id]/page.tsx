"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateTime } from "luxon";
import BidLeadersBoard from "@/app/bid-Leader-board/page";
import AuctionCard from "@/app/auctions/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import LiveTimer from "@/app/livetimer/page";
import {
  Clock,
  Users,
  Gavel,
  TrendingUp,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Star,
  MessageSquare,
  Hourglass,
  Timer,
  CircleStop,
  Tag,
  PersonStanding,
  MapPin,
  User,
  Eye,
  Award,
  ArrowLeft,
  ChevronLeft,
  MoveLeft,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { LoginPrompt } from "@/components/login-prompt";
import { ReactNode } from "react";

// start and end time logic
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

// Dummy calculateTimeLeft function (replace with actual implementation if needed)
const calculateTimeLeft = (endDate: Date): string => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  if (diff <= 0) return "Auction ended";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}d ${hours}h ${minutes}m`;
};

function renderKeyValueBlock(
  data: string | Record<string, any> | undefined,
  fallback: string
): React.ReactNode {
  try {
    const parsed: any[] =
      typeof data === "string" ? JSON.parse(data) : data ?? [];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return (
        <span className="text-gray-600 dark:text-gray-300 ml-4">
          {fallback}
        </span>
      );
    }

    return (
      <>
        {parsed.map((attr, index) =>
          attr.value ? (
            <div key={index} className="text-gray-600 dark:text-gray-300 ml-4">
              {attr.name}:{" "}
              {attr.type === "color" ? (
                <span
                  className="inline-block w-4 h-4 rounded-sm border ml-1"
                  style={{ backgroundColor: attr.value }}
                  title={attr.value}
                ></span>
              ) : (
                attr.value
              )}
            </div>
          ) : null
        )}
      </>
    );
  } catch {
    return (
      <span className="text-gray-600 dark:text-gray-300 ml-4">
        Invalid attributes data
      </span>
    );
  }
}

// Updated Auction interface
interface Auction {
  id: string;
  productname?: string;
  title?: string;
  categoryid?: string;
  currency?: string;
  bidder_count?: number;
  sellerAuctionCount?: number;
  auctiontype: "forward" | "reverse";
  currentbid?: number;
  bidincrementtype?: "fixed" | "percentage";
  minimumincrement?: number;
  startprice?: number;
  question_count?: number;
  scheduledstart?: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  bidders?: number;
  watchers?: number;
  profiles?: {
    fname: string;
    location: string;
  };
  auctionId: string;
  loggedInUserId: string;
  bids?: {
    user_id: string;
    username?: string;
    amount: number;
  }[];

  productimages?: string[];
  productdocuments?: string[];
  productdescription?: string;
  specifications?: string; // JSON string or null
  buyNowPrice?: number;
  participants?: string[]; // Array of user IDs (UUIDs), parsed from jsonb
  bidcount?: number;
  createdby?: string; // Email of the user who created the auction
  timeLeft?: string;
  starttime: string; // or Date, depending on your data
  duration: {
    days?: number;
    hours?: number;
    minutes?: number;
  };
  questions?: {
    user: string;
    question: string;
    answer?: string;
    time: string;
  }[];
  issilentauction?: boolean; // New field to indicate silent auction
  currentbidder?: string; // New field for current highest bidder email
  percent?: number; // New field for percentage increment (if applicable)
  attributes?: string; // JSON string or null
  sku?: string;
  brand?: string;
  model?: string;
  reserveprice?: number;
  auctionsubtype?: string; // New field for auction subtype (e.g., "sealed", "silent")
  ended?: boolean; // New field to indicate if the auction has ended
  editable?: boolean; // New field to indicate if the auction is editable by the creator
}

// Bid interface
interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  amount: number;
  profiles?: {
    fname: string;
  };
  created_at: string;
}

export default function AuctionDetailPage() {
  const params = useParams<{ id: string }>();
  const auctionId = params.id;
  const [bidAmount, setBidAmount] = useState("");
  const [watchlisted, setWatchlisted] = useState(false);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("Loading...");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [answerInput, setAnswerInput] = useState<{
    index: number;
    value: string;
  } | null>(null);
  const [showAllBids, setShowAllBids] = useState(false);
  const router = useRouter();
  const [bids, setBids] = useState<
    { userid: string; amount: number; created_at: string }[]
  >([]);

  const [bidHistory, setBidHistory] = useState<
    { bidder: string; amount: number; time: string }[]
  >([]);

  const { isAuthenticated, user } = useAuth();
  const isLoggedIn = !!user;
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const currencySymbol = useMemo(() => {
    const symbols: { [key: string]: string } = {
      USD: "$",
      INR: "₹",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "CA$",
      AUD: "A$",
    };
    return symbols[auction?.currency ?? ""] ?? "";
  }, [auction?.currency]);

  useEffect(() => {
    if (!auctionId) return;
    fetch(`/api/views/${auctionId}`, {
      method: "POST",
    });
  }, [auctionId]);
  // slide show every five second

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (auction?.productimages?.length || 1) - 1
          ? 0
          : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [auction?.productimages]);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/auctions/${auctionId}`);
        const json = await res.json();
        // console.log("Auction API Response (Raw):", json);
        if (!json.success)
          throw new Error(json.error || "Failed to fetch auction");
        const participants = Array.isArray(json.data.participants)
          ? json.data.participants
          : [];
        const updatedAuction = { ...json.data, participants };
        // console.log("Processed Auction Data:", updatedAuction);
        setAuction(updatedAuction);

        const bidRes = await fetch(`/api/bids/${auctionId}`);
        const bidJson = await bidRes.json();
        // console.log("Bid API Response (Raw):", bidJson);
        if (bidJson.success) {
          const bids = bidJson.data || [];
          // console.log("Fetched Bids (Raw):", bids);
          const historyPromises = bids.map(async (bid: Bid) => {
            const profileRes = await fetch(`/api/profiles/${bid.user_id}`);
            const profileJson = await profileRes.json();
            // console.log(
            //   "Profile API Response for user_id",
            //   bid.user_id,
            //   " (Raw):",
            //   profileJson
            // );
            const bidderName = profileJson.success
              ? `${profileJson.data.fname || ""} ${
                  profileJson.data.lname || ""
                }`.trim() ||
                profileJson.data.email ||
                bid.user_id
              : `User ${bid.user_id} (Profile not found)`;

            return {
              bidder: bidderName,
              amount: bid.amount,
              time: new Date(bid.created_at).toLocaleString("en-US", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          });
          const history = await Promise.all(historyPromises);
          // console.log("Processed Bid History (Raw):", history);
          setBidHistory(history);
        } else {
          // console.log("No bid data available from API:", bidJson);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctionDetails();
  }, [auctionId]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await fetch(`/api/bids/${auctionId}`);
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const sorted = json.data
            .sort((a: any, b: any) => b.amount - a.amount)
            .map((bid: any) => ({
              userid: bid.user_id,
              amount: bid.amount,
              created_at: bid.created_at,
            }));
          setBids(sorted);
        }
      } catch (error) {
        console.error("Failed to load bids:", error);
      }
    };

    if (auction?.id) fetchBids();
  }, [auction?.id]);

  const handlePlaceBid = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      alert("Please log in to place a bid.");
      return;
    }

    if (!user?.role || (user.role !== "buyer" && user.role !== "both")) {
      alert("Only buyers can place bids. Please update your account type.");
      return;
    }

    const amount = Number(bidAmount);
    if (isNaN(amount)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    // Check for sealed auction participant restriction only
    if (
      auction?.auctionsubtype === "sealed" &&
      auction?.participants?.includes(user?.id ?? "")
    ) {
      alert(
        "You have already submitted a bid for this sealed auction and cannot bid again."
      );
      return;
    }

    // Minimum bid validation
    const round = (val: number) =>
      Math.round((val + Number.EPSILON) * 100) / 100;
    const expectedBid = round(getMinimumBid());
    const userAmount = round(Number(bidAmount));
    if (auction?.auctionsubtype === "sealed") {
      if (userAmount < (auction.startprice ?? 0)) {
        alert(
          `Bid must be at least $${(auction.startprice ?? 0).toLocaleString()}`
        );
        return;
      }
    } else if (
      auction?.bidincrementtype === "fixed" &&
      auction?.minimumincrement
    ) {
      const baseBid = auction.currentbid ?? auction.startprice ?? 0;
      const diff = userAmount - baseBid;

      if (
        userAmount < expectedBid ||
        diff < 0 ||
        Math.abs(diff % auction.minimumincrement) > 0.01
      ) {
        alert(
          `Bid must be at least $${expectedBid.toLocaleString()} and in multiples of $${auction.minimumincrement.toLocaleString()} (fixed increment).`
        );
        return;
      }
    } else if (
      auction?.bidincrementtype === "percentage" &&
      auction?.percent &&
      auction?.currentbid
    ) {
      if (userAmount !== expectedBid) {
        const increment = round(
          (auction.currentbid ?? 0) * (auction.percent / 100)
        );
        const incrementDetails = `Minimum increment: $${increment.toLocaleString()} (${
          auction.percent
        }% of $${(auction.currentbid ?? 0).toLocaleString()})`;

        alert(
          `Bid must be exactly $${expectedBid.toLocaleString()} (current bid + increment). ${incrementDetails}`
        );
        return;
      }
    }

    // } else if (userAmount !== expectedBid) {
    //   let incrementDetails = "";
    //   if (auction?.bidincrementtype === "fixed" && auction?.minimumincrement) {
    //     incrementDetails = `Minimum increment: $${(
    //       auction.minimumincrement ?? 0
    //     ).toLocaleString()} (fixed)`;
    //   } else if (
    //     auction?.bidincrementtype === "percentage" &&
    //     auction?.percent &&
    //     auction?.currentbid
    //   ) {
    //     const increment = round(
    //       (auction.currentbid ?? 0) * (auction.percent / 100)
    //     );
    //     incrementDetails = `Minimum increment: $${increment.toLocaleString()} (${
    //       auction.percent
    //     }% of $${(auction.currentbid ?? 0).toLocaleString()})`;
    //   }

    //   alert(
    //     `Bid must be exactly $${expectedBid.toLocaleString()} (current bid + increment). ${incrementDetails}`
    //   );
    //   return;
    // }

    try {
      // console.log("Placing bid:", { auctionId, userId: user.id, amount });
      const formData = new FormData();
      formData.append("action", "bid");
      formData.append("user_id", user.id ?? "");
      formData.append("user_email", user.email ?? "");
      formData.append("amount", amount.toString());
      // formData.append("created_at", new Date().toISOString());
      const createdAt = DateTime.now().setZone("Asia/Kolkata").toUTC().toISO();
      if (createdAt) formData.append("created_at", createdAt);
      // Optionally append images and documents if available (e.g., from a file input)
      // Example: if (selectedImages) formData.append("images[0]", selectedImages[0]);

      const bidRes = await fetch(`/api/auctions/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const bidJson = await bidRes.json();
      if (!bidJson.success)
        throw new Error(bidJson.error || "Failed to record bid");

      const auctionRes = await fetch(`/api/auctions/${auctionId}`); // Refresh auction data
      const auctionJson = await auctionRes.json();
      if (!auctionJson.success)
        throw new Error(auctionJson.error || "Failed to fetch updated auction");

      const start = new Date(auctionJson.data.scheduledstart || "");
      const duration = auctionJson.data.auctionduration
        ? ((d) =>
            (d.days || 0) * 24 * 60 * 60 +
            (d.hours || 0) * 60 * 60 +
            (d.minutes || 0) * 60)(auctionJson.data.auctionduration)
        : 0;
      const end = new Date(start.getTime() + duration * 1000);
      const timeLeft = calculateTimeLeft(end);

      setAuction({ ...auctionJson.data, timeLeft });

      // Refetch bid history after successful bid
      const bidResUpdated = await fetch(`/api/bids/${auctionId}`);
      const bidJsonUpdated = await bidResUpdated.json();
      if (bidJsonUpdated.success) {
        const bids = bidJsonUpdated.data || [];
        // console.log("Fetched Updated Bids (Raw):", bids);
        const historyPromises = bids.map(async (bid: Bid) => {
          const profileRes = await fetch(`/api/profiles/${bid.user_id}`);
          const profileJson = await profileRes.json();
          // console.log(
          //   "Profile API Response for user_id",
          //   bid.user_id,
          //   " (Raw):",
          //   profileJson
          // );
          const bidderName = profileJson.success
            ? `${profileJson.data.fname ?? ""} ${
                profileJson.data.lname ?? ""
              }`.trim() ||
              profileJson.data.email ||
              bid.user_id
            : `User ${bid.user_id} (Profile not found)`;
          const bidTimeIST = DateTime.fromISO(bid.created_at)
            .setZone("Asia/Kolkata")
            .toLocaleString({
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            });
          return {
            bidder: bidderName,
            amount: bid.amount,
            time: bidTimeIST,
          };
        });
        const history = await Promise.all(historyPromises);
        // console.log("Processed Updated Bid History (Raw):", history);
        setBidHistory(history);
      }

      setBidAmount("");
      alert(`Bid of $${amount.toLocaleString()} placed successfully!`);
    } catch (err) {
      console.error("Bid placement error:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while placing bid"
      );
    }
  };
  // function BidLeadersBoard({ bids, loggedInUserId }: { bids: Bid[]; loggedInUserId: string }) {
  // if (!bids.length) return <p>No bids yet.</p>;
  // }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (!user?.role || (user.role !== "buyer" && user.role !== "both")) {
      alert("Only buyers can purchase items. Please update your account type.");
      return;
    }

    // console.log("Buy now clicked");
    alert(
      `Item purchased for $${auction?.buyNowPrice?.toLocaleString() || "N/A"}!`
    );
  };

  const handleWatchlist = () => {
    setWatchlisted(!watchlisted);
    // console.log("Watchlist toggled:", !watchlisted);
  };

  const getMinimumBid = () => {
    const startPrice = auction?.startprice ?? 0;

    // If no bids yet, use start price as base
    if (!auction?.bidcount || auction.bidcount === 0 || !auction.currentbid) {
      return startPrice;
    }

    // Percentage-based increment
    if (
      auction.bidincrementtype === "percentage" &&
      auction.percent &&
      auction.currentbid
    ) {
      const minBid = (auction.currentbid ?? 0) * (1 + auction.percent / 100);
      return Math.max(minBid, startPrice);
    }

    // Fixed increment logic
    if (
      auction.bidincrementtype === "fixed" &&
      auction.minimumincrement &&
      auction.currentbid
    ) {
      const minBid =
        (auction.currentbid ?? 0) + (auction.minimumincrement ?? 0);
      return Math.max(minBid, startPrice);
    }

    // Fallback
    return startPrice;
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (auction?.productimages?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (auction?.productimages?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleSubmitQuestion = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      alert("Please log in to ask a question.");
      return;
    }

    if (!newQuestion.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("action", "postQuestion");
      formData.append("user_id", user?.id ?? "");
      formData.append("user_email", user?.email ?? "");
      formData.append("question", newQuestion);

      for (let [key, value] of formData.entries()) {
        // console.log("FormData Entry:", key, value);
      }

      const res = await fetch(`/api/auctions/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success)
        throw new Error(json.error || "Failed to submit question");

      const updatedAuction: Auction = {
        ...auction!,
        questions: json.data.questions,
        question_count: json.data.question_count,
      };

      setAuction(updatedAuction);
      setNewQuestion("");
      alert("Question submitted successfully!");
    } catch (err) {
      console.error("Question submission error:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting question"
      );
    }
  };

  const handleSubmitAnswer = async (index: number) => {
    if (
      !isAuthenticated ||
      (user?.email !== auction?.createdby && auction?.createdby !== null)
    ) {
      alert("Only the auction creator can answer questions.");
      return;
    }

    if (!answerInput || !answerInput.value.trim()) {
      alert("Please enter an answer.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("action", "answerQuestion");
      formData.append("user_email", user?.email ?? "");
      formData.append("questionIndex", answerInput.index.toString());
      formData.append("answer", answerInput.value);

      const res = await fetch(`/api/auctions/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success)
        throw new Error(json.error || "Failed to submit answer");

      const updatedAuction: Auction = {
        ...auction!,
        questions: json.data.questions,
      };

      setAuction(updatedAuction);
      setAnswerInput(null);
      alert("Answer submitted successfully!");
    } catch (err) {
      console.error("Answer submission error:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting answer"
      );
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!auction)
    return <div className="text-center py-20">Auction not found</div>;

  // Calculate auction status
  const now = new Date();
  const start = new Date(auction.scheduledstart || now);
  const duration = auction.auctionduration
    ? ((d) =>
        (d.days || 0) * 24 * 60 * 60 +
        (d.hours || 0) * 60 * 60 +
        (d.minutes || 0) * 60)(auction.auctionduration)
    : 0;
  const end = new Date(start.getTime() + duration * 1000);
  const isAuctionNotStarted = now < start;
  const isAuctionEnded = now > end;

  const isSameAmount = (a: number, b: number, epsilon = 0.01) =>
    Math.abs(a - b) < epsilon;
  const bidAmountNumber = Number(bidAmount);
  const baseBid = auction?.currentbid ?? auction?.startprice ?? 0;
  const isButtonDisabled =
    !bidAmount ||
    isNaN(bidAmountNumber) ||
    bidAmountNumber < 0 ||
    (user?.email === auction?.createdby && auction?.createdby !== null) ||
    isAuctionNotStarted ||
    isAuctionEnded ||
    (auction?.auctionsubtype === "sealed"
      ? auction?.participants?.some(
          (p) => user?.id && p.includes(user.id ?? "")
        ) || // added this logic to make bid multile of min incremement one time
        bidAmountNumber < (auction?.startprice ?? 0) ||
        (bidAmountNumber - (auction?.startprice ?? 0)) %
          (auction?.minimumincrement || 1) !==
          0
      : auction?.bidincrementtype === "fixed" && auction?.minimumincrement
      ? bidAmountNumber <= baseBid ||
        Math.abs((bidAmountNumber - baseBid) % auction.minimumincrement) > 0.01
      : !isSameAmount(
          bidAmountNumber,
          baseBid * (1 + (auction?.percent ?? 0) / 100)
        ));

  const isSilentAuction =
    auction?.issilentauction || auction?.auctionsubtype === "silent";

  const currentMedia =
    auction?.productimages?.[currentImageIndex] || "/placeholder.svg";
  const isVideo =
    currentMedia.toLowerCase().endsWith(".mp4") ||
    currentMedia.toLowerCase().endsWith(".webm") ||
    currentMedia.toLowerCase().endsWith(".mov");

  return (
      <div className="min-h-screen py-20">   
<div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mb-4 -mt-4">
  <nav className="flex items-center text-sm text-gray-600 space-x-1">
    <button
      onClick={() => router.push("/auctions")}
      className="flex items-center space-x-1 text-gray-400 font-medium hover:text-gray-800 transition-colors"
    >
      <span>All Auctions</span>
    </button>
    <ChevronRight className="w-4 h-4 text-gray-600" />
    <span className="text-gray-800 font-medium">Auction Details</span>
  </nav>
</div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <Card className="hover-lift transition-smooth">
                  <CardContent className="p-0 relative">
                    {isVideo ? (
                      <video
                        src={currentMedia}
                        controls
                        className="w-full h-96 object-cover rounded-t-lg transition-smooth hover:scale-105"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={currentMedia}
                        alt={
                          auction.productname || auction.title || "Auction Item"
                        }
                        width={600}
                        height={400}
                        className="w-full h-96 object-cover rounded-t-lg transition-smooth hover:scale-105"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {`${currentImageIndex + 1}/${
                        auction.productimages?.length ?? 1
                      }`}
                    </div>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-smooth"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-smooth"
                    >
                      →
                    </button>
                    <div className="p-4">
                      <div className="flex gap-2">
                        {auction.productimages?.map(
                          (media: string, index: number) => {
                            const isVideoThumbnail =
                              media.toLowerCase().endsWith(".mp4") ||
                              media.toLowerCase().endsWith(".webm") ||
                              media.toLowerCase().endsWith(".mov");
                            return (
                              <div key={index} className="relative">
                                {isVideoThumbnail ? (
                                  <video
                                    src={media}
                                    autoPlay
                                    loop
                                    className="w-20 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-smooth hover-lift"
                                    onClick={() => setCurrentImageIndex(index)}
                                    muted
                                    playsInline
                                  />
                                ) : (
                                  <Image
                                    src={media || "/placeholder.svg"}
                                    alt={`${
                                      auction.productname || auction.title
                                    } ${index + 1}`}
                                    width={100}
                                    height={80}
                                    className="w-20 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-smooth hover-lift"
                                    onClick={() => setCurrentImageIndex(index)}
                                  />
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Auction Details */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm capitalize"
                        >
                          {auction.categoryid || "Uncategorized"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm capitalize"
                        >
                          Type:{" "}
                          {auction.auctiontype === "forward"
                            ? "Forward"
                            : "Reverse"}
                        </Badge>
                        {auction.auctionsubtype && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm capitalize"
                          >
                            Format: {auction.auctionsubtype}
                          </Badge>
                        )}
                      </div>

                      {/* <CardTitle className="text-2xl">
                      {auction.productname ||
                        auction.title ||
                        "Untitled Auction"}
                    </CardTitle> */}
                    </div>
                    <div className="relative flex gap-2">
                      {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWatchlist}
                      className={watchlisted ? "text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 ${watchlisted ? "fill-current" : ""}`} />
                    </Button> */}
                      <div className="relative  ">
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
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 gap-2 bg-gray-50 p-1 rounded-lg shadow-sm">
                      <TabsTrigger
                        value="description"
                        className="transition-all duration-200 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:scale-[1.03] data-[state=active]:bg-blue-200 data-[state=active]:text-blue-800"
                      >
                        Description
                      </TabsTrigger>
                      <TabsTrigger
                        value="specifications"
                        className="transition-all duration-200 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:scale-[1.03] data-[state=active]:bg-blue-200 data-[state=active]:text-blue-800"
                      >
                        Specifications
                      </TabsTrigger>
                      {isLoggedIn && (
                        <TabsTrigger
                          value="qa"
                          className="transition-all duration-200 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:scale-[1.03] data-[state=active]:bg-blue-200 data-[state=active]:text-blue-800"
                        >
                          Q&A
                        </TabsTrigger>
                      )}
                      <TabsTrigger
                        value="documentation"
                        className="transition-all duration-200 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:scale-[1.03] data-[state=active]:bg-blue-200 data-[state=active]:text-blue-800"
                      >
                        Documentation
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                      <div className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line">
                        {auction.productdescription ||
                          "No description available"}
                      </div>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-6">
                      <div className="space-y-4 text-xs text-gray-600 dark:text-gray-300">
                        {auction.attributes ||
                        auction.specifications ||
                        auction.sku ||
                        auction.brand ||
                        auction.model ||
                        auction.reserveprice ? (
                          <>
                            {auction.sku && (
                              <div className="flex justify-between py-2 border-b">
                                <span className="text-sm font-bold text-gray-800 dark:text-white">
                                  SKU
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                  {auction.sku}
                                </span>
                              </div>
                            )}
                            {auction.brand && (
                              <div className="py-2 border-b">
                                <span className="text-sm font-bold text-gray-800 dark:text-white block">
                                  Brand
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                  {auction.brand}
                                </span>
                              </div>
                            )}

                            {auction.model && (
                              <div className="flex justify-between py-2 border-b">
                                <span className="text-sm font-bold text-gray-800 dark:text-white">
                                  Model
                                </span>
                                <span>{auction.model}</span>
                              </div>
                            )}
                            {auction.reserveprice && (
                              <div className="flex justify-between py-2 border-b">
                                <span className="text-xs font-bold text-gray-800 dark:text-white">
                                  Reserve Price
                                </span>
                                <span>
                                  ${auction.reserveprice.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {auction.attributes && (
                              <div className="py-2 border-b">
                                <span className="block text-sm font-bold text-gray-800 dark:text-white mb-1">
                                  Attributes
                                </span>
                                {renderKeyValueBlock(
                                  auction.attributes,
                                  "No attributes data"
                                )}
                              </div>
                            )}
                            {auction.specifications && (
                              <div className="py-2 border-b">
                                <span className="block text-xs font-semibold text-gray-800 dark:text-white mb-1">
                                  Specifications
                                </span>
                                {renderKeyValueBlock(
                                  auction.specifications,
                                  "No specifications data"
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-sm">No specifications available</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="qa" className="mt-6">
                      <div className="space-y-6">
                        {auction.questions?.length ? (
                          auction.questions.map(
                            (
                              qa: {
                                user: string;
                                question: string;
                                answer?: string;
                                time: string;
                              },
                              index: number
                            ) => (
                              <div key={index} className="border-b pb-4">
                                <div className="mb-2">
                                  <span className="font-medium">{qa.user}</span>
                                  <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                                    {new Date(qa.time).toLocaleString("en-US", {
                                      hour12: true,
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                                <div className="mb-2">
                                  <MessageSquare className="h-4 w-4 inline mr-2" />
                                  <span>{qa.question}</span>
                                </div>
                                {qa.answer && (
                                  <div className="ml-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                    <CheckCircle className="h-4 w-4 inline mr-2 text-green-600" />
                                    <span>{qa.answer}</span>
                                  </div>
                                )}
                              </div>
                            )
                          )
                        ) : (
                          <p>No questions available</p>
                        )}

                        <div className="mt-6">
                          <h4 className="font-semibold mb-3">Ask a Question</h4>
                          <Textarea
                            placeholder="Type your question here..."
                            className="mb-3"
                          />
                          <Button>Submit Question</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="documentation" className="mt-6">
                      {auction.productdocuments &&
                      auction.productdocuments.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {auction.productdocuments.map((docUrl, index) => (
                            <a
                              key={index}
                              href={docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                            >
                              <svg
                                className="w-6 h-6 text-pink-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M6 2h9l6 6v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V9h-5V4H6zm2 2h3v4H8V6zm4 0h3v2h-3V6zm0 3h3v2h-3V9zm-4 0h3v2H8V9z" />
                                <path d="M10 12h4v2h-4v-2zm0 3h4v2h-4v-2z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Document {index + 1}
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p>No documentation available</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>  
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Bidding Card */}
              <Card>
                <div className="space-y-3 mb-5 px-4 gap-2">
                  {/* Top Row: Left and Right Labels */}
                  <div className="flex mt-4 mb-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      <Gavel className="w-5 h-5 text-blue-600 animate-bounce" />
                      {/* <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Auction Details:
                    </span> */}
                    </h2>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white ml-2">
                      {auction.productname || "Auction Item"}
                    </p>
                  </div>

                  {/* Start Date */}
                  {auction.scheduledstart && (
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Timer className="w-[12px] h[12px] text-green-500" />
                        <span>Starts:</span>
                      </div>
                      <span>
                        {formatDateTime(new Date(auction.scheduledstart))}
                      </span>
                    </div>
                  )}

                  {/* End Date */}
                  {auction.scheduledstart && auction.auctionduration && (
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <CircleStop className="w-[11px] h-[11px] text-red-500" />
                        <span>Ends:</span>
                      </div>
                      <span className="">
                        {formatDateTime(
                          getEndDate(
                            new Date(auction.scheduledstart),
                            auction.auctionduration
                          )
                        )}
                      </span>
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Tag className="w-[11px] h-[11px] text-red-500" />
                        <span>Starting Bid:</span>
                      </div>
                      <span className="font-semibold text-green-600 text-base">
                        {currencySymbol}
                        {auction.startprice?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                    {/* minimum bid increment */}
                    {isLoggedIn && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-orange-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            Min Bid Increment:
                          </span>
                        </div>
                        <span className="font-semibold text-sm text-gray-700 dark:text-gray-100 text-sm">
                          {currencySymbol}
                          {auction.bidincrementtype === "percentage" &&
                          auction.percent &&
                          auction.currentbid
                            ? (
                                auction.currentbid *
                                (auction.percent / 100)
                              ).toLocaleString()
                            : auction.minimumincrement?.toLocaleString() || "0"}
                        </span>
                      </div>
                    )}

                    {!isAuctionEnded && (
                      <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Tag className="w-[11px] h-[11px] text-blue-500" />
                          <span>Current Bid:</span>
                        </div>
                        {auction.auctionsubtype === "sealed" ||
                        auction.auctionsubtype === "silent" ? (
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            Bids are confidential until opening
                          </span>
                        ) : (
                          <span className="font-semibold text-blue-600 text-base">
                            {currencySymbol}
                            {auction.currentbid?.toLocaleString() || "N/A"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {auction.scheduledstart &&
                    auction.auctionduration &&
                    !isAuctionEnded && (
                      <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Hourglass className="w-[11px] h-[11px] text-red-500" />
                          <span>Ends In:</span>
                        </div>

                        <LiveTimer
                          startTime={auction.scheduledstart}
                          duration={auction.auctionduration}
                        />
                      </div>
                    )}

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Bidders count:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {auction.bidder_count ?? 0}
                    </span>
                  </div>
                  {!isLoggedIn && (
                    <div className="mt-3 text-center">
                      {isAuctionEnded ? (
                        <p className="text-sm text-red-600 text-left">
                          Auction has ended
                        </p>
                      ) : (
                        <Button
                          className="w-full text-sm bg-gray-500 text-white hover:bg-gray-600 transition-smooth hover-lift transform-3d"
                          onClick={() => router.push("/login")}
                        >
                          Login to place bid
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                {isLoggedIn && (
                  <CardContent className="space-y-3">
                    {/* <div className="text-center"> */}
                    {/* <div className="text-3xl font-bold text-green-600 mb-1 animate-pulse-gow">
                      {auction.auctionsubtype === "sealed"
                        ? `$${auction.startprice?.toLocaleString() || "N/A"}`
                        : auction.issilentauction &&
                          auction.bidcount &&
                          auction.bidcount > 0
                        ? `$${auction.currentbid?.toLocaleString() || "N/A"}`
                        : `$${auction.startprice?.toLocaleString() || "N/A"}`}
                    </div> */}
                    {/*
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {auction.auctionsubtype === "sealed"
                        ? "Starting Price"
                        : auction.issilentauction &&
                          auction.bidcount &&
                          auction.bidcount > 0
                        ? "Current Highest Bid"
                        : "Starting Price"}
                    </div>
                    {!auction.issilentauction &&
                      auction.auctionsubtype !== "sealed" &&
                      auction.currentbidder &&
                      auction.bidcount &&
                      auction.bidcount > 0 && (
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          By: {auction.currentbidder}
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Start Price:
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${auction.startprice?.toLocaleString() || "N/A"}
                    </div>
                  </div> */}

                    {/* <div className="flex items-center justify-center gap-4 text-sm"> */}
                    {/* <div className="flex items-center gap-1 hover-lift">
                    <Clock className="h-4 w-4 text-red-600 animate-bounce-gentle" />
                    <span className="font-semibold text-red-600">
                      {auction.timeLeft || "N/A"}
                    </span>
                  </div> */}
                    {/* <div className="flex items-center gap-1 hover-lift">
                    <Users className="h-4 w-4" />
                    <span>
                      {auction.issilentauction
                        ? "Silent Auction"
                        : `${auction.bidcount || 0} bidders`}
                    </span>
                  </div> */}
                    {/* </div> */}
                    {(isAuctionNotStarted || isAuctionEnded) && (
                      <p className="text-sm text-red-600 mt-2">
                        {isAuctionNotStarted
                          ? "Auction has not started yet"
                          : "Auction has ended"}
                      </p>
                    )}

                    {isLoggedIn && !isAuctionEnded && (
                      <div className="space-y-3">
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder={
                              auction?.auctionsubtype === "sealed"
                                ? `Start Price: $${
                                    auction.startprice?.toLocaleString() ?? "0"
                                  }`
                                : `Minimum: $${getMinimumBid().toLocaleString()}`
                            }
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className={`mt-1 transition-smooth pr-10 ${
                              isAuctionNotStarted ||
                              isAuctionEnded ||
                              (auction?.auctionsubtype === "sealed" &&
                                auction?.participants?.some(
                                  (p) => user?.id && p.includes(user.id ?? "")
                                ))
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={
                              isAuctionNotStarted ||
                              isAuctionEnded ||
                              (auction?.auctionsubtype === "sealed" &&
                                auction?.participants?.some(
                                  (p) => user?.id && p.includes(user.id ?? "")
                                ))
                            }
                          />
                        </div>
                        {auction?.auctionsubtype === "sealed" &&
                          auction?.participants?.includes(user?.id ?? "") && (
                            <p className="text-sm text-red-600 mt-2">
                              You have already submitted a bid for this auction
                              and cannot bid again.
                            </p>
                          )}
                        <div
                          style={{
                            width: "100%",
                            display: "block",
                            position: "relative",
                            zIndex: 1,
                            pointerEvents: "auto",
                          }}
                        >
                          <Button
                            className="w-full text-sm bg-gray-500 text-white hover:bg-gray-600 transition-smooth hover-lift transform-3d"
                            onClick={handlePlaceBid}
                            disabled={isButtonDisabled}
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "0.5rem",
                              boxSizing: "border-box",
                              position: "relative",
                              zIndex: 1,
                              pointerEvents: "auto",
                            }}
                          >
                            Place Bid
                          </Button>
                          {/* {(isAuctionNotStarted || isAuctionEnded) && (
                          <p className="text-sm text-red-600 mt-2">
                            {isAuctionNotStarted
                              ? "Auction has not started yet"
                              : "Auction has ended"}
                          </p>
                        )} */}
                        </div>
                        {auction.buyNowPrice && (
                          <>
                            <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                              or
                            </div>
                            <Button
                              variant="outline"
                              className="w-full transition-smooth hover-lift"
                              onClick={handleBuyNow}
                              disabled={isAuctionNotStarted || isAuctionEnded}
                            >
                              Buy Now - {currencySymbol}
                              {auction.buyNowPrice.toLocaleString()}
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Bid Leaders Board */}
              {isLoggedIn && user?.id && auctionId && (
                <div className="mt-6">
                  <BidLeadersBoard
                    auctionId={auctionId}
                    loggedInUserId={user.id}
                    currencySymbol={currencySymbol}
                    auction={auction}
                  />
                </div>
              )}

              {/* Seller Info */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                    <User className="w-5 h-5 text-green-600 animate-bounce" />
                    <CardTitle className="text-lg font-semibold tracking-wide">
                      Seller Information
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {/* Seller Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                      <PersonStanding className="w-3 h-3 text-green-500 " />
                      <span className="font-xs">Seller:</span>
                    </div>
                    <span className="font-medium">
                      {auction.profiles?.fname || "Unknown Seller"}
                    </span>
                  </div>

                  {/* Location Row */}
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3text-blue-500" />
                      <span className="font-xs">Location:</span>
                    </div>
                    <span className="font-xs">
                      {auction.profiles?.location || "Unknown Location"}
                    </span>
                  </div>

                  {/* Completed Projects */}
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-purple-500" />
                      <span className="">Auctions:</span>
                    </div>
                    <span className="font-xs">
                      {auction.sellerAuctionCount}
                    </span>
                  </div>
                  {isLoggedIn ? (
                    <Button className="w-full text-sm bg-gray-500 text-white hover:bg-gray-600 transition-smooth hover-lift transform-3d">
                      View seller profile
                    </Button>
                  ) : (
                    <Button className="w-full text-sm bg-gray-500 text-white hover:bg-gray-600 transition-smooth hover-lift transform-3d">
                      Login to view seller profile
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Auction Stats */}
              {/* <Card>
              <CardHeader>
                <CardTitle>Auction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm"> */}
              {/* Starting Bid */}
              {/* <div className="flex justify-between">
                  <span>Starting Bid</span>
                  <span className="font-medium">
                    ${auction.startprice?.toLocaleString() || "N/A"}
                  </span>
                </div> */}

              {/* Conditional: Sealed Bid or Current Bid */}
              {/* {auction.auctionsubtype === "sealed" ? (
                  <div className="flex justify-between">
                    <span>Sealed Bid</span>
                    <span className="font-medium">Yes</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Current Bid</span>
                    <span className="font-medium text-green-600">
                      ${auction.currentbid?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                )} */}

              {/* Buy Now Price */}
              {/* {auction.buyNowPrice && (
                  <div className="flex justify-between">
                    <span>Buy Now Price</span>
                    <span className="font-medium">
                      ${auction.buyNowPrice.toLocaleString()}
                    </span>
                  </div>
                )} */}

              {/* Total Bids */}
              {/* <div className="flex justify-between">
                  <span>Total Bids</span>
                  <span className="font-medium">{auction.bidcount || 0}</span>
                </div> */}

              {/* Time Remaining */}
              {/* <div className="flex justify-between">
                  <span>Time Remaining</span>
                  <span className="font-medium text-red-600">
                    {auction.timeLeft || "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card> */}
            </div>
          </div>
        </div>
        {!isAuctionEnded && isLoggedIn && (
          <AuctionCard
            customHide={false}
            category={auction.categoryid}
            excludeId={auction.id}
            heading={`Related Auctions for ${auction.categoryid}`}
          />
        )}
        <LoginPrompt
          open={showLoginPrompt}
          onOpenChange={setShowLoginPrompt}
          title="Sign in to place your bid"
          description="Join the auction and start bidding on this exclusive item"
          onSuccess={() => {
            // console.log("User logged in successfully");
          }}
        />
        
      </div>
      

  );
}
