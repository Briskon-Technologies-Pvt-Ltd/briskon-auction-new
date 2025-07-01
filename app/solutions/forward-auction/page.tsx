"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TrendingUp,
  Clock,
  Shield,
  Target,
  CheckCircle,
  ArrowRight,
  Play,
  Globe,
  Award,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Heart,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ForwardAuctionPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    revenue: 0,
    satisfaction: 0,
    efficiency: 0,
    reach: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        revenue: 45,
        satisfaction: 98,
        efficiency: 67,
        reach: 150,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const blogPosts = [
    {
      title: "The Psychology Behind Competitive Bidding",
      excerpt:
        "Understanding what drives bidders to compete and how to leverage this in your auctions.",
      image: "/placeholder.svg?height=200&width=300&text=Psychology+Bidding",
      author: "Sarah Chen",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Strategy",
    },
    {
      title: "Maximizing Art Auction Revenue: A Complete Guide",
      excerpt:
        "Proven strategies for art dealers to achieve record-breaking sales through forward auctions.",
      image: "/placeholder.svg?height=200&width=300&text=Art+Auction+Guide",
      author: "Michael Torres",
      date: "Dec 12, 2024",
      readTime: "8 min read",
      category: "Industry",
    },
    {
      title: "Real Estate Auctions: The Future of Property Sales",
      excerpt:
        "How forward auctions are revolutionizing real estate transactions worldwide.",
      image: "/placeholder.svg?height=200&width=300&text=Real+Estate+Future",
      author: "Emma Rodriguez",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Trends",
    },
    {
      title: "Building Trust in Online Auctions",
      excerpt:
        "Essential security measures and trust-building strategies for successful online auctions.",
      image: "/placeholder.svg?height=200&width=300&text=Trust+Building",
      author: "David Kim",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      category: "Security",
    },
  ];

  const faqs = [
    {
      question:
        "What makes Briskon's Forward Auction different from traditional auction platforms?",
      answer:
        "Briskon's Forward Auction platform combines AI-powered pricing optimization, real-time global bidding, and enterprise-grade security. Our unique features include intelligent starting price suggestions, automated bid increments, proxy bidding, and comprehensive fraud protection - all designed to maximize your revenue while ensuring a seamless experience for bidders worldwide.",
    },
    {
      question: "How does Briskon ensure fair and transparent bidding?",
      answer:
        "We maintain complete transparency through real-time bid tracking, comprehensive audit trails, and verified bidder identities. Our platform includes anti-sniping technology with automatic time extensions, proxy bidding to prevent last-second manipulation, and detailed bidding history that's available to all participants.",
    },
    {
      question: "What types of items work best with Forward Auctions?",
      answer:
        "Forward auctions excel with unique, rare, or high-demand items where competitive bidding can drive prices above market value. This includes art and collectibles, luxury goods, real estate, vintage items, limited editions, and any products where scarcity and desirability create competitive tension among buyers.",
    },
    {
      question: "How quickly can I set up my first auction on Briskon?",
      answer:
        "With Briskon's streamlined setup process, you can launch your first auction in under 30 minutes. Our AI-assisted item categorization, automated pricing suggestions, and pre-built auction templates make it incredibly fast to get started. Plus, our onboarding team provides personalized support to ensure optimal results.",
    },
    {
      question: "What support does Briskon provide for high-value auctions?",
      answer:
        "For high-value auctions, we offer dedicated account management, custom marketing support, enhanced security measures, escrow services, insurance options, and white-glove customer service. Our team works closely with you to ensure maximum exposure and optimal results for your premium items.",
    },
    {
      question:
        "Can I integrate Briskon's auction platform with my existing systems?",
      answer:
        "Briskon offers comprehensive APIs and integrations with popular e-commerce platforms, CRM systems, payment processors, and inventory management tools. Our technical team provides full integration support to ensure seamless connectivity with your existing business infrastructure.",
    },
  ];

  const nextBlog = () => {
    setCurrentBlogIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const prevBlog = () => {
    setCurrentBlogIndex(
      (prev) => (prev - 1 + blogPosts.length) % blogPosts.length
    );
  };

  const auctionSteps = [
    {
      title: "Item Registration",
      description:
        "Sellers register their items with detailed descriptions, images, and starting prices.",
      icon: <Target className="h-6 w-6" />,
      details:
        "Our AI-powered system helps optimize starting prices and categorization for maximum visibility.",
      image: "/images/registration.jpg", //  step image
    },
    {
      title: "Auction Goes Live",
      description:
        "The auction begins with the starting bid, and participants can place competing bids.",
      icon: <Play className="h-6 w-6" />,
      details:
        "Real-time bidding with instant notifications and automatic bid increments.",
      image: "/images/lives.jpg", //  step imag
    },
    {
      title: "Competitive Bidding",
      description:
        "Bidders compete by placing higher bids, driving the price upward.",
      icon: <TrendingUp className="h-6 w-6" />,
      details:
        "Advanced bidding strategies including proxy bidding and last-minute extensions.",
      image: "/images/compititive.jpg", //  step imag
    },
    {
      title: "Auction Closes",
      description:
        "The highest bidder wins the item when the auction timer expires.",
      icon: <Award className="h-6 w-6" />,
      details:
        "Secure payment processing and automated winner notifications with next steps.",
      image: "/images/closed.jpg", //  step imag
    },
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Maximize Revenue",
      description:
        "Competitive bidding drives prices higher than fixed-price sales",
      stat: "45% higher revenue on average",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Global Reach",
      description:
        "Access to worldwide bidders increases demand and competition",
      stat: "150+ countries reached",
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Time Efficiency",
      description: "Automated processes reduce time-to-sale significantly",
      stat: "67% faster sales cycle",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Secure Transactions",
      description: "Enterprise-grade security with fraud protection",
      stat: "99.9% secure transactions",
    },
  ];

  const features = [
    {
      category: "Bidding Features",
      items: [
        "Real-time bidding engine",
        "Proxy bidding system",
        "Auto-bid increments",
        "Bid history tracking",
        "Last-minute extensions",
        "Mobile bidding app",
      ],
    },
    {
      category: "Seller Tools",
      items: [
        "AI-powered pricing",
        "Bulk item upload",
        "Advanced analytics",
        "Custom auction rules",
        "Reserve price setting",
        "Seller dashboard",
      ],
    },
    {
      category: "Security & Trust",
      items: [
        "Identity verification",
        "Payment protection",
        "Fraud detection",
        "Dispute resolution",
        "Insurance options",
        "Escrow services",
      ],
    },
  ];

  const useCases = [
    {
      title: "Art & Collectibles",
      description:
        "Rare paintings, vintage items, and collectibles achieve premium prices through competitive bidding.",
      image: "/placeholder.svg?height=200&width=300&text=Art+Auction",
      results: "Average 40% price premium over estimates",
    },
    {
      title: "Real Estate",
      description:
        "Properties sold through transparent auctions with global bidder participation.",
      image: "/placeholder.svg?height=200&width=300&text=Real+Estate",
      results: "95% sale rate within 30 days",
    },
    {
      title: "Luxury Goods",
      description:
        "High-end watches, jewelry, and luxury items reach their true market value.",
      image: "/placeholder.svg?height=200&width=300&text=Luxury+Goods",
      results: "Record-breaking sales achieved",
    },
    {
      title: "Industrial Equipment",
      description:
        "Heavy machinery and industrial assets liquidated efficiently to global buyers.",
      image: "/placeholder.svg?height=200&width=300&text=Industrial+Equipment",
      results: "60% faster liquidation process",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <TrendingUp className="h-4 w-4 mr-2" />
              Briskon Forward Auction Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Where Every Bid
              <br />
              Tells a Story
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Welcome to Briskon's Forward Auction platform - where the thrill
              of competition meets cutting-edge technology. Watch as passionate
              bidders from around the world compete for your treasures, driving
              prices beyond expectations while you enjoy complete transparency
              and security.
            </p>

            {/* Interactive Introduction Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Built for Passion</h3>
                  <p className="text-sm text-slate-600">
                    Every auction tells a story of desire, competition, and
                    discovery
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">AI-Powered Magic</h3>
                  <p className="text-sm text-slate-600">
                    Smart algorithms optimize every aspect of your auction
                    experience
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-slate-600">
                    From listing to sale in minutes, not days
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                asChild
              >
                <Link href="/demo">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/get-started">
                  Start Your Auction
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Briskon Special */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Briskon Forward Auctions?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We're not just another auction platform. We're your partner in
              creating extraordinary selling experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {animatedStats.revenue}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Higher Revenue
              </div>
              <div className="text-xs text-slate-500 mt-1">
                vs traditional sales
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {animatedStats.satisfaction}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                User Satisfaction
              </div>
              <div className="text-xs text-slate-500 mt-1">
                seller happiness rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {animatedStats.efficiency}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Faster Sales
              </div>
              <div className="text-xs text-slate-500 mt-1">
                time to completion
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {animatedStats.reach}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Countries
              </div>
              <div className="text-xs text-slate-500 mt-1">global reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              How Briskon Forward Auctions Work
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Follow the journey from item listing to successful sale through
              our streamlined auction process
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {auctionSteps.map((step, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 ${
                      activeStep === index
                        ? "border-blue-500 shadow-lg scale-105"
                        : "hover:shadow-md hover:scale-102"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            activeStep === index
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 mb-2">
                            {step.description}
                          </p>
                          {activeStep === index && (
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {step.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* <div className="relative">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
                  <Image
                    src={auctionSteps[activeStep].image}
                    alt={auctionSteps[activeStep].title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {auctionSteps[activeStep].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {auctionSteps[activeStep].title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {auctionSteps[activeStep].details}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          ((activeStep + 1) / auctionSteps.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div> */}
              <div className="relative self-stretch h-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
                  <Image
                    src={auctionSteps[activeStep].image}
                    alt={auctionSteps[activeStep].title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-2xl"
                  />
                  <div className="p-8"> 
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {auctionSteps[activeStep].icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {auctionSteps[activeStep].title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {auctionSteps[activeStep].details}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            ((activeStep + 1) / auctionSteps.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              The Briskon Advantage
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover the compelling advantages that make Briskon forward
              auctions the preferred choice for sellers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {benefit.description}
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    {benefit.stat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Carousel */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Latest Insights & Tips
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Stay ahead with expert advice on forward auction strategies
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentBlogIndex * 100}%)` }}
              >
                {blogPosts.map((post, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="mx-4 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary">{post.category}</Badge>
                            <span className="text-sm text-slate-500">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {post.author}
                              </span>
                              <Calendar className="h-4 w-4 text-slate-400 ml-2" />
                              <span className="text-sm text-slate-600">
                                {post.date}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm">
                              Read More <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg"
              onClick={prevBlog}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg"
              onClick={nextBlog}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex justify-center mt-6 gap-2">
              {blogPosts.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentBlogIndex
                      ? "bg-blue-600 w-8"
                      : "bg-slate-300"
                  }`}
                  onClick={() => setCurrentBlogIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to run successful auctions, from basic bidding
              to advanced enterprise features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Success Stories Across Industries
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See how Briskon forward auctions transform sales across diverse
              markets and industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={useCase.image || "/placeholder.svg"}
                    alt={useCase.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{useCase.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {useCase.description}
                  </p>
                  <Badge className="bg-green-100 text-green-700">
                    {useCase.results}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about Briskon's Forward Auction
              platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Forward Auction Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of successful sellers who have discovered the power
            of Briskon's competitive bidding platform. Start your auction
            journey today and watch your items achieve their true market value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/get-started">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
