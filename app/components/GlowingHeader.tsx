"use client";

import { useState } from "react";

export default function GlowingHeader({
  children,
  className = "",
  as = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const Tag = as;

  return (
    <Tag
      className={`${className} transition-all duration-500 cursor-default ${
        isHovered
          ? "drop-shadow-[0_0_25px_rgba(251,191,36,0.6)] text-shadow-glow"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textShadow: isHovered
          ? "0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.5), 0 0 60px rgba(251,191,36,0.3)"
          : "none",
      }}
    >
      {children}
    </Tag>
  );
}
