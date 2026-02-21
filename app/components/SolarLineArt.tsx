"use client";

import { motion } from "framer-motion";

export default function SolarLineArt({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-[0.20]"
      >
        {/* Solar Panel with subtle glow */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Panel base glow */}
          <motion.rect
            x="48"
            y="78"
            width="84"
            height="54"
            fill="#fbbf24"
            opacity="0"
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          
          <rect x="50" y="80" width="80" height="50" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <line x1="90" y1="80" x2="90" y2="130" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="50" y1="105" x2="130" y2="105" stroke="#1e293b" strokeWidth="1.5" />
        </motion.g>

        {/* Energy Flow - Animated Dots with glow */}
        <motion.g>
          <motion.circle
            cx="130"
            cy="105"
            r="5"
            fill="#f59e0b"
            filter="url(#glow)"
            initial={{ cx: 130, opacity: 0 }}
            animate={{
              cx: [130, 200, 270, 320],
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="130"
            cy="105"
            r="5"
            fill="#f59e0b"
            filter="url(#glow)"
            initial={{ cx: 130, opacity: 0 }}
            animate={{
              cx: [130, 200, 270, 320],
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              delay: 2,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        {/* Connection Lines */}
        <motion.path
          d="M 130 105 L 200 105 L 270 105 L 320 105"
          stroke="#1e293b"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
        />

        {/* Light Bulb with synchronized glow */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <circle cx="320" cy="105" r="25" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <path
            d="M 305 125 L 335 125 M 308 130 L 332 130 M 315 135 L 325 135"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          
          {/* Bulb inner glow - synchronized with particle arrival */}
          <motion.circle
            cx="320"
            cy="105"
            r="25"
            fill="#fbbf24"
            opacity="0"
            animate={{
              opacity: [0, 0, 0.35, 0.35, 0],
            }}
            transition={{
              duration: 4,
              times: [0, 0.6, 0.625, 0.9, 1],
              repeat: Infinity,
              delay: 0,
            }}
          />
          
          {/* Bulb outer glow */}
          <motion.circle
            cx="320"
            cy="105"
            r="35"
            fill="#fef3c7"
            opacity="0"
            animate={{
              opacity: [0, 0, 0.2, 0.2, 0],
            }}
            transition={{
              duration: 4,
              times: [0, 0.6, 0.625, 0.9, 1],
              repeat: Infinity,
              delay: 0,
            }}
          />
        </motion.g>

        {/* Light rays with enhanced visibility - synchronized */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 4,
            times: [0, 0.6, 0.625, 0.9, 1],
            repeat: Infinity,
            delay: 0,
          }}
        >
          <line x1="320" y1="75" x2="320" y2="65" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="350" y1="85" x2="358" y2="77" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="290" y1="85" x2="282" y2="77" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="355" y1="105" x2="365" y2="105" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="285" y1="105" x2="275" y2="105" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="350" y1="125" x2="358" y2="133" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="290" y1="125" x2="282" y2="133" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        
        {/* Glow filter definition */}
        <defs>
          <filter id="glow">
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
