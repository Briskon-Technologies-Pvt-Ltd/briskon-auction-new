"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CheckCircle,
  Star,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { DateTime } from "luxon";

// Updated calculateTimeLeft function (unchanged, for reference)
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

interface Auction {
  id: string;
  productname?: string;
  title?: string;
  categoryid?: string;
  auctiontype: "forward" | "reverse";
  currentbid?: number;
  bidincrementtype?: "fixed" | "percentage";
  minimumincrement?: number;
  startprice?: number;
  targetprice?: number;
  scheduledstart?: string | null;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  bidders?: number;
  watchers?: number;
  productimages?: string[];
  productdocuments?: string[];
  productdescription?: string;
  specifications?: string;
  buyNowPrice?: number;
  participants?: string[];
  bidcount?: number;
  createdby?: string;
  questions?: { user: string; question: string; answer: string | null; question_time: string | null; answer_time: string | null }[];
  question_count?: number;
  issilentauction?: boolean;
  currentbidder?: string;
  percent?: number;
  attributes?: string;
  sku?: string;
  brand?: string;
  model?: string;
  reserveprice?: number;
  auctionsubtype?: string;
  ended?: boolean;
  editable?: boolean;
  bidHistory?: { bidder: string; amount: number; time: string; productimages?: string[]; productdocuments?: string[] }[];
}

export default function WonAuctionDetailPage() {
  const params = useParams<{ id: string }>();
  const auctionId = params.id;

  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerInput, setAnswerInput] = useState<{ index: number; value: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("Auction ended");

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchWonAuctionDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/buyer/won-auctions/${auctionId}?email=${encodeURIComponent(user?.email || "")}`);
        if (!response.ok) throw new Error("Failed to fetch won auction");
        const data = await response.json();
        if (!data.success) throw new Error(data.error || "Failed to fetch auction details");
        setAuction(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchWonAuctionDetails();
    }
  }, [auctionId, user?.email]);

  // Time left is static since the auction is ended
  useEffect(() => {
    setTimeLeft("Auction ended");
  }, []);

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

  const handleSubmitQuestion = async () => {
    if (!isAuthenticated) {
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

      const res = await fetch(`/api/auctions/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to submit question");
      setAuction((prev) => (prev ? { ...prev, questions: json.data.questions, question_count: json.data.question_count } : prev));
      setNewQuestion("");
      alert("Question submitted successfully!");
    } catch (err) {
      console.error("Question submission error:", err);
      alert(err instanceof Error ? err.message : "An error occurred");
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

      const res = await fetch(`/api/auctions/${auctionId}`, {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to submit answer");
      setAuction((prev) => (prev ? { ...prev, questions: json.data.questions } : prev));
      setAnswerInput(null);
      alert("Answer submitted successfully!");
    } catch (err) {
      console.error("Answer submission error:", err);
      alert(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!auction) return <div className="text-center py-20">Auction not found</div>;

  const nowIST = DateTime.now().setZone("Asia/Kolkata");
  const startIST = DateTime.fromISO(auction.scheduledstart ?? "", { zone: "utc" }).setZone("Asia/Kolkata");
  const duration = auction.auctionduration
    ? ((d) => ((d.days ?? 0) * 24 * 60 * 60) + ((d.hours ?? 0) * 60 * 60) + ((d.minutes ?? 0) * 60))(auction.auctionduration)
    : 0;
  const endIST = startIST.plus({ seconds: duration });
  const isAuctionEnded = endIST < nowIST;

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
                    alt={auction.productname || auction.title || "Auction Item"}
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
                      {user?.email === auction.currentbidder && (
                        <Badge variant="default" className="bg-green-600 text-white">
                          <CheckCircle className="h-3 w-3" /> You Won!
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl">{auction.productname || auction.title || "Untitled Auction"}</CardTitle>
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
                                <CheckCircle className="h-4 w-4 inline mr-2 text-green-600" />
                                <span>{qa.answer}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                                  {DateTime.fromISO(qa.answer_time ?? "").setZone("Asia/Kolkata").toLocaleString({
                                    hour12: true,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            ) : user?.email === auction?.createdby && !isAuctionEnded ? (
                              <div>
                                <Textarea
                                  placeholder="Type your answer here..."
                                  value={answerInput?.index === index ? answerInput.value : ""}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswerInput({ index, value: e.target.value })}
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
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewQuestion(e.target.value)}
                          className="mb-3"
                          disabled={true}
                        />
                        <Button
                          onClick={handleSubmitQuestion}
                          disabled={true}
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

                <Button variant="outline" className="w-full mt-4" disabled>
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>

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
                    <span>Starting Bid</span>
                    <span className="font-medium">${(auction.startprice ?? 0).toLocaleString()}</span>
                  </div>
                )}
                {auction.auctiontype === "reverse" ? (
                  <div className="flex justify-between">
                    <span>Lowest Winning Bid</span>
                    <span className="font-medium text-green-600">${(auction.currentbid ?? 0).toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Winning Bid</span>
                    <span className="font-medium text-green-600">${(auction.currentbid ?? 0).toLocaleString()}</span>
                  </div>
                )}
                {auction.buyNowPrice && (
                  <div className="flex justify-between">
                    <span>Buy Now Price</span>
                    <span className="font-medium">${auction.buyNowPrice.toLocaleString()}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
