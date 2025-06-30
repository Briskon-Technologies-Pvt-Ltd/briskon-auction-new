import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Smartphone, Globe, BarChart3, Users, Zap, Palette, Cloud, ShoppingCart, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: "web-development",
      name: "Web Development",
      description: "Custom websites and web applications",
      icon: <Globe className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 120,
      technologies: ["React", "Next.js", "Node.js", "PHP"],
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: "mobile-development",
      name: "Mobile Development",
      description: "iOS and Android native & cross-platform apps",
      icon: <Smartphone className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 85,
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      id: "digital-marketing",
      name: "Digital Marketing",
      description: "SEO, SEM, social media & content marketing",
      icon: <BarChart3 className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 200,
      technologies: ["Google Ads", "Facebook Ads", "SEO Tools", "Analytics"],
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      id: "custom-software",
      name: "Custom Software",
      description: "Tailored software solutions for businesses",
      icon: <Code className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 95,
      technologies: ["Python", "Java", ".NET", "Microservices"],
      color: "bg-orange-100 dark:bg-orange-900",
    },
    {
      id: "enterprise-mobility",
      name: "Enterprise Mobility",
      description: "Enterprise mobile solutions & MDM",
      icon: <Users className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 45,
      technologies: ["MDM", "MAM", "Enterprise Apps", "Security"],
      color: "bg-red-100 dark:bg-red-900",
    },
    {
      id: "digital-transformation",
      name: "Digital Transformation",
      description: "Complete business digitalization",
      icon: <Zap className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 60,
      technologies: ["Cloud Migration", "Process Automation", "AI/ML", "IoT"],
      color: "bg-indigo-100 dark:bg-indigo-900",
    },
    {
      id: "ui-ux-design",
      name: "UI/UX Design",
      description: "User interface and experience design",
      icon: <Palette className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 150,
      technologies: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      color: "bg-pink-100 dark:bg-pink-900",
    },
    {
      id: "cloud-solutions",
      name: "Cloud Solutions",
      description: "Cloud infrastructure and migration services",
      icon: <Cloud className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 75,
      technologies: ["AWS", "Azure", "Google Cloud", "DevOps"],
      color: "bg-cyan-100 dark:bg-cyan-900",
    },
    {
      id: "ecommerce",
      name: "E-commerce Solutions",
      description: "Online stores and marketplace platforms",
      icon: <ShoppingCart className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 110,
      technologies: ["Shopify", "WooCommerce", "Magento", "Custom"],
      color: "bg-emerald-100 dark:bg-emerald-900",
    },
    {
      id: "seo-sem",
      name: "SEO & SEM",
      description: "Search engine optimization and marketing",
      icon: <Search className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
      projects: 180,
      technologies: ["Google Analytics", "Search Console", "SEMrush", "Ahrefs"],
      color: "bg-yellow-100 dark:bg-yellow-900",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Our Services</Badge>
          <h1 className="text-5xl font-bold mb-6">
            Comprehensive Digital
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From web development to digital marketing, we provide end-to-end solutions that drive business growth and
            digital transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className={`relative h-48 ${service.color} flex items-center justify-center`}>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-800">{service.projects} Projects</Badge>
                </div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-white">{service.icon}</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{service.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {service.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Link href={`/services/${service.id}`}>Learn More</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Link href={`/portfolio?service=${service.id}`}>View Work</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A proven methodology that ensures project success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description: "Understanding your requirements and creating a detailed project roadmap",
              },
              {
                step: "02",
                title: "Design & Prototyping",
                description: "Creating wireframes, mockups, and interactive prototypes",
              },
              {
                step: "03",
                title: "Development & Testing",
                description: "Agile development with continuous testing and quality assurance",
              },
              {
                step: "04",
                title: "Deployment & Support",
                description: "Launch, monitoring, and ongoing maintenance and support",
              },
            ].map((phase, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">{phase.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-8">Service Statistics</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "10", label: "Service Areas" },
              { number: "150+", label: "Happy Clients" },
              { number: "99%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
