"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Crown, Check, Star, Zap, Shield, Users, Phone, Clock, Trophy, Gem, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const plans = [
    {
      id: "basic",
      name: "Auction Explorer",
      description: "Perfect for casual bidders and collectors",
      monthlyPrice: 19,
      annualPrice: 190,
      color: "from-blue-500 to-cyan-500",
      icon: <Users className="h-8 w-8" />,
      features: [
        "Access to all public auctions",
        "Basic bidding capabilities",
        "Email notifications",
        "Standard customer support",
        "Auction history tracking",
        "Watchlist up to 50 items",
        "Mobile app access",
      ],
      limitations: ["No VIP auctions", "No early access", "Standard fees"],
    },
    {
      id: "premium",
      name: "VIP Collector",
      description: "Enhanced experience for serious collectors",
      monthlyPrice: 79,
      annualPrice: 790,
      color: "from-purple-500 to-pink-500",
      icon: <Crown className="h-8 w-8" />,
      popular: true,
      features: [
        "Everything in Auction Explorer",
        "Access to VIP-only auctions",
        "Early access to new listings",
        "Priority customer support",
        "Personal auction consultant",
        "Reduced transaction fees (2%)",
        "Unlimited watchlist",
        "Advanced analytics dashboard",
        "Exclusive preview events",
        "Authentication guarantee",
      ],
      limitations: ["Limited concierge hours"],
    },
    {
      id: "elite",
      name: "Auction Royalty",
      description: "Ultimate luxury auction experience",
      monthlyPrice: 199,
      annualPrice: 1990,
      color: "from-yellow-400 to-orange-500",
      icon: <Gem className="h-8 w-8" />,
      features: [
        "Everything in VIP Collector",
        "24/7 dedicated concierge service",
        "Private auction access",
        "Zero transaction fees",
        "White-glove delivery service",
        "Insurance coverage included",
        "Expert appraisal services",
        "Invitation-only events",
        "Personal shopping assistant",
        "Custom collection curation",
        "Priority authentication",
        "Exclusive networking events",
      ],
      limitations: [],
    },
  ]

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }, 2000)
  }

  const getPrice = (plan: any) => {
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
    const period = isAnnual ? "year" : "month"
    const savings = isAnnual
      ? Math.round(((plan.monthlyPrice * 12 - plan.annualPrice) / (plan.monthlyPrice * 12)) * 100)
      : 0

    return { price, period, savings }
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-400 rounded-full opacity-20 animate-float-delayed"></div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"][Math.floor(Math.random() * 4)],
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-6 animate-pulse">
            <Crown className="h-5 w-5" />
            <span className="font-semibold">VIP Auction Membership</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-fade-in">
            Unlock Exclusive Auctions
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join the elite circle of collectors with access to the world's most prestigious auctions, rare items, and
            exclusive events.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-lg font-medium transition-colors ${!isAnnual ? "text-purple-600" : "text-gray-500"}`}
            >
              Monthly
            </span>
            <div className="relative">
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
              {isAnnual && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white animate-bounce">Save up to 20%</Badge>
                </div>
              )}
            </div>
            <span className={`text-lg font-medium transition-colors ${isAnnual ? "text-purple-600" : "text-gray-500"}`}>
              Annual
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const { price, period, savings } = getPrice(plan)
            const isSelected = selectedPlan === plan.id

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  plan.popular ? "ring-2 ring-purple-500 scale-105" : ""
                } ${isSelected ? "ring-4 ring-green-500 scale-110" : ""}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 animate-pulse">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative`}>
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      {plan.icon}
                      <div>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="text-white/80">{plan.description}</p>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-white/80">/{period}</span>
                      {savings > 0 && (
                        <Badge className="bg-green-500 text-white ml-2 animate-pulse">Save {savings}%</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3 animate-slide-in"
                        style={{ animationDelay: `${index * 0.2 + featureIndex * 0.1}s` }}
                      >
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Limitations</p>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={isLoading && selectedPlan === plan.id}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md border ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-purple-500"
                        : plan.id === "elite"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black border-yellow-400"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-blue-500"
                    }`}
                  >
                    {isLoading && selectedPlan === plan.id ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </div>
                    ) : isSelected ? (
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        Subscribed!
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {plan.id === "elite" ? <Crown className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                        Choose {plan.name}
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Why Choose Briskon VIP?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-blue-500" />,
                title: "100% Authentic",
                description: "Every item verified by world-class experts with lifetime authenticity guarantee",
              },
              {
                icon: <Clock className="h-12 w-12 text-green-500" />,
                title: "Early Access",
                description: "Get first dibs on exclusive items before they go public",
              },
              {
                icon: <Phone className="h-12 w-12 text-purple-500" />,
                title: "VIP Support",
                description: "24/7 dedicated support from auction specialists",
              },
              {
                icon: <Trophy className="h-12 w-12 text-yellow-500" />,
                title: "Exclusive Events",
                description: "Invitation-only previews and networking events",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">What Our VIP Members Say</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Art Collector",
                avatar: "/placeholder.svg?height=60&width=60",
                quote:
                  "The VIP access has completely transformed my collecting experience. I've acquired pieces I never would have found otherwise.",
                rating: 5,
              },
              {
                name: "Marcus Rodriguez",
                role: "Watch Enthusiast",
                avatar: "/placeholder.svg?height=60&width=60",
                quote:
                  "The authentication guarantee and concierge service are worth every penny. Truly premium experience.",
                rating: 5,
              },
              {
                name: "Emily Thompson",
                role: "Vintage Car Collector",
                avatar: "/placeholder.svg?height=60&width=60",
                quote:
                  "Early access to rare vehicles has given me a significant advantage. The ROI on my membership is incredible.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-8">Frequently Asked Questions</h3>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer:
                  "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
              },
              {
                question: "What happens to my bids if I downgrade?",
                answer:
                  "All your active bids remain valid. However, you may lose access to VIP-only auctions for future bidding.",
              },
              {
                question: "Is there a money-back guarantee?",
                answer: "We offer a 30-day money-back guarantee for all new subscriptions. No questions asked.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 text-left hover:shadow-lg transition-all duration-300">
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Join the Elite?</h3>
            <p className="text-xl mb-6 text-purple-100">
              Start your VIP auction journey today and discover what you've been missing.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 bg-white text-purple-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md"
              asChild
            >
              <Link href="#pricing">
                <Sparkles className="mr-2 h-5 w-5" />
                Choose Your Plan
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
