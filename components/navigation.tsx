"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  FileText,
  TrendingUp,
  Globe,
  Settings,
  Code,
  X,
  ArrowUp,
  ArrowDown,
  FileCheck,
  Zap,
  Award,
  Home,
  LogOut,
  LayoutDashboard,
  ArrowRight,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
function Navigation({
  highlightSolutions = false,
}: {
  highlightSolutions?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { user, logout, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<{
    avatar_url: string;
    fname: string;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Only track sections on homepage
      if (!isHomePage) return;

      const sections = [
        { id: "hero", element: document.querySelector("#hero") },
        {
          id: "platform-overview",
          element: document.querySelector("#platform-overview"),
        },
        {
          id: "auction-types",
          element: document.querySelector("#auction-types"),
        },
        {
          id: "deployment-options",
          element: document.querySelector("#deployment-options"),
        },
      ];

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          if (scrollPosition >= elementTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Detailed navigation items (simplified)
  const detailedNavItems = [
    {
      title: "Solutions",
      items: [
        {
          title: "Forward Auction",
          href: "/solutions/forward-auction",
          description: "Traditional ascending-price auctions",
          icon: <TrendingUp className="h-5 w-5 text-brand-500" />,
          subtypes: [
            {
              title: "English Auction",
              href: "/solutions/forward-auction/english",
              description: "Classic ascending bid format",
              icon: <ArrowUp className="h-4 w-4 text-brand-500" />,
            },
            {
              title: "Dutch Auction",
              href: "/solutions/forward-auction/dutch",
              description: "Descending price format",
              icon: <ArrowDown className="h-4 w-4 text-orange-600" />,
            },
            // {
            //   title: "Silent Bid Auction",
            //   href: "/solutions/forward-auction/sealed-bid",
            //   description: "Private bidding process",
            //   icon: <FileCheck className="h-4 w-4 text-purple-500" />,
            // },
            {
              title: "Sealed Bid Auction",
              href: "/solutions/forward-auction/sealed-bid",
              description: "Private bidding process",
              icon: <FileCheck className="h-4 w-4 text-purple-500" />,
            },
            {
              title: "Yankee Auction",
              href: "/solutions/forward-auction/yankee",
              description: "Multiple item lot bidding",
              icon: <Zap className="h-4 w-4 text-indigo-500" />,
            },
          ],
        },
        {
          title: "Reverse Auction",
          href: "/solutions/reverse-auction",
          description: "Procurement-focused bidding",
          icon: <TrendingUp className="h-5 w-5 text-success rotate-180" />,
          subtypes: [
            {
              title: "English Reverse Auction",
              href: "/solutions/reverse-auction/english-reverse",
              description: "Sellers bid down the price",
              icon: <ArrowDown className="h-4 w-4 text-success" />,
            },
            {
              title: "RFQ (Request for Quote)",
              href: "/solutions/reverse-auction/rfq",
              description: "Standard quote requests",
              icon: <FileText className="h-4 w-4 text-success" />,
            },
            {
              title: "RFP (Request for Proposal)",
              href: "/solutions/reverse-auction/rfp",
              description: "Comprehensive proposal requests",
              icon: <FileCheck className="h-4 w-4 text-brand-500" />,
            },
            {
              title: "Supplier Bidding",
              href: "/solutions/reverse-auction/supplier-bidding",
              description: "Competitive supplier selection",
              icon: <Award className="h-4 w-4 text-orange-600" />,
            },
          ],
        },
        {
          title: "Auction Marketplace",
          href: "/auctions",
          description: "Multi-vendor marketplace solution",
          icon: <Globe className="h-5 w-5 text-purple-500" />,
        },
      ],
    },
    {
      title: "Get Started",
      href: "/get-started", // <- NEW
      external: false,
      items: [
        {
          title: "On-Premise Installation",
          href: "/get-started/on-premise",
          description: "Deploy on your infrastructure",
          icon: <Settings className="h-5 w-5 text-brand-500" />,
        },
        {
          title: "Custom Development",
          href: "/get-started/custom-development",
          description: "Tailored solutions for your needs",
          icon: <Code className="h-5 w-5 text-success" />,
        },
        {
          title: "White Label Solution",
          href: "/get-started/white-label",
          description: "Branded platform for your business",
          icon: (
            <div className="w-5 h-5 bg-purple-500 rounded text-xs flex items-center justify-center text-white font-bold">
              WL
            </div>
          ),
        },
      ],
    },
  ];

  const handleSectionClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const onDashboard = () => {
    if (user?.role === "both") {
      window.location.href = "/dashboard";
    } else if (user?.role === "seller") {
      window.location.href = "/dashboard/seller";
    } else if (user?.role === "buyer") {
      window.location.href = "/dashboard/buyer";
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, fname")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch profile", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        "bg-white/95 backdrop-blur-sm border-b border-neutral-200",
        "dark:bg-neutral-900/95 dark:border-neutral-800",
        scrolled && "shadow-soft"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/briskon-auction-horizontal-logo-white.png"
                alt="Auction Platform"
                width={140}
                height={40}
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-2">
              {/* Home Link */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-smooth",
                      "text-neutral-700 hover:text-brand-500 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-brand-500 hover-lift",
                      "dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:focus:text-neutral-100",
                      isHomePage &&
                        activeSection === "hero" &&
                        "bg-neutral-100 text-brand-600 dark:bg-neutral-800 dark:text-brand-400"
                    )}
                  >
                    <Home className="h-4 w-4 mr-2 transition-transform group-hover:scale-110 group-hover:rotate-3" />
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Detailed Navigation Items */}
              {detailedNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {/* <NavigationMenuTrigger
                    className={cn(
                      "h-9 px-3 py-1.5 text-sm font-medium transition-all duration-200",
                      "text-neutral-700 hover:text-brand-500 hover:bg-neutral-100",
                      "dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800",
                      "data-[state=open]:bg-neutral-100 data-[state=open]:text-brand-600",
                      "dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-brand-400",
                      "focus:bg-neutral-100 focus:text-brand-600",
                      "dark:focus:bg-neutral-800 dark:focus:text-brand-400",
                      "border-0 bg-transparent",
                      highlightSolutions && item.title === "Solutions" && "bg-brand-500 text-white hover:bg-brand-600",
                    )}
                  >
                    {item.title}
                  </NavigationMenuTrigger> */}
                  <NavigationMenuTrigger>
                    <Link
                      href={item.href || "#"}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        // Allow dropdown on hover, but navigate on actual click
                        if (!item.href) e.preventDefault();
                      }}
                      className={cn(
                        "h-9 px-3 py-1.5 text-sm font-medium transition-all duration-200",
                        "text-neutral-700 hover:text-brand-500 hover:bg-neutral-100",
                        "dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800",
                        "data-[state=open]:bg-neutral-100 data-[state=open]:text-brand-600",
                        "dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-brand-400",
                        "focus:bg-neutral-100 focus:text-brand-600 dark:focus:bg-neutral-800 dark:focus:text-brand-400",
                        "border-0 bg-transparent"
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] md:w-[600px] bg-white border border-neutral-200 rounded-lg shadow-large dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="grid gap-2">
                        {item.items.map((subItem) => (
                          <div key={subItem.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.href}
                                className="group flex items-center gap-3 rounded-lg p-3 transition-smooth hover:bg-neutral-50 hover:shadow-soft dark:hover:bg-neutral-700 card-hover"
                              >
                                {subItem.icon && (
                                  <div className="flex-shrink-0 hover-lift">
                                    {subItem.icon}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-neutral-900 group-hover:text-brand-600 transition-colors dark:text-neutral-100 dark:group-hover:text-brand-400">
                                    {subItem.title}
                                  </div>
                                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed dark:text-neutral-400">
                                    {subItem.description}
                                  </p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                            {/* Subtypes */}
                            {subItem.subtypes && (
                              <div className="ml-8 mt-2 space-y-1 border-l-2 border-neutral-200 pl-4 dark:border-neutral-700">
                                {subItem.subtypes.map((subtype) => (
                                  <NavigationMenuLink
                                    key={subtype.href}
                                    asChild
                                  >
                                    <Link
                                      href={subtype.href}
                                      className="group flex items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                    >
                                      {subtype.icon && (
                                        <div className="flex-shrink-0">
                                          {subtype.icon}
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <div className="text-xs font-medium text-neutral-700 group-hover:text-brand-600 transition-colors dark:text-neutral-300 dark:group-hover:text-brand-400">
                                          {subtype.title}
                                        </div>
                                        <p className="text-xs text-neutral-500 leading-tight dark:text-neutral-500">
                                          {subtype.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              {/* Resources Link */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/resources"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 text-neutral-700 hover:text-brand-500 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-brand-500 dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:focus:text-neutral-100"
                  >
                    <FileText className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    Resources
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <Link href="/settings/profile">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer hover:ring-2 hover:ring-gray-400 transition">
                      <Image
                        src={
                          profile?.avatar_url
                            ? `${profile.avatar_url}?t=${Date.now()}`
                            : "/images/user.png"
                        }
                        alt={profile?.fname || "User"}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={onDashboard}
                    className="text-sm font-semibold text-gray-900 bg-gray-100 border border-gray-300 shadow-sm dark:text-gray-800 dark:bg-gray-200 dark:border-gray-700 flex items-center gap-2 px-3 py-2 rounded-md"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="hidden md:inline-flex p-2 bg-blue-400 hover:bg-blue-600 text-white rounded-md shadow-md transition-all duration-200"
                    asChild
                  >
                    <Link href="/login">
                      <LogIn className="w-5 h-5 text-white" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="hidden md:inline-flex text-neutral-700 hover:text-brand-500 hover:bg-neutral-100 transition-all duration-200 dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  variant="outline"
                  className="hidden md:inline-flex border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-brand-300 hover:text-brand-600 transition-all duration-200 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:border-brand-400 dark:hover:text-brand-400"
                  asChild
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-700 hover:text-brand-500 hover:bg-neutral-100 hover:text-brand-500 transition-colors duration-200 dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[400px] p-0 bg-white dark:bg-neutral-900"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    <Link
                      href="/"
                      className="flex items-center space-x-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/images/briskon-logo.png"
                        alt="Auction Platform"
                        width={120}
                        height={35}
                        className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-neutral-700 hover:text-brand-500 hover:bg-neutral-100 hover:text-brand-500 dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      {isAuthenticated && (
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            Welcome back, {user?.fname}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {user?.role} account
                          </div>
                        </div>
                      )}

                      <Link
                        href="/"
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 hover:text-brand-600 transition-all duration-200 dark:hover:bg-neutral-800 dark:hover:text-brand-400",
                          isHomePage &&
                            activeSection === "hero" &&
                            "bg-neutral-100 text-brand-600 dark:bg-neutral-800 dark:text-brand-400"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <Home className="h-5 w-5" />
                        <span className="text-sm font-medium">Home</span>
                      </Link>

                      {/* Mobile Detailed Navigation */}
                      {detailedNavItems.map((section) => (
                        <div key={section.title} className="space-y-3">
                          <div className="font-semibold text-sm text-neutral-900 uppercase tracking-wide border-b border-neutral-200 pb-2 dark:text-neutral-100 dark:border-neutral-800">
                            {section.title}
                          </div>
                          <div className="space-y-2 pl-2">
                            {section.items.map((item) => (
                              <div key={item.href}>
                                <Link
                                  href={item.href}
                                  className="group flex items-center gap-3 rounded-lg p-3 transition-smooth hover:bg-neutral-50 hover:shadow-soft dark:hover:bg-neutral-700 card-hover"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.icon && (
                                    <div className="flex-shrink-0 hover-lift">
                                      {item.icon}
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                      {item.title}
                                    </div>
                                    <div className="text-xs text-neutral-600 mt-1 dark:text-neutral-400">
                                      {item.description}
                                    </div>
                                  </div>
                                </Link>
                                {/* Mobile Subtypes */}
                                {item.subtypes && (
                                  <div className="ml-6 mt-2 space-y-1">
                                    {item.subtypes.map((subtype) => (
                                      <Link
                                        key={subtype.href}
                                        href={subtype.href}
                                        className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-100 transition-all duration-200 dark:hover:bg-neutral-800"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {subtype.icon && (
                                          <div className="flex-shrink-0">
                                            {subtype.icon}
                                          </div>
                                        )}
                                        <div>
                                          <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                            {subtype.title}
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="space-y-3">
                        <div className="font-semibold text-sm text-neutral-900 uppercase tracking-wide border-b border-neutral-200 pb-2 dark:text-neutral-100 dark:border-neutral-800">
                          Quick Access
                        </div>
                        <div className="space-y-2 pl-2">
                          <Link
                            href="/resources"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 hover:text-brand-600 transition-all duration-200 dark:hover:bg-neutral-800 dark:hover:text-brand-400"
                            onClick={() => setIsOpen(false)}
                          >
                            <FileText className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Resources
                            </span>
                          </Link>
                          <Link
                            href="/login"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 hover:text-brand-600 transition-all duration-200 dark:hover:bg-neutral-800 dark:hover:text-brand-400"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-sm font-medium">Login</span>
                          </Link>
                          <Link
                            href="/contact"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 hover:text-brand-600 transition-all duration-200 dark:hover:bg-neutral-800 dark:hover:text-brand-400"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-sm font-medium">
                              Contact Sales
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="p-6 border-t border-neutral-200 dark:border-neutral-800">
                    <Button
                      className="w-full bg-brand-500 hover:bg-brand-600 text-white"
                      asChild
                    >
                      <Link
                        href="/get-started"
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Link>
                    </Button>
                    {/* <Button
                      variant="outline"
                      className="w-full mt-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-brand-300 hover:text-brand-600 transition-all duration-200 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:border-brand-400 dark:hover:text-brand-400"
                      onClick={onDashboard}
                    >
                      Dashboard
                    </Button> */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
