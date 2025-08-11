"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  Gavel,
  TrendingDown,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Star,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { LoginPrompt } from "@/components/login-prompt";
import { ReactNode } from "react";
import { DateTime } from "luxon";

const calculateTimeLeft = (endDate: Date): string => {
  const now = DateTime.now().setZone("Asia/Kolkata");
  const end = DateTime.fromJSDate(endDate).setZone("Asia/Kolkata");

  if (end <= now) return "Auction ended";

  const diff = end.diff(now, ["days", "hours", "minutes"]).toObject();

  return `${Math.floor(diff.days || 0)}d ${Math.floor(diff.hours || 0)}h ${Math.floor(diff.minutes || 0)}m`;
};

function renderKeyValueBlock(
  data: string | Record<string, any> | undefined,
  fallback: string
): React.ReactNode {
  try {
    const parsed: any[] = typeof data === "string" ? JSON.parse(data) : data ?? [];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return <span className="text-gray-600 dark:text-gray-300 ml-4">{fallback}</span>;
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
    return <span className="text-gray-600 dark:text-gray-300 ml-4">Invalid attributes data</span>;
  }
}

interface Auction {
  id: string;
  productname?: string;
  title?: string;
  categoryid?: string;
  auctiontype: "forward";
  auctionsubtype: "dutch";
  currentbid?: number;
  bidincrementtype?: "fixed" | "percentage";
  minimumincrement?: number;
  startprice?: number;
  scheduledstart?: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  bidders?: number;
  watchers?: number;
  productimages?: string[];
  productvideos?: string[]; // Added for video support
  productdocuments?: string[];
  productdescription?: string;
  specifications?: string;
  buyNowPrice?: number;
  participants?: string[];
  bidcount?: number;
  createdby?: string;
  timeLeft?: string;
  questions?: { user: string; question: string; answer?: string; time: string }[];
  issilentauction?: boolean;
  currentbidder?: string;
  percent?: number;
  attributes?: string;
  sku?: string;
  brand?: string;
  model?: string;
  reserveprice?: number;
  ended?: boolean;
  editable?: boolean;
}

interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

