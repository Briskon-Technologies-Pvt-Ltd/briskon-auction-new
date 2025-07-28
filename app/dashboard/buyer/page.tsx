"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Gavel,
  TrendingUp,
  History,
  Settings,
  Heart,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth"; // Adjust path based on your project structure

export default function BuyerDashboard() {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState({
    activeBids: 0,
    wonAuctions: 0,
    recentActivities: [],
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      try {
        const response = await fetch(
          `/api/buyer/stats?email=${encodeURIComponent(
            user?.email || ""
          )}&id=${encodeURIComponent(user?.id || "")}`
        );
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({ activeBids: 0, wonAuctions: 0, recentActivities: [] }); // Fallback values
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (isLoading || isLoadingStats) {
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
        {/* Optionally, redirect to login page */}
      </div>
    );
  }

  if (user.role !== "buyer" && user.role !== "both") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access Denied. This dashboard is for buyers.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4 ">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center"></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Active Bids */}
          <Card className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Active Bids
              </CardTitle>
              <Gavel className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.activeBids}
              </div>
              <Link
                href="/active-bids"
                className="text-xs text-gray-500 hover:underline"
              >
                View Bidding History
              </Link>
            </CardContent>
          </Card>

          {/* Won Auctions */}
          <Card className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Won Auctions
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.wonAuctions}
              </div>
              <p className="text-xs text-gray-500">Lifetime total</p>
            </CardContent>
          </Card>

          {/* Lost Auctions */}
          <Card className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Lost Auctions
              </CardTitle>
              <Heart className="h-5 w-5 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.lostAuctions}
              </div>
              <p className="text-xs text-gray-500">Try bidding higher!</p>
            </CardContent>
          </Card>

          {/* Total Spend */}
          <Card className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Total Spend
              </CardTitle>
              <ShoppingBag className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                ₹{Number(stats.totalSpend).toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-gray-500">Across all won bids</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your buying activities.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                asChild
              >
                <Link href="/auctions">
                  <ShoppingBag className="h-6 w-6 mb-1" /> All Auctions
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                asChild
              >
                <Link href="/dashboard/buyer/active-bids">
                  <Gavel className="h-6 w-6 mb-1" /> My Active Bids
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                asChild
              >
                <Link href="/dashboard/buyer/won-auctions">
                  <TrendingUp className="h-6 w-6 mb-1" /> My Won Auctions
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                asChild
              >
                <Link href="/dashboard/buyer/bid-history">
                  <History className="h-6 w-6 mb-1" /> Bid History
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
  <CardHeader className="flex items-center gap-2 pt-2">
    <Bell className="text-yellow-500" />
    <CardTitle>Alerts & Notifications</CardTitle>
  </CardHeader>

  <CardContent>
    <ul className="space-y-3 text-sm">
      {stats.recentActivities.length > 0 ? (
        stats.recentActivities.map((activity, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            • {activity}
          </li>
        ))
      ) : (
        <li className="text-gray-500 italic">No recent notifications.</li>
      )}
    </ul>
  </CardContent>
</Card>
          <Card className="lg:col-span-3">
  <CardHeader className="flex items-center gap-2 pt-2">
    <Settings className="text-gray-600" />
    <CardTitle>Account</CardTitle>
  </CardHeader>
  <CardContent className="text-sm space-y-2">
    <div>
      <Link
        href="/settings/profile"
        className="text-blue-600 hover:underline"
      >
        View & Edit Profile
      </Link>
    </div>
    <div>Change password, logout, manage preferences.</div>
  </CardContent>
</Card>

        </div>
        
      </div>
    </div>
  );
}
