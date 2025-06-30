// dashboard/seller/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, Users, Plus, Settings, Bell } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth"; // Adjust path based on your project structure

export default function SellerDashboard() {
  const { user, isLoading } = useAuth();

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
        {/* Optionally, redirect to login page */}
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
            <div className="flex gap-2">
              <Button asChild>
                <Link href="https://auction-wizard.onrender.com/">
                  <Plus className="h-4 w-4 mr-2" /> Create New Listing
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/notifications">
                  <Bell className="h-4 w-4 mr-2" /> Notifications <Badge className="ml-2">5</Badge>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">+5 new this month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,230.00</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Bidders</CardTitle>
              <Users className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">Across all active listings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Seller Tools</CardTitle>
              <CardDescription>Manage your selling activities efficiently.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/seller/listings">
                  <Package className="h-6 w-6 mb-1" /> My Listings
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/seller/sales-history">
                  <DollarSign className="h-6 w-6 mb-1" /> Sales History
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/seller/analytics">
                  <TrendingUp className="h-6 w-6 mb-1" /> Performance Analytics
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/seller/payouts">
                  <DollarSign className="h-6 w-6 mb-1" /> Payouts
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/settings/store">
                  <Settings className="h-6 w-6 mb-1" /> Store Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="text-sm">Ship "Sold Item X" to buyer.</li>
                <li className="text-sm">Respond to query on "Listing Y".</li>
                <li className="text-sm">3 new bids on "Active Auction Z".</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
