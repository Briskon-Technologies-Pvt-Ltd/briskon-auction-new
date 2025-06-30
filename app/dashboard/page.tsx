"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, ShoppingBag, Briefcase, Settings, Bell, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth"; // Adjusted import, assuming CurrentUser is defined there or not needed

export default function CombinedDashboardPage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
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

  // Map User to a simplified display object (no need for separate CurrentUser if not defined)
  const displayUser = {
    name: user.fname || user.lname || "User", // Fallback to name if fname is missing
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
                <Link href="/notifications">
                  <Bell className="h-4 w-4 mr-1.5" /> Notifications <Badge className="ml-2">1</Badge>
                </Link>
              </Button>
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
          {(displayUser.role === "buyer" || displayUser.role === "both") && (
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
          )}

          {(displayUser.role === "seller" || displayUser.role === "both") && (
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
          )}
          {displayUser.role === "admin" && (
            <Card className="hover:shadow-lg transition-shadow md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-red-500" /> Admin Panel
                </CardTitle>
                <CardDescription>Access platform management tools and oversight.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/dashboard/admin">Go to Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {displayUser.role === "both" && (
          <Card>
            <CardHeader>
              <CardTitle>Overview for Buyer & Seller</CardTitle>
              <CardDescription>Summary of your activities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You have <strong>3 active bids</strong> and <strong>7 active listings</strong>.
              </p>
              <p>Your last sale was "Vintage Lamp" for $150.</p>
              <p>Your last purchase was "Antique Map" for $80.</p>
            </CardContent>
          </Card>
        )}

        {displayUser.role !== "buyer" && displayUser.role !== "seller" && displayUser.role !== "both" && displayUser.role !== "admin" && (
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Your role is: <strong>{displayUser.role}</strong>. Specific dashboard features for this role may be under
                development.
              </p>
              <p className="mt-4">
                You can manage your account settings{" "}
                <Link href="/settings/profile" className="text-blue-600 hover:underline">
                  here
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
