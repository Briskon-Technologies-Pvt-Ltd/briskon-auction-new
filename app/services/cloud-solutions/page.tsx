"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  Server,
  Shield,
  Zap,
  Database,
  Settings,
  CheckCircle,
  ArrowRight,
  Clock,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"

export default function CloudSolutionsPage() {
  const cloudServices = [
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Migration",
      description: "Seamless migration of applications and data to cloud platforms with minimal downtime.",
      features: ["Assessment & Planning", "Data Migration", "Application Modernization", "Testing & Validation"],
      benefits: ["Reduced costs", "Improved scalability", "Enhanced security", "Better performance"],
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Cloud Infrastructure",
      description: "Design and implement scalable, secure cloud infrastructure tailored to your needs.",
      features: ["Architecture Design", "Auto-scaling", "Load Balancing", "Disaster Recovery"],
      benefits: ["High availability", "Cost optimization", "Automatic scaling", "Global reach"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Cloud-Native Development",
      description: "Build applications designed specifically for cloud environments and microservices.",
      features: ["Microservices Architecture", "Containerization", "Serverless Computing", "API Gateway"],
      benefits: ["Faster deployment", "Better resilience", "Cost efficiency", "Developer productivity"],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cloud Security",
      description: "Comprehensive security solutions to protect your cloud infrastructure and data.",
      features: ["Identity Management", "Encryption", "Compliance", "Threat Detection"],
      benefits: ["Data protection", "Regulatory compliance", "Risk mitigation", "Secure access"],
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "DevOps & Automation",
      description: "Implement DevOps practices and automation for efficient cloud operations.",
      features: ["CI/CD Pipelines", "Infrastructure as Code", "Monitoring", "Automated Deployment"],
      benefits: ["Faster releases", "Reduced errors", "Better collaboration", "Improved quality"],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Cloud Optimization",
      description: "Optimize cloud resources and costs while maintaining performance and reliability.",
      features: ["Cost Analysis", "Performance Tuning", "Resource Optimization", "Monitoring"],
      benefits: ["Cost savings", "Better performance", "Resource efficiency", "Improved ROI"],
    },
  ]

  const cloudPlatforms = [
    { name: "Amazon AWS", logo: "/placeholder.svg?height=60&width=60", category: "Public Cloud" },
    {
      name: "Microsoft Azure",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Public Cloud",
    },
    {
      name: "Google Cloud",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Public Cloud",
    },
    { name: "Docker", logo: "/placeholder.svg?height=60&width=60", category: "Containers" },
    {
      name: "Kubernetes",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Orchestration",
    },
    { name: "Terraform", logo: "/placeholder.svg?height=60&width=60", category: "IaC" },
    { name: "Jenkins", logo: "/placeholder.svg?height=60&width=60", category: "CI/CD" },
    { name: "Ansible", logo: "/placeholder.svg?height=60&width=60", category: "Automation" },
  ]

  const caseStudies = [
    {
      title: "Enterprise Cloud Migration",
      client: "Global Manufacturing Corp",
      description: "Complete migration of legacy systems to AWS with 99.9% uptime during transition",
      image: "/placeholder.svg?height=300&width=400",
      results: ["60% cost reduction", "99.9% uptime achieved", "50% faster deployments"],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
    },
    {
      title: "Multi-Cloud Strategy",
      client: "FinTech Solutions",
      description: "Hybrid multi-cloud architecture for regulatory compliance and disaster recovery",
      image: "/placeholder.svg?height=300&width=400",
      results: ["100% compliance achieved", "Zero downtime", "Global scalability"],
      technologies: ["Azure", "AWS", "Kubernetes", "Terraform"],
    },
    {
      title: "Serverless Application Platform",
      client: "E-commerce Startup",
      description: "Cloud-native serverless platform handling millions of transactions",
      image: "/placeholder.svg?height=300&width=400",
      results: ["Auto-scaling to millions", "90% cost optimization", "Sub-second response times"],
      technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFront"],
    },
  ]

  const migrationProcess = [
    {
      step: "01",
      title: "Assessment & Planning",
      description: "Comprehensive analysis of current infrastructure, applications, and migration readiness.",
      duration: "2-4 weeks",
    },
    {
      step: "02",
      title: "Strategy & Architecture",
      description: "Design target cloud architecture and create detailed migration strategy and roadmap.",
      duration: "2-3 weeks",
    },
    {
      step: "03",
      title: "Pilot Migration",
      description: "Execute pilot migration of non-critical applications to validate approach and processes.",
      duration: "4-6 weeks",
    },
    {
      step: "04",
      title: "Full Migration",
      description: "Phased migration of all applications and data with minimal business disruption.",
      duration: "3-12 months",
    },
    {
      step: "05",
      title: "Optimization & Support",
      description: "Continuous optimization, monitoring, and support for cloud infrastructure.",
      duration: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-sky-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 animate-fade-in-up">
              ☁️ Cloud Solutions
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
              Scalable Cloud Infrastructure & Migration
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Transform your business with secure, scalable cloud solutions. From migration to optimization, we help you
              leverage the full power of cloud computing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Cloud Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Cloud Assessment
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "75+", label: "Cloud Projects" },
                { number: "99.9%", label: "Uptime SLA" },
                { number: "50%", label: "Avg. Cost Savings" },
                { number: "24/7", label: "Cloud Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cloud Solutions & Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive cloud services to accelerate your digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cloudServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-sky-600 dark:text-sky-400 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold mb-2 text-sm text-sky-600">Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Platforms */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cloud Platforms & Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Leading cloud platforms and DevOps tools for modern infrastructure
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {cloudPlatforms.map((platform, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <Image
                    src={platform.logo || "/placeholder.svg"}
                    alt={platform.name}
                    width={60}
                    height={60}
                    className="mx-auto mb-3"
                  />
                  <h4 className="font-semibold text-sm">{platform.name}</h4>
                  <p className="text-xs text-gray-500">{platform.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cloud Migration Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Proven methodology for successful cloud migration
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sky-200 dark:bg-sky-800 hidden lg:block"></div>
            <div className="space-y-12">
              {migrationProcess.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-sky-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cloud Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Transformative cloud implementations</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {study.client}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {study.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-600 dark:bg-sky-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Move to the Cloud?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Transform your infrastructure with secure, scalable cloud solutions that drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-sky-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Cloud className="mr-2 h-5 w-5" />
              Get Cloud Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-sky-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Schedule Migration Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
