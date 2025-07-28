"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

interface Stats {
  activeListings: number;
  totalSales: number;
  totalBids: number;
}

interface RecentAuction {
  id: string;
  title: string;
  productname?: string; // Added as optional in case it's not always present
  currentbid: number;
}

export default function SellerDashboard() {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState<string | null>(null);
  const [recentAuctions, setRecentAuctions] = useState<RecentAuction[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [errorInsights, setErrorInsights] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const response = await fetch(`/api/seller/stats?email=${encodeURIComponent(user?.email || "")}`);
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        if (!data.success) throw new Error(data.error || "Failed to load stats");
        setStats(data.data);
      } catch (err) {
        setErrorStats(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchRecentAuctions = async () => {
      try {
        setLoadingInsights(true);
        const response = await fetch(`/api/seller/recent-auctions?email=${encodeURIComponent(user?.email || "")}`);
        if (!response.ok) throw new Error("Failed to fetch recent auctions");
        const data = await response.json();
        if (!data.success) throw new Error(data.error || "Failed to load recent auctions");
        setRecentAuctions(data.data);
      } catch (err) {
        setErrorInsights(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoadingInsights(false);
      }
    };

    if (user?.email) {
      fetchStats();
      fetchRecentAuctions();
    }
  }, [user?.email]);

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

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Welcome, {user.fname || user.lname || "Seller"}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">This is your Seller Dashboard.</p>
            </div>
            <Button variant="outline" asChild className="flex items-center">
              <Link href={`/settings/profile`}>
                <Settings className="h-4 w-4 mr-2" /> Account
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <p className="text-2xl font-bold">Loading...</p>
              ) : errorStats ? (
                <p className="text-red-600">{errorStats}</p>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stats?.activeListings || 0}</div>
                  <p className="text-xs text-muted-foreground">Active auctions</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <p className="text-2xl font-bold">Loading...</p>
              ) : errorStats ? (
                <p className="text-red-600">{errorStats}</p>
              ) : (
                <>
                  <div className="text-2xl font-bold">${stats?.totalSales.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">Across all auctions</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
              <DollarSign className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <p className="text-2xl font-bold">Loading...</p>
              ) : errorStats ? (
                <p className="text-red-600">{errorStats}</p>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stats?.totalBids || 0}</div>
                  <p className="text-xs text-muted-foreground">Across all auctions</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Seller Tools</CardTitle>
              <CardDescription>Manage your selling activities efficiently.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/seller/my-listings">
                  <Package className="h-6 w-6 mb-1" /> My Listings
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/seller/sales-history">
                  <DollarSign className="h-6 w-6 mb-1" /> Sales History
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/seller/performance-analytics">
                  <TrendingUp className="h-6 w-6 mb-1" /> Performance Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Auction Insights</CardTitle>
              <CardDescription>Overview of your recent auctions.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingInsights ? (
                <p className="text-center">Loading...</p>
              ) : errorInsights ? (
                <p className="text-red-600 text-center">{errorInsights}</p>
              ) : recentAuctions.length > 0 ? (
                <ul className="space-y-2">
                  {recentAuctions.slice(0, 5).map((auction) => (
                    <li key={auction.id} className="text-sm">
                      {auction.productname || auction.title} - <span className="font-medium">${auction.currentbid.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">No recent auctions.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
