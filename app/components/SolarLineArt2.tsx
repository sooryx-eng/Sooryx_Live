"use client";

import { motion } from "framer-motion";

export default function SolarLineArt2({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <svg
        width="350"
        height="280"
        viewBox="0 0 350 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-[0.20]"
      >
        {/* Sun Icon */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <circle cx="60" cy="60" r="20" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          
          {/* Sun glow */}
          <motion.circle
            cx="60"
            cy="60"
            r="20"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Rotating sun rays */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "60px 60px" }}
          >
            <line x1="60" y1="35" x2="60" y2="28" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="60" y1="92" x2="60" y2="85" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="35" y1="60" x2="28" y2="60" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="92" y1="60" x2="85" y2="60" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="43" y1="43" x2="38" y2="38" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="82" y1="82" x2="77" y2="77" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="82" y1="43" x2="77" y2="38" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="43" y1="82" x2="38" y2="77" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* Curved solar panel beam path */}
        <motion.path
          d="M 80 60 Q 150 40, 220 80"
          stroke="#1e293b"
          strokeWidth="2.5"
          strokeDasharray="5,5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />

        {/* Solar Panel Array */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {/* Background glow */}
          <motion.rect
            x="218"
            y="78"
            width="64"
            height="44"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
          
          <rect x="220" y="80" width="60" height="40" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <line x1="250" y1="80" x2="250" y2="120" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="220" y1="100" x2="280" y2="100" stroke="#1e293b" strokeWidth="1.5" />
        </motion.g>

        {/* Wavy energy path to house */}
        <motion.path
          d="M 250 120 Q 250 160, 250 200"
          stroke="#1e293b"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
        />

        {/* Energy particles flowing down */}
        <motion.circle
          cx="250"
          cy="120"
          r="5"
          fill="#f59e0b"
          filter="url(#glow2)"
          initial={{ cy: 120, opacity: 0 }}
          animate={{
            cy: [120, 160, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />
        
        <motion.circle
          cx="250"
          cy="120"
          r="5"
          fill="#f59e0b"
          filter="url(#glow2)"
          initial={{ cy: 120, opacity: 0 }}
          animate={{
            cy: [120, 160, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            delay: 1.2,
            ease: "easeInOut",
          }}
        />

        {/* House */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          {/* Roof */}
          <path d="M 220 200 L 250 180 L 280 200 Z" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          {/* Walls */}
          <rect x="225" y="200" width="50" height="40" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          {/* Door */}
          <rect x="235" y="215" width="15" height="25" stroke="#1e293b" strokeWidth="2" fill="none" />
          {/* Window with glow - synchronized */}
          <rect x="255" y="210" width="12" height="12" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          <motion.rect
            x="255"
            y="210"
            width="12"
            height="12"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0, 0, 0.4, 0] }}
            transition={{
              duration: 3.5,
              times: [0, 0.6, 0.7, 0.75, 1],
              repeat: Infinity,
              delay: 3,
            }}
          />
          
          {/* House glow */}
          <motion.rect
            x="223"
            y="198"
            width="54"
            height="44"
            fill="#fef3c7"
            opacity="0"
            animate={{ opacity: [0, 0, 0, 0.15, 0] }}
            transition={{
              duration: 3.5,
              times: [0, 0.6, 0.7, 0.75, 1],
              repeat: Infinity,
              delay: 3,
            }}
          />
        </motion.g>

        {/* Glow filter */}
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
