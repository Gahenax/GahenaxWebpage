"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BentoItem = {
  icon: React.ReactNode;
  tag: string;
  title: string;
  desc: string;
  stack: string[];
  className?: string;
  featured?: boolean;
};

const ACCENT = "#00ffaa";
const ACCENT_DIM = "rgba(0,255,170,0.07)";
const ACCENT_MID = "rgba(0,255,170,0.2)";
const BG2 = "#0a0a0f";
const BG3 = "#0f0f17";
const TEXT = "#eaeaf0";
const TEXT2 = "#7a7a95";
const TEXT3 = "#45455a";
const BORDER = "rgba(255,255,255,0.05)";
const BORDER2 = "rgba(255,255,255,0.1)";

function BentoCard({ item }: { item: BentoItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("relative overflow-hidden", item.className)}
      style={{
        background: hovered ? BG3 : BG2,
        border: `1px solid ${hovered ? ACCENT_MID : BORDER}`,
        padding: item.featured ? "48px 40px" : "36px 28px",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 20% 20%, ${ACCENT_DIM}, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.5s",
        pointerEvents: "none",
      }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header row */}
        <div className="flex justify-between items-start mb-6">
          <div style={{
            width: item.featured ? 60 : 48,
            height: item.featured ? 60 : 48,
            border: `1px solid ${hovered ? ACCENT_MID : BORDER2}`,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,0.4)",
            flexShrink: 0,
            transition: "all 0.4s",
            boxShadow: hovered ? `0 0 20px ${ACCENT_DIM}` : "none",
          }}>
            {item.icon}
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: TEXT3,
            padding: "4px 10px",
            border: `1px solid ${BORDER}`,
            borderRadius: 3,
          }}>
            {item.tag}
          </span>
        </div>

        {/* Content */}
        <h3 style={{
          fontSize: item.featured ? "1.25rem" : "1rem",
          fontWeight: 700, letterSpacing: -0.4,
          color: TEXT, marginBottom: 10,
          lineHeight: 1.3,
        }}>
          {item.title}
        </h3>
        <p style={{
          fontSize: "0.8rem", color: TEXT2,
          lineHeight: 1.65, marginBottom: 20,
          flex: 1,
        }}>
          {item.desc}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {item.stack.map((s) => (
            <span key={s} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.58rem", color: hovered ? TEXT2 : TEXT3,
              padding: "4px 10px",
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${hovered ? BORDER2 : BORDER}`,
              borderRadius: 100,
              transition: "all 0.3s",
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-px"
      style={{ background: BORDER }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <BentoCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}

export type { BentoItem };
