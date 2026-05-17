"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingStartButton() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: none)");
    const updateDeviceType = () => setIsTouchDevice(mediaQuery.matches);

    updateDeviceType();
    mediaQuery.addEventListener("change", updateDeviceType);

    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updateDeviceType);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Hide on contact and billshield pages
  if (pathname === "/contact" || pathname === "/billshield") {
    return null;
  }

  const isScrolled = scrollY > 140;
  const isVisible = isTouchDevice ? isScrolled : isHovered;

  return (
    <Link href="/contact">
      <button 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          bottom: isTouchDevice ? "calc(env(safe-area-inset-bottom, 20px) + 10px)" : "32px",
          right: isTouchDevice ? "16px" : "32px",
          zIndex: 40,
          padding: isTouchDevice ? "10px 18px" : "14px 28px",
          borderRadius: "9999px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          background: "linear-gradient(135deg, rgba(251, 191, 36, 0.95), rgba(234, 179, 8, 0.95), rgba(5, 150, 105, 0.95))",
          color: "#020617",
          fontSize: isTouchDevice ? "13px" : "14px",
          fontWeight: "700",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isTouchDevice ? (isVisible ? "auto" : "none") : "auto",
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.2s ease",
          boxShadow: isVisible ? "0 24px 60px rgba(255, 183, 77, 0.34)" : "0 12px 30px rgba(0, 0, 0, 0.16)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          willChange: "transform, opacity"
        }}
      >
        Start with Sooryx
        <ArrowRight size={16} />
      </button>
    </Link>
  );
}
