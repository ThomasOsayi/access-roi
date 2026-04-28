"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="logo">
          <svg className="logo-mark" viewBox="0 0 32 32" fill="none">
            <path
              d="M22 14V10.5C22 6.91015 19.0899 4 15.5 4C11.9101 4 9 6.91015 9 10.5V14"
              stroke="#00D26A"
              strokeWidth="3"
              strokeLinecap="square"
            />
            <rect x="6" y="14" width="20" height="16" rx="1" fill="#00D26A" />
            <circle cx="16" cy="21" r="2" fill="#0A2426" />
            <rect x="15" y="21" width="2" height="5" fill="#0A2426" />
          </svg>
          Access&nbsp;ROI
        </Link>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link href="/" className={isActive("/") ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/join" className={isActive("/join") ? "active" : ""}>
              Join
            </Link>
          </li>
          <li>
            <Link href="/ebook" className={isActive("/ebook") ? "active" : ""}>
              E-Book
            </Link>
          </li>
          <li>
            <Link href="/shop" className={isActive("/shop") ? "active" : ""}>
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/session"
              className={isActive("/session") ? "active" : ""}
            >
              1:1 Session
            </Link>
          </li>
        </ul>

        <Link href="/ebook" className="nav-cta">
          Pre-Order
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 6H11M11 6L6 1M11 6L6 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6H21M3 12H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}