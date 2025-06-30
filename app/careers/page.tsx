import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, CalendarDays, Users, TrendingUp, Smile, Gift, Search, Lightbulb } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function CareersPage() {
  const jobOpenings = [
    {
      id: "frontend-dev-01",
      title: "Senior Frontend Developer",
      location: "Remote / Bangalore, India",
      type: "Full-time",
      department: "Engineering",
      description:
        "We are looking for an experienced Frontend Developer to build high-quality, responsive, and scalable web applications using modern JavaScript frameworks.",
      postedDate: "2025-05-28",
      responsibilities: [
        "Develop and maintain user-facing features.",
        "Build reusable code and libraries for future use.",
        "Ensure the technical feasibility of UI/UX designs.",
        "Optimize applications for maximum speed and scalability.",
      ],
      qualifications: [
        "5+ years of experience in frontend development.",
        "Proficiency in React, Vue, or Angular.",
        "Strong understanding of HTML, CSS, and JavaScript.",
        "Experience with RESTful APIs and version control (Git).",
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "dm-specialist-01",
      title: "Digital Marketing Specialist",
      location: "Mumbai, India",
      type: "Full-time",
      department: "Marketing",
      description:
        "Join our dynamic marketing team to create, manage, and optimize impactful digital campaigns across various channels.",
      postedDate: "2025-05-25",
      responsibilities: [
        "Plan and execute all digital marketing, including SEO/SEM, marketing database, email, social media and display advertising campaigns.",
        "Measure and report performance of all digital marketing campaigns.",
        "Identify trends and insights, and optimize spend and performance based on the insights.",
      ],
      qualifications: [
        "3+ years of experience in digital marketing.",
        "Proven working experience in SEO/SEM, email marketing, social media marketing.",
        "Experience with A/B testing and website analytics tools (e.g., Google Analytics).",
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "ux-designer-01",
      title: "UX/UI Designer",
      location: "Remote",
      type: "Contract",
      department: "Design",
      description:
        "Seeking a creative and analytical UX/UI designer to craft intuitive, engaging, and aesthetically pleasing user experiences for web and mobile platforms.",
      postedDate: "2025-05-22",
      responsibilities: [
        "Conduct user research and evaluate user feedback.",
        "Create user flows, wireframes, prototypes, and mockups.",
        "Design graphic user interface elements, like menus, tabs, and widgets.",
        "Collaborate with product management and engineering to define and implement innovative solutions.",
      ],
      qualifications: [
        "Proven UX/UI design experience with a strong portfolio.",
        "Proficiency in Sketch, Figma, Adobe XD, or similar tools.",
        "Excellent visual design skills with sensitivity to user-system interaction.",
        "Ability to solve problems creatively and effectively.",
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const companyCulture = [
    {
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and open communication to achieve shared goals.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Continuous Growth",
      description: "We encourage learning and development, providing opportunities to expand your skills.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Innovation-Driven",
      description: "We foster a culture where new ideas are welcomed and creativity is celebrated.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: <Smile className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Supportive Environment",
      description: "We value our employees and strive to create an inclusive and positive workplace.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 text-sm py-1 px-3 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
          >
            Join Our Team
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Careers at
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Briskon</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Become a part of our innovative team and contribute to exciting projects that shape the digital landscape.
            We foster a culture of growth, collaboration, and excellence.
          </p>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Briskon Team"
              width={800}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </header>

        {/* Why Work With Us Section */}
        <section className="mb-12 sm:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative order-last lg:order-first">
              <Image
                src="/placeholder.svg?height=450&width=600"
                alt="Team collaboration at Briskon"
                width={600}
                height={450}
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-first lg:order-last">
              <h2 className="text-3xl font-bold mb-6">Why Join Briskon?</h2>
              <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <Briefcase className="h-6 w-6 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Work on challenging and impactful projects for diverse global clients.</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-6 w-6 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Collaborate with a talented, passionate, and supportive team of professionals.</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-6 w-6 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>
                    Abundant opportunities for continuous learning, skill development, and career advancement.
                  </span>
                </li>
                <li className="flex items-start">
                  <Smile className="h-6 w-6 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>
                    A positive, inclusive work environment that values your unique contributions and well-being.
                  </span>
                </li>
                <li className="flex items-start">
                  <Gift className="h-6 w-6 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Competitive salary, comprehensive benefits, and flexible work arrangements.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Company Culture Section */}
        <section className="mb-12 sm:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              At Briskon, we cultivate an environment where innovation thrives and people are empowered.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {companyCulture.map((item) => (
              <Card
                key={item.title}
                className="text-center p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md mx-auto"
                  />
                </div>
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Current Openings Section */}
        <section id="openings" className="mb-12 sm:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Find your next career opportunity with us.
            </p>
          </div>

          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Input type="search" placeholder="Search job titles or keywords..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {jobOpenings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {jobOpenings.map((job) => (
                <Card
                  key={job.id}
                  className="flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-4">
                    <Image
                      src={job.image || "/placeholder.svg"}
                      alt={job.title}
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md w-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl text-blue-700 dark:text-blue-400">{job.title}</CardTitle>
                    <CardDescription className="flex flex-wrap gap-x-2 gap-y-1 text-xs pt-1">
                      <Badge variant="secondary">{job.type}</Badge>
                      <Badge variant="outline">{job.department}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 flex-grow">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      {job.location}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{job.description}</p>
                    <div className="pt-2">
                      <h4 className="font-semibold text-sm mb-1">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-0.5 line-clamp-2">
                        {job.responsibilities.slice(0, 2).map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t dark:border-gray-700">
                    <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mb-2 sm:mb-0">
                      <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                    <Link href={`/careers/${job.id}`} passHref className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Briefcase className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No Current Openings</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We are not actively hiring for any positions at the moment. Please check back later.
              </p>
              <Button variant="outline" asChild>
                <Link href="#submit-resume">Submit Your Resume</Link>
              </Button>
            </div>
          )}
        </section>

        {/* How to Apply / Spontaneous Application Section */}
        <section id="submit-resume" className="text-center bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Can't Find a Suitable Role?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We are always on the lookout for talented and passionate individuals. If you believe your skills and
                experience would be a great asset to Briskon, we'd love to hear from you.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:careers@briskon.com?subject=Spontaneous Application">
                  <Briefcase className="mr-2 h-5 w-5" /> Email Us Your Resume
                </Link>
              </Button>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=350&width=450"
                alt="Join Our Team"
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
