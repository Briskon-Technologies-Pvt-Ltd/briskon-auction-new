"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    country: "",
    interestedIn: "",
    projectTimeline: "",
    budget: "",
    message: "",
    agreeToContact: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="max-w-md mx-auto text-center border border-gray-200 bg-white shadow-lg">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-brand-500" />
            </div>
            <h2 className="text-2xl font-bold text-brand-500 mb-2">Thank You!</h2>
            <p className="text-neutral-600 mb-6">
              We've received your inquiry and will get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-brand-500 hover:bg-brand-600 text-white border border-brand-600 shadow-md transition-all duration-300"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-neutral-100 text-brand-500 hover:bg-neutral-200">Contact Sales</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-500 mb-4">
              Let's Discuss Your
              <span className="text-neutral-800"> Auction Platform</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Get in touch with our experts to explore how Briskon's auction platform can transform your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-brand-500 mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-brand-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-800">Email</h4>
                        <p className="text-neutral-600">info@briskon.com</p>
                        <p className="text-neutral-600">sales@briskon.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-brand-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-800">Phone</h4>
                        <p className="text-neutral-600">+91 80 4154 1400 (India)</p>
                        <p className="text-neutral-600">+1 214 555 0123 (USA)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-brand-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-800">Offices</h4>
                        <p className="text-neutral-600">Bengaluru, India</p>
                        <p className="text-neutral-600">Dallas, USA</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-brand-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-800">Business Hours</h4>
                        <p className="text-neutral-600">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                        <p className="text-neutral-600">24/7 Support Available</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200">
                  <h4 className="font-semibold text-neutral-800 mb-4">Why Choose Briskon?</h4>
                  <ul className="space-y-2">
                    {[
                      "20+ years of industry experience",
                      "500+ successful implementations",
                      "24/7 global support",
                      "Enterprise-grade security",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle className="h-4 w-4 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-lg">
              <Card className="border-0 shadow-medium bg-white">
                <CardHeader className="bg-white">
                  <CardTitle className="text-2xl text-neutral-800">Send us a Message</CardTitle>
                  <CardDescription className="text-neutral-600">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-white">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-neutral-700 font-medium">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-neutral-700 font-medium">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-neutral-700 font-medium">
                          Business Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-neutral-700 font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="border border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company" className="text-neutral-700 font-medium">
                          Company Name *
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle" className="text-neutral-700 font-medium">
                          Job Title
                        </Label>
                        <Input
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          className="border border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="country" className="text-neutral-700 font-medium">
                          Country
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => handleSelectChange("country", value)}
                        >
                          <SelectTrigger className="border border-gray-300">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="interestedIn" className="text-neutral-700 font-medium">
                          Interested In
                        </Label>
                        <Select
                          value={formData.interestedIn}
                          onValueChange={(value) => handleSelectChange("interestedIn", value)}
                        >
                          <SelectTrigger className="border border-gray-300">
                            <SelectValue placeholder="Select solution" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on-premise">On-Premise Installation</SelectItem>
                            <SelectItem value="custom">Custom Development</SelectItem>
                            <SelectItem value="white-label">White Label Solution</SelectItem>
                            <SelectItem value="saas">SaaS Subscription</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectTimeline" className="text-neutral-700 font-medium">
                          Project Timeline
                        </Label>
                        <Select
                          value={formData.projectTimeline}
                          onValueChange={(value) => handleSelectChange("projectTimeline", value)}
                        >
                          <SelectTrigger className="border border-gray-300">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (&lt; 1 month)</SelectItem>
                            <SelectItem value="short">Short term (1-3 months)</SelectItem>
                            <SelectItem value="medium">Medium term (3-6 months)</SelectItem>
                            <SelectItem value="long">Long term (6+ months)</SelectItem>
                            <SelectItem value="exploring">Just exploring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget" className="text-neutral-700 font-medium">
                          Budget Range
                        </Label>
                        <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                          <SelectTrigger className="border border-gray-300">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-25k">Under $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                            <SelectItem value="over-250k">Over $250,000</SelectItem>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-neutral-700 font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your project requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="border border-gray-300"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToContact"
                        checked={formData.agreeToContact}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToContact: !!checked }))}
                      />
                      <Label htmlFor="agreeToContact" className="text-sm leading-relaxed">
                        I agree to be contacted by Briskon Technologies regarding this inquiry and future communications
                        about our products and services.
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-brand-500 hover:bg-brand-600 text-white border border-brand-600 shadow-md transition-all duration-300"
                      disabled={isSubmitting || !formData.agreeToContact}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
