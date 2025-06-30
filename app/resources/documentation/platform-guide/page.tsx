"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Clock,
  Download,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Users,
  Settings,
  Shield,
  Zap,
  BarChart3,
  Globe,
  Code,
  Database,
  Monitor,
} from "lucide-react"

export default function PlatformGuidePage() {
  const tableOfContents = [
    { id: "overview", title: "Platform Overview", level: 1 },
    { id: "getting-started", title: "Getting Started", level: 1 },
    { id: "user-management", title: "User Management", level: 2 },
    { id: "auction-setup", title: "Auction Setup", level: 2 },
    { id: "core-features", title: "Core Features", level: 1 },
    { id: "forward-auctions", title: "Forward Auctions", level: 2 },
    { id: "reverse-auctions", title: "Reverse Auctions", level: 2 },
    { id: "marketplace", title: "Marketplace Management", level: 2 },
    { id: "administration", title: "Administration", level: 1 },
    { id: "security", title: "Security & Compliance", level: 2 },
    { id: "reporting", title: "Reporting & Analytics", level: 2 },
    { id: "integrations", title: "Integrations", level: 1 },
    { id: "api-overview", title: "API Overview", level: 2 },
    { id: "webhooks", title: "Webhooks", level: 2 },
    { id: "troubleshooting", title: "Troubleshooting", level: 1 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <section className="pt-24 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Resources
                </Link>
              </Button>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                <BookOpen className="h-3 w-3 mr-1" />
                Documentation
              </Badge>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete Platform Documentation</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Comprehensive guide to implementing and managing Briskon auction solutions
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                45 min read
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                12.5K views
              </div>
              <div>Last updated: December 2024</div>
            </div>

            <Button className="mb-6">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          item.level === 2 ? "pl-8 text-gray-600 dark:text-gray-400" : "font-medium"
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Overview Section */}
                <section id="overview" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Globe className="h-8 w-8 text-blue-600" />
                    Platform Overview
                  </h2>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Welcome to Briskon</h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          Briskon is a comprehensive enterprise auction platform designed to streamline procurement
                          processes, optimize vendor relationships, and maximize cost savings through intelligent
                          bidding mechanisms.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p>
                    This documentation provides a complete guide to implementing, configuring, and managing your Briskon
                    auction platform. Whether you're setting up your first auction or optimizing an existing deployment,
                    this guide covers everything you need to know.
                  </p>

                  <h3>Key Platform Capabilities</h3>
                  <div className="grid md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          <h4 className="font-semibold">Forward Auctions</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Traditional ascending-price auctions for selling assets and inventory
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <BarChart3 className="h-5 w-5 text-green-500" />
                          <h4 className="font-semibold">Reverse Auctions</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Procurement-focused bidding for cost optimization and supplier selection
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Globe className="h-5 w-5 text-purple-500" />
                          <h4 className="font-semibold">Marketplace</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Multi-vendor marketplace with integrated auction capabilities
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="h-5 w-5 text-blue-500" />
                          <h4 className="font-semibold">Enterprise Security</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Advanced security features and compliance management
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Getting Started Section */}
                <section id="getting-started" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Lightbulb className="h-8 w-8 text-green-600" />
                    Getting Started
                  </h2>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Quick Start Checklist</h4>
                        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                          <li>✓ Platform installation and configuration</li>
                          <li>✓ User accounts and role assignment</li>
                          <li>✓ First auction setup and testing</li>
                          <li>✓ Integration with existing systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 id="user-management">User Management</h3>
                  <p>
                    Effective user management is crucial for platform security and operational efficiency. Briskon
                    provides comprehensive user administration tools with role-based access control.
                  </p>

                  <h4>User Roles and Permissions</h4>
                  <div className="overflow-x-auto my-4">
                    <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">Role</th>
                          <th className="px-4 py-3 text-left font-semibold">Permissions</th>
                          <th className="px-4 py-3 text-left font-semibold">Use Case</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-4 py-3 font-medium">Super Admin</td>
                          <td className="px-4 py-3 text-sm">
                            Full platform access, user management, system configuration
                          </td>
                          <td className="px-4 py-3 text-sm">Platform administrators</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Auction Manager</td>
                          <td className="px-4 py-3 text-sm">Create/manage auctions, view reports, user oversight</td>
                          <td className="px-4 py-3 text-sm">Procurement managers</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Bidder</td>
                          <td className="px-4 py-3 text-sm">Participate in auctions, view bid history</td>
                          <td className="px-4 py-3 text-sm">Suppliers and buyers</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Observer</td>
                          <td className="px-4 py-3 text-sm">View-only access to auctions and reports</td>
                          <td className="px-4 py-3 text-sm">Stakeholders and auditors</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 id="auction-setup">Auction Setup</h3>
                  <p>
                    Setting up your first auction involves several key steps. This section walks you through the process
                    of creating, configuring, and launching successful auctions.
                  </p>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 my-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Best Practice</h4>
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          Always run a test auction with a small group of trusted users before launching your first
                          production auction. This helps identify any configuration issues early.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Core Features Section */}
                <section id="core-features" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Settings className="h-8 w-8 text-purple-600" />
                    Core Features
                  </h2>

                  <h3 id="forward-auctions">Forward Auctions</h3>
                  <p>
                    Forward auctions are traditional ascending-price auctions where bidders compete by placing
                    increasingly higher bids. These are ideal for selling assets, inventory, or services where you want
                    to maximize revenue.
                  </p>

                  <h4>Supported Auction Types</h4>
                  <div className="grid md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">English Auction</CardTitle>
                        <CardDescription>Classic ascending bid format</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          The most common auction format where bidders openly compete with increasing bids until no
                          higher bid is placed.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dutch Auction</CardTitle>
                        <CardDescription>Descending price format</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Price starts high and decreases until a bidder accepts the current price, ideal for quick
                          sales of perishable goods.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 id="reverse-auctions">Reverse Auctions</h3>
                  <p>
                    Reverse auctions flip the traditional model - suppliers compete by offering lower prices for your
                    procurement needs. This drives down costs and improves supplier competition.
                  </p>

                  <h3 id="marketplace">Marketplace Management</h3>
                  <p>
                    The marketplace feature allows you to create a multi-vendor environment where multiple sellers can
                    list products and services, with integrated auction capabilities.
                  </p>
                </section>

                <Separator className="my-8" />

                {/* Administration Section */}
                <section id="administration" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Monitor className="h-8 w-8 text-red-600" />
                    Administration
                  </h2>

                  <h3 id="security">Security & Compliance</h3>
                  <p>
                    Briskon implements enterprise-grade security measures to protect your data and ensure compliance
                    with industry standards.
                  </p>

                  <h4>Security Features</h4>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>End-to-end encryption for all data transmission</li>
                    <li>Multi-factor authentication (MFA) support</li>
                    <li>Role-based access control (RBAC)</li>
                    <li>Audit logging and compliance reporting</li>
                    <li>Regular security assessments and penetration testing</li>
                  </ul>

                  <h3 id="reporting">Reporting & Analytics</h3>
                  <p>
                    Comprehensive reporting tools provide insights into auction performance, user behavior, and cost
                    savings achieved through the platform.
                  </p>
                </section>

                <Separator className="my-8" />

                {/* Integrations Section */}
                <section id="integrations" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Code className="h-8 w-8 text-cyan-600" />
                    Integrations
                  </h2>

                  <h3 id="api-overview">API Overview</h3>
                  <p>
                    Briskon provides a comprehensive REST API that allows you to integrate the platform with your
                    existing systems and workflows.
                  </p>

                  <h3 id="webhooks">Webhooks</h3>
                  <p>
                    Webhooks enable real-time notifications about auction events, allowing your systems to respond
                    immediately to important changes.
                  </p>
                </section>

                <Separator className="my-8" />

                {/* Troubleshooting Section */}
                <section id="troubleshooting" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                    Troubleshooting
                  </h2>

                  <p>
                    This section covers common issues and their solutions. If you can't find the answer you're looking
                    for, please contact our support team.
                  </p>

                  <h3>Common Issues</h3>
                  <div className="space-y-4 my-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Login Issues</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">
                          <strong>Problem:</strong> Users cannot log in to the platform
                        </p>
                        <p className="text-sm">
                          <strong>Solution:</strong> Check user credentials, verify account status, and ensure MFA is
                          properly configured if enabled.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Auction Not Starting</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">
                          <strong>Problem:</strong> Scheduled auction fails to start automatically
                        </p>
                        <p className="text-sm">
                          <strong>Solution:</strong> Verify auction configuration, check system time synchronization,
                          and ensure all required participants are registered.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Next Steps */}
                <section className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-8 mt-12">
                  <h3 className="text-2xl font-bold mb-4">Next Steps</h3>
                  <p className="mb-6">
                    Now that you've reviewed the platform documentation, here are some recommended next steps:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button asChild>
                      <Link href="/resources/documentation/installation-guide">
                        <Database className="h-4 w-4 mr-2" />
                        Installation Guide
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/resources/developer/api-reference">
                        <Code className="h-4 w-4 mr-2" />
                        API Reference
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/demo">
                        <Monitor className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/contact">
                        <Users className="h-4 w-4 mr-2" />
                        Contact Support
                      </Link>
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
