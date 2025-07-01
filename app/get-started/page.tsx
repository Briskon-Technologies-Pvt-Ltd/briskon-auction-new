"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Server, Code, Palette } from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  const engagementModels = [
    {
      title: "On-Premise Installation",
      description:
        "Deploy the complete auction platform on your own infrastructure with full control and customization.",
      icon: <Server className="h-8 w-8" />,
      features: [
        "Complete source code access",
        "Full infrastructure control",
        "Custom security policies",
        "Dedicated support team",
        "One-time licensing fee",
        "Unlimited users",
      ],
      pricing: "Starting at $50,000",
      timeline: "4-6 weeks implementation",
      bestFor: "Large enterprises with specific security requirements",
      href: "/get-started/on-premise",
    },
    {
      title: "Custom Development",
      description:
        "Tailored auction solutions built specifically for your unique business requirements and workflows.",
      icon: <Code className="h-8 w-8" />,
      features: [
        "Bespoke feature development",
        "Custom integrations",
        "Tailored user experience",
        "Dedicated development team",
        "Agile development process",
        "Post-launch support",
      ],
      pricing: "Starting at $75,000",
      timeline: "8-12 weeks development",
      bestFor: "Organizations with unique auction requirements",
      href: "/get-started/custom-development",
    },
    {
      title: "White Label Solution",
      description:
        "Ready-to-deploy branded auction platform with your company's identity and customizations.",
      icon: <Palette className="h-8 w-8" />,
      features: [
        "Complete brand customization",
        "Custom domain setup",
        "Branded mobile apps",
        "Marketing materials",
        "Quick deployment",
        "Ongoing maintenance",
      ],
      pricing: "Starting at $25,000",
      timeline: "2-4 weeks setup",
      bestFor: "Businesses looking for quick market entry",
      href: "/get-started/white-label",
    },
  ];

  const subscriptionPlans = [
    {
      name: "Starter",
      price: "$999",
      period: "per month",
      description: "Perfect for small to medium auction businesses",
      features: [
        "Up to 1,000 active listings",
        "Basic auction types",
        "Standard support",
        "Mobile responsive",
        "Payment processing",
        "Basic analytics",
      ],
      limitations: ["Limited customization", "Standard integrations only"],
      popular: false,
    },
    {
      name: "Professional",
      price: "$2,999",
      period: "per month",
      description: "Advanced features for growing auction platforms",
      features: [
        "Up to 10,000 active listings",
        "All auction types",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Multi-language support",
        "Advanced security",
      ],
      limitations: ["Some customization limits"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Full-scale solution for large enterprises",
      features: [
        "Unlimited listings",
        "All features included",
        "24/7 dedicated support",
        "Custom integrations",
        "White-label options",
        "Advanced AI features",
        "Multi-tenant architecture",
        "SLA guarantees",
      ],
      limitations: [],
      popular: false,
    },
  ];

  const implementationProcess = [
    {
      step: "1",
      title: "Discovery & Planning",
      description:
        "We analyze your requirements and create a detailed implementation plan.",
      duration: "1-2 weeks",
    },
    {
      step: "2",
      title: "Development & Setup",
      description:
        "Our team develops and configures your auction platform according to specifications.",
      duration: "4-8 weeks",
    },
    {
      step: "3",
      title: "Testing & Training",
      description:
        "Comprehensive testing and user training to ensure smooth operations.",
      duration: "1-2 weeks",
    },
    {
      step: "4",
      title: "Launch & Support",
      description:
        "Go-live support and ongoing maintenance to ensure optimal performance.",
      duration: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-200 via-blue-200 to-slate-100 text-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Engagement Model
              </span>
            </h1>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Flexible deployment options designed to meet your specific
              business needs, timeline, and budget requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Engagement Models
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choose the deployment model that best fits your organization's
                requirements and constraints.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {engagementModels.map((model, index) => (
                <Card
                  key={index}
                  className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-blue-600">{model.icon}</div>
                    </div>
                    <CardTitle className="text-xl text-slate-900">
                      {model.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {model.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow space-y-6">
                    <div className="flex-grow">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {model.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      {/* <div className="pt-4 border-t border-slate-200">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Investment:</span>
                            <span className="font-semibold text-slate-900">{model.pricing}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Timeline:</span>
                            <span className="font-semibold text-slate-900">{model.timeline}</span>
                          </div>
                        </div>
                      </div> */}

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-600">
                          <strong>Best for:</strong> {model.bestFor}
                        </p>
                      </div>

                      <Button className="w-full" asChild>
                        <Link href={model.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      {/* <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Subscription Plans</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Flexible SaaS pricing options for businesses of all sizes.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {subscriptionPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative border-0 shadow-lg ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl text-slate-900">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-600">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-xs text-slate-500 mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="text-xs text-slate-500">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/contact">{plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Implementation Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Implementation Process
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our proven methodology ensures smooth deployment and successful
                adoption.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {implementationProcess.map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-slate-600 mb-2">{phase.description}</p>
                  <Badge variant="secondary">{phase.duration}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-100 text-slate-800">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-xl text-slate-600 mb-8">
        Let's discuss your requirements and find the perfect solution for
        your business.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          asChild
        >
          <Link href="/contact">Contact Sales</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-slate-400 text-slate-700 hover:bg-slate-200"
          asChild
        >
          <Link href="/demo">Schedule Demo</Link>
        </Button>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}
