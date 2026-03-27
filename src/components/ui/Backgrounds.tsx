"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Meteor = {
  id: number;
  top: string;
  left: string;
  width: number;
  delay: number;
  duration: number;
  angle: number;
};

function generateMeteors(n: number): Meteor[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    top: `${Math.random() * 60}%`,
    left: `${Math.random() * 100}%`,
    width: Math.random() * 120 + 60,
    delay: Math.random() * 8,
    duration: Math.random() * 3 + 2,
    angle: Math.random() * 20 - 10,
  }));
}

export function MeteorBeams({
  count = 12,
  color = "rgba(0,255,170,0.6)",
  className,
}: {
  count?: number;
  color?: string;
  className?: string;
}) {
  const meteors = React.useMemo(() => generateMeteors(count), [count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{
            top: m.top,
            left: m.left,
            width: `${m.width}px`,
            height: "1px",
            background: `linear-gradient(90deg, ${color}, transparent)`,
            transform: `rotate(${m.angle}deg)`,
            animation: `meteorSlide ${m.duration}s linear ${m.delay}s infinite`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-1px",
              left: 0,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 8px 2px ${color}`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes meteorSlide {
          0% { transform: translateX(-100%) rotate(var(--angle, 0deg)); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(150vw) rotate(var(--angle, 0deg)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function GridBackground({
  className,
  color = "rgba(255,255,255,0.04)",
  size = 60,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

export function DotBackground({
  className,
  color = "rgba(255,255,255,0.12)",
  size = 24,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
