import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Slogan Section */}
<div className="py-4">
  <p className="text-lg text-left" style={{ wordSpacing: "5px" }}>
    <span className="font-bold text-black">Transforming</span>{" "}
    <span className="text-black">the world of</span>{" "}
    <strong className="text-blue-900">auctions</strong>{" "}
    <span className="text-black">with</span>{" "}
    <strong className="text-blue-900">technology</strong>
  </p>
</div>


        {/* Logo and Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/briskon-auction-vertical-logo-white.png"
                alt="Briskon Auction"
                width={150}
                height={40}
                className="h-auto"
              />
            </Link>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <p>1750, 15th Main, 38th Cross, 1st Stage, 5th Block, HBR Layout, Bangalore-560043, India</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <Link href="tel:+918041477200" className="hover:text-blue-600 transition-colors">
                  +91 80 41477200
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <Link href="mailto:info@briskon.com" className="hover:text-blue-600 transition-colors">
                  info@briskon.com
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/newsroom" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 font-semibold underline hover:text-blue-600 transition-colors">
                    Contact Sales
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-gray-600 font-semibold underline hover:text-blue-600 transition-colors">
                    Live Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/platform" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/platform/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/platform/ai-capabilities" className="text-gray-600 hover:text-blue-600 transition-colors">
                    AI Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Live Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/solutions/forward-auction" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Forward Auction
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/reverse-auction" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Reverse Auction
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/marketplace" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Auction Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/resources/guides" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Guides & Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/resources/case-studies" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/resources/api-docs" className="text-gray-600 hover:text-blue-600 transition-colors">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Policies</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Cookie policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="border-t border-gray-200 flex flex-col md:flex-row justify-between items-center py-6">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Briskon Auction. All rights reserved</p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-center md:text-right">Social</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" style={{ color: "#1E40AF" }} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" style={{ color: "#000000" }} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" style={{ color: "#1E40AF" }} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" style={{ color: "#000000" }} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Youtube className="w-5 h-5" style={{ color: "#1E40AF" }} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
