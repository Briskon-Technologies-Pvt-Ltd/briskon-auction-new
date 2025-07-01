import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Logo Only */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/briskon-auction-vertical-logo-white.png"
                alt="Briskon Auction"
                width={250}
                height={250}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right: All Content */}
          <div className="lg:col-span-4 space-y-10">
            {/* Footer Navigation Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg  font-semibold text-gray-900 mb-4">Platform</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/platform"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform/how-it-works"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      How it Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform/ai-capabilities"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      AI Capabilities
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/demo"
                      className=" underline font-medium hover:text-blue-600 font-semibold"
                    >
                      Live Demo
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg  font-semibold text-gray-900 mb-4">Solutions</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/solutions/forward-auction"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Forward Auction
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/solutions/reverse-auction"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Reverse Auction
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/solutions/marketplace"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Auction Marketplace
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg  font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/newsroom"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Newsroom
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className=" underline font-medium hover:text-blue-600 font-semibold"
                    >
                      Contact Sales
                    </Link>
                  </li>
                  
                </ul>
              </div>
              
              
              <div>
                <h3 className="text-lg  font-semibold text-gray-900 mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  {/* <li>
                    <Link
                      href="/resources/guides"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Guides & Tutorials
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      href="/resources/case-studies"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Privacy policy
                    </Link>
                  </li>
                   <li>
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Terms and conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/disclaimer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Disclaimer
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href="/resources/api-docs"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      API Documentation
                    </Link>
                  </li> */}
                </ul>
              </div>
              {/* <div>
                <h3 className="text-lg  font-semibold text-gray-900 mb-4">Policies</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Privacy policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Terms and conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/disclaimer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookie-policy"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Cookie policy
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
            {/* Contact Info + Social Icons vertically stacked */}
            <div className="pt-6 mt-6 space-y-2 text-sm text-gray-600 border-t border-gray-200">
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <p>
                  1750, 15th Main, 38th Cross, 1st Stage, 5th Block, HBR Layout,
                  <br />
                  Bangalore-560043, India
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <Link href="tel:+918041477200" className="hover:text-blue-600">
                  +91 80 41477200
                </Link>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <Link
                  href="mailto:info@briskon.com"
                  className="hover:text-blue-600"
                >
                  info@briskon.com
                </Link>
              </div>

              {/* Social Icons - placed vertically after contact info */}
              <h3 className=" text-lg font-semibold text-gray-900">Social</h3>
                <div className="border-t border-gray-200 mt-4"></div>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
              
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500 mt-10 text-right ">
              © 2025 Briskon Auction. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
