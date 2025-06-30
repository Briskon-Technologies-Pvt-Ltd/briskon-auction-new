"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowRight,
  Search,
  Gavel,
  Trophy,
  DollarSign,
  Package,
  Users,
  Shield,
  Clock,
  TrendingUp,
  Info,
} from "lucide-react"

interface StepDetail {
  title: string
  description: string
  details: string[]
  tips: string[]
}

const stepDetails: Record<number, StepDetail> = {
  1: {
    title: "Browse & Search",
    description: "Discover items across thousands of auctions",
    details: [
      "Advanced search filters by category, price, location, and condition",
      "Save searches and get notifications for matching items",
      "View high-resolution images and detailed descriptions",
      "Access seller ratings and auction house credentials",
      "Compare similar items across different auctions",
    ],
    tips: [
      "Set up saved searches for items you collect",
      "Use the watchlist feature to track multiple auctions",
      "Check the auction house's shipping policies before bidding",
      "Review the condition reports carefully",
    ],
  },
  2: {
    title: "Place Your Bid",
    description: "Strategic bidding made simple",
    details: [
      "Real-time bid updates and countdown timers",
      "Automatic bid increments based on current price",
      "Maximum bid feature for automated bidding",
      "Bid history and competitor activity tracking",
      "Mobile notifications for outbid alerts",
    ],
    tips: [
      "Set a maximum budget before you start bidding",
      "Use the auto-bid feature to stay competitive",
      "Watch for last-minute bidding activity",
      "Factor in buyer's premium and shipping costs",
    ],
  },
  3: {
    title: "Win the Auction",
    description: "Secure your winning bid",
    details: [
      "Instant win confirmation via email and SMS",
      "Detailed invoice with all fees clearly listed",
      "Multiple payment options including cards and wire transfers",
      "Buyer protection for authenticated items",
      "Post-auction negotiation options for unsold lots",
    ],
    tips: [
      "Review the final invoice carefully before payment",
      "Pay promptly to maintain a good buyer rating",
      "Keep all auction documentation for your records",
      "Contact the seller immediately if you have concerns",
    ],
  },
  4: {
    title: "Receive Your Item",
    description: "Safe and secure delivery",
    details: [
      "Professional packing and shipping services",
      "Real-time shipment tracking",
      "Insurance options for high-value items",
      "White-glove delivery for delicate pieces",
      "International shipping coordination",
    ],
    tips: [
      "Inspect items immediately upon delivery",
      "Document any damage with photos",
      "Keep original packaging for valuable items",
      "Leave feedback to help other buyers",
    ],
  },
}

