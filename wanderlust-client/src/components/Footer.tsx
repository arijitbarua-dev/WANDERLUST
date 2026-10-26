
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here.
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#0B0B0B] px-5 pb-5 pt-12 text-white sm:px-8 md:pt-16">
      <div className="mx-auto max-w-7xl">
        {/* Brand */}
        <div>
          <Link
            href="/"
            aria-label="Wanderlast home"
            className="inline-block font-serif text-5xl font-bold leading-none tracking-[-2px] sm:text-6xl md:text-[72px]"
          >
            Wanderlast
          </Link>

          <p className="mt-2 text-xs text-[#A5A5A5] sm:text-sm">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Footer columns */}
        <div className="mt-10 grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:mt-11">
          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-xs uppercase text-[#E0E0E0]">
              Newsletter
            </h3>

            <p className="mt-2 text-[10px] leading-relaxed text-[#A5A5A5] sm:text-[11px]">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-3 flex max-w-70 items-center bg-[#363636]"
            >
              <label htmlFor="footer-email" className="sr-only">
                Enter your email
              </label>

              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#B0B0B0] focus:ring-1 focus:ring-inset focus:ring-[#13A5C1]"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex items-center justify-center px-3 text-white transition-colors hover:text-[#13A5C1]"
              >
                <ArrowUpRight size={19} strokeWidth={2} />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xs uppercase text-[#E0E0E0]">
              Quick Links
            </h3>

            <ul className="mt-3 space-y-2.5 text-xs text-[#A5A5A5] sm:text-[13px]">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/destinations"
                  className="transition-colors hover:text-white"
                >
                  Destinations
                </Link>
              </li>

              <li>
                <Link
                  href="/bookings"
                  className="transition-colors hover:text-white"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="transition-colors hover:text-white"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-xs uppercase text-[#E0E0E0]">
              Support
            </h3>

            <ul className="mt-3 space-y-2.5 text-xs text-[#A5A5A5] sm:text-[13px]">
              <li>
                <Link
                  href="/help"
                  className="transition-colors hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xs uppercase text-[#E0E0E0]">
              Contact Us
            </h3>

            <div className="mt-3 space-y-2.5 text-xs text-[#A5A5A5] sm:text-[13px]">
              <p>
                <a
                  href="tel:7869011622"
                  className="transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </p>

              <p>
                <a
                  href="mailto:info@wandarland.com"
                  className="break-all transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between md:mt-11">
          <p className="text-[10px] text-[#A5A5A5]">
            © 2026 Wanderlast. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {/* X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="text-white transition-colors hover:text-[#13A5C1]"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.39L5.58 22H2.45l7.25-8.29L1.8 2h6.4l4.43 6.96L18.9 2Zm-1.1 18h1.73L7.27 3.88H5.41L17.8 20Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white transition-colors hover:text-[#13A5C1]"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.9H4.98V9.4h2.95v9.5ZM6.45 8.1a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19 18.9h-2.94v-4.62c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.76 1.2-1.76 2.43v4.7H9.83V9.4h2.82v1.3h.04c.39-.74 1.35-1.52 2.78-1.52 2.98 0 3.53 1.96 3.53 4.5v5.22Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-white transition-colors hover:text-[#13A5C1]"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}