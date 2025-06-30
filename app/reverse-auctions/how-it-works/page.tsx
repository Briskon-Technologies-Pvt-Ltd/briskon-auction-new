"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  DollarSign,
  Clock,
  Shield,
  TrendingDown,
  FileText,
  CheckCircle,
  Target,
  Award,
  BarChart3,
  Star,
  Timer,
  Trophy,
} from "lucide-react"

export default function ReverseAuctionsHowItWorks() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  const processSteps = [
    {
      id: 1,
      title: "Buyer Posts Request",
      description: "Define your requirements and budget",
      icon: FileText,
      color: "bg-blue-500",
      details: {
        overview: "Buyers create detailed requests for products or services they need to purchase.",
        whatHappens: [
          "Buyer creates a detailed specification document",
          "Sets maximum budget and timeline requirements",
          "Defines quality standards and delivery terms",
          "Publishes the request to qualified sellers",
        ],
        tips: [
          "Be as specific as possible in your requirements",
          "Set realistic budgets based on market research",
          "Include all necessary technical specifications",
          "Define clear evaluation criteria",
        ],
      },
    },
    {
      id: 2,
      title: "Sellers Submit Bids",
      description: "Qualified vendors compete with lower prices",
      icon: TrendingDown,
      color: "bg-green-500",
      details: {
        overview: "Qualified sellers review the request and submit competitive bids with decreasing prices.",
        whatHappens: [
          "Sellers review buyer requirements",
          "Submit initial competitive bids",
          "Provide detailed proposals and timelines",
          "Compete by lowering prices during auction",
        ],
        tips: [
          "Start with competitive but profitable pricing",
          "Highlight your unique value propositions",
          "Provide detailed delivery timelines",
          "Include references and certifications",
        ],
      },
    },
    {
      id: 3,
      title: "Competitive Bidding",
      description: "Real-time price competition drives costs down",
      icon: Timer,
      color: "bg-orange-500",
      details: {
        overview:
          "Sellers engage in real-time bidding, competing to offer the lowest price while meeting requirements.",
        whatHappens: [
          "Real-time bidding interface opens",
          "Sellers can see current lowest bid (anonymous)",
          "Continuous price reductions throughout auction",
          "Automatic bid notifications and updates",
        ],
        tips: [
          "Monitor the auction closely for bid updates",
          "Have your minimum acceptable price predetermined",
          "Consider total value, not just lowest price",
          "Use auto-bidding features strategically",
        ],
      },
    },
    {
      id: 4,
      title: "Winner Selection",
      description: "Best value proposal wins the contract",
      icon: Trophy,
      color: "bg-purple-500",
      details: {
        overview: "Buyer evaluates all bids and selects the winner based on price, quality, and other factors.",
        whatHappens: [
          "Auction closes at predetermined time",
          "Buyer reviews all final bids and proposals",
          "Evaluation based on price and qualitative factors",
          "Winner notification and contract initiation",
        ],
        tips: [
          "Consider total cost of ownership, not just price",
          "Evaluate seller reputation and track record",
          "Review delivery timelines and terms carefully",
          "Negotiate final terms if needed",
        ],
      },
    },
  ]

  const benefits = [
    {
      title: "Cost Savings",
      description: "Achieve 10-30% cost reductions through competitive bidding",
      icon: DollarSign,
      details: {
        keyBenefits: [
          "Transparent price competition",
          "Market-driven pricing discovery",
          "Elimination of price inflation",
          "Bulk purchasing advantages",
        ],
        howItWorks:
          "Sellers compete to offer the lowest price while maintaining quality standards, naturally driving costs down through market competition.",
        realWorldExample:
          "A manufacturing company reduced their raw material costs by 25% using reverse auctions for steel procurement.",
      },
    },
    {
      title: "Time Efficiency",
      description: "Complete procurement processes in days, not weeks",
      icon: Clock,
      details: {
        keyBenefits: [
          "Accelerated vendor selection",
          "Simultaneous bid evaluation",
          "Automated comparison tools",
          "Streamlined negotiation process",
        ],
        howItWorks:
          "Multiple suppliers bid simultaneously, eliminating the need for sequential negotiations and reducing procurement cycle time.",
        realWorldExample:
          "A tech startup reduced their vendor selection process from 6 weeks to 3 days using reverse auctions.",
      },
    },
    {
      title: "Quality Assurance",
      description: "Pre-qualified vendors ensure quality standards",
      icon: Shield,
      details: {
        keyBenefits: [
          "Vendor pre-qualification process",
          "Quality certification requirements",
          "Performance history tracking",
          "Compliance verification",
        ],
        howItWorks:
          "Only pre-qualified vendors who meet quality standards can participate, ensuring you get competitive prices without compromising quality.",
        realWorldExample:
          "A healthcare provider maintained 99.5% quality standards while reducing costs by 20% through qualified vendor networks.",
      },
    },
    {
      title: "Market Intelligence",
      description: "Gain insights into market pricing and trends",
      icon: BarChart3,
      details: {
        keyBenefits: [
          "Real-time market pricing data",
          "Competitive landscape insights",
          "Trend analysis and forecasting",
          "Benchmarking opportunities",
        ],
        howItWorks:
          "Auction data provides valuable market intelligence, helping you understand fair market prices and supplier capabilities.",
        realWorldExample:
          "A retail chain used auction data to negotiate better terms with existing suppliers, saving an additional 15%.",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">Reverse Auctions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              How Reverse Auctions Work
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover how buyers can leverage competitive bidding to reduce costs, save time, and find the best
              suppliers for their needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-sm hover:shadow-md transition-all duration-200"
              >
                Start Your First Reverse Auction
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
              >
                View Live Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Reverse Auction Process</h2>
            <p className="text-xl text-muted-foreground">A step-by-step guide to running successful reverse auctions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <Dialog key={step.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="text-center">
                        <div
                          className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Step {step.id}</div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="ghost"
                          className="w-full hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          Learn More <ArrowDown className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        Step {step.id}: {step.title}
                      </DialogTitle>
                      <DialogDescription className="text-base">{step.details.overview}</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="process" className="mt-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="process">What Happens</TabsTrigger>
                        <TabsTrigger value="tips">Pro Tips</TabsTrigger>
                      </TabsList>
                      <TabsContent value="process" className="space-y-4">
                        <div className="space-y-3">
                          {step.details.whatHappens.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="tips" className="space-y-4">
                        <div className="space-y-3">
                          {step.details.tips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>

          {/* Process Flow Visualization */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                >
                  {step.id}
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowDown className="h-6 w-6 text-muted-foreground mx-4 rotate-90" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Reverse Auctions?</h2>
            <p className="text-xl text-muted-foreground">
              Discover the key advantages that make reverse auctions a powerful procurement tool
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{benefit.title}</CardTitle>
                            <CardDescription className="text-base">{benefit.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button variant="ghost" className="w-full">
                          Explore Benefits <ArrowDown className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        {benefit.title}
                      </DialogTitle>
                      <DialogDescription className="text-base">{benefit.details.howItWorks}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 mt-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Key Benefits
                        </h4>
                        <div className="space-y-2">
                          {benefit.details.keyBenefits.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-600" />
                          Real-World Example
                        </h4>
                        <p className="text-sm text-muted-foreground">{benefit.details.realWorldExample}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Typical Reverse Auction Timeline</h2>
            <p className="text-xl text-muted-foreground">
              From request to contract - see how quickly you can complete your procurement
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                day: "Day 1",
                title: "Request Creation",
                description: "Define requirements and publish to qualified vendors",
              },
              {
                day: "Day 2-3",
                title: "Vendor Registration",
                description: "Qualified suppliers register and submit initial proposals",
              },
              { day: "Day 4", title: "Live Auction", description: "Real-time competitive bidding session (2-4 hours)" },
              { day: "Day 5", title: "Evaluation & Award", description: "Review bids and select winning proposal" },
              {
                day: "Day 6-7",
                title: "Contract Finalization",
                description: "Negotiate final terms and execute contract",
              },
            ].map((phase, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {phase.day}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your First Reverse Auction?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of buyers who have saved millions through competitive reverse auctions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              Create Your First Auction
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-red-600 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
