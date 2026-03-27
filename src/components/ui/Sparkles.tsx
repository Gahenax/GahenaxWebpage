"use client";

import React, { useId, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  id: number;
  x: string;
  y: string;
  opacity: number;
  size: number;
  duration: number;
  delay: number;
};

function generateParticles(n: number): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.1,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }));
}

export function SparklesCore({
  background = "transparent",
  minSize = 0.8,
  maxSize = 2,
  speed = 1,
  particleColor = "#00ffaa",
  className,
  particleCount = 80,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  className?: string;
  particleCount?: number;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const id = useId();

  useEffect(() => {
    setParticles(generateParticles(particleCount));
  }, [particleCount]);

  return (
    <div
      className={cn("w-full h-full relative overflow-hidden", className)}
      style={{ background }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={particleColor} stopOpacity="1" />
            <stop offset="100%" stopColor={particleColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <AnimatePresence>
          {particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={minSize + Math.random() * (maxSize - minSize)}
              fill={particleColor}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, p.opacity, 0],
                scale: [0, 1, 0],
                cy: [`${parseFloat(p.y)}%`, `${parseFloat(p.y) - 8}%`, `${parseFloat(p.y)}%`],
              }}
              transition={{
                duration: p.duration / speed,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
}

export function Sparkles({
  children,
  className,
  particleColor = "#00ffaa",
  particleCount = 60,
  speed = 1,
}: {
  children?: React.ReactNode;
  className?: string;
  particleColor?: string;
  particleCount?: number;
  speed?: number;
}) {
  return (
    <div className={cn("relative", className)}>
      <SparklesCore
        className="absolute inset-0 pointer-events-none"
        particleColor={particleColor}
        particleCount={particleCount}
        speed={speed}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
