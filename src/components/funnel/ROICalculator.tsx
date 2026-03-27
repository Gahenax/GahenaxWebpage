"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#00ffaa";
const RED = "#ff2d55";
const AMBER = "#ffaa00";
const BG2 = "#0a0a0f";
const BG3 = "#0f0f17";
const TEXT = "#eaeaf0";
const TEXT2 = "#7a7a95";
const TEXT3 = "#45455a";
const BORDER = "rgba(255,255,255,0.05)";
const BORDER2 = "rgba(255,255,255,0.1)";

type SliderField = {
  id: string;
  label: string;
  sublabel: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  format: "currency" | "percent" | "hours";
};

const FIELDS: SliderField[] = [
  { id: "revenue", label: "Facturación mensual", sublabel: "Ingresos antes de costos", min: 1000, max: 100000, step: 500, unit: "€", format: "currency" },
  { id: "manualHours", label: "Horas semanales en procesos manuales", sublabel: "Gestión, seguimiento, reportes", min: 2, max: 80, step: 1, unit: "h/sem", format: "hours" },
  { id: "leadLoss", label: "Leads que no se cierran por falta de seguimiento", sublabel: "Estimación propia", min: 5, max: 70, step: 5, unit: "%", format: "percent" },
  { id: "conversionRate", label: "Tasa de conversión actual", sublabel: "Lead → cliente pagando", min: 1, max: 30, step: 1, unit: "%", format: "percent" },
];

type Values = Record<string, number>;

function formatValue(val: number, format: SliderField["format"], unit: string): string {
  if (format === "currency") return `${unit}${val.toLocaleString("es-ES")}`;
  if (format === "percent") return `${val}${unit}`;
  return `${val} ${unit}`;
}

function computeLeakage(vals: Values): {
  manualCost: number;
  leadRevenueLost: number;
  conversionLift: number;
  totalLeak: number;
} {
  const hourlyRate = (vals.revenue / 160) * 1.5;
  const manualCost = vals.manualHours * 4.33 * hourlyRate;

  const avgTicket = vals.revenue * 0.08;
  const leadsPerMonth = vals.revenue / avgTicket;
  const leadRevenueLost = leadsPerMonth * (vals.leadLoss / 100) * avgTicket;

  const conversionLift = vals.revenue * ((vals.conversionRate + 8) / vals.conversionRate - 1) * 0.4;

  const totalLeak = manualCost + leadRevenueLost + conversionLift;

  return { manualCost, leadRevenueLost, conversionLift, totalLeak };
}

function Slider({ field, value, onChange }: { field: SliderField; value: number; onChange: (v: number) => void }) {
  const pct = ((value - field.min) / (field.max - field.min)) * 100;

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: TEXT, marginBottom: 2 }}>{field.label}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: TEXT3 }}>{field.sublabel}</div>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.9rem", fontWeight: 700, color: ACCENT,
          padding: "4px 12px",
          border: `1px solid rgba(0,255,170,0.2)`,
          borderRadius: 6,
          minWidth: 80, textAlign: "center",
        }}>
          {formatValue(value, field.format, field.unit)}
        </div>
      </div>
      <div style={{ position: "relative", height: 4, background: BORDER2, borderRadius: 4 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${ACCENT}, rgba(0,255,170,0.6))`,
          borderRadius: 4,
          transition: "width 0.15s",
        }} />
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0,
            opacity: 0, cursor: "pointer",
            width: "100%", height: "100%",
            margin: 0,
          }}
        />
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 8px)`, top: "50%",
          transform: "translateY(-50%)",
          width: 16, height: 16,
          background: ACCENT,
          borderRadius: "50%",
          boxShadow: `0 0 12px rgba(0,255,170,0.6)`,
          pointerEvents: "none",
          transition: "left 0.15s",
        }} />
      </div>
    </div>
  );
}

function LeakRow({ label, value, color = RED }: { label: string; value: number; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 0",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ fontSize: "0.8rem", color: TEXT2 }}>{label}</div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.92rem", fontWeight: 700,
        color,
      }}>
        -{Math.round(value).toLocaleString("es-ES")} €/mes
      </div>
    </motion.div>
  );
}

