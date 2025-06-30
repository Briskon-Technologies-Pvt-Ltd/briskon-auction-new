import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function DepartmentsPage() {
  const departments = [
    {
      id: "furniture",
      name: "Furniture",
      description: "Antique and modern furniture pieces",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 24,
      color: "bg-orange-100 dark:bg-orange-900",
    },
    {
      id: "electronics",
      name: "Electronics",
      description: "Latest gadgets and electronic devices",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 18,
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: "vehicles",
      name: "Vehicles",
      description: "Cars, motorcycles, and automotive parts",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 12,
      color: "bg-gray-100 dark:bg-gray-900",
    },
    {
      id: "real-estate",
      name: "Real Estate",
      description: "Properties and real estate investments",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 8,
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      id: "art-antiques",
      name: "Art & Antiques",
      description: "Fine art, collectibles, and antique items",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 31,
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      id: "fashion-accessories",
      name: "Fashion & Accessories",
      description: "Luxury watches, jewelry, and fashion items",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 15,
      color: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      id: "books-media",
      name: "Books & Media",
      description: "Rare books, manuscripts, and media collections",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 22,
      color: "bg-amber-100 dark:bg-amber-900",
    },
    {
      id: "sports-fitness",
      name: "Sports & Fitness",
      description: "Sports equipment and fitness gear",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 9,
      color: "bg-emerald-100 dark:bg-emerald-900",
    },
    {
      id: "others",
      name: "Others",
      description: "Miscellaneous items and unique finds",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 16,
      color: "bg-cyan-100 dark:bg-cyan-900",
    },
    {
      id: "test-department",
      name: "Test Department",
      description: "Testing and experimental auctions",
      image: "/placeholder.svg?height=300&width=400",
      activeAuctions: 3,
      color: "bg-indigo-100 dark:bg-indigo-900",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Auction Departments
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            Browse by
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Department
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our diverse range of auction categories. Each department features carefully curated items from
            trusted sellers and auction houses worldwide.
          </p>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Auction Departments Overview"
              width={800}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {departments.map((department) => (
            <Card key={department.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className={`relative h-48 ${department.color}`}>
                <Image
                  src={department.image || "/placeholder.svg"}
                  alt={department.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-800">{department.activeAuctions} Active</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{department.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{department.description}</p>
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={`/auctions/${department.id}`}>View Auctions</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/departments/${department.id}`}>Browse Items</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900 rounded-2xl p-12 text-center">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Platform Statistics</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { number: "158", label: "Active Auctions" },
                  { number: "10", label: "Departments" },
                  { number: "2,847", label: "Registered Bidders" },
                  { number: "95%", label: "Success Rate" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                    <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=350&width=450"
                alt="Platform Statistics"
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
