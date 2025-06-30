import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap } from "lucide-react"
import Image from "next/image"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      period: "/month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 10 auctions per month",
        "Basic auction formats (Forward & Reverse)",
        "Up to 100 registered bidders",
        "Email support",
        "Basic analytics dashboard",
        "Mobile responsive interface",
        "Standard security features",
      ],
      limitations: ["No white-labeling", "Limited customization", "Basic reporting only"],
      cta: "Start Free Trial",
      popular: false,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Pro",
      price: "$299",
      period: "/month",
      description: "Ideal for growing businesses with advanced needs",
      features: [
        "Up to 50 auctions per month",
        "All auction formats including Dutch & Sealed bid",
        "Up to 1,000 registered bidders",
        "Priority email & chat support",
        "Advanced analytics & reporting",
        "Basic white-labeling (logo & colors)",
        "API access for integrations",
        "Custom auction templates",
        "Automated bidding rules",
        "Export capabilities (PDF, Excel)",
      ],
      limitations: ["Limited white-labeling options", "Standard AI recommendations"],
      cta: "Start Free Trial",
      popular: true,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited auctions",
        "Unlimited registered bidders",
        "Full white-labeling & custom domain",
        "Dedicated account manager",
        "24/7 phone & email support",
        "Advanced AI recommendations",
        "Custom integrations & APIs",
        "On-premise deployment option",
        "Advanced security & compliance",
        "Custom reporting & dashboards",
        "Multi-language support",
        "Revenue sharing options",
        "Custom training & onboarding",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const addOns = [
    {
      name: "Additional Auctions",
      price: "$5",
      description: "Per auction above plan limit",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      name: "Premium Support",
      price: "$199",
      description: "Priority support with 2-hour response time",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      name: "Advanced Analytics",
      price: "$99",
      description: "Enhanced reporting and bidder insights",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      name: "Custom Integrations",
      price: "Quote",
      description: "Bespoke API integrations and workflows",
      image: "/placeholder.svg?height=150&width=200",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Pricing Plans</Badge>
          <h1 className="text-5xl font-bold mb-6">
            Choose the Perfect Plan for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Your Business
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Flexible pricing options that scale with your auction volume and business needs. All plans include our core
            features with varying limits and capabilities.
          </p>

          {/* Pricing Hero Image */}
          <div className="relative max-w-3xl mx-auto mb-12">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Pricing Plans Overview"
              width={600}
              height={300}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-6 ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              {/* Plan Image */}
              <div className="mb-6">
                <Image
                  src={plan.image || "/placeholder.svg"}
                  alt={`${plan.name} Plan Features`}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300">{plan.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
              </CardHeader>

              <CardContent className="p-0">
                <Button
                  className={`w-full mb-6 ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500">What's Included:</h4>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mt-6">Limitations:</h4>
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-4 h-4 border border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Add-ons & Extensions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Enhance your plan with additional features and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Image
                      src={addon.image || "/placeholder.svg"}
                      alt={addon.name}
                      width={200}
                      height={150}
                      className="rounded-lg shadow-md mx-auto"
                    />
                  </div>
                  <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{addon.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{addon.price}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {[
                {
                  question: "Can I change plans at any time?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
                },
                {
                  question: "What happens if I exceed my auction limit?",
                  answer:
                    "You can purchase additional auctions at $5 each, or upgrade to a higher plan for better value if you consistently exceed limits.",
                },
                {
                  question: "Is there a setup fee?",
                  answer:
                    "No setup fees for Basic and Pro plans. Enterprise plans may include implementation services with custom pricing.",
                },
                {
                  question: "Do you offer annual discounts?",
                  answer:
                    "Yes, annual subscriptions receive a 20% discount. Contact our sales team for enterprise annual pricing.",
                },
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Customer Support"
                width={500}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900 rounded-2xl p-12 text-center">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Start your free trial today and see how Briskon can transform your auction process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4">
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=350&width=450"
                alt="Get Started Success"
                width={450}
                height={350}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
