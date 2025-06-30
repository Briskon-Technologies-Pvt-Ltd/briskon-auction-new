"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, CheckCircle, Play, BarChart3, Settings, Brain, Cpu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PlatformPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-500/30">Enterprise Platform</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Next-Generation
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Auction Platform
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Built for enterprise scale with AI-powered intelligence, advanced security, and global scalability.
              Transform your auction operations with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Tabs Navigation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12 h-14">
                <TabsTrigger value="overview" className="text-sm font-medium">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="how-it-works" className="text-sm font-medium">
                  How it Works
                </TabsTrigger>
                <TabsTrigger value="ai-capabilities" className="text-sm font-medium">
                  AI Capabilities
                </TabsTrigger>
                <TabsTrigger value="live-demo" className="text-sm font-medium">
                  Live Demo
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform Overview</h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Our comprehensive auction platform combines cutting-edge technology with enterprise-grade
                    reliability to deliver exceptional auction experiences.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Capabilities</h3>
                    <div className="space-y-4">
                      {[
                        "Real-time bidding with millisecond precision",
                        "AI-powered market analysis and predictions",
                        "Multi-currency and multi-language support",
                        "Advanced fraud detection and prevention",
                        "Comprehensive auction management tools",
                        "Mobile-first responsive design",
                      ].map((capability, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-slate-700">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=400&width=600&text=Platform+Dashboard"
                      alt="Platform Dashboard"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* How it Works Tab */}
              <TabsContent value="how-it-works" className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Our Platform Works</h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    A streamlined process designed for maximum efficiency and user experience.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      step: "1",
                      title: "Setup & Configuration",
                      description:
                        "Configure your auction parameters, set bidding rules, and customize the platform to match your requirements.",
                      icon: <Settings className="h-8 w-8" />,
                    },
                    {
                      step: "2",
                      title: "Launch & Monitor",
                      description:
                        "Launch your auction with real-time monitoring, automated notifications, and comprehensive analytics.",
                      icon: <BarChart3 className="h-8 w-8" />,
                    },
                    {
                      step: "3",
                      title: "Close & Analyze",
                      description:
                        "Automatically close auctions, process payments, and generate detailed performance reports.",
                      icon: <CheckCircle className="h-8 w-8" />,
                    },
                  ].map((step, index) => (
                    <Card key={index} className="text-center border-0 shadow-lg">
                      <CardHeader>
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="text-blue-600">{step.icon}</div>
                        </div>
                        <Badge className="mx-auto mb-2">Step {step.step}</Badge>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <CardDescription className="text-base">{step.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* AI Capabilities Tab */}
              <TabsContent value="ai-capabilities" className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">AI-Powered Intelligence</h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Advanced artificial intelligence capabilities that transform how auctions operate.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Smart Bidding",
                      description: "AI algorithms optimize bidding strategies in real-time",
                      icon: <Brain className="h-8 w-8" />,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "Predictive Analytics",
                      description: "Forecast market trends and auction outcomes",
                      icon: <BarChart3 className="h-8 w-8" />,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      title: "Fraud Detection",
                      description: "Advanced ML models detect suspicious activities",
                      icon: <Shield className="h-8 w-8" />,
                      color: "from-red-500 to-pink-500",
                    },
                    {
                      title: "Auto-Optimization",
                      description: "Continuously improve platform performance",
                      icon: <Cpu className="h-8 w-8" />,
                      color: "from-purple-500 to-violet-500",
                    },
                  ].map((capability, index) => (
                    <Card key={index} className="text-center border-0 shadow-lg">
                      <CardHeader>
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${capability.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                        >
                          <div className="text-white">{capability.icon}</div>
                        </div>
                        <CardTitle className="text-lg">{capability.title}</CardTitle>
                        <CardDescription>{capability.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Live Demo Tab */}
              <TabsContent value="live-demo" className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Experience the Platform</h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    See our auction platform in action with interactive demonstrations and real-time features.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-8">
                  <div className="max-w-4xl mx-auto">
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center mb-8">
                      <div className="text-center">
                        <Play className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Interactive Demo</h3>
                        <p className="text-slate-600 mb-6">Experience the full platform capabilities</p>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href="/demo">
                            <Play className="mr-2 h-5 w-5" />
                            Launch Demo
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Live Bidding",
                          description: "Real-time auction simulation",
                          duration: "5 min demo",
                        },
                        {
                          title: "Admin Dashboard",
                          description: "Complete management interface",
                          duration: "10 min demo",
                        },
                        {
                          title: "Analytics Suite",
                          description: "Comprehensive reporting tools",
                          duration: "7 min demo",
                        },
                      ].map((demo, index) => (
                        <Card key={index} className="text-center">
                          <CardHeader>
                            <CardTitle className="text-lg">{demo.title}</CardTitle>
                            <CardDescription>{demo.description}</CardDescription>
                            <Badge variant="outline">{demo.duration}</Badge>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Experience the Platform?</h2>
            <p className="text-xl text-slate-600 mb-8">
              See how our enterprise auction platform can transform your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/demo">Schedule Demo</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
