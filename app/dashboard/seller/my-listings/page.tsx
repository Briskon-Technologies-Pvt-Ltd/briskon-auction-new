"use client";

import { useAuth } from "@/hooks/use-auth"; // Adjust path based on your project structure
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react"; // Using Package icon for listings
import { useEffect, useState } from "react";
import Link from "next/link";

// Define the shape of a listing entry
interface ListingEntry {
  id: string;
  productname: string;
  auctiontype: string | null;
  startprice: number | null; // Allow null values
  currentbid: number | null; // Allow null values
  ended: boolean;
}

export default function MyListings() {
  const { user, isLoading } = useAuth();
  const [listings, setListings] = useState<ListingEntry[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoadingListings(true);
      try {
        const response = await fetch(
          `/api/seller/my-listings?email=${encodeURIComponent(user?.email || "")}&id=${encodeURIComponent(user?.id || "")}`
        );
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      } finally {
        setIsLoadingListings(false);
      }
    };

    if (user) {
      fetchListings();
    }
  }, [user]);

  if (isLoading || isLoadingListings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading listings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Not logged in. Please log in to view your listings.</p>
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

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-6 w-6 mr-2 text-blue-500" /> My Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {listings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left p-2">Product Name</th>
                      <th className="text-left p-2">Auction Type</th>
                      <th className="text-left p-2">Start Amount</th>
                      <th className="text-left p-2">Current Bid</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing) => {
                      // Determine listing path based on status
                      let listingPath = `/dashboard/seller/my-listings/${listing.id}`;
                      return (
                        <tr key={listing.id} className="border-b dark:border-gray-700">
                          <td className="p-2">
                            <Link href={listingPath} className="text-blue-500 hover:underline">
                              {listing.productname}
                            </Link>
                          </td>
                          <td className="p-2">{listing.auctiontype || "standard"}</td>
                          <td className="p-2">{(listing.startprice || 0).toFixed(2)}</td>
                          <td className="p-2">{(listing.currentbid || 0).toFixed(2)}</td>
                          <td className="p-2">{listing.ended ? "Completed" : "Active"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No listings found.</p>
            )}
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard/seller">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
