"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Calendar,
  Clock,
  Users,
  Monitor,
  CheckCircle,
  ArrowRight,
  Video,
  Zap,
  Shield,
  BarChart3,
  Settings,
  Star,
  Award,
  Target,
} from "lucide-react"

export default function DemoPage() {
  const [selectedDemo, setSelectedDemo] = useState("live")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    phone: "",
    demoType: "",
    message: "",
  })

  const demoOptions = [
    {
      id: "live",
      title: "Live Interactive Demo",
      description: "30-minute guided tour with our product experts",
      duration: "30 minutes",
      type: "Live Session",
      features: [
        "Personalized demonstration",
        "Q&A with product experts",
        "Custom use case discussion",
        "Implementation planning",
      ],
      icon: <Video className="h-6 w-6" />,
      popular: true,
    },
    {
      id: "self-guided",
      title: "Self-Guided Tour",
      description: "Explore the platform at your own pace",
      duration: "15-45 minutes",
      type: "Interactive Tour",
      features: ["Immediate access", "Sample data included", "All features unlocked", "Progress tracking"],
      icon: <Monitor className="h-6 w-6" />,
      popular: false,
    },
    {
      id: "sandbox",
      title: "Developer Sandbox",
      description: "Full API access and development environment",
      duration: "7 days",
      type: "Development Access",
      features: ["Complete API access", "Sample integrations", "Documentation included", "Technical support"],
      icon: <Settings className="h-6 w-6" />,
      popular: false,
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Demo request submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <Play className="h-4 w-4" />
              Interactive Demo
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Experience Briskon{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Live</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up">
              See how Briskon transforms procurement and auction management. Choose from our interactive demos or
              schedule a personalized session with our experts.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12 animate-fade-in-up">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Demos Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">30min</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Available Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Demo Experience</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select the demo format that best fits your needs and schedule
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {demoOptions.map((option, index) => (
<Card
  key={option.id}
  className={`flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 animate-fade-in-up ${
    selectedDemo === option.id
      ? "border-blue-500 shadow-lg"
      : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
  } ${option.popular ? "ring-2 ring-blue-500 ring-opacity-20" : ""}`}
  style={{ animationDelay: `${index * 0.1}s` }}
  onClick={() => setSelectedDemo(option.id)}
>
  {/* Popular Badge */}
  {option.popular && (
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <Badge className="bg-blue-500 text-white px-3 py-1">
        <Star className="h-3 w-3 mr-1" />
        Most Popular
      </Badge>
    </div>
  )}

  {/* Card Header */}
  <CardHeader className="text-center pb-4">
    <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit group-hover:scale-110 transition-transform">
      <div className="text-blue-600 dark:text-blue-400">{option.icon}</div>
    </div>
    <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
    <CardDescription className="text-base">{option.description}</CardDescription>
  </CardHeader>

  {/* Card Content with pushed button */}
  <CardContent className="flex flex-col flex-grow justify-between">
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          {option.duration}
        </div>
        <Badge variant="outline">{option.type}</Badge>
      </div>

      <div className="space-y-2">
        {option.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Button aligned at the bottom */}
    <Button
      className={`w-full mt-6 ${
        selectedDemo === option.id
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-600 hover:bg-gray-700"
      }`}
    >
      {option.id === "self-guided" ? "Start Now" : "Select This Demo"}
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  </CardContent>
</Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      {selectedDemo !== "self-guided" && (
        <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedDemo === "live" ? "Schedule Your Live Demo" : "Request Developer Access"}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {selectedDemo === "live"
                    ? "Book a personalized demonstration with our product experts"
                    : "Get full API access and development environment setup"}
                </p>
              </div>

              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Enter your company name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Your Role *</Label>
                        <Select onValueChange={(value) => handleInputChange("role", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ceo">CEO/Executive</SelectItem>
                            <SelectItem value="procurement">Procurement Manager</SelectItem>
                            <SelectItem value="it">IT Director</SelectItem>
                            <SelectItem value="operations">Operations Manager</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="demoType">Demo Focus</Label>
                        <Select onValueChange={(value) => handleInputChange("demoType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="What interests you most?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="forward-auctions">Forward Auctions</SelectItem>
                            <SelectItem value="reverse-auctions">Reverse Auctions</SelectItem>
                            <SelectItem value="marketplace">Marketplace</SelectItem>
                            <SelectItem value="integrations">API & Integrations</SelectItem>
                            <SelectItem value="security">Security & Compliance</SelectItem>
                            <SelectItem value="general">General Overview</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your specific needs, use cases, or questions..."
                        rows={4}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button type="submit" size="lg" className="flex-1">
                        <Calendar className="h-5 w-5 mr-2" />
                        {selectedDemo === "live" ? "Schedule Demo" : "Request Access"}
                      </Button>
                      <Button type="button" variant="outline" size="lg" onClick={() => setSelectedDemo("self-guided")}>
                        <Play className="h-5 w-5 mr-2" />
                        Try Self-Guided Instead
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Self-Guided Demo */}
      {selectedDemo === "self-guided" && (
        <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Start Your Self-Guided Tour</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Explore all platform features with sample data and guided tutorials
              </p>

              <Card className="shadow-xl mb-8">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Instant Access</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No waiting - start exploring immediately
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Sample Data</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pre-loaded with realistic auction scenarios
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Guided Tours</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Step-by-step tutorials for each feature
                      </p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Launch Demo Environment
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Need help or have questions during your tour?
                </p>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    <Users className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What You'll Experience</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get hands-on experience with all the features that make Briskon the leading auction platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Live Bidding</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Experience real-time bidding with instant updates and notifications
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comprehensive reporting and performance analytics
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Security Features</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enterprise-grade security and compliance tools
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full w-fit">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Admin Controls</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete platform management and configuration
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Demo Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Feedback from thousands of demo sessions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  "The demo was incredibly comprehensive. We could see exactly how it would work for our procurement
                  needs."
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-gray-500">Procurement Director, TechCorp</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  "The self-guided tour was perfect. I could explore at my own pace and really understand the features."
                </p>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-gray-500">IT Manager, Global Manufacturing</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  "The API sandbox gave us everything we needed to evaluate integration possibilities. Excellent!"
                </p>
                <div className="font-semibold">Lisa Rodriguez</div>
                <div className="text-sm text-gray-500">Lead Developer, FinTech Solutions</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Auctions?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of organizations already using Briskon to optimize their procurement and auction processes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/get-started">
                  <Award className="h-5 w-5 mr-2" />
                  Get Started Today
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/contact">
                  <Users className="h-5 w-5 mr-2" />
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
