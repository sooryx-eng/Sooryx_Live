"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GlobalNavbar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (!isMobile) {
        if (isHidden) {
          setIsHidden(false);
        }
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return;
      }

      const scrollingDown = currentScrollY > lastScrollY;
      const shouldHide = scrollingDown && currentScrollY > 70;
      setIsHidden(shouldHide);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!window.matchMedia("(max-width: 767px)").matches) {
        setIsHidden(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHidden]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur transition-transform duration-300 ease-out md:duration-0 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } md:translate-y-0`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4 lg:px-10 lg:py-5">
        <Link
          href="/"
          className="shrink-0 flex items-center gap-2 rounded-full px-2 py-1 text-lg font-semibold text-white transition duration-300 hover:bg-white/5 hover:text-amber-300 md:text-[22px]"
        >
          <Image
            src="/sooryx-favicon.svg"
            alt="Sooryx"
            width={32}
            height={32}
            className="h-8 w-8 md:h-9 md:w-9"
          />
          Sooryx
        </Link>

        <div className="hidden flex-1 flex-wrap items-center justify-end gap-2 text-xs md:flex lg:gap-3 lg:text-sm">
          <Link
            href="/billshield"
            style={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #fbbf24, #facc15, #10b981)",
              padding: "10px 24px",
              borderRadius: "999px",
              fontWeight: 700,
              color: "#020617",
              boxShadow: "0 6px 18px 0 rgba(251, 191, 36, 0.35)",
              transition: "all 0.25s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(251,191,36,0.45)] active:translate-y-0 active:scale-[0.98]"
          >
            BillShield
          </Link>
          <Link
            href="/"
            className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]"
            style={{ cursor: "pointer" }}
          >
            Home
          </Link>
          <Link
            href="/calculator"
            className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]"
            style={{ cursor: "pointer" }}
          >
            Calculate Savings
          </Link>
          <Link
            href="/how-it-works"
            className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]"
            style={{ cursor: "pointer" }}
          >
            How it Works
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]"
            style={{ cursor: "pointer" }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-3 md:hidden">
        <div className="space-y-2">
          <Link
            href="/billshield"
            style={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #fbbf24, #facc15, #10b981)",
              padding: "9px 14px",
              borderRadius: "999px",
              fontWeight: 600,
              color: "#020617",
              boxShadow: "0 4px 14px 0 rgba(251, 191, 36, 0.3)",
              transition: "all 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
            }}
            className="w-full transition duration-150 active:scale-[0.99] active:shadow-[0_8px_18px_rgba(251,191,36,0.45)]"
          >
            BillShield
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]"
            >
              Home
            </Link>
            <Link
              href="/calculator"
              className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]"
            >
              Savings
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]"
            >
              How it Works
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
