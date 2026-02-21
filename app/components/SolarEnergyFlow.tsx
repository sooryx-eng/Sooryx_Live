"use client";

import { motion } from "framer-motion";

export default function SolarEnergyFlow({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <svg
        width="300"
        height="200"
        viewBox="0 0 300 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-[0.06]"
      >
        {/* Curved energy path */}
        <motion.path
          d="M 50 100 Q 100 60, 150 100 T 250 100"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Energy particles */}
        <motion.circle
          cx="50"
          cy="100"
          r="4"
          fill="#f59e0b"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            offsetPath: "path('M 50 100 Q 100 60, 150 100 T 250 100')",
          }}
        />
        
        <motion.circle
          cx="50"
          cy="100"
          r="4"
          fill="#fbbf24"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1.3,
            ease: "linear",
          }}
          style={{
            offsetPath: "path('M 50 100 Q 100 60, 150 100 T 250 100')",
          }}
        />

        <motion.circle
          cx="50"
          cy="100"
          r="4"
          fill="#f59e0b"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 2.6,
            ease: "linear",
          }}
          style={{
            offsetPath: "path('M 50 100 Q 100 60, 150 100 T 250 100')",
          }}
        />

        {/* Sun icon - simplified */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <circle cx="50" cy="100" r="15" stroke="#1e293b" strokeWidth="2" fill="none" />
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 100px" }}
          >
            <line x1="50" y1="80" x2="50" y2="75" stroke="#1e293b" strokeWidth="2" />
            <line x1="50" y1="125" x2="50" y2="120" stroke="#1e293b" strokeWidth="2" />
            <line x1="30" y1="100" x2="25" y2="100" stroke="#1e293b" strokeWidth="2" />
            <line x1="75" y1="100" x2="70" y2="100" stroke="#1e293b" strokeWidth="2" />
          </motion.g>
        </motion.g>

        {/* Home icon - simplified */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <path
            d="M 240 90 L 250 80 L 260 90 L 260 110 L 240 110 Z"
            stroke="#1e293b"
            strokeWidth="2"
            fill="none"
          />
          <rect x="246" y="100" width="8" height="10" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          {/* Window glow */}
          <motion.rect
            x="246"
            y="100"
            width="8"
            height="10"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 3,
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
