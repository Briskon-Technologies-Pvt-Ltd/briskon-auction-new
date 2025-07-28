"use client";

import { useAuth } from "@/hooks/use-auth"; // Adjust path based on your project structure
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import Button component
import { Gavel } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

// Define the shape of a bid history entry
interface BidHistoryEntry {
  auctionId: string;
  productName: string;
  auctionType: string | null;
  auctionSubtype: string | null;
  bidAmount: number;
  totalBids: number;
  isWinningBid: boolean;
}

export default function BidHistory() {
  const { user, isLoading } = useAuth();
  const [bidHistory, setBidHistory] = useState<BidHistoryEntry[]>([]);
  const [isLoadingBids, setIsLoadingBids] = useState(true);

  useEffect(() => {
    const fetchBidHistory = async () => {
      setIsLoadingBids(true);
      try {
        const response = await fetch(
          `/api/buyer/bid-history?email=${encodeURIComponent(user?.email || "")}&id=${encodeURIComponent(user?.id || "")}`
        );
        if (!response.ok) throw new Error("Failed to fetch bid history");
        const data = await response.json();
        setBidHistory(data);
      } catch (error) {
        console.error("Error fetching bid history:", error);
        setBidHistory([]);
      } finally {
        setIsLoadingBids(false);
      }
    };

    if (user) {
      fetchBidHistory();
    }
  }, [user]);

  if (isLoading || isLoadingBids) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading bid history...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Not logged in. Please log in to view your bid history.</p>
      </div>
    );
  }

  if (user.role !== "buyer" && user.role !== "both") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access Denied. This page is for buyers.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gavel className="h-6 w-6 mr-2 text-blue-500" /> My Bid History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bidHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left p-2">Product Name</th>
                      <th className="text-left p-2">Auction Type</th>
                      <th className="text-left p-2">Your Bid Amount</th>
                      <th className="text-left p-2">Total Bids</th>
                      <th className="text-left p-2">Winning Bid?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidHistory.map((bid) => {
                      // Determine auction path based on auctiontype and auctionsubtype
                      let auctionPath = `/auctions/${bid.auctionId}`; // Default to standard
                      if (bid.auctionType === "reverse" || bid.auctionSubtype === "reverse") {
                        auctionPath = `/auctions/reverse/${bid.auctionId}`;
                      } else if (bid.auctionType === "yankee" || bid.auctionSubtype === "yankee") {
                        auctionPath = `/auctions/yankee/${bid.auctionId}`;
                      } else if (bid.auctionType === "dutch" || bid.auctionSubtype === "dutch") {
                        auctionPath = `/auctions/dutch/${bid.auctionId}`;
                      }
                      return (
                        <tr key={bid.auctionId} className="border-b dark:border-gray-700">
                          <td className="p-2">
                            <Link href={auctionPath} className="text-blue-500 hover:underline">
                              {bid.productName}
                            </Link>
                          </td>
                          <td className="p-2">{bid.auctionType || "standard"}</td>
                          <td className="p-2">{bid.bidAmount.toFixed(2)}</td>
                          <td className="p-2">{bid.totalBids}</td>
                          <td className="p-2">{bid.isWinningBid ? "Yes" : "No"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No bid history found.</p>
            )}
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard/buyer">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