export function ROICalculator() {
  const [values, setValues] = useState<Values>({
    revenue: 15000,
    manualHours: 20,
    leadLoss: 30,
    conversionRate: 8,
  });

  const leaks = useMemo(() => computeLeakage(values), [values]);
  const severity = leaks.totalLeak > values.revenue * 0.3 ? "critical" : leaks.totalLeak > values.revenue * 0.15 ? "high" : "moderate";

  const severityColor = { critical: RED, high: AMBER, moderate: ACCENT }[severity];
  const severityLabel = { critical: "FUGA_CRÍTICA", high: "RIESGO_ALTO", moderate: "RIESGO_MODERADO" }[severity];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 2,
      background: BORDER,
    }}
    className="calculator-grid"
    >
      <style>{`
        @media (max-width: 900px) {
          .calculator-grid { grid-template-columns: 1fr !important; }
        }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; }
        input[type=range]::-moz-range-thumb { width: 0; height: 0; border: none; background: transparent; }
      `}</style>

      {/* ── LEFT: INPUTS ── */}
      <div style={{ background: BG2, padding: "40px 36px" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: ACCENT,
          marginBottom: 28,
        }}>
          PARÁMETROS_DE_DIAGNÓSTICO
        </div>
        {FIELDS.map((f) => (
          <Slider
            key={f.id}
            field={f}
            value={values[f.id]}
            onChange={(v) => setValues((prev) => ({ ...prev, [f.id]: v }))}
          />
        ))}
        <div style={{
          marginTop: 16,
          padding: "12px 16px",
          background: "rgba(255,170,0,0.06)",
          border: `1px solid rgba(255,170,0,0.15)`,
          borderRadius: 8,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem", color: "rgba(255,170,0,0.7)",
          lineHeight: 1.6,
        }}>
          Modelo de estimación conservador. Asume promedios de mercado B2B servicios.
        </div>
      </div>

      {/* ── RIGHT: RESULTS ── */}
      <div style={{ background: BG3, padding: "40px 36px", display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: TEXT3,
          marginBottom: 28,
        }}>
          LEAK_ANALYSIS_REPORT
        </div>

        {/* Severity badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "8px 16px",
          border: `1px solid ${severityColor}`,
          borderRadius: 6,
          marginBottom: 32,
          alignSelf: "flex-start",
          background: `${severityColor}10`,
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: severityColor,
            boxShadow: `0 0 8px ${severityColor}`,
            animation: "pulse 1.5s infinite",
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem", color: severityColor,
            fontWeight: 700, letterSpacing: "0.2em",
          }}>
            {severityLabel}
          </span>
        </div>

        {/* Leak rows */}
        <LeakRow label="Costo de procesos manuales" value={leaks.manualCost} />
        <LeakRow label="Ingresos perdidos por leads sin seguimiento" value={leaks.leadRevenueLost} />
        <LeakRow label="Potencial no activado (conversión)" value={leaks.conversionLift} />

        {/* Total */}
        <div style={{
          marginTop: 28,
          padding: "24px",
          background: `${RED}08`,
          border: `1px solid ${RED}30`,
          borderRadius: 12,
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: TEXT3, marginBottom: 8, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            PÉRDIDA_ESTIMADA_MENSUAL
          </div>
          <motion.div
            key={Math.round(leaks.totalLeak)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "2.4rem", fontWeight: 800,
              color: RED,
              lineHeight: 1,
              textShadow: `0 0 30px ${RED}40`,
            }}
          >
            -{Math.round(leaks.totalLeak).toLocaleString("es-ES")} €
          </motion.div>
          <div style={{ fontSize: "0.75rem", color: TEXT3, marginTop: 8 }}>
            = {(leaks.totalLeak / values.revenue * 100).toFixed(1)}% de tu facturación actual
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* CTA */}
        <a
          href="#cta"
          style={{
            marginTop: 28,
            display: "block",
            textAlign: "center",
            padding: "18px",
            background: ACCENT,
            color: "#050507",
            fontWeight: 800,
            fontSize: "0.82rem",
            letterSpacing: 0.5,
            borderRadius: 10,
            textDecoration: "none",
            transition: "box-shadow 0.3s",
            fontFamily: "'Outfit', sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,255,170,0.4)`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          Sellar estas fugas → Diagnóstico gratuito
        </a>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 8px ${severityColor}; }
            50% { opacity: 0.4; box-shadow: none; }
          }
        `}</style>
      </div>
    </div>
  );
}
