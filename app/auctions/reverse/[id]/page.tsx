"use client";

import { useState, useEffect, useCallback } from "react";
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
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Star,
  MessageSquare,
  Package,
  FileText,
  Info,
  Timer,
  CircleStop,
  Tag,
  Hourglass,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { LoginPrompt } from "@/components/login-prompt";
import { createClient } from "@supabase/supabase-js";
import LiveTimer from "@/app/livetimer/page";
import { useRouter } from "next/navigation";
// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export type UploadedFile = {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  file: File;
};

interface Auction {
  id: string;
  productname?: string;
  title?: string;
  categoryid?: string;
  auctiontype: "forward" | "reverse";
  currentbid?: number;
  bidder_count?: number;
  bidincrementtype?: "fixed" | "percentage";
  minimumincrement?: number;
  startprice?: number;
  targetprice?: number;
  scheduledstart?: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  bidders?: number;
  watchers?: number;
  productimages?: string[]; // Changed to string[] to match API response
  productdocuments?: string[]; // Changed to string[] to match API response
  productdescription?: string;
  specifications?: string;
  buyNowPrice?: number;
  participants?: string[];
  bidcount?: number;
  createdby?: string;
  timeLeft?: string;
  questions?: {
    user: string;
    question: string;
    answer?: string;
    time: string;
  }[];
  approved?: boolean;
  issilentauction?: boolean;
  currentbidder?: string;
  percent?: number;
  attributes?: string;
  sku?: string;
  brand?: string;
  model?: string;
  reserveprice?: number;
  auctionsubtype?: string;
  requireddocuments?: string;
}

interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