export default function DutchAuctionDetailPage() {
  const params = useParams<{ id: string }>();
  const auctionId = params.id;

  const [bidAmount, setBidAmount] = useState("");
  const [watchlisted, setWatchlisted] = useState(false);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidHistory, setBidHistory] = useState<{ bidder: string; amount: number; time: string }[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("N/A");
  const [isFloor, setIsFloor] = useState(false);
  const [priceUpdateInterval, setPriceUpdateInterval] = useState<NodeJS.Timeout | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerInput, setAnswerInput] = useState<{ index: number; value: string } | null>(null);

  const { isAuthenticated, user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const savedPrice = localStorage.getItem(`dutchAuction_${auctionId}_currentPrice`);
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/auctions/dutch/${auctionId}`);
        const json = await res.json();
        console.log("Auction API Response (Raw):", json);
        if (!json.success) throw new Error(json.error || "Failed to fetch auction");
        if (json.data.auctionsubtype !== "dutch") throw new Error("This is not a Dutch auction");
        const participants = Array.isArray(json.data.participants) ? json.data.participants : [];
        const updatedAuction = { ...json.data, participants, ended: json.data.ended || false };
        // console.log("Processed Auction Data:", updatedAuction);
        setAuction(updatedAuction);
        const initialPrice = savedPrice
          ? parseFloat(savedPrice)
          : updatedAuction.ended
          ? updatedAuction.currentbid || updatedAuction.startprice || 0
          : updatedAuction.startprice || 0;
        setCurrentPrice(initialPrice);

        // Check if initialPrice is at floor price
        const increment = updatedAuction.bidincrementtype === "fixed" && updatedAuction.minimumincrement
          ? updatedAuction.minimumincrement
          : updatedAuction.bidincrementtype === "percentage" && updatedAuction.percent
          ? (updatedAuction.startprice || 0) * (updatedAuction.percent / 100)
          : 0;
        const floorPrice = increment > 0 ? increment : 1; // Floor price is the minimum increment or 1
        if (initialPrice <= floorPrice && !updatedAuction.ended) {
          setIsFloor(true);
        }

        const bidRes = await fetch(`/api/bids/${auctionId}`);
        const bidJson = await bidRes.json();
        console.log("Bid API Response (Raw):", bidJson);
        if (bidJson.success) {
          const bids = bidJson.data || [];
          console.log("Fetched Bids (Raw):", bids);
          const historyPromises = bids.map(async (bid: Bid) => {
            const profileRes = await fetch(`/api/profiles/${bid.user_id}`);
            const profileJson = await profileRes.json();
            console.log("Profile API Response for user_id", bid.user_id, " (Raw):", profileJson);
            const bidderName = profileJson.success
              ? `${profileJson.data.fname || ""} ${profileJson.data.lname || ""}`.trim() || profileJson.data.email || bid.user_id
              : `User ${bid.user_id} (Profile not found)`;
            return {
              bidder: bidderName,
              amount: bid.amount,
              time: new Date(bid.created_at).toLocaleString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" }),
            };
          });
          const history = await Promise.all(historyPromises);
          console.log("Processed Bid History (Raw):", history);
          setBidHistory(history);
        } else {
          console.log("No bid data available from API:", bidJson);
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
    const handleBeforeUnload = () => {
      if (currentPrice) {
        localStorage.setItem(`dutchAuction_${auctionId}_currentPrice`, currentPrice.toString());
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentPrice, auctionId]);
  useEffect(() => {
    if (!auction || !auction.scheduledstart || auction.ended || !auction.startprice) return;
    const start = DateTime.fromISO(auction.scheduledstart, { zone: "utc" }).setZone("Asia/Kolkata");
    const now = DateTime.now().setZone("Asia/Kolkata");
    const duration = auction.auctionduration
      ? ((d) => ((d.days || 0) * 24 * 60 * 60) + ((d.hours || 0) * 60 * 60) + ((d.minutes || 0) * 60))(
          auction.auctionduration
        )
      : 0;
    const end = start.plus({ seconds: duration });
    console.log("Start:", start.toISO(), "End:", end.toISO(), "Now:", now.toISO(), "Duration:", duration);

    // Set initial timeLeft and currentPrice
    setTimeLeft(calculateTimeLeft(end.toJSDate()));
    const minutesPassed = Math.floor(now.diff(start, "minutes").minutes);
    const increment = auction.bidincrementtype === "fixed" && auction.minimumincrement
      ? auction.minimumincrement
      : auction.bidincrementtype === "percentage" && auction.percent
      ? (auction.startprice || 0) * (auction.percent / 100)
      : 0;
    let initialPrice = auction.startprice || 0;
    if (now >= start && !auction.ended) {
      initialPrice = Math.max(auction.startprice - (minutesPassed * increment), increment > 0 ? increment : 1);
    }
    setCurrentPrice(initialPrice);

    if (now >= start && now <= end && !auction.ended) {
      const interval = setInterval(() => {
        const nowIST = DateTime.now().setZone("Asia/Kolkata");
        const minutesPassed = Math.floor(nowIST.diff(start, "minutes").minutes);
        let newPrice = auction.startprice || 0;
        const increment = auction.bidincrementtype === "fixed" && auction.minimumincrement
          ? auction.minimumincrement
          : auction.bidincrementtype === "percentage" && auction.percent
          ? (auction.startprice || 0) * (auction.percent / 100)
          : 0;
        newPrice = Math.max(auction.startprice - (minutesPassed * increment), increment > 0 ? increment : 1);

        setCurrentPrice(newPrice);
        setTimeLeft(calculateTimeLeft(end.toJSDate()));
        console.log("Updated Time Left:", calculateTimeLeft(end.toJSDate()), "Updated Price:", newPrice);
        if (newPrice <= (increment > 0 ? increment : 1) && !auction.ended) {
          setIsFloor(true);
        }

        // Check if auction has ended (price at floor or time exceeded)
        const isAuctionEnded = newPrice <= (increment > 0 ? increment : 1) || nowIST > end;
        if (isAuctionEnded && !auction.ended) {
          const markAuctionEnded = async () => {
            try {
              const formData = new FormData();
              formData.append("action", "markEnded");
              const res = await fetch(`/api/auctions/dutch/${auction.id}`, {
                method: "PUT",
                body: formData,
              });
              const json = await res.json();
              if (json.success) {
                console.log("Auction marked as ended in response:", auction.id);
                setAuction((prev) => prev ? { ...prev, ended: true } : prev); // Update local state
              } else {
                console.error("Failed to mark auction as ended:", json.error);
              }
            } catch (err) {
              console.error("Error marking auction as ended:", err);
            }
          };
          markAuctionEnded();
        }
      }, 60 * 1000);

      setPriceUpdateInterval(interval);
      return () => clearInterval(interval);
    } else if (now > end || auction.ended) {
      handleAuctionEnd();
    }
  }, [auction, auction?.ended, auction?.scheduledstart, auction?.auctionduration, auction?.minimumincrement, auction?.percent, auction?.startprice]);

  const handleAuctionEnd = async () => {
    if (auction && !auction.ended) {
      const res = await fetch(`/api/auctions/dutch/${auctionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ended: true }),
      });
      const json = await res.json();
      if (json.success) {
        setAuction((prev) => (prev ? { ...prev, ended: true } : null));
      }
    }
    if (priceUpdateInterval) clearInterval(priceUpdateInterval);
  };

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

    if (auction?.ended) {
      alert("This auction has already ended.");
      return;
    }

    const amount = Number(bidAmount);
    console.log("Current Price before bid:", currentPrice, "Bid Amount:", amount);

    if (!currentPrice || amount !== currentPrice) {
      alert(`Bid must match the current price of $${currentPrice?.toLocaleString() || "N/A"}`);
      return;
    }

    try {
      console.log("Placing bid:", { auctionId, userId: user.id, amount, currentPrice });
      const formData = new FormData();
      formData.append("action", "bid");
      formData.append("user_id", user.id);
      formData.append("user_email", user.email);
      formData.append("amount", amount.toString());
      formData.append("created_at", new Date().toISOString());
      formData.append("currentprice", currentPrice.toString());

      const bidRes = await fetch(`/api/auctions/dutch/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const bidJson = await bidRes.json();
      if (!bidJson.success) throw new Error(bidJson.error || "Failed to record bid");

      const auctionRes = await fetch(`/api/auctions/dutch/${auctionId}`);
      const auctionJson = await auctionRes.json();
      if (!auctionJson.success) throw new Error(auctionJson.error || "Failed to fetch updated auction");

      const start = DateTime.fromISO(auction.scheduledstart, { zone: "utc" }).setZone("Asia/Kolkata");
      const duration = auctionJson.data.auctionduration
        ? ((d) =>
            ((d.days || 0) * 24 * 60 * 60) +
            ((d.hours || 0) * 60 * 60) +
            ((d.minutes || 0) * 60))(auctionJson.data.auctionduration)
        : 0;
      const end = start.plus({ seconds: duration });
      const timeLeft = calculateTimeLeft(end.toJSDate());

      setAuction({ ...auctionJson.data, timeLeft });
      setCurrentPrice(amount);

      handleAuctionEnd();

      const bidResUpdated = await fetch(`/api/bids/${auctionId}`);
      const bidJsonUpdated = await bidResUpdated.json();
      if (bidJsonUpdated.success) {
        const bids = bidJsonUpdated.data || [];
        console.log("Fetched Updated Bids (Raw):", bids);
        const historyPromises = bids.map(async (bid: Bid) => {
          const profileRes = await fetch(`/api/profiles/${bid.user_id}`);
          const profileJson = await profileRes.json();
          console.log("Profile API Response for user_id", bid.user_id, " (Raw):", profileJson);
          const bidderName = profileJson.success
            ? `${profileJson.data.fname || ""} ${profileJson.data.lname || ""}`.trim() ||
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
        console.log("Processed Updated Bid History (Raw):", history);
        setBidHistory(history);
      }

      setBidAmount("");
      alert(`Bid of $${amount.toLocaleString()} placed successfully! Auction ended.`);
    } catch (err) {
      console.error("Bid placement error:", err);
      alert(err instanceof Error ? err.message : "An error occurred while setting bid");
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (!user?.role || (user.role !== "buyer" && user.role !== "both")) {
      alert("Only buyers can purchase items. Please update your account type.");
      return;
    }

    console.log("Buy now clicked");
    alert(`Item purchased for $${auction?.buyNowPrice?.toLocaleString() || "N/A"}!`);
  };

  const handleWatchlist = () => {
    setWatchlisted(!watchlisted);
    console.log("Watchlist toggled:", !watchlisted);
  };

  const getMinimumBid = () => {
    return currentPrice || auction?.startprice || 0;
  };

  const handlePrevImage = () => {
    const totalMedia = (auction?.productimages?.length || 0) + (auction?.productvideos?.length || 0);
    setCurrentImageIndex((prev) => (prev === 0 ? totalMedia - 1 : prev - 1));
  };

  const handleNextImage = () => {
    const totalMedia = (auction?.productimages?.length || 0) + (auction?.productvideos?.length || 0);
    setCurrentImageIndex((prev) => (prev === totalMedia - 1 ? 0 : prev + 1));
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

      const res = await fetch(`/api/auctions/dutch/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to submit question");

      const updatedAuction: Auction = {
        ...auction!,
        questions: json.data.questions,
      };

      setAuction(updatedAuction);
      setNewQuestion("");
      alert("Question submitted successfully!");
    } catch (err) {
      console.error("Question submission error:", err);
      alert(err instanceof Error ? err.message : "An error occurred while submitting question");
    }
  };

  const handleSubmitAnswer = async (index: number) => {
    if (!isAuthenticated || (user?.email !== auction?.createdby && auction?.createdby !== null)) {
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

      const res = await fetch(`/api/auctions/dutch/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to submit answer");

      const updatedAuction: Auction = {
        ...auction!,
        questions: json.data.questions,
      };

      setAuction(updatedAuction);
      setAnswerInput(null);
      alert("Answer submitted successfully!");
    } catch (err) {
      console.error("Answer submission error:", err);
      alert(err instanceof Error ? err.message : "An error occurred while submitting answer");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!auction) return <div className="text-center py-20">Auction not found</div>;

  const now = DateTime.now().setZone("Asia/Kolkata");
  const start = DateTime.fromISO(auction.scheduledstart, { zone: "utc" }).setZone("Asia/Kolkata");
  const duration = auction.auctionduration
    ? ((d) => ((d.days || 0) * 24 * 60 * 60) + ((d.hours || 0) * 60 * 60) + ((d.minutes || 0) * 60))(
        auction.auctionduration
      )
    : 0;
  const end = start.plus({ seconds: duration });
  const isAuctionNotStarted = now < start;
  const isAuctionEndedByTime = now > end;

  if (isAuctionNotStarted || isAuctionEndedByTime) {
    handleAuctionEnd();
  }

  const isButtonDisabled =
    !bidAmount ||
    isNaN(Number(bidAmount)) ||
    !auction ||
    auction.ended ||
    Number(bidAmount) !== getMinimumBid() ||
    user?.email === auction?.createdby ||
    isAuctionNotStarted ||
    isAuctionEndedByTime;

  // Total media count for navigation
  const totalMedia = (auction?.productimages?.length || 0) + (auction?.productvideos?.length || 0);
  const currentMediaIndex = currentImageIndex % totalMedia;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="hover-lift transition-smooth">
              <CardContent className="p-0 relative">
                {currentMediaIndex < (auction?.productimages?.length || 0) ? (
                  <Image
                    src={auction.productimages?.[currentMediaIndex] || "/placeholder.svg"}
                    alt={auction.productname || auction.title || "Auction Item"}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg transition-smooth hover:scale-105"
                  />
                ) : (
                  <video
                    src={auction.productvideos?.[currentMediaIndex - (auction?.productimages?.length || 0)]}
                    controls
                    className="w-full h-96 object-cover rounded-t-lg transition-smooth"
                    autoPlay
                    muted
                  />
                )}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {`${currentMediaIndex + 1}/${totalMedia}`}
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
                    {auction.productimages?.map((image: string, index: number) => (
                      <Image
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${auction.productname || auction.title} ${index + 1}`}
                        width={100}
                        height={80}
                        className="w-20 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-smooth hover-lift"
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                    {auction.productvideos?.map((video: string, index: number) => (
                      <div
                        key={index + (auction?.productimages?.length || 0)}
                        className="w-20 h-16 rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-smooth hover-lift"
                        onClick={() => setCurrentImageIndex(index + (auction?.productimages?.length || 0))}
                      >
                        <video
                          src={video}
                          className="w-full h-full object-cover rounded"
                          muted
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{auction.categoryid || "Uncategorized"}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        Dutch Auction
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{auction.productname || auction.title || "Untitled Auction"}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWatchlist}
                      className={watchlisted ? "text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 ${watchlisted ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specs</TabsTrigger>
                    <TabsTrigger value="bids">Bid History</TabsTrigger>
                    <TabsTrigger value="qa">Q&A</TabsTrigger>
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-line">
                        {auction.productdescription || "No description available"}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="mt-6">
                    <div className="space-y-4">
                      {auction.attributes || auction.specifications || auction.sku || auction.brand || auction.model || auction.reserveprice ? (
                        <>
                          {auction.sku && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">SKU</span>
                              <span className="text-gray-600 dark:text-gray-300">{auction.sku}</span>
                            </div>
                          )}
                          {auction.brand && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">Brand</span>
                              <span className="text-gray-600 dark:text-gray-300">{auction.brand}</span>
                            </div>
                          )}
                          {auction.model && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">Model</span>
                              <span className="text-gray-600 dark:text-gray-300">{auction.model}</span>
                            </div>
                          )}
                          {auction.reserveprice && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">Reserve Price</span>
                              <span className="text-gray-600 dark:text-gray-300">${auction.reserveprice.toLocaleString()}</span>
                            </div>
                          )}
                          {auction.attributes && (
                            <div className="flex flex-col py-2 border-b">
                              <span className="font-medium">Attributes</span>
                              {renderKeyValueBlock(auction.attributes, "No attributes data")}
                            </div>
                          )}
                          {auction.specifications && (
                            <div className="flex flex-col py-2 border-b">
                              <span className="font-medium">Specifications</span>
                              {renderKeyValueBlock(auction.specifications, "No specifications data")}
                            </div>
                          )}
                        </>
                      ) : (
                        <p>No specifications available</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="bids" className="mt-6">
                    <div className="space-y-3">
                      {bidHistory.length > 0 ? (
                        bidHistory.map((bid, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded"
                          >
                            <div>
                              <span className="font-medium">{bid.bidder}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                                {bid.time}
                              </span>
                            </div>
                            <span className="font-semibold text-green-600">${bid.amount.toLocaleString()}</span>
                          </div>
                        ))
                      ) : (
                        <p>No bid history available</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="qa" className="mt-6">
                    <div className="space-y-6">
                      {auction.questions?.length ? (
                        auction.questions.map((qa, index) => (
                          <div key={index} className="border-b pb-4">
                            <div className="mb-2">
                              <span className="font-medium">{qa.user}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                                {new Date(qa.time).toLocaleString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <div className="mb-2">
                              <MessageSquare className="h-4 w-4 inline mr-2" />
                              <span>{qa.question}</span>
                            </div>
                            {qa.answer ? (
                              <div className="ml-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <CheckCircle className="h-4 w-4 inline mr-2 text-green-600" />
                                <span>{qa.answer}</span>
                              </div>
                            ) : user?.email === auction?.createdby && !auction.ended ? (
                              <div>
                                <Textarea
                                  placeholder="Type your answer here..."
                                  value={answerInput?.index === index ? answerInput.value : ""}
                                  onChange={(e) => setAnswerInput({ index, value: e.target.value })}
                                  className="mt-2"
                                />
                                <Button
                                  onClick={() => handleSubmitAnswer(index)}
                                  className="mt-2"
                                  disabled={!answerInput?.value.trim()}
                                >
                                  Submit Answer
                                </Button>
                              </div>
                            ) : null}
                          </div>
                        ))
                      ) : (
                        <p>No questions available</p>
                      )}

                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Ask a Question</h4>
                        <Textarea
                          placeholder="Type your question here..."
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          className="mb-3"
                          disabled={isAuctionNotStarted || isAuctionEndedByTime || auction?.ended}
                        />
                        <Button
                          onClick={handleSubmitQuestion}
                          disabled={!newQuestion.trim() || isAuctionNotStarted || isAuctionEndedByTime || auction?.ended}
                        >
                          Submit Question
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documentation" className="mt-6">
                    {auction.productdocuments && auction.productdocuments.length > 0 ? (
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

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 animate-bounce-gentle" />
                  Place Your Bid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1 animate-pulse-gow">
                    {auction?.ended && auction.currentbid
                      ? `$${auction.currentbid.toLocaleString()}`
                      : `$${currentPrice?.toLocaleString() || "N/A"}`}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {auction?.ended ? "Sold at" : "Current Price"}
                  </div>
                  {bidHistory.length > 0 && bidHistory[bidHistory.length - 1].bidder && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Last Bid By: {bidHistory[bidHistory.length - 1].bidder}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1 hover-lift">
                    <Clock className="h-4 w-4 text-red-600 animate-bounce-gentle" />
                    <span className="font-semibold text-red-600">{timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-1 hover-lift">
                    <Users className="h-4 w-4" />
                    <span>{bidHistory.length || 0} bidders</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Your Bid Amount</label>
                    <Input
                      type="number"
                      placeholder={`Current: $${getMinimumBid().toLocaleString()}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="mt-1 transition-smooth"
                      disabled={isAuctionNotStarted || isAuctionEndedByTime || auction?.ended}
                    />
                  </div>
                  <div style={{ width: "100%", display: "block", position: "relative", zIndex: 1, pointerEvents: "auto" }}>
                    <Button
                      className="w-full transition-smooth hover-lift transform-3d"
                      onClick={handlePlaceBid}
                      disabled={isButtonDisabled}
                      style={{ display: "block", width: "100%", padding: "0.5rem", boxSizing: "border-box", position: "relative", zIndex: 1, pointerEvents: "auto" }}
                    >
                      Place Bid
                    </Button>
                    {(isAuctionNotStarted || isAuctionEndedByTime || auction?.ended) && (
                      <p className="text-sm text-red-600 mt-2">
                        {isAuctionNotStarted
                          ? "Auction has not started yet"
                          : isAuctionEndedByTime
                          ? "Auction has ended"
                          : auction?.ended
                          ? "Auction ended"
                          : ""}
                      </p>
                    )}
                  </div>
                  {auction.buyNowPrice && (
                    <>
                      <div className="text-center text-sm text-gray-600 dark:text-gray-300">or</div>
                      <Button
                        variant="outline"
                        className="w-full transition-smooth hover-lift"
                        onClick={handleBuyNow}
                        disabled={isAuctionNotStarted || isAuctionEndedByTime || auction?.ended}
                      >
                        Buy Now - ${auction.buyNowPrice.toLocaleString()}
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    {isFloor ? "Floor price reached, no further deductions" : (
                      <>
                        Price decreases every 1 minute by $
                        {auction.bidincrementtype === "percentage" && auction.percent
                          ? ((auction.startprice || 0) * (auction.percent / 100)).toFixed(2)
                          : (auction.minimumincrement || 0).toFixed(2)}
                        {auction.bidincrementtype === "percentage" ? ` (${auction.percent}%)` : " (fixed)"}
                      </>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt={auction.createdby || "Seller"}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{auction.createdby || "Unknown Seller"}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">0</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Completed Projects</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Watchers</span>
                    <span className="font-medium">{auction.watchers || 0}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Starting Price</span>
                  <span className="font-medium">${auction.startprice?.toLocaleString() || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{auction?.ended ? "Sold at" : "Current Price"}</span>
                  <span className="font-medium text-green-600">
                    {auction?.ended && auction.currentbid
                      ? `$${auction.currentbid.toLocaleString()}`
                      : `$${currentPrice?.toLocaleString() || "N/A"}`}
                  </span>
                </div>
                {auction.buyNowPrice && (
                  <div className="flex justify-between">
                    <span>Buy Now Price</span>
                    <span className="font-medium">${auction.buyNowPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Total Bids</span>
                  <span className="font-medium">{bidHistory.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Remaining</span>
                  <span className="font-medium text-red-600">{timeLeft}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        title="Sign in to place your bid"
        description="Join the auction and start bidding on this exclusive item"
        onSuccess={() => {
          console.log("User logged in successfully");
        }}
      />
    </div>
  );
}
