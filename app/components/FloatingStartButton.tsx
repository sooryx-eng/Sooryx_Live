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
          padding: isTouchDevice ? "10px 16px" : "12px 24px",
          borderRadius: "9999px",
          border: "1px solid rgba(217, 119, 6, 0.5)",
          background: "linear-gradient(to right, #fcd34d, #fef08a, #a7f3d0)",
          color: "#020617",
          fontSize: isTouchDevice ? "13px" : "14px",
          fontWeight: "600",
          opacity: isTouchDevice ? 1 : (isHovered ? 1 : 0),
          transition: "opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          boxShadow: isHovered ? "0 20px 45px rgba(217, 119, 6, 0.3)" : "0 10px 25px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        Start with Sooryx
        <ArrowRight size={16} />
      </button>
    </Link>
  );
}
