"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, ShoppingBag, Briefcase, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the type for the auctions join
interface Auction {
  productname: string;
}

interface BidWithAuction {
  amount: number;
  created_at: string;
  auctions: Auction | { productname: string } | null; // Allow for object or specific Auction type
}

interface DashboardData {
  activeBids: number;
  activeListings: number;
  recentSale: { productname: string; salePrice: number; saleDate: string } | null;
  recentPurchase: { productname: string; purchasePrice: number; purchaseDate: string } | null;
  totalEarnings: number;
  totalSpent: number;
}

export default function CombinedDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoadingData(true);
      try {
        if (!user?.email || user.role !== "both") throw new Error("Access restricted to both roles");
        const [bidsData, listingsData, salesData, purchasesData] = await Promise.all([
          // Active bids: Assume bids without a completed auction
          supabase
            .from("bids")
            .select("*", { count: "exact" })
            .eq("user_id", user.id)
            .not("auction_id", "in", (await supabase.from("auctions").select("id").eq("ended", true)).data?.map((a) => a.id) || []),
          // Active listings: Auctions not ended
          supabase
            .from("auctions")
            .select("*", { count: "exact" })
            .eq("createdby", user.email)
            .eq("ended", false),
          // Recent sale: Latest completed auction
          supabase
            .from("auctions")
            .select("id, productname, currentbid, created_at")
            .eq("createdby", user.email)
            .eq("ended", true)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
          // Recent purchase: Latest bid with auction product name
          supabase
            .from("bids")
            .select("auctions(productname), amount, created_at")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
        ]);

        console.log("Purchases data raw:", purchasesData.data); // Debug raw response

        const totalEarnings = await supabase
          .from("auctions")
          .select("currentbid")
          .eq("createdby", user.email)
          .eq("ended", true)
          .then((res) => res.data?.reduce((sum, auction) => sum + (auction.currentbid || 0), 0) || 0);

        const totalSpent = await supabase
          .from("bids")
          .select("amount")
          .eq("user_id", user.id)
          .then((res) => res.data?.reduce((sum, bid) => sum + (bid.amount || 0), 0) || 0);

        setDashboardData({
          activeBids: bidsData.count || 0,
          activeListings: listingsData.count || 0,
          recentSale: salesData.data
            ? { productname: salesData.data.productname, salePrice: salesData.data.currentbid, saleDate: salesData.data.created_at }
            : null,
          recentPurchase: purchasesData.data
            ? {
                productname: (purchasesData.data.auctions as Auction | { productname: string } | undefined)?.productname || "Unknown",
                purchasePrice: purchasesData.data.amount,
                purchaseDate: purchasesData.data.created_at,
              }
            : null,
          totalEarnings,
          totalSpent,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (isLoading || isLoadingData) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>You are not logged in. Please log in to access your dashboard.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  if (user.role !== "both") {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>Access restricted. This dashboard is for users with both buyer and seller roles.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  const displayUser = {
    name: user.fname || user.lname || "User",
    email: user.email,
    role: user.role,
  };

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Welcome, {displayUser.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Your Briskon Auctions Hub (Role: {displayUser.role})</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings/profile">
                  <Settings className="h-4 w-4 mr-1.5" /> Account
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1.5" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-500" /> Buyer Dashboard
              </CardTitle>
              <CardDescription>Access your bidding activities, watchlist, and purchases.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/buyer">Go to Buyer Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-500" /> Seller Dashboard
              </CardTitle>
              <CardDescription>Manage your listings, sales, and seller profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/seller">Go to Seller Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Overview for Buyer & Seller</CardTitle>
            <CardDescription>Summary of your activities and performance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  Active Bids: <strong>{dashboardData?.activeBids || 0}</strong>
                </p>
                <p>
                  Active Listings: <strong>{dashboardData?.activeListings || 0}</strong>
                </p>
              </div>
              <div>
                <p>
                  Total Earnings: <strong>${(dashboardData?.totalEarnings || 0).toLocaleString()}</strong>
                </p>
                <p>
                  Total Spent: <strong>${(dashboardData?.totalSpent || 0).toLocaleString()}</strong>
                </p>
              </div>
            </div>
            {dashboardData?.recentSale && (
              <p>
                Last Sale: <strong>{dashboardData.recentSale.productname}</strong> for{" "}
                <strong>${dashboardData.recentSale.salePrice.toLocaleString()}</strong> on{" "}
                <strong>{DateTime.fromISO(dashboardData.recentSale.saleDate).toLocaleString(DateTime.DATE_MED)}</strong>
              </p>
            )}
            {dashboardData?.recentPurchase && (
              <p>
                Last Purchase: <strong>{dashboardData.recentPurchase.productname}</strong> for{" "}
                <strong>${dashboardData.recentPurchase.purchasePrice.toLocaleString()}</strong> on{" "}
                <strong>
                  {DateTime.fromISO(dashboardData.recentPurchase.purchaseDate).toLocaleString(DateTime.DATE_MED)}
                </strong>
              </p>
            )}
            <p>
              Sales Trend: <strong>{(dashboardData?.totalEarnings || 0) > 100 ? "Up 📈" : "Stable 📊"}</strong> (based on
              earnings threshold)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
