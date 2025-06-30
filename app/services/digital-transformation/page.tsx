"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  BarChart3,
  Cog,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Star,
  Lightbulb,
  Target,
} from "lucide-react"
import Image from "next/image"

export default function DigitalTransformationPage() {
  const transformationAreas = [
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Migration & Modernization",
      description: "Migrate legacy systems to cloud-native architectures for scalability and efficiency.",
      features: ["Cloud Strategy", "Migration Planning", "Modernization", "Optimization"],
      outcomes: ["50% cost reduction", "99.9% uptime", "Infinite scalability"],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Data & Analytics Transformation",
      description: "Transform data into actionable insights with modern analytics and AI capabilities.",
      features: ["Data Lakes", "Real-time Analytics", "Machine Learning", "Business Intelligence"],
      outcomes: ["Data-driven decisions", "Predictive insights", "Automated processes"],
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "Process Automation",
      description: "Automate manual processes and workflows to increase efficiency and reduce errors.",
      features: ["RPA Implementation", "Workflow Automation", "AI Integration", "Process Mining"],
      outcomes: ["80% time savings", "Reduced errors", "Improved compliance"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Digital Workplace",
      description: "Create modern, collaborative digital workspaces that enhance productivity.",
      features: ["Collaboration Tools", "Remote Work Solutions", "Digital Communication", "Knowledge Management"],
      outcomes: ["Enhanced collaboration", "Remote productivity", "Employee satisfaction"],
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Customer Experience Transformation",
      description: "Reimagine customer interactions with digital-first experiences.",
      features: ["Omnichannel Strategy", "Personalization", "Self-service Portals", "Mobile Experiences"],
      outcomes: ["Improved satisfaction", "Increased engagement", "Higher retention"],
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation & Emerging Tech",
      description: "Leverage emerging technologies to create competitive advantages.",
      features: ["AI/ML Implementation", "IoT Solutions", "Blockchain", "AR/VR Applications"],
      outcomes: ["Innovation culture", "Competitive edge", "New revenue streams"],
    },
  ]

  const technologies = [
    {
      name: "Microsoft Azure",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Cloud",
    },
    { name: "AWS", logo: "/placeholder.svg?height=60&width=60", category: "Cloud" },
    { name: "Google Cloud", logo: "/placeholder.svg?height=60&width=60", category: "Cloud" },
    { name: "Salesforce", logo: "/placeholder.svg?height=60&width=60", category: "CRM" },
    {
      name: "Microsoft 365",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Productivity",
    },
    { name: "Power BI", logo: "/placeholder.svg?height=60&width=60", category: "Analytics" },
    { name: "Tableau", logo: "/placeholder.svg?height=60&width=60", category: "Analytics" },
    { name: "UiPath", logo: "/placeholder.svg?height=60&width=60", category: "RPA" },
  ]

  const caseStudies = [
    {
      title: "Manufacturing Digital Transformation",
      client: "Global Manufacturing Inc",
      description: "End-to-end digital transformation of manufacturing operations and supply chain",
      image: "/placeholder.svg?height=300&width=400",
      results: ["40% operational efficiency", "Real-time visibility", "Predictive maintenance"],
      technologies: ["IoT", "Azure", "Power BI", "AI/ML"],
    },
    {
      title: "Financial Services Modernization",
      client: "Regional Bank Group",
      description: "Core banking system modernization and digital customer experience transformation",
      image: "/placeholder.svg?height=300&width=400",
      results: ["60% faster transactions", "Enhanced security", "Mobile-first experience"],
      technologies: ["Cloud Migration", "API Gateway", "Mobile Apps", "Analytics"],
    },
    {
      title: "Healthcare Digital Platform",
      client: "Healthcare Network",
      description: "Comprehensive digital health platform with telemedicine and patient engagement",
      image: "/placeholder.svg?height=300&width=400",
      results: ["50% patient engagement", "Reduced costs", "Improved outcomes"],
      technologies: ["Cloud Platform", "Mobile Apps", "AI", "Integration"],
    },
  ]

  const methodology = [
    {
      step: "01",
      title: "Digital Assessment",
      description: "Comprehensive evaluation of current state, digital maturity, and transformation opportunities.",
      duration: "3-4 weeks",
    },
    {
      step: "02",
      title: "Strategy & Roadmap",
      description: "Develop digital transformation strategy with prioritized roadmap and business case.",
      duration: "4-6 weeks",
    },
    {
      step: "03",
      title: "Pilot Implementation",
      description: "Execute pilot projects to validate approach and demonstrate value.",
      duration: "8-12 weeks",
    },
    {
      step: "04",
      title: "Scaled Deployment",
      description: "Roll out transformation initiatives across the organization with change management.",
      duration: "6-18 months",
    },
    {
      step: "05",
      title: "Continuous Innovation",
      description: "Establish innovation processes and continuous improvement culture.",
      duration: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 animate-fade-in-up">
              🚀 Digital Transformation
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
              Transform Your Business for the Digital Age
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Accelerate your digital transformation journey with comprehensive strategies, modern technologies, and
              proven methodologies that drive sustainable business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Button
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Start Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
              >
                Digital Assessment
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-16 animate-fade-in-up">
              {[
                { number: "60+", label: "Transformations" },
                { number: "85%", label: "Success Rate" },
                { number: "40%", label: "Avg. Efficiency Gain" },
                { number: "18M", label: "Timeline (Months)" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Areas */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Digital Transformation Areas</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive transformation across all aspects of your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformationAreas.map((area, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-cyan-600 dark:text-cyan-400 mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Areas:</h4>
                    <ul className="space-y-1">
                      {area.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold mb-2 text-sm text-cyan-600">Expected Outcomes:</h4>
                    <div className="space-y-1">
                      {area.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Transformation Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Leading platforms and technologies for digital transformation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <Image
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    width={60}
                    height={60}
                    className="mx-auto mb-3"
                  />
                  <h4 className="font-semibold text-sm">{tech.name}</h4>
                  <p className="text-xs text-gray-500">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Transformation Methodology</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Proven approach to successful digital transformation
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-cyan-200 dark:bg-cyan-800 hidden lg:block"></div>
            <div className="space-y-12">
              {methodology.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Badge className="mb-3 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                          {step.step}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-4 h-4 bg-cyan-600 rounded-full border-4 border-white dark:border-gray-900"></div>
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
            <h2 className="text-4xl font-bold mb-4">Transformation Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Real transformations, measurable results</p>
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
                          <Star className="h-4 w-4 text-yellow-500" />
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
      <section className="py-20 bg-cyan-600 dark:bg-cyan-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Start your digital transformation journey today and unlock new possibilities for growth and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-cyan-600 hover:bg-gray-100 border border-white shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Get Digital Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-white hover:text-cyan-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-4 text-lg"
            >
              Schedule Strategy Session
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
