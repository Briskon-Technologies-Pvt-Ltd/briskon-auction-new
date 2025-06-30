// dashboard/buyer/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingBag, Gavel, TrendingUp, Heart, History, Settings, Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth"; // Adjust path based on your project structure

export default function BuyerDashboard() {
  const { user, isLoading } = useAuth();

  // No need for local useState or sessionStorage since useAuth handles the user state
  // useEffect can be removed unless you need side effects based on user

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
      <div className="container mx-auto px-4">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Welcome, {user.fname || user.lname || "Buyer"}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">This is your Buyer Dashboard.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/notifications">
                  <Bell className="h-4 w-4 mr-2" /> Notifications <Badge className="ml-2">3</Badge>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/settings/profile">
                  <Settings className="h-4 w-4 mr-2" /> Account
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
              <Gavel className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auctions Won</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total lifetime</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watchlist Items</CardTitle>
              <Heart className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">3 new this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your buying activities.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/auctions">
                  <ShoppingBag className="h-6 w-6 mb-1" /> Browse Auctions
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/buyer/active-bids">
                  <Gavel className="h-6 w-6 mb-1" /> My Active Bids
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/buyer/won-auctions">
                  <TrendingUp className="h-6 w-6 mb-1" /> My Won Auctions
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/buyer/watchlist">
                  <Heart className="h-6 w-6 mb-1" /> My Watchlist
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/buyer/bid-history">
                  <History className="h-6 w-6 mb-1" /> Bid History
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/settings/payment-methods">
                  <Settings className="h-6 w-6 mb-1" /> Payment Methods
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="text-sm">You placed a bid on "Vintage Rolex".</li>
                <li className="text-sm">Auction "Antique Vase" ended, you won!</li>
                <li className="text-sm">You added "Art Deco Lamp" to watchlist.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
