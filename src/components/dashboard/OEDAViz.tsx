"use client";

import { useState, useEffect } from "react";
import type { OEDAStep } from "@/lib/gahenax/oeda";

const steps: OEDAStep[] = ["OBSERVE", "EVALUATE", "DECIDE", "ACT"];

export function OEDAViz() {
  const [step, setStep] = useState<OEDAStep>("OBSERVE");
  const [metrics, setMetrics] = useState({ friction: 50, efficiency: 90 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const currentIndex = steps.indexOf(prev);
        const nextIndex = (currentIndex + 1) % steps.length;
        return steps[nextIndex];
      });
      setMetrics({
        friction: Math.floor(Math.random() * 20 + 40),
        efficiency: Math.floor(Math.random() * 15 + 85),
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8 glass rounded-2xl border border-accent/20">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-black tracking-widest uppercase text-accent">OEDA_CORE_RUNTIME</h3>
        <div className="flex gap-2">
          {steps.map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                s === step ? "bg-accent shadow-glow-green" : "bg-surface"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`p-4 rounded-lg border transition-all duration-700 ${
              s === step ? "border-accent bg-accent/5" : "border-border opacity-40"
            }`}
          >
            <div className="text-[10px] font-mono text-muted mb-2">STEP_0{i + 1}</div>
            <div className={`font-bold tracking-tighter ${s === step ? "text-accent" : ""}`}>
              {s}
            </div>
            {s === step && (
              <div className="mt-4 text-[10px] font-mono animate-pulse text-accent-secondary">
                EXECUTING_LOGIC...
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 pt-10 border-t border-border/50 grid grid-cols-2 gap-8">
        <div>
          <div className="text-xs font-mono text-muted uppercase mb-4 tracking-widest">Friction_Index</div>
          <div className="text-4xl font-black text-gradient">
            {metrics.friction}%
          </div>
        </div>
        <div>
          <div className="text-xs font-mono text-muted uppercase mb-4 tracking-widest">Revenue_Efficiency</div>
          <div className="text-4xl font-black text-accent">
            {metrics.efficiency}%
          </div>
        </div>
      </div>
    </div>
  );
}
