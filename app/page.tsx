"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Globe,
  Gavel,
  Megaphone,
  Shield,
  TrendingUp,
  Clock,
  Play,
  MapPin,
  Sparkles,
  Check,
  BarChart3,
  Users,
  LineChart,
  Layers,
  Settings,
  Lock,
  Cpu,
  Code,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [visibleStats, setVisibleStats] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("overview");
  const [highlightSolutions, setHighlightSolutions] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const stats = [
    { icon: <Users className="h-6 w-6" />, number: "500+", label: "Enterprise Clients" },
    { icon: <BarChart3 className="h-6 w-6" />, number: "30%", label: "Avg. Revenue Increase" },
    { icon: <Clock className="h-6 w-6" />, number: "24/7", label: "Dedicated Support" },
    { icon: <Shield className="h-6 w-6" />, number: "99.99%", label: "Uptime Guarantee" },
  ];

const platformFeatures = [
  {
    icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    title: "AI-Powered Bidding",
    description: "Intelligent bidding algorithms that maximize your ROI.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-green-600" />,
    title: "Real-Time Analytics",
    description: "Comprehensive dashboards and reporting for data-driven decisions.",
  },
  {
    icon: <Layers className="h-6 w-6 text-purple-600" />,
    title: "Multi-Format Support",
    description: "Supports English, Dutch, Sealed Bid, and Reverse Auctions.",
  },
  {
    icon: <Lock className="h-6 w-6 text-orange-600" />,
    title: "Enterprise Security",
    description: "End-to-end encryption and multi-factor authentication.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-red-600" />,
    title: "Scalable Infrastructure",
    description: "Handles millions of transactions with ease.",
  },
  {
    icon: <Settings className="h-6 w-6 text-gray-600" />,
    title: "Customizable Platform",
    description: "White-label options and API integrations.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-yellow-600" />,
    title: "Advanced Dashboards",
    description: "Visualize key performance metrics with rich, interactive charts.",
  },
  {
    icon: <FileText className="h-6 w-6 text-indigo-600" />,
    title: "Content Management System",
    description: "Easily manage pages, listings, and user-generated content.",
  },
  {
    icon: <Globe className="h-6 w-6 text-pink-600" />,
    title: "Private Branding & Custom Links",
    description: "Custom domains, branded emails, and user-specific landing pages.",
  },
];
const platformBenefits = [
  {
    icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    title: "Increased Revenue",
    description: "Maximize your earnings with intelligent bidding and real-time insights.",
  },
  {
    icon: <Users className="h-6 w-6 text-green-600" />,
    title: "Improved Efficiency",
    description: "Automate key processes and reduce manual effort.",
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-600" />,
    title: "Enhanced Security",
    description: "Protect your data and transactions with enterprise-grade security.",
  },
  {
    icon: <Globe className="h-6 w-6 text-orange-600" />,
    title: "Global Reach",
    description: "Expand your market and reach new customers worldwide.",
  },
  {
    icon: <Gavel className="h-6 w-6 text-red-600" />,
    title: "Competitive Auctions",
    description: "Drive higher bids with dynamic auction formats and real-time participation.",
  },
  {
    icon: <Megaphone className="h-6 w-6 text-cyan-600" />,
    title: "Marketing Support",
    description: "Boost visibility with integrated marketing tools and outreach strategies.",
  },
];