export default function HowItWorksPage() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How Forward Auctions Work
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the art of online bidding with our comprehensive guide to forward auctions
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Process Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">The Auction Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: "Browse & Search", step: 1 },
              { icon: Gavel, title: "Place Your Bid", step: 2 },
              { icon: Trophy, title: "Win the Auction", step: 3 },
              { icon: Package, title: "Receive Your Item", step: 4 },
            ].map((item, index) => (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedStep(item.step)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    <Info className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <item.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Click to learn more about this step</p>
                </CardContent>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Forward Auctions?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Competitive Pricing",
                description: "Market-driven prices ensure fair value for both buyers and sellers",
                onClick: () => setSelectedStep(5),
              },
              {
                icon: Shield,
                title: "Buyer Protection",
                description: "Comprehensive authentication and guarantee programs",
                onClick: () => setSelectedStep(6),
              },
              {
                icon: Clock,
                title: "Time-Efficient",
                description: "Quick auction cycles and instant notifications",
                onClick: () => setSelectedStep(7),
              },
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer" onClick={benefit.onClick}>
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Auction Timeline</h2>
          <div className="space-y-8">
            {[
              {
                time: "7 Days Before",
                title: "Preview Period Opens",
                description: "Browse catalog, inspect items, ask questions",
                action: "View preview tips",
                step: 8,
              },
              {
                time: "24 Hours Before",
                title: "Final Registration",
                description: "Complete registration and verify payment method",
                action: "Registration guide",
                step: 9,
              },
              {
                time: "Auction Day",
                title: "Live Bidding",
                description: "Real-time competitive bidding begins",
                action: "Bidding strategies",
                step: 10,
              },
              {
                time: "Post-Auction",
                title: "Settlement & Shipping",
                description: "Payment processing and delivery coordination",
                action: "Settlement info",
                step: 11,
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  {index < 3 && <div className="w-0.5 h-full bg-border" />}
                </div>
                <Card className="flex-1 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                        <CardTitle className="mt-1">{item.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedStep(item.step)}>
                        {item.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Bidding?</h2>
              <p className="text-xl mb-8 text-white/90">Join thousands of successful bidders on our platform</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Browse Live Auctions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={selectedStep !== null} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedStep && selectedStep <= 4 && stepDetails[selectedStep] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Step {selectedStep}: {stepDetails[selectedStep].title}
                </DialogTitle>
                <DialogDescription className="text-base">{stepDetails[selectedStep].description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {stepDetails[selectedStep].details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-2">
                    {stepDetails[selectedStep].tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
          {selectedStep === 5 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Competitive Pricing Benefits</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <p>Forward auctions create a competitive environment that benefits all participants:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>True Market Value:</strong> Prices are determined by actual demand, not arbitrary listings
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Global Reach:</strong> Access to international buyers increases competition and prices
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Price Discovery:</strong> Real-time bidding reveals true market demand
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
          {selectedStep === 6 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Comprehensive Buyer Protection</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <p>We prioritize buyer confidence with multiple layers of protection:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Authentication Guarantee:</strong> All high-value items verified by experts
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Condition Guarantee:</strong> Items match descriptions or money back
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Secure Payments:</strong> Escrow services for high-value transactions
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
          {selectedStep === 7 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Time-Efficient Auction Process</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <p>Our streamlined process saves you time at every step:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Quick Registration:</strong> One-time setup for all future auctions
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Automated Bidding:</strong> Set maximum bids and let the system work for you
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <strong>Instant Notifications:</strong> Real-time updates on all your auctions
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
          {selectedStep === 8 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Preview Period Best Practices</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <p>Make the most of the preview period with these strategies:</p>
                <ul className="space-y-3">
                  <li>• Request additional photos or videos of items</li>
                  <li>• Ask detailed questions about condition and provenance</li>
                  <li>• Research comparable sales for price guidance</li>
                  <li>• Schedule in-person inspections for high-value items</li>
                  <li>• Review all terms and conditions carefully</li>
                </ul>
              </div>
            </>
          )}
          {selectedStep === 9 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Registration Requirements</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <p>Complete these steps to ensure smooth auction participation:</p>
                <ul className="space-y-3">
                  <li>• Verify your identity with government-issued ID</li>
                  <li>• Add and verify payment methods</li>
                  <li>• Set up shipping addresses</li>
                  <li>• Review and accept auction terms</li>
                  <li>• Complete any required deposits for high-value auctions</li>
                </ul>
              </div>
            </>
          )}
          {selectedStep === 10 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Winning Bidding Strategies</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <p>Professional tips for successful bidding:</p>
                <ul className="space-y-3">
                  <li>• Set a firm maximum budget including all fees</li>
                  <li>• Use proxy bidding for efficiency</li>
                  <li>• Avoid emotional bidding wars</li>
                  <li>• Watch for soft closes and bid extensions</li>
                  <li>• Consider bidding on multiple similar items</li>
                </ul>
              </div>
            </>
          )}
          {selectedStep === 11 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Post-Auction Settlement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <p>What happens after you win:</p>
                <ul className="space-y-3">
                  <li>• Receive detailed invoice within 24 hours</li>
                  <li>• Payment due within 3-5 business days</li>
                  <li>• Choose shipping method and insurance</li>
                  <li>• Coordinate special handling requirements</li>
                  <li>• Track shipment and confirm delivery</li>
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
