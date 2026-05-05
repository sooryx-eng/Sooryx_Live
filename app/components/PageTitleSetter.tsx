"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/platform": "Platform",
  "/calculator": "Solar Calculator",
  "/contact": "Contact",
  "/credits": "Credits",
  "/how-it-works": "How It Works",
  "/billshield": "BillShield",
  "/billshield/signup": "BillShield Signup",
  "/billshield/login": "BillShield Login",
  "/billshield/user": "BillShield User",
  "/billshield/confirmation": "BillShield Confirmation",
  "/admin/users": "Admin Users",
};

function formatFallbackTitle(pathname: string) {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (match) => match.toUpperCase())
    );

  return segments.length > 0 ? segments.join(" - ") : "Home";
}

export default function PageTitleSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const pageName = PAGE_TITLES[pathname] || formatFallbackTitle(pathname);
    document.title = `Sooryx - ${pageName}`;
  }, [pathname]);

  return null;
}