const useCases = [
  {
    image: "/images/use-case-arts.webp",
    title: "Arts, Antiques & Collectibles",
    description: "Auction unique and rare pieces to a global audience of collectors.",
  },
  {
    image: "/images/use-case-real-estate.webp",
    title: "Real Estate & Property",
    description: "Sell residential, commercial, or land properties with transparent bidding.",
  },
  {
    image: "/images/use-case-automotive.webp",
    title: "Automotive & Vehicles",
    description: "Streamline sales of cars, trucks, fleets, and specialty vehicles.",
  },
  {
    image: "/images/use-case-construction.webp",
    title: "Construction & Industrial Equipment",
    description: "Auction heavy machinery, tools, and surplus equipment efficiently.",
  },
  {
    image: "/images/use-case-procurement.webp",
    title: "Procurement & B2B Reverse Auctions",
    description: "Reduce costs and optimize sourcing through competitive reverse auctions.",
  },
  {
    image: "/images/use-case-retail.webp",
    title: "Retail Liquidation & Excess Inventory",
    description: "Quickly offload overstock and returned goods across multiple categories.",
  },
  {
    image: "/images/use-case-government.webp",
    title: "Government & Municipal Surplus",
    description: "Dispose of public assets with transparency and compliance.",
  },
  {
    image: "/images/use-case-jewelry.webp",
    title: "Jewelry & Luxury Goods",
    description: "Sell high-value items like watches, gems, and designer goods securely.",
  },
  {
    image: "/images/use-case-tech.webp",
    title: "Technology & Electronics",
    description: "Liquidate IT assets, electronics, and gadgets with certified audits.",
  },
];


  const FloatingOrb = ({
    size,
    color,
    position,
    delay,
  }: { size: string; color: string; position: string; delay: number }) => (
    <div
      className={`absolute ${position} ${size} ${color} rounded-full blur-xl animate-pulse`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );

  const Floating3DShape = ({
    className,
    shape,
    size,
    color,
  }: { className: string; shape: string; size: number; color: string }) => {
    const shapeStyle = {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
    };

    let shapeElement;
    switch (shape) {
      case "cube":
        shapeElement = <div className="cube" style={shapeStyle} />;
        break;
      case "sphere":
        shapeElement = <div className="sphere" style={shapeStyle} />;
        break;
      case "pyramid":
        shapeElement = (
          <div
            className="pyramid"
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
        break;
      default:
        shapeElement = <div style={shapeStyle} />;
    }

    return (
      <div className={`absolute ${className}`} style={{ transformStyle: "preserve-3d" }}>
        {shapeElement}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced with 3D elements */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 overflow-hidden min-h-screen flex items-center gradient-animate"
      >
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:50px_50px]" />
        <div
          className="absolute inset-0 opacity-20 transition-all duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />

        {/* Enhanced floating elements with 3D shapes */}
        <FloatingOrb size="w-20 h-20" color="bg-blue-200/40" position="top-20 left-10" delay={0} />
        <FloatingOrb size="w-32 h-32" color="bg-cyan-200/40" position="top-40 right-20" delay={1000} />
        <FloatingOrb size="w-24 h-24" color="bg-purple-200/40" position="bottom-20 left-20" delay={2000} />

        {/* 3D Floating Shapes */}
        <Floating3DShape
          className="top-32 right-32 animate-rotate-slow"
          shape="cube"
          size={40}
          color="rgba(59, 130, 246, 0.15)"
        />
        <Floating3DShape
          className="bottom-32 right-16 animate-float-reverse"
          shape="sphere"
          size={60}
          color="rgba(168, 85, 247, 0.15)"
        />
        <Floating3DShape
          className="top-1/2 left-16 animate-bounce-gentle"
          shape="pyramid"
          size={50}
          color="rgba(34, 197, 94, 0.15)"
        />

        <div className="relative container mx-auto px-4 py-20 pt-24 perspective-1000">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-blue-100 text-blue-700 border border-blue-200 animate-pulse-glow inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-200">
                    <Sparkles className="h-4 w-4 animate-bounce-gentle" />
                    Powering Auction Intelligence Since 2005
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                    <span className="block animate-slide-in-up">The Briskon Auction Framework</span>
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent block animate-slide-in-up delay-300">
                       Accelerating Global Marketplaces
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed animate-slide-in-up delay-500">
                     Technology that provides advanced bidding, live performance data, and guaranteed transactions for all business needs
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500 animate-slide-in-up delay-700">
                  <div className="flex items-center gap-2 hover-lift">
                    <MapPin className="h-4 w-4 animate-bounce-gentle" />
                    <span>Bangalore, India</span>
                  </div>
                  <div className="flex items-center gap-2 hover-lift">
                    <MapPin className="h-4 w-4 animate-bounce-gentle delay-200" />
                    <span>Dallas, USA</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up delay-1000">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 shadow-md border border-blue-700 transition-smooth hover-lift transform-3d"
                    onClick={() => document.querySelector("#platform-overview")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Explore Platform
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-8 py-4 backdrop-blur-sm transition-smooth hover-lift"
                    asChild
                  >
                    <Link href="/demo">
                      <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative animate-slide-in-up delay-1200 perspective-1000">
                <div className="relative bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-200 hover:border-gray-300 transition-smooth shadow-lg hover-tilt">
                  <Image
                    src="/images/auction-interface.png"
                    alt="Briskon Auction Platform Interface"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl transition-smooth hover:scale-105 hover-lift"
                  />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-pulse-glow" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse-glow delay-1000" />

                  {/* Floating data points */}
                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg animate-float">
                    <div className="text-xs font-semibold text-green-600">+24% Revenue</div>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg animate-float-reverse">
                    <div className="text-xs font-semibold text-blue-600">Live Bidding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section
        id="platform-overview"
        className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:30px_30px]" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 border border-blue-200 animate-pulse-glow inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-200">Platform Overview</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                The Complete Auction Intelligence Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our enterprise-grade platform combines cutting-edge technology with decades of auction expertise to
                deliver unmatched results.
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gray-100 backdrop-blur-sm">
                  <TabsTrigger value="overview" className="text-sm md:text-base hover:text-blue-600 hover:bg-white transition-colors">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="features" className="text-sm md:text-base hover:text-blue-600 hover:bg-white transition-colors">
                    Key Features
                  </TabsTrigger>
                  <TabsTrigger value="benefits" className="text-sm md:text-base hover:text-blue-600 hover:bg-white transition-colors">
                    Benefits
                  </TabsTrigger>
                  <TabsTrigger value="use-cases" className="text-sm md:text-base hover:text-blue-600 hover:bg-white transition-colors">
                    Use Cases
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Image
                      src="/images/platform-showcase.png"
                      alt="Briskon Platform Overview"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Enterprise-Grade Auction Technology
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Briskon's auction platform is a comprehensive solution designed for businesses of all sizes. Our
                      platform supports multiple auction formats, from traditional English auctions to complex reverse
                      auctions for procurement.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "AI-powered bidding optimization",
                        "Real-time analytics and reporting",
                        "Multi-format auction support",
                        "Enterprise-grade security",
                        "Seamless integration capabilities",
                        "White-label and customization options",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      asChild
                    >
                      <Link href="/platform">
                        Learn More
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platformFeatures.map((feature, index) => (
                    <Card
                      key={index}
                      className="bg-white border-gray-200 backdrop-blur-sm hover:bg-gray-50 transition-smooth hover:shadow-xl hover:border-gray-300 card-hover animate-slide-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 hover-lift">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    asChild
                  >
                    <Link href="/get-started">
                      Get Started                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {platformBenefits.map((benefit, index) => (
                    <Card
                      key={index}
                      className="bg-white border-gray-200 backdrop-blur-sm hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:border-gray-300"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                            {benefit.icon}
                          </div>
                          <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    asChild
                  >
                    <Link href="/resources/case-studies">
                      View Success Stories
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="use-cases" className="mt-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {useCases.map((useCase, index) => (
                    <Card
                      key={index}
                      className="bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:border-gray-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={useCase.image || "/placeholder.svg"}
                          alt={useCase.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900">{useCase.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-600">{useCase.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    asChild
                  >
                    <Link href="/get-started">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Auction Types Section */}
      <section
        id="auction-types"
        className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:30px_30px]" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 border border-blue-200 animate-pulse-glow inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-200">Auction Solutions</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Comprehensive Auction Formats</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform supports multiple auction types to meet your specific business needs.
              </p>
            </div>

            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    Forward Auctions
                  </h3>
                  <p className="text-gray-600">
                    Traditional seller-to-buyer auctions where the highest bidder wins. Perfect for asset sales, real
                    estate, and retail.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      English
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Dutch
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Sealed Bid
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Yankee
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-600 rotate-180" />
                    Reverse Auctions
                  </h3>
                  <p className="text-gray-600">
                    Buyer-centric auctions where sellers compete to offer the lowest price. Ideal for procurement and
                    sourcing.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      English Reverse
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      RFQ
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      RFP
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Supplier Bidding
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Globe className="h-6 w-6 text-purple-600" />
                    Marketplace Solutions
                  </h3>
                  <p className="text-gray-600">
                    Multi-vendor platforms that connect buyers and sellers in a secure, transparent environment.
                  </p>
                </div>

                <Button
                  
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  asChild
                >
                  <Link href="/solutions">
                  Explore All Solutions
                  </Link>
                </Button>
              </div>
              <div className="relative w-full h-[475px]">
                <Image
                  src="/images/auction-types-holographic.png"
                  alt="Briskon Auction Types"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain rounded-xl shadow-2xl border border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section with 3D effects */}
      <section className="py-16 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 gradient-animate" />

        {/* 3D floating elements */}
        <Floating3DShape
          className="top-8 left-8 animate-rotate-slow"
          shape="cube"
          size={30}
          color="rgba(59, 130, 246, 0.15)"
        />
        <Floating3DShape
          className="bottom-8 right-8 animate-float"
          shape="sphere"
          size={40}
          color="rgba(168, 85, 247, 0.15)"
        />

        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform transition-smooth hover-lift card-hover animate-slide-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setVisibleStats(true)}
                >
                  <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 hover-lift animate-bounce-gentle">
                      {stat.icon}
                    </div>
                    {stat.number}
                  </div>
                  <div className="text-gray-900 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Deployment Options Section */}
<section
  id="deployment-options"
  className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden"
>
  <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:30px_30px]" />
  <div className="relative container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="bg-blue-100 text-blue-700 border border-blue-200 animate-pulse-glow inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-200">Get Started</Badge>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Flexible Deployment Options</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the implementation approach that best fits your business needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="flex flex-col bg-white border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">On-Premise Installation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <p className="text-gray-600">
              Deploy our auction platform on your own infrastructure for maximum control and security.
            </p>
            <ul className="space-y-2">
              {[
                "Complete control over data",
                "Custom security policies",
                "Integration with existing systems",
                "Dedicated support team",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-4">
            <Button
              variant="outline"
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
              asChild
            >
              <Link href="/get-started/on-premise">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col bg-white border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/50">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">Custom Development</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <p className="text-gray-600">
              Tailored solutions designed specifically for your unique business requirements.
            </p>
            <ul className="space-y-2">
              {[
                "Bespoke functionality",
                "Unique user experience",
                "Specialized integrations",
                "Dedicated project team",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-4">
            <Button
              variant="outline"
              className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
              asChild
            >
              <Link href="/get-started/custom-development">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col bg-white border-gray-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-100/50">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-cyan-600 rounded text-xs flex items-center justify-center text-white font-bold">
                WL
              </div>
            </div>
            <CardTitle className="text-xl text-gray-900">White Label Solution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <p className="text-gray-600">
              Launch your own branded auction platform quickly with our turnkey solution.
            </p>
            <ul className="space-y-2">
              {["Rapid deployment", "Custom branding", "Full feature set", "Ongoing updates"].map(
                (item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </CardContent>
          <CardFooter className="p-4">
            <Button
              variant="outline"
              className="w-full border-cyan-300 text-cyan-600 hover:bg-cyan-50"
              asChild
            >
              <Link href="/get-started/white-label">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-[#1db0e5] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:50px_50px]" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Auction Experience?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join hundreds of enterprises who trust Briskon for their auction technology needs. Experience the platform
              that's redefining what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 shadow-md border border-white transition-all duration-300"
                asChild
              >
                <Link href="/demo">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-4 transition-all duration-300"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
