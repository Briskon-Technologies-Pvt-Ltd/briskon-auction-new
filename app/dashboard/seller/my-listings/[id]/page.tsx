"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Users,
  Gavel,
  TrendingUp,
  Heart,
  Share2,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DateTime } from "luxon";

// Calculate time left function
const calculateTimeLeft = (targetDateIST: DateTime, nowIST: DateTime): string => {
  const diff = Math.max(0, targetDateIST.toMillis() - nowIST.toMillis());
  if (diff <= 0) return "Auction ended";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
};

function renderKeyValueBlock(
  data: string | Record<string, any> | undefined,
  fallback: string
): React.ReactNode {
  try {
    const parsed: any[] = typeof data === "string" ? JSON.parse(data) : data ?? [];
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

interface Auction {
  id: string;
  productname?: string;
  title?: string;
  categoryid?: string;
  auctiontype: "forward" | "reverse";
  currentbid?: number;
  startamount?: number;
  targetprice?: number;
  createdby?: string;
  scheduledstart?: string | null;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  bidders?: number;
  watchers?: number;
  productimages?: string[];
  productdocuments?: string[];
  productdescription?: string;
  specifications?: string;
  buyNowPrice?: number;
  bidcount?: number;
  questions?: { user: string; question: string; answer: string | null; question_time: string | null; answer_time: string | null }[];
  attributes?: string;
  sku?: string;
  brand?: string;
  model?: string;
  reserveprice?: number;
  ended?: boolean;
  bidHistory?: { bidder: string; amount: number; time: string; productimages?: string[]; productdocuments?: string[] }[];
  minimumincrementtype?: "fixed" | "percentage";
  minimumincrement?: number;
  participants?: string[];
}

export default function ListingDetails() {
  const { user, isLoading } = useAuth();
  const { id } = useParams(); // Get the dynamic id from the URL
  const [auction, setAuction] = useState<Auction | null>(null);
  const [isLoadingAuction, setIsLoadingAuction] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState<{ index: number; value: string } | null>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      setIsLoadingAuction(true);
      try {
        const response = await fetch(`/api/seller/my-listings/${id}?email=${encodeURIComponent(user?.email || "")}`);
        if (!response.ok) throw new Error("Failed to fetch listing details");
        const data = await response.json();
        if (!data.success) throw new Error(data.error || "Failed to load listing details");
        setAuction(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoadingAuction(false);
      }
    };

    if (user && id) {
      fetchAuction();
    }
  }, [user, id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (auction && !auction.ended) {
      interval = setInterval(() => {
        const nowIST = DateTime.now().setZone("Asia/Kolkata");
        const startIST = DateTime.fromISO(auction.scheduledstart ?? "", { zone: "utc" }).setZone("Asia/Kolkata");
        const durationSeconds = auction.auctionduration
          ? ((d) => ((d.days ?? 0) * 24 * 60 * 60) + ((d.hours ?? 0) * 60 * 60) + ((d.minutes ?? 0) * 60))(auction.auctionduration)
          : 0;
        const endIST = startIST.plus({ seconds: durationSeconds });
        setTimeLeft(calculateTimeLeft(endIST, nowIST));
      }, 1000);
    } else {
      setTimeLeft("Auction ended");
    }
    return () => clearInterval(interval);
  }, [auction]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (auction?.productimages?.length ?? 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (auction?.productimages?.length ?? 1) - 1 ? 0 : prev + 1
    );
  };

  const handleSubmitAnswer = async (index: number) => {
    if (!auction || !user?.email || !answerInput?.value.trim()) return;

    try {
      const response = await fetch(`/api/seller/my-listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "answerQuestion", user_email: user.email, questionIndex: index, answer: answerInput.value }),
      });

      if (!response.ok) throw new Error("Failed to update answer");
      const data = await response.json();
      if (data.success) {
        setAuction((prev) => prev ? { ...prev, questions: data.data.questions } : null);
        setAnswerInput(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while saving the answer");
    }
  };

  const [timeLeft, setTimeLeft] = useState<string>("Loading...");

  if (isLoading || isLoadingAuction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading listing details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Not logged in. Please log in to view listing details.</p>
      </div>
    );
  }

  if (user.role !== "seller" && user.role !== "both") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access Denied. This page is for sellers.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Listing not found.</p>
      </div>
    );
  }

  const currentMedia = auction?.productimages?.[currentImageIndex] || "/placeholder.svg";
  const isVideo = currentMedia.toLowerCase().endsWith(".mp4") || currentMedia.toLowerCase().endsWith(".webm") || currentMedia.toLowerCase().endsWith(".mov");

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
                    alt={auction.productname || auction.title || "Listing Item"}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg transition-smooth hover:scale-105"
                  />
                )}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {`${currentImageIndex + 1}/${auction.productimages?.length ?? 1}`}
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
                    {auction.productimages?.map((media: string, index: number) => {
                      const isVideoThumbnail = media.toLowerCase().endsWith(".mp4") || media.toLowerCase().endsWith(".webm") || media.toLowerCase().endsWith(".mov");
                      return (
                        <div key={index} className="relative">
                          {isVideoThumbnail ? (
                            <video
                              src={media}
                              className="w-20 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-smooth hover-lift"
                              onClick={() => setCurrentImageIndex(index)}
                              muted
                              playsInline
                            />
                          ) : (
                            <Image
                              src={media || "/placeholder.svg"}
                              alt={`${auction.productname || auction.title} ${index + 1}`}
                              width={100}
                              height={80}
                              className="w-20 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-smooth hover-lift"
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          )}
                        </div>
                      );
                    })}
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
                        <TrendingUp className="h-3 w-3" />
                        {auction.auctiontype === "forward" ? "Forward Auction" : "Reverse Auction"}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{auction.productname || auction.title || "Untitled Listing"}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specs</TabsTrigger>
                    <TabsTrigger value="bids">Bid History</TabsTrigger>
                    <TabsTrigger value="qa">Q&A</TabsTrigger>
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
                              <span className="text-gray-600 dark:text-gray-300">${(auction.reserveprice ?? 0).toLocaleString()}</span>
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
                      {auction.bidHistory?.length ? (
                        auction.bidHistory.map((bid, index) => (
                          <div
                            key={index}
                            className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-medium">{bid.bidder}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                                  {bid.time}
                                </span>
                              </div>
                              <span className="font-semibold text-green-600">${bid.amount.toLocaleString()}</span>
                            </div>
                            {auction.auctiontype === "reverse" && (bid.productimages || bid.productdocuments) && (
                              <div className="mt-2 space-y-2">
                                {bid.productimages && bid.productimages.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-sm">Images:</h4>
                                    <div className="flex gap-2">
                                      {bid.productimages.map((image, imgIndex) => (
                                        <Image
                                          key={imgIndex}
                                          src={image || "/placeholder.svg"}
                                          alt={`${auction.productname} Image ${imgIndex + 1}`}
                                          width={100}
                                          height={80}
                                          className="w-20 h-16 object-cover rounded"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {bid.productdocuments && bid.productdocuments.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-sm">Documents:</h4>
                                    <div className="space-y-2">
                                      {bid.productdocuments.map((docUrl, docIndex) => (
                                        <a
                                          key={docIndex}
                                          href={docUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block text-blue-500 hover:underline text-sm"
                                        >
                                          Document {docIndex + 1}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
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
                                {DateTime.fromISO(qa.question_time ?? "").setZone("Asia/Kolkata").toLocaleString({
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
                            {qa.answer ? (
                              <div className="ml-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <span>{qa.answer}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                                  {DateTime.fromISO(qa.answer_time ?? "").setZone("Asia/Kolkata").toLocaleString({
                                    hour12: true,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            ) : user?.email === auction?.createdby ? (
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
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {auction.auctiontype === "reverse" ? (
                  <div className="flex justify-between">
                    <span>Target Price</span>
                    <span className="font-medium">${(auction.targetprice ?? 0).toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Start Amount</span>
                    <span className="font-medium">${(auction.startamount ?? 0).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Current Bid</span>
                  <span className="font-medium text-green-600">${(auction.currentbid ?? 0).toLocaleString()}</span>
                </div>
                {auction.buyNowPrice && (
                  <div className="flex justify-between">
                    <span>Buy Now Price</span>
                    <span className="font-medium">${auction.buyNowPrice.toLocaleString()}</span>
                  </div>
                )}
                {auction.minimumincrementtype && auction.minimumincrement && (
                  <div className="flex justify-between">
                    <span>Min Increment ({auction.minimumincrementtype})</span>
                    <span className="font-medium">${auction.minimumincrement.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Total Bids</span>
                  <span className="font-medium">{auction.bidcount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Remaining</span>
                  <span className="font-medium text-red-600">{timeLeft}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Listing Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Bidders</span>
                    <span className="font-medium">{auction.participants?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><Gavel className="h-4 w-4" /> Bids</span>
                    <span className="font-medium">{auction.bidcount || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="outline" asChild>
            <Link href="/dashboard/seller/my-listings">Back to My Listings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
