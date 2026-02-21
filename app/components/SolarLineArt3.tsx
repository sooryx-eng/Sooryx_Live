"use client";

import { motion } from "framer-motion";

export default function SolarLineArt3({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <svg
        width="380"
        height="260"
        viewBox="0 0 380 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-[0.20]"
      >
        {/* Central Solar Panel Grid */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Panel glow */}
          <motion.rect
            x="158"
            y="88"
            width="64"
            height="64"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Main panel */}
          <rect x="160" y="90" width="60" height="60" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          
          {/* Grid lines */}
          <line x1="180" y1="90" x2="180" y2="150" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="200" y1="90" x2="200" y2="150" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="160" y1="110" x2="220" y2="110" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="160" y1="130" x2="220" y2="130" stroke="#1e293b" strokeWidth="1.5" />
        </motion.g>

        {/* Energy distribution lines */}
        <motion.g>
          {/* Top line */}
          <motion.path
            d="M 190 90 L 190 50"
            stroke="#1e293b"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          />
          
          {/* Bottom line */}
          <motion.path
            d="M 190 150 L 190 210"
            stroke="#1e293b"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          />
          
          {/* Left line */}
          <motion.path
            d="M 160 120 L 100 120"
            stroke="#1e293b"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          />
          
          {/* Right line */}
          <motion.path
            d="M 220 120 L 280 120"
            stroke="#1e293b"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          />
        </motion.g>

        {/* Energy particles flowing in 4 directions */}
        {/* Top particle */}
        <motion.circle
          cx="190"
          cy="90"
          r="5"
          fill="#f59e0b"
          filter="url(#glow3)"
          initial={{ cy: 90, opacity: 0 }}
          animate={{
            cy: [90, 70, 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />
        
        {/* Bottom particle */}
        <motion.circle
          cx="190"
          cy="150"
          r="5"
          fill="#f59e0b"
          filter="url(#glow3)"
          initial={{ cy: 150, opacity: 0 }}
          animate={{
            cy: [150, 180, 210],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1.5,
            delay: 0.5,
            ease: "easeInOut",
          }}
        />
        
        {/* Left particle */}
        <motion.circle
          cx="160"
          cy="120"
          r="5"
          fill="#f59e0b"
          filter="url(#glow3)"
          initial={{ cx: 160, opacity: 0 }}
          animate={{
            cx: [160, 130, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1.5,
            delay: 1,
            ease: "easeInOut",
          }}
        />
        
        {/* Right particle */}
        <motion.circle
          cx="220"
          cy="120"
          r="5"
          fill="#f59e0b"
          filter="url(#glow3)"
          initial={{ cx: 220, opacity: 0 }}
          animate={{
            cx: [220, 250, 280],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1.5,
            delay: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Four endpoint indicators */}
        {/* Top */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <circle cx="190" cy="50" r="8" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <motion.circle
            cx="190"
            cy="50"
            r="8"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0, 0, 0.35, 0] }}
            transition={{
              duration: 3.5,
              times: [0, 0.5, 0.57, 0.6, 1],
              repeat: Infinity,
              delay: 2.5,
            }}
          />
        </motion.g>
        
        {/* Bottom */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <circle cx="190" cy="210" r="8" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <motion.circle
            cx="190"
            cy="210"
            r="8"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0, 0, 0.35, 0] }}
            transition={{
              duration: 3.5,
              times: [0, 0.5, 0.57, 0.6, 1],
              repeat: Infinity,
              delay: 3,
            }}
          />
        </motion.g>
        
        {/* Left */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <circle cx="100" cy="120" r="8" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <motion.circle
            cx="100"
            cy="120"
            r="8"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0, 0, 0.35, 0] }}
            transition={{
              duration: 3.5,
              times: [0, 0.5, 0.57, 0.6, 1],
              repeat: Infinity,
              delay: 3.5,
            }}
          />
        </motion.g>
        
        {/* Right */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <circle cx="280" cy="120" r="8" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <motion.circle
            cx="280"
            cy="120"
            r="8"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0, 0, 0.35, 0] }}
            transition={{
              duration: 3.5,
              times: [0, 0.5, 0.57, 0.6, 1],
              repeat: Infinity,
              delay: 4,
            }}
          />
        </motion.g>

        {/* Glow filter */}
        <defs>
          <filter id="glow3">
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
