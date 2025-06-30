// This file was already provided in the previous response and is assumed to be correct.
// For brevity, it's not repeated here.
// Key functionality: Displays admin-specific dashboard content.
"use client"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Package, DollarSign, Shield, Settings, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface User {
  name: string
  email: string
  role: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user data or not logged in...</p>
      </div>
    )
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access Denied. This dashboard is for administrators only.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Admin Panel - Welcome, {user.name || "Admin"}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Platform Oversight & Management</p>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" asChild>
                <Link href="/admin/critical-alerts">
                  <AlertTriangle className="h-4 w-4 mr-2" /> Critical Alerts{" "}
                  <Badge className="ml-2 bg-white text-red-600">2</Badge>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/system-settings">
                  <Settings className="h-4 w-4 mr-2" /> System Settings
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,452</div>
              <p className="text-xs text-muted-foreground">+150 this week</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <Package className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,205</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Revenue (Month)</CardTitle>
              <DollarSign className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$75,830.50</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Shield className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17</div>
              <p className="text-xs text-muted-foreground">Require admin review</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Administrative Tools</CardTitle>
              <CardDescription>Manage users, content, and system settings.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/user-management">
                  <Users className="h-6 w-6 mb-1" /> User Management
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/auction-moderation">
                  <Package className="h-6 w-6 mb-1" /> Auction Moderation
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/reports-disputes">
                  <AlertTriangle className="h-6 w-6 mb-1" /> Reports & Disputes
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/financials">
                  <DollarSign className="h-6 w-6 mb-1" /> Financial Overview
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/content-management">
                  <Settings className="h-6 w-6 mb-1" /> Content Management
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/system-logs">
                  <Shield className="h-6 w-6 mb-1" /> System Logs
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="text-sm flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>API Status: Operational
                </li>
                <li className="text-sm flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>Database: Healthy
                </li>
                <li className="text-sm flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>Background Jobs: Minor Delays
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        {/* The more detailed content from your previous version can be re-integrated here */}
      </div>
    </div>
  )
}
