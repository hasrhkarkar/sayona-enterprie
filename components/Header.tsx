"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/image/sayona-logo.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "/";
  const linkClass = (href: string) =>
    `hover:underline ${pathname === href ? "text-[#f4b03c] font-semibold" : "text-white"}`;

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-black/20 bg-[#050428]">
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

      <div className="hidden lg:flex flex-col items-end text-sm space-y-1 text-white">
        {/* <a href="mailto:info@westealingtimber.co.uk" className="hover:underline">info@westealingtimber.co.uk</a> */}
        <span>
          <a href="tel:+91 79848 19991">+91 79848 19991</a>
        </span>
      </div>
    </header>
  );
}