interface UploadedDocument {
  name: string;
  files: UploadedFile[] | null;
}
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
const DragDropUpload = ({
  onDocumentUpload,
  onImageUpload,
  setUploadedImages,
  requiredDocuments,
  uploadedDocuments,
  uploadedImages,
}: {
  onDocumentUpload: (index: number, files: UploadedFile[] | null) => void;
  onImageUpload: (files: UploadedFile[]) => void;
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  requiredDocuments: { name: string }[];
  uploadedDocuments: UploadedDocument[];
  uploadedImages: UploadedFile[];
}) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  const uploadFiles = useCallback(
    async (
      files: File[],
      folder: "public" | "documents" = "public"
    ): Promise<UploadedFile[]> => {
      if (!files.length) return [];

      setUploadState({ isUploading: true, progress: 0, error: null });
      const uploadedFiles: UploadedFile[] = [];

      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setUploadState((prev) => ({
            ...prev,
            progress: Math.round((i / files.length) * 100),
          }));

          const fileName = `${Date.now()}_${file.name}`;
          const filePath = `${folder}/${fileName}`;
          const { data, error } = await supabase.storage
            .from("auctions")
            .upload(filePath, file, { upsert: true });

          if (error)
            throw new Error(`Error uploading ${file.name}: ${error.message}`);

          const { data: urlData } = supabase.storage
            .from("auctions")
            .getPublicUrl(filePath);

          uploadedFiles.push({
            id: data.path,
            name: file.name,
            url: urlData.publicUrl,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            file,
          });
        }

        setUploadState({ isUploading: false, progress: 100, error: null });
        return uploadedFiles;
      } catch (error) {
        console.error("Upload error:", error);
        setUploadState((prev) => ({
          ...prev,
          isUploading: false,
          error:
            error instanceof Error ? error.message : "Unknown upload error",
        }));
        return uploadedFiles;
      }
    },
    []
  );

  const removeFile = useCallback(async (fileId: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from("auctions")
        .remove([fileId]);
      if (error) throw new Error(error.message);
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      setUploadState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Unknown deletion error",
      }));
      return false;
    }
  }, []);

  const handleFileChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    const uploadedFiles = await uploadFiles(files, "documents");
    onDocumentUpload(index, uploadedFiles.length > 0 ? uploadedFiles : null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadedFiles = await uploadFiles(files, "public");
    onImageUpload(uploadedFiles);
  };

  const removeDocumentFile = async (docIndex: number, fileIndex: number) => {
    const fileToRemove = uploadedDocuments[docIndex].files?.[fileIndex];
    if (fileToRemove && (await removeFile(fileToRemove.id))) {
      onDocumentUpload(
        docIndex,
        uploadedDocuments[docIndex].files?.filter((_, i) => i !== fileIndex) ||
          null
      );
    }
  };

  const removeImageFile = async (fileIndex: number) => {
    const fileToRemove = uploadedImages[fileIndex];
    if (fileToRemove && (await removeFile(fileToRemove.id))) {
      setUploadedImages((prev) => prev.filter((_, i) => i !== fileIndex));
    }
  };

  return (
    <div className="space-y-8 p-4">
      <div>
        <h4 className="text-sm font-semibold mb-2">Required Documents</h4>
        {requiredDocuments.map((doc, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {doc.name} <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={(e) => handleFileChange(index, e)}
                className="hidden"
                id={`document-upload-${index}`}
                disabled={uploadState.isUploading}
              />
              <label
                htmlFor={`document-upload-${index}`}
                className="cursor-pointer bg-white text-blue-600 border border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-50 transition-all shadow-md"
              >
                {uploadState.isUploading ? "Uploading..." : "Select Files"}
              </label>
              {uploadedDocuments[index]?.files &&
                uploadedDocuments[index].files.length > 0 && (
                  <div className="ml-4 flex flex-wrap gap-2">
                    {uploadedDocuments[index].files.map((file, fileIndex) => (
                      <div
                        key={fileIndex}
                        className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded"
                      >
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeDocumentFile(index, fileIndex)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              {!uploadedDocuments[index]?.files?.length && (
                <p className="text-sm text-red-600 ml-2">Required</p>
              )}
              {uploadState.error && (
                <p className="text-sm text-red-600 ml-2">{uploadState.error}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* <div>
        <h4 className="text-lg font-semibold mb-2">Upload Images</h4>
        <div className="mt-1">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            disabled={uploadState.isUploading}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-white text-green-600 border border-green-600 rounded-lg px-4 py-2 hover:bg-green-50 transition-all shadow-md"
          >
            {uploadState.isUploading ? "Uploading..." : "Select Images"}
          </label>
          {uploadedImages.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImageFile(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {uploadState.error && (
            <p className="text-sm text-red-600 mt-2">{uploadState.error}</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

// Dummy calculateTimeLeft function
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
    let parsed: any[];
    if (typeof data === "string") {
      parsed = JSON.parse(data);
    } else if (typeof data === "object" && data !== null) {
      parsed = [data];
      console.warn("Data was an object, treated as single entry:", data);
    } else {
      return (
        <span className="text-gray-600 dark:text-gray-300 ml-4">
          {fallback}
        </span>
      );
    }
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
  } catch (e) {
    console.error(
      "Failed to parse data in renderKeyValueBlock:",
      e,
      "Raw value:",
      data
    );
    return (
      <span className="text-gray-600 dark:text-gray-300 ml-4">
        Invalid data
      </span>
    );
  }
}

export default function ReverseAuctionDetailPage() {
  const params = useParams<{ id: string }>();
  const auctionId = params.id;
  const [bidAmount, setBidAmount] = useState("");
  const [watchlisted, setWatchlisted] = useState(false);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidHistory, setBidHistory] = useState<
    { bidder: string; amount: number; time: string }[]
  >([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    UploadedDocument[]
  >([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const isLoggedIn = !!user;
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/auctions/${auctionId}`);
        const json = await res.json();
        console.log("Full API Response:", json);
        if (!json.success)
          throw new Error(json.error || "Failed to fetch auction");
        const participants = Array.isArray(json.data.participants)
          ? json.data.participants
          : [];
        const updatedAuction = { ...json.data, participants };
        console.log(
          "Raw requireddocuments:",
          updatedAuction.requireddocuments,
          "Type:",
          typeof updatedAuction.requireddocuments
        );

        let requiredDocs: { name: string }[] = [];
        if (updatedAuction.requireddocuments) {
          if (typeof updatedAuction.requireddocuments === "string") {
            try {
              requiredDocs = JSON.parse(updatedAuction.requireddocuments) as {
                name: string;
              }[];
            } catch (e) {
              console.error(
                "Failed to parse requireddocuments:",
                e,
                "Raw value:",
                updatedAuction.requireddocuments
              );
              requiredDocs = [];
            }
          } else if (
            typeof updatedAuction.requireddocuments === "object" &&
            updatedAuction.requireddocuments !== null
          ) {
            requiredDocs = updatedAuction.requireddocuments as {
              name: string;
            }[];
            console.warn(
              "requireddocuments was an object, used as-is:",
              updatedAuction.requireddocuments
            );
          }
        }
        setUploadedDocuments(
          requiredDocs.map((doc) => ({ name: doc.name, files: null }))
        );

        // console.log("Processed Auction Data:", updatedAuction);
        setAuction(updatedAuction);

        const bidRes = await fetch(`/api/bids/${auctionId}`);
        const bidJson = await bidRes.json();
        console.log("Bid API Response (Raw):", bidJson);
        if (bidJson.success) {
          const bids = bidJson.data || [];
          console.log("Fetched Bids (Raw):", bids);
          const historyPromises = bids.map(async (bid: Bid) => {
            const profileRes = await fetch(`/api/profiles/${bid.user_id}`);
            const profileJson = await profileRes.json();
            console.log(
              "Profile API Response for user_id",
              bid.user_id,
              " (Raw):",
              profileJson
            );
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

  const handleDocumentUpload = (
    index: number,
    files: UploadedFile[] | null
  ) => {
    setUploadedDocuments((prev) =>
      prev.map((doc, i) =>
        i === index ? { ...doc, files: files || null } : doc
      )
    );
  };

  const handleImageUpload = (files: UploadedFile[]) => {
    setUploadedImages((prev) => [...prev, ...files]);
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

    const amount = Number(bidAmount);
    if (isNaN(amount)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (!auction) {
      alert("Auction data is not available.");
      return;
    }

    const bidCount = auction.bidcount ?? 0;
    const targetPrice = auction.targetprice ?? 0;
    const isSealed = auction.auctionsubtype === "sealed";
    const isReverse = auction.auctiontype === "reverse";
    const incrementType = auction.bidincrementtype ?? "fixed";
    const userId = user?.id ?? "";
    const userEmail = user?.email ?? "";

    // 🔒 Document check
    if (uploadedDocuments.some((doc) => !doc.files || doc.files.length === 0)) {
      alert(
        "Please upload at least one file for all required documents before placing a bid."
      );
      return;
    }

    // 🚫 Sealed auction: reject if user already participated
    if (isSealed && auction.participants?.includes(userId)) {
      alert(
        "You have already submitted a bid for this auction and cannot bid again."
      );
      return;
    }

    // ❌ Reject any bid < target price
    if (amount < targetPrice) {
      alert(`Bid must be at least $${targetPrice.toLocaleString()}.`);
      return;
    }

    const currentBid = auction.currentbid ?? targetPrice;

    // Calculate increment/decrement
    const incrementValue =
      incrementType === "percentage" && auction.minimumincrement
        ? (currentBid * auction.minimumincrement) / 100
        : auction.minimumincrement ?? 0;

    const expectedBid = isReverse
      ? currentBid - incrementValue
      : currentBid + incrementValue;

    const isSameAmount = (a: number, b: number, epsilon = 0.01) =>
      Math.abs(a - b) < epsilon;

    // ✅ Sealed auction: bid is valid after previous checks
    // ✅ First bid: any bid ≥ targetPrice allowed
    if (!isSealed && bidCount > 0 && !isSameAmount(amount, expectedBid)) {
      const direction = isReverse ? "decrement" : "increment";
      alert(
        `Bid must be exactly $${expectedBid.toLocaleString()} (current bid ${
          isReverse ? "-" : "+"
        } minimum ${direction}).`
      );
      return;
    }

    // ✅ All validations passed, place bid
    try {
      console.log("Placing bid:", { auctionId, userId, amount });

      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("user_email", userEmail);
      formData.append("amount", amount.toString());
      formData.append("created_at", new Date().toISOString());

      uploadedDocuments.forEach((doc, index) => {
        if (doc.files) {
          doc.files.forEach((file) => {
            formData.append(
              `documents[${index}]`,
              JSON.stringify({ id: file.id, url: file.url })
            );
          });
        }
      });

      uploadedImages.forEach((image, index) => {
        formData.append(
          `images[${index}]`,
          JSON.stringify({ id: image.id, url: image.url })
        );
      });

      const bidRes = await fetch(`/api/auctions/${auctionId}`, {
        method: "PUT",
        body: formData,
      });

      const bidJson = await bidRes.json();
      if (!bidJson.success)
        throw new Error(bidJson.error || "Failed to record bid");

      // Refresh auction
      const auctionRes = await fetch(`/api/auctions/${auctionId}`);
      const auctionJson = await auctionRes.json();
      if (!auctionJson.success)
        throw new Error(auctionJson.error || "Failed to fetch updated auction");

      const start = new Date(auctionJson.data.scheduledstart || "");
      const duration = auctionJson.data.auctionduration
        ? ((d) =>
            (d.days || 0) * 86400 +
            (d.hours || 0) * 3600 +
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
        console.log("Fetched Updated Bids (Raw):", bids);
        const historyPromises = bids.map(async (bid: Bid) => {
          const profileRes = await fetch(`/api/profiles/${bid.user_id}`);
          const profileJson = await profileRes.json();
          console.log(
            "Profile API Response for user_id",
            bid.user_id,
            " (Raw):",
            profileJson
          );
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
        console.log("Processed Updated Bid History (Raw):", history);
        setBidHistory(history);
      }

      setBidAmount("");
      setUploadedDocuments(
        uploadedDocuments.map((doc) => ({ ...doc, files: null }))
      );
      setUploadedImages([]);
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
    alert(
      `Item purchased for $${auction?.buyNowPrice?.toLocaleString() || "N/A"}!`
    );
  };

  const handleWatchlist = () => {
    setWatchlisted(!watchlisted);
    console.log("Watchlist toggled:", !watchlisted);
  };

  const getMinimumBid = () => {
    return auction?.targetprice || 0;
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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!auction)
    return <div className="text-center py-20">Auction not found</div>;

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

  const expectedBid = (() => {
    if (auction?.bidcount && auction.bidcount > 0) {
      const current = auction.currentbid || 0;

      if (auction.bidincrementtype === "fixed" && auction.minimumincrement) {
        return current - auction.minimumincrement;
      } else if (auction.bidincrementtype === "percentage" && auction.percent) {
        const decrement = current * (auction.percent / 100);
        return current - decrement;
      }
    }
    return auction?.targetprice || 0;
  })();

  const bidAmountNumber = Number(bidAmount);
  const bidCount = auction?.bidcount ?? 0;
  const targetPrice = auction?.targetprice ?? 0;

  const isButtonDisabled =
    !bidAmount ||
    isNaN(bidAmountNumber) ||
    bidAmountNumber < 0 ||
    (bidCount === 0
      ? bidAmountNumber < targetPrice // ✅ Allow >= targetPrice for first bid
      : !isSameAmount(bidAmountNumber, expectedBid)) || // ❌ Later bids must match expectedBid exactly
    user?.email === auction?.createdby ||
    isAuctionNotStarted ||
    isAuctionEnded ||
    (auction?.auctionsubtype === "sealed" &&
      auction?.participants?.includes(user?.id ?? "")) ||
    uploadedDocuments.some((doc) => !doc.files || doc.files.length === 0);

  console.log("isButtonDisabled:", isButtonDisabled, {
    bidAmount,
    getMinimumBid: getMinimumBid(),
    targetPrice: auction?.targetprice,
    currentBid: auction?.currentbid,
    userEmail: user?.email,
    creator: auction?.createdby,
    isAuctionNotStarted,
    isAuctionEnded,
    documents: uploadedDocuments,
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* <Card className="hover-lift transition-smooth">
              <CardContent className="p-0 relative">
                <Image
                  src={auction.productimages?.[currentImageIndex] || "/placeholder.svg"} // Updated to use the URL directly
                  alt={auction.productname || auction.title || "Auction Item"}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover rounded-t-lg transition-smooth hover:scale-105"
                  priority
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {`${currentImageIndex + 1}/${auction.productimages?.length || 1}`}
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
                    {auction.productimages?.map((imageUrl, index) => (
                      <Image
                        key={index}
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${auction.productname || auction.title} ${index + 1}`}
                        width={100}
                        height={80}
                        className="w-20 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-smooth hover-lift"
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card> */}
            <Card className="shadow-sm border rounded-lg">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-green-500 animate-bounce" />
                  Auction Information
                </h2>{" "}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
                  <p>
                    <span className="font-medium">Auction Type:</span>{" "}
                    {auction.auctiontype === "reverse"
                      ? "Reverse Auction"
                      : "Forward Auction"}
                  </p>
                  <p>
                    <span className="font-medium">Auction Format:</span>{" "}
                    {auction.issilentauction
                      ? "Silent Bidding"
                      : "Open Bidding"}
                  </p>
                  <p>
                    <span className="font-medium">Target Price:</span>{" "}
                    {auction.targetprice
                      ? `$${auction.targetprice.toLocaleString()}`
                      : "—"}
                  </p>

                  <p>
                    <span className="font-medium">Reserve Price:</span>{" "}
                    {auction.reserveprice
                      ? `$${auction.reserveprice.toLocaleString()}`
                      : "—"}
                  </p>
                  <p>
                    <span className="font-medium">Current Bid:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      {auction.currentbid
                        ? `$${auction.currentbid.toLocaleString()}`
                        : "—"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Total Bidders:</span>{" "}
                    {auction.bidders ?? 0}
                  </p>

                  <p className="col-span-2 md:col-span-3">
                    <span className="font-medium">Time Remaining:</span>{" "}
                    <span className="text-red-600 font-semibold">
                      {auction.timeLeft || "Ended"}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600 animate-bounce" />
                  Product Description
                </h2>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line text-xs">
                    {auction.productdescription || "No description available"}
                  </p>
                  {auction.requireddocuments && (
                    <div className="mt-2">
                      <h2 className="text-sm font-semibold mb-4">
                        Required Documents:
                      </h2>
                      <ul className="list-disc ml-5 mt-2 text-gray-700 text-xs">
                        {(() => {
                          let docs: { name: string }[] = [];
                          if (typeof auction.requireddocuments === "string") {
                            try {
                              docs = JSON.parse(auction.requireddocuments);
                            } catch {
                              return (
                                <li className="text-red-500">
                                  Invalid document list
                                </li>
                              );
                            }
                          } else if (Array.isArray(auction.requireddocuments)) {
                            docs = auction.requireddocuments;
                          }
                          return docs.map((doc, index) => (
                            <li key={index}>{doc.name}</li>
                          ));
                        })()}
                      </ul>
                      <p className="mt-2 text-xs text-red-500">
                        Please upload all required documents in the
                        Documentation tab.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  {/* Title with Icon */}
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600 animate-bounce" />
                    Product Specification
                  </h3>

                  <div className="divide-y text-sm">
                    {/* SKU */}
                    <div className="grid grid-cols-2 py-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        SKU
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ZX1000-AC
                      </span>
                    </div>

                    {/* Brand */}
                    <div className="grid grid-cols-2 py-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Brand
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        AirMax
                      </span>
                    </div>

                    {/* Model */}
                    <div className="grid grid-cols-2 py-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Model
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ZX1000
                      </span>
                    </div>

                    {/* Reserve Price */}
                    <div className="grid grid-cols-2 py-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Reserve Price
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        €12,000
                      </span>
                    </div>

                    {/* Attributes */}
                    {/* Attributes */}
                    <div className="grid grid-cols-2 py-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Attributes
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        Pressure: 5000 PSI, Power: 20 HP, Phase: 3 Phase Power
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Q/A */}

            <div className="space-y-6">
              <Card className="p-6 space-y-6">
                {/* Questions */}
                {auction.questions?.length ? (
                  <div className="space-y-4">
                    {auction.questions.map((qa, index) => (
                      <div
                        key={index}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {qa.user}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(qa.time).toLocaleString("en-US", {
                              hour12: true,
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 mb-2">
                          <MessageSquare className="h-5 w-5 text-blue-500 mt-1" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {qa.question}
                          </span>
                        </div>

                        {qa.answer && (
                          <div className="ml-7 p-3 bg-blue-50 dark:bg-blue-900/20 rounded flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            <span className="text-gray-700 dark:text-gray-200">
                              {qa.answer}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No questions available
                  </p>
                )}

                {/* Ask a Question */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Ask a Question
                  </h4>
                  <Textarea
                    placeholder="Type your question here..."
                    className="mb-2 border border-gray-300 dark:border-gray-700 rounded"
                  />
                  <Button className="bg-blue-500 hover:bg-blue-700 text-white">
                    Submit Question
                  </Button>
                </div>
              </Card>
            </div>

            {/* <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">
                        {auction.categoryid || "Uncategorized"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        Reverse Auction
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">
                      {auction.productname ||
                        auction.title ||
                        "Untitled Auction"}
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWatchlist}
                      className={watchlisted ? "text-red-600" : ""}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          watchlisted ? "fill-current" : ""
                        }`}
                      />
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
                    <TabsTrigger value="documentation">
                      Documentation
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-line">
                        {auction.productdescription ||
                          "No description available"}
                      </p>
                      {auction.requireddocuments && (
                        <div className="mt-2">
                          <strong>Required Documents:</strong>
                          <ul className="list-disc ml-5 mt-2">
                            {(() => {
                              let docs: { name: string }[] = [];
                              if (
                                typeof auction.requireddocuments === "string"
                              ) {
                                try {
                                  docs = JSON.parse(auction.requireddocuments);
                                } catch {
                                  return (
                                    <li className="text-red-500">
                                      Invalid document list
                                    </li>
                                  );
                                }
                              } else if (
                                Array.isArray(auction.requireddocuments)
                              ) {
                                docs = auction.requireddocuments;
                              }
                              return docs.map((doc, index) => (
                                <li key={index}>{doc.name}</li>
                              ));
                            })()}
                          </ul>
                          <p className="mt-2">
                            Please upload all required documents in the
                            Documentation tab.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="mt-6">
                    <div className="space-y-4">
                      {auction.attributes ||
                      auction.specifications ||
                      auction.sku ||
                      auction.brand ||
                      auction.model ||
                      auction.reserveprice ? (
                        <>
                          {auction.sku && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">SKU</span>
                              <span className="text-gray-600 dark:text-gray-300">
                                {auction.sku}
                              </span>
                            </div>
                          )}
                          {auction.brand && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">Brand</span>
                              <span className="text-gray-600 dark:text-gray-300">
                                {auction.brand}
                              </span>
                            </div>
                          )}
                          {auction.model && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">Model</span>
                              <span className="text-gray-600 dark:text-gray-300">
                                {auction.model}
                              </span>
                            </div>
                          )}
                          {auction.reserveprice && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="font-medium">Reserve Price</span>
                              <span className="text-gray-600 dark:text-gray-300">
                                ${auction.reserveprice.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {auction.attributes && (
                            <div className="flex flex-col py-2 border-b">
                              <span className="font-medium">Attributes</span>
                              {renderKeyValueBlock(
                                auction.attributes,
                                "No attributes data"
                              )}
                            </div>
                          )}
                          {auction.specifications && (
                            <div className="flex flex-col py-2 border-b">
                              <span className="font-medium">
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
                        <p>No specifications available</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="bids" className="mt-6">
                    {!(
                      auction.issilentauction ||
                      auction.auctionsubtype === "sealed"
                    ) && (
                      <div className="space-y-3">
                        {bidHistory.length > 0 ? (
                          bidHistory.map((bid, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded"
                            >
                              <div>
                                <span className="font-medium">
                                  {bid.bidder}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                                  {bid.time}
                                </span>
                              </div>
                              <span className="font-semibold text-green-600">
                                ${bid.amount.toLocaleString()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p>No bid history available</p>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="qa" className="mt-6">
                    <div className="space-y-6">
                      {auction.questions?.length ? (
                        auction.questions.map((qa, index) => (
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
                        ))
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
                        {auction.productdocuments.map((doc, index) => (
                          <a
                            key={index}
                            href={doc}
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
                    {auction.requireddocuments && (
                      <DragDropUpload
                        onDocumentUpload={handleDocumentUpload}
                        onImageUpload={handleImageUpload}
                        setUploadedImages={setUploadedImages}
                        requiredDocuments={(() => {
                          let docs: { name: string }[] = [];
                          if (typeof auction.requireddocuments === "string") {
                            try {
                              docs = JSON.parse(auction.requireddocuments);
                            } catch {
                              docs = [];
                            }
                          } else if (Array.isArray(auction.requireddocuments)) {
                            docs = auction.requireddocuments;
                          }
                          return docs;
                        })()}
                        uploadedDocuments={uploadedDocuments}
                        uploadedImages={uploadedImages}
                      />
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card> */}
          </div>
          <div className="space-y-6">
            <Card className="hover-lift transition-smooth">
              <CardContent className="p-0 relative">
                <Image
                  src={
                    auction.productimages?.[currentImageIndex] ||
                    "/placeholder.svg"
                  } // Updated to use the URL directly
                  alt={auction.productname || auction.title || "Auction Item"}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover rounded-t-lg transition-smooth hover:scale-105"
                  priority
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {`${currentImageIndex + 1}/${
                    auction.productimages?.length || 1
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
              </CardContent>
            </Card>

            {/* right sidebar product detals */}
            <Card>
              <div className="space-y-3 mb-5 px-4 gap-2">
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
                      {/* {currencySymbol} */}
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
                        {/* {currencySymbol} */}
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
                          {/* {currencySymbol} */}
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
                {!isLoggedIn ? (
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
                ) : auction.approved === false ? (
                  <p className="text-sm text-red-600 text-left">
                    Auction is pending approval from admin
                  </p>
                ) : (
                  // The rest of your normal auction content for logged-in and approved users
                  <div>{/* Auction bidding form or other content */}</div>
                )}
                {isLoggedIn && !isAuctionEnded && user?.role !== "seller" && (
                <CardContent className="space-y-4">
                  {/* <div className="text-center"> */}
                  {/* <div className="text-3xl font-bold text-green-600 mb-1 animate-pulse-gow">
                      {auction.bidcount === 0
                        ? "N/A"
                        : `$${auction.currentbid?.toLocaleString() || "N/A"}`}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Current Bid
                    </div>
                    {!(
                      auction.issilentauction ||
                      auction.auctionsubtype === "sealed"
                    ) &&
                      auction.currentbidder &&
                      auction.bidcount &&
                      auction.bidcount > 0 && (
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          By: {auction.currentbidder}
                        </div>
                      )}
                  </div> */}

                  {/* <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1 hover-lift">
                      <Clock className="h-4 w-4 text-red-600 animate-bounce-gentle" />
                      <span className="font-semibold text-red-600">
                        {auction.timeLeft || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 hover-lift">
                      <Users className="h-4 w-4" />
                      <span>
                        {auction.issilentauction
                          ? "Silent Auction"
                          : `${auction.bidcount || 0} bidders`}
                      </span>
                    </div>
                  </div> */}

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">
                        Your Bid Amount
                      </label>
                      <Input
                        type="number"
                        placeholder={`Minimum: $${getMinimumBid().toLocaleString()}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="mt-1 transition-smooth"
                        disabled={isAuctionNotStarted || isAuctionEnded}
                      />
                    </div>
                    {auction?.auctionsubtype === "sealed" &&
                      auction?.participants?.includes(user?.id ?? "") && (
                        <p className="text-sm text-red-600 mt-2">
                          You have already submitted a bid for this auction and
                          cannot bid again.
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
                        className="w-full transition-smooth hover-lift transform-3d"
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
                      {(isAuctionNotStarted || isAuctionEnded) && (
                        <p className="text-sm text-red-600 mt-2">
                          {isAuctionNotStarted
                            ? "Auction has not started yet"
                            : "Auction has ended"}
                        </p>
                      )}
                      {uploadedDocuments.some(
                        (doc) => !doc.files || doc.files.length === 0
                      ) && (
                        <p className="text-sm text-red-600 mt-2">
                          Upload at least one file for all required documents to
                          bid.
                        </p>
                      )}
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
                          Buy Now - ${auction.buyNowPrice.toLocaleString()}
                        </Button>
                      </>
                    )}
                  </div>
                  {(auction.bidcount ?? 0) > 0 &&
                    !(
                      auction.issilentauction ||
                      auction.auctionsubtype === "sealed"
                    ) && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          Minimum decrement: $
                          {auction.minimumincrement?.toLocaleString() || "100"}
                          {auction.bidincrementtype === "percentage"
                            ? ` (${auction.minimumincrement}%)`
                            : " (fixed)"}
                        </span>
                      </div>
                    )}
                    
                </CardContent>
                   )}
              </div>
            </Card>
            <div className="space-6">
              <Card>
                {auction.productdocuments &&
                auction.productdocuments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {auction.productdocuments.map((doc, index) => (
                      <a
                        key={index}
                        href={doc}
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
                  <p className="pt-4 pl-4 text-xs">
                    No documentation available
                  </p>
                )}
                {auction.requireddocuments && (
                  <DragDropUpload
                    onDocumentUpload={handleDocumentUpload}
                    onImageUpload={handleImageUpload}
                    setUploadedImages={setUploadedImages}
                    requiredDocuments={(() => {
                      let docs: { name: string }[] = [];
                      if (typeof auction.requireddocuments === "string") {
                        try {
                          docs = JSON.parse(auction.requireddocuments);
                        } catch {
                          docs = [];
                        }
                      } else if (Array.isArray(auction.requireddocuments)) {
                        docs = auction.requireddocuments;
                      }
                      return docs;
                    })()}
                    uploadedDocuments={uploadedDocuments}
                    uploadedImages={uploadedImages}
                  />
                )}
              </Card>
            </div>
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
                    <h4 className="font-semibold">
                      {auction.createdby || "Unknown Seller"}
                    </h4>
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
                  <span>Target Price</span>
                  <span className="font-medium">
                    ${auction.targetprice?.toLocaleString() || "N/A"}
                  </span>
                </div>
                {auction.auctionsubtype === "sealed" ? (
                  <div className="flex justify-between">
                    <span>Sealed Bid</span>
                    <span className="font-medium">Yes</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Current Bid</span>
                    <span className="font-medium text-green-600">
                      {auction.bidcount === 0
                        ? "N/A"
                        : `$${auction.currentbid?.toLocaleString() || "N/A"}`}
                    </span>
                  </div>
                )}
                {auction.buyNowPrice && (
                  <div className="flex justify-between">
                    <span>Buy Now Price</span>
                    <span className="font-medium">
                      ${auction.buyNowPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Total Bids</span>
                  <span className="font-medium">{auction.bidcount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Remaining</span>
                  <span className="font-medium text-red-600">
                    {auction.timeLeft || "N/A"}
                  </span>
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
