"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingStartButton() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: none)");
    const updateDeviceType = () => setIsTouchDevice(mediaQuery.matches);

    updateDeviceType();
    mediaQuery.addEventListener("change", updateDeviceType);

    return () => mediaQuery.removeEventListener("change", updateDeviceType);
  }, []);
  
  // Hide on contact and billshield pages
  if (pathname === "/contact" || pathname === "/billshield") {
    return null;
  }

  return (
    <Link href="/contact">
      <button 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          bottom: isTouchDevice ? "20px" : "32px",
          right: isTouchDevice ? "16px" : "32px",
          zIndex: 40,
          padding: isTouchDevice ? "10px 18px" : "14px 28px",
          borderRadius: "9999px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          background: "linear-gradient(135deg, rgba(251, 191, 36, 0.95), rgba(234, 179, 8, 0.95), rgba(5, 150, 105, 0.95))",
          color: "#020617",
          fontSize: isTouchDevice ? "13px" : "14px",
          fontWeight: "700",
          opacity: isTouchDevice ? 1 : (isHovered ? 1 : 0),
          transition: "opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.2s ease",
          boxShadow: isHovered ? "0 24px 60px rgba(255, 183, 77, 0.34)" : "0 12px 30px rgba(0, 0, 0, 0.16)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        Start with Sooryx
        <ArrowRight size={16} />
      </button>
    </Link>
  );
}
