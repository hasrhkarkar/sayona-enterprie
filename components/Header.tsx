"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/image/sayona-logo.png";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname() || "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    `hover:underline ${pathname === href ? "text-[#f4b03c] font-semibold" : "text-white"}`;

  const mobileLinkClass = (href: string) =>
    `block px-4 py-2 hover:bg-white/10 ${pathname === href ? "text-[#f4b03c] font-semibold" : "text-white"}`;

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-black/20 bg-[#050428] relative z-50">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={logo}
            alt="West Ealing Timber logo"
            width={180}
            height={60}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-sm">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>
        <Link href="/products" className={linkClass("/products")}>
          Products
        </Link>
        <Link
          href="/contact-us"
          className={`px-4 py-2 rounded ${pathname === "/contact-us" ? "bg-[#f4b03c] text-[#07102b] font-semibold" : "bg-transparent text-white"}`}>
          Contact Us
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#050428] border-b border-white/10 md:hidden flex flex-col p-4 space-y-4 shadow-lg">
          <Link href="/" className={mobileLinkClass("/")} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/products" className={mobileLinkClass("/products")} onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link
            href="/contact-us"
            className={`block px-4 py-2 rounded text-center ${pathname === "/contact-us" ? "bg-[#f4b03c] text-[#07102b] font-semibold" : "border border-white/20 text-white"}`}
            onClick={() => setIsMenuOpen(false)}>
            Contact Us
          </Link>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-white text-sm px-4">
            <a href="mailto:info@westealingtimber.co.uk" className="hover:underline">info@westealingtimber.co.uk</a>
            <a href="tel:+91 79848 19991" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 79848 19991
            </a>
          </div>
        </div>
      )}

      <div className="hidden lg:flex flex-col items-end text-sm space-y-1 text-white">
        <a href="mailto:Info@sayonaenterprise.com" className="hover:underline">Info@sayonaenterprise.com</a>
        <span>
          <a href="tel:+91 79848 19991">+91 79848 19991</a>
        </span>
      </div>
    </header>
  );
}
