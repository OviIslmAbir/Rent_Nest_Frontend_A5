import Link from "next/link";

import { Mail, Phone, MapPin } from "lucide-react";

import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Rent<span className="text-blue-500">Nest</span>
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Find your perfect home with trusted landlords, verified properties,
              and a seamless rental experience.
            </p>

            <div className="flex gap-4 mt-6">
              <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
                <FaFacebookF size={18} />
              </Link>

              <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition">
                <FaInstagram size={18} />
              </Link>

              <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition">
                <FaTwitter size={18} />
              </Link>

              <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 transition">
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>

            <ul className="space-y-3 mt-5">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="hover:text-blue-400 transition"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property */}
          <div>
            <h3 className="text-white font-semibold text-lg">Properties</h3>

            <ul className="space-y-3 mt-5">
              <li className="hover:text-blue-400 cursor-pointer">
                Apartments
              </li>

              <li className="hover:text-blue-400 cursor-pointer">Houses</li>

              <li className="hover:text-blue-400 cursor-pointer">Rooms</li>

              <li className="hover:text-blue-400 cursor-pointer">
                Luxury Homes
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg">Contact Us</h3>

            <div className="space-y-4 mt-5">
              <p className="flex gap-3 items-center">
                <MapPin size={18} className="text-blue-500" />
                Dhaka, Bangladesh
              </p>

              <p className="flex gap-3 items-center">
                <Phone size={18} className="text-blue-500" />
                +880 1234 567890
              </p>

              <p className="flex gap-3 items-center">
                <Mail size={18} className="text-blue-500" />
                support@rentnest.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          {/* Hardcoded 2026 to keep the copyright year fixed */}
          <p>© 2026 RentNest. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="#" className="hover:text-blue-400 transition">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-blue-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}