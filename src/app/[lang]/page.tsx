"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Globe, Cpu, Zap, BarChart2, Brain, Shield,
  TrendingDown, Clock, Users, Activity, AlertTriangle
} from "lucide-react";
import { DiagnosticForm } from "@/components/funnel/DiagnosticForm";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { SparklesCore } from "@/components/ui/Sparkles";
import { MeteorBeams, GridBackground, DotBackground } from "@/components/ui/Backgrounds";
import { BentoGrid, type BentoItem } from "@/components/ui/BentoGrid";
import { ROICalculator } from "@/components/funnel/ROICalculator";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ══════════════════════════════════════════
// GAHENAX v4 — IMMERSIVE SYSTEM EXPERIENCE
// ══════════════════════════════════════════

const C = {
  bg: "#050507",
  bg2: "#0a0a0f",
  bg3: "#0f0f17",
  accent: "#00ffaa",
  accentDim: "rgba(0,255,170,0.07)",
  accentMid: "rgba(0,255,170,0.2)",
  accentGlow: "rgba(0,255,170,0.4)",
  red: "#ff2d55",
  amber: "#ffaa00",
  text: "#eaeaf0",
  text2: "#7a7a95",
  text3: "#45455a",
  border: "rgba(255,255,255,0.05)",
  border2: "rgba(255,255,255,0.1)",
};

// ══════ THREE.JS SPHERE ══════
function ThreeSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.8, 24);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(C.accent), wireframe: true, transparent: true, opacity: 0.12 });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    const innerGeo = new THREE.IcosahedronGeometry(1.6, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(C.accent), transparent: true, opacity: 0.03 });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    const pGeo = new THREE.IcosahedronGeometry(2.0, 8);
    const pMat = new THREE.PointsMaterial({ color: new THREE.Color(C.accent), size: 0.02, transparent: true, opacity: 0.5 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const positions = (geo.attributes.position.array as Float32Array).slice();
    let frame: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        const ox = positions[i], oy = positions[i + 1], oz = positions[i + 2];
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const n = Math.sin(ox * 2 + t * 0.8) * Math.cos(oy * 2 + t * 0.6) * Math.sin(oz * 2 + t * 0.7) * 0.06;
        const s = (len + n) / len;
        pos[i] = ox * s; pos[i + 1] = oy * s; pos[i + 2] = oz * s;
      }
      geo.attributes.position.needsUpdate = true;
      sphere.rotation.y = t * 0.15 + mouseRef.current.x * 0.3;
      sphere.rotation.x = t * 0.1 + mouseRef.current.y * 0.2;
      innerSphere.rotation.y = -t * 0.1;
      innerSphere.rotation.x = -t * 0.08;
      points.rotation.y = t * 0.08;
      points.rotation.x = t * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geo.dispose(); mat.dispose(); innerGeo.dispose(); innerMat.dispose(); pGeo.dispose(); pMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}

// ══════ COUNTER ══════
function Counter({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState<string | number>(0);
  const ref = useRef(null);

  useEffect(() => {
    const num = parseInt(value);
    if (isNaN(num)) { setDisplay(value); return; }
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        let cur = 0;
        const step = Math.max(1, Math.floor(num / 50));
        const iv = setInterval(() => {
          cur += step;
          if (cur >= num) { cur = num; clearInterval(iv); }
          setDisplay(cur);
        }, 25);
      },
    });
  }, [value]);

  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{prefix}{display}{suffix}</span>;
}

// ══════ MAGNETIC BUTTON ══════
function MagBtn({ children, href, primary, style: es = {} }: { children: React.ReactNode; href?: string; primary?: boolean; style?: React.CSSProperties }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [off, setOff] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setOff({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  }, []);

  const base: React.CSSProperties = primary
    ? { display: "inline-flex", alignItems: "center", gap: 10, padding: "20px 40px", background: C.accent, color: C.bg, fontWeight: 800, fontSize: "0.88rem", letterSpacing: 0.5, borderRadius: 10, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transform: `translate(${off.x}px,${off.y}px)`, transition: "transform 0.3s cubic-bezier(.16,1,.3,1),box-shadow 0.3s", boxShadow: off.x !== 0 ? `0 8px 40px ${C.accentGlow}` : "none", position: "relative", overflow: "hidden" }
    : { display: "inline-flex", alignItems: "center", gap: 10, padding: "20px 40px", background: "transparent", color: C.text2, fontWeight: 500, fontSize: "0.88rem", borderRadius: 10, border: `1px solid ${C.border2}`, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transform: `translate(${off.x}px,${off.y}px)`, transition: "all 0.3s cubic-bezier(.16,1,.3,1)" };

  return (
    <a ref={ref} href={href || "#"} onMouseMove={onMove} onMouseLeave={() => setOff({ x: 0, y: 0 })} style={{ ...base, ...es }}>
      {children}
    </a>
  );
}

// ══════ PAIN CARD ══════
function PainCard({ icon, num, title, desc, delay }: { icon: React.ReactNode; num: string; title: string; desc: string; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.bg3 : C.bg2,
        padding: "36px 28px", position: "relative", overflow: "hidden",
        transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
        transform: hov ? "translateY(-6px)" : "none",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.red, transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.5s cubic-bezier(.16,1,.3,1)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ color: hov ? C.red : C.text3, transition: "color 0.4s" }}>{icon}</div>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "2rem", fontWeight: 800, color: hov ? "rgba(255,45,85,0.2)" : C.border2, lineHeight: 1, transition: "color 0.4s" }}>{num}</span>
      </div>
      <h4 style={{ fontSize: "0.92rem", fontWeight: 700, marginBottom: 8, color: C.text }}>{title}</h4>
      <p style={{ fontSize: "0.78rem", color: C.text3, lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  );
}

// ══════════════════════════════
// MAIN APP
// ══════════════════════════════
export default function GahenaxApp() {
  const heroRef = useRef<HTMLElement>(null);
  const roiRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero entrance
    const ctx = gsap.context(() => {
      gsap.from(".g-hero-text > *", {
        y: 80, opacity: 0,
        stagger: 0.12, duration: 1.1,
        ease: "power4.out",
      });
      gsap.from(".g-sphere", {
        scale: 0.4, opacity: 0,
        duration: 1.6, ease: "power3.out", delay: 0.3,
      });

      // GSAP Pinned section — ROI Calculator
      ScrollTrigger.create({
        trigger: roiRef.current,
        start: "top top",
        end: "+=400",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const services: BentoItem[] = useMemo(() => [
    { icon: <Globe size={22} color={C.accent} />, tag: "estructura", title: "Arquitectura web & digital", desc: "Presencia digital como herramienta de conversión real. Rápida, funcional, conectada a tu operación.", stack: ["Landing pages", "Funnels", "SEO técnico", "CMS custom", "APIs"] },
    { icon: <Zap size={22} color={C.accent} />, tag: "captación", title: "Adquisición de clientes", desc: "Sistema de captación que no depende de publicar contenido. Canales y embudos para demanda predecible.", stack: ["Paid media", "Email flows", "Lead scoring", "CRM setup", "Outbound"] },
    { icon: <Cpu size={22} color={C.accent} />, tag: "automatización", title: "Automatización operativa", desc: "Flujos automáticos que eliminan error humano y liberan capacidad.", stack: ["Workflows", "Chatbots", "Pipelines", "n8n / Make", "Webhooks"] },
    { icon: <BarChart2 size={22} color={C.accent} />, tag: "control", title: "Dashboards & métricas", desc: "La salud real de tu negocio en un solo lugar. KPIs operativos, financieros y de marketing.", stack: ["KPI tracking", "Revenue analytics", "Auto-reportes", "Alertas"], featured: true },
    { icon: <Brain size={22} color={C.accent} />, tag: "inteligencia", title: "IA & análisis predictivo", desc: "Modelos de análisis aplicados a tu operación. Scoring de leads, proyecciones de demanda.", stack: ["Modelos ML", "Scoring", "Forecasting", "NLP", "Data eng"] },
    { icon: <Shield size={22} color={C.accent} />, tag: "consultoría", title: "Estrategia & estructura", desc: "Acompañamiento directo en decisiones de negocio. Modelo, pricing, costos y crecimiento.", stack: ["Business model", "Pricing", "Unit economics", "Growth", "P&L"] },
  ], []);

  const pains = useMemo(() => [
    { icon: <Clock size={20} />, num: "01", title: "Procesos manuales", desc: "Tiempo que debería ir a vender se consume en tareas repetitivas." },
    { icon: <BarChart2 size={20} />, num: "02", title: "Cero métricas", desc: "No sabes cuánto cuesta un cliente ni qué canal funciona." },
    { icon: <Users size={20} />, num: "03", title: "Leads perdidos", desc: "Entre WhatsApp, correo y Excel se pierde la mitad." },
    { icon: <AlertTriangle size={20} />, num: "04", title: "Dependes solo de ti", desc: "Si no estás, el negocio se paraliza por completo." },
    { icon: <TrendingDown size={20} />, num: "05", title: "Intuición sin datos", desc: "Decides por corazonada. Funciona hasta que deja de funcionar." },
  ], []);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Outfit',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        a { color: inherit; text-decoration: none; }

        .scanlines::before {
          content:''; position:fixed; inset:0; z-index:9999; pointer-events:none;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.025) 2px,rgba(0,0,0,.025) 4px);
        }
        .grain::after {
          content:''; position:fixed; inset:0; z-index:9998; pointer-events:none; opacity:.03;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes statusBlink { 0%,100%{opacity:1;box-shadow:0 0 6px ${C.accentGlow}} 50%{opacity:.3;box-shadow:none} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes glowPulse { 0%,100%{opacity:.3;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.6;transform:translate(-50%,-50%) scale(1.1)} }
        @keyframes scanH { 0%{top:0} 100%{top:100%} }

        @media(max-width:900px){
          .g-hero-grid{grid-template-columns:1fr!important}
          .g-sphere{display:none!important}
          .g-pain-grid{grid-template-columns:1fr 1fr!important}
          .g-stats{grid-template-columns:1fr 1fr!important}
          .g-who{grid-template-columns:1fr!important}
          .g-nav-links{display:none!important}
        }
        @media(max-width:600px){
          .g-pain-grid{grid-template-columns:1fr!important}
          .g-stats{grid-template-columns:1fr!important}
          .g-hero-btns{flex-direction:column!important}
          .g-hero-btns a{width:100%!important;justify-content:center!important}
        }
      `}</style>

      <div className="scanlines grain">

        {/* ═══ NAV ═══ */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(5,5,7,.55)", backdropFilter: "blur(30px) saturate(1.6)", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <a href="#" style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: "1rem", letterSpacing: 5, color: C.accent }}>
              GAHENAX<span style={{ color: C.text3, fontWeight: 400, fontSize: ".6rem", letterSpacing: 3, marginLeft: 8 }}>SYSTEMS</span>
            </a>
            <div className="g-nav-links" style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {[["#pain", "Fugas"], ["#roi", "Calculadora"], ["#servicios", "Catálogo"], ["#fit", "Filtro"]].map(([href, label]) => (
                <a key={href} href={href} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", color: C.text3, letterSpacing: 1.5, textTransform: "uppercase", padding: "8px 14px", borderRadius: 4, transition: "color .3s" }}>
                  {label}
                </a>
              ))}
              <MagBtn href="#cta" style={{ padding: "10px 20px", fontSize: ".68rem" }} primary>Diagnóstico</MagBtn>
            </div>
          </div>
        </nav>

        <TracingBeam>
          {/* ═══ HERO ═══ */}
          <section ref={heroRef} style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "140px 0 80px" }}>
            <GridBackground color="rgba(255,255,255,0.025)" size={70} />
            <div style={{
              position: "absolute", inset: 0,
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 70%)",
              background: "transparent",
              zIndex: 1,
            }} />
            {/* Ambient glow */}
            <div style={{ position: "absolute", top: "50%", left: "65%", width: 600, height: 600, background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 65%)`, filter: "blur(80px)", opacity: 0.15, transform: "translate(-50%,-50%)", pointerEvents: "none", animation: "glowPulse 8s ease-in-out infinite", zIndex: 0 }} />

            <div className="g-hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", position: "relative", zIndex: 2 }}>
              <div className="g-hero-text">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36, fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", letterSpacing: 2, textTransform: "uppercase", color: C.accent }}>
                  <span style={{ width: 7, height: 7, background: C.accent, borderRadius: "50%", animation: "statusBlink 2s ease-in-out infinite" }} />
                  sistema operativo de negocio_v4
                </div>
                <h1 style={{ fontSize: "clamp(2.8rem,5.5vw,4.8rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: -3, marginBottom: 8 }}>
                  Tu negocio funciona.
                </h1>
                <h1 style={{ fontSize: "clamp(2.8rem,5.5vw,4.8rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: -3, color: C.text3, marginBottom: 8 }}>
                  Pero no como sistema.
                </h1>
                <h1 style={{ fontSize: "clamp(2.8rem,5.5vw,4.8rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: -3 }}>
                  <span style={{ color: C.accent, textShadow: `0 0 60px ${C.accentGlow}` }}>Ahí pierdes dinero.</span>
                </h1>
                <p style={{ fontSize: "1.05rem", color: C.text2, lineHeight: 1.75, maxWidth: 520, margin: "32px 0 44px" }}>
                  Procesos manuales. Decisiones sin datos. Leads que se evaporan.
                  Todo eso es <strong style={{ color: C.text, fontWeight: 600 }}>fricción medible</strong> — y cada punto es dinero que sale sin que lo veas.
                </p>
                <div className="g-hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <MagBtn href="#roi" primary>Calcular mis pérdidas →</MagBtn>
                  <MagBtn href="#proceso">Protocolo de intervención</MagBtn>
                </div>
              </div>
              <div className="g-sphere" style={{ position: "relative", height: "min(55vw,560px)", animation: "float 8s ease-in-out infinite" }}>
                <ThreeSphere />
              </div>
            </div>
          </section>

          {/* ═══ MARQUEE ═══ */}
          <div style={{ padding: "28px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 48, animation: "marquee 35s linear infinite", width: "max-content" }}>
              {[...Array(2)].flatMap(() => ["REDUCCIÓN_DE_FRICCIÓN", "OEDA_LOOP_ACTIVE", "REVENUE_STABILITY", "SYSTEM_INTEGRATION", "DATA_DRIVEN_OPS", "OPTIMIZACIÓN_L2", "LEAK_PATCHING", "AUTONOMOUS_CAPTACIÓN"]).map((t, i) => (
                <span key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", letterSpacing: 3, textTransform: "uppercase", color: C.text3, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 4, height: 4, background: C.accent, borderRadius: "50%", opacity: .5 }} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ═══ PAIN ═══ */}
          <section id="pain" style={{ padding: "130px 0", position: "relative" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 64 }}
                className="catalog-head"
              >
                <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.08 }}>
                  Estas son las <span style={{ color: C.red }}>fugas</span> que tu negocio tiene ahora.
                </h2>
                <p style={{ fontSize: ".92rem", color: C.text2, lineHeight: 1.7, borderLeft: `2px solid ${C.red}`, paddingLeft: 24 }}>
                  No son problemas futuros. Son ineficiencias activas que hoy se miden en euros perdidos cada mes.
                </p>
              </motion.div>
              <div className="g-pain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }}>
                {pains.map((p, i) => <PainCard key={i} {...p} delay={i * 0.08} />)}
              </div>
            </div>
          </section>

          {/* ═══ ROI CALCULATOR ═══ */}
          <section id="roi" ref={roiRef} style={{ padding: "130px 0", position: "relative", background: C.bg2 }}>
            <DotBackground color="rgba(0,255,170,0.04)" size={28} />
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ marginBottom: 48 }}
              >
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", letterSpacing: 4, textTransform: "uppercase", color: C.red, marginBottom: 14 }}>
                  leak_quantification_engine
                </p>
                <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.08, maxWidth: 600 }}>
                  ¿Cuánto te está costando <span style={{ color: C.red }}>no tener un sistema</span>?
                </h2>
              </motion.div>
              <ROICalculator />
            </div>
          </section>

          {/* ═══ STATS ═══ */}
          <section style={{ padding: "64px 0", background: `linear-gradient(135deg,${C.bg3},${C.bg2})`, borderTop: `1px solid ${C.border2}`, borderBottom: `1px solid ${C.border2}`, position: "relative", overflow: "hidden" }}>
            <MeteorBeams count={8} color="rgba(0,255,170,0.5)" />
            <div className="g-stats" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, position: "relative", zIndex: 1 }}>
              {[
                { val: "40", pre: "-", suf: "%", label: "Fricción operativa eliminada" },
                { val: "3", pre: "", suf: "x", label: "Mejora en visibilidad de métricas" },
                { val: "60", pre: "+", suf: "%", label: "Eficiencia en captación" },
                { val: "0→1", pre: "", suf: "", label: "De intuición a sistema", raw: true },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "3rem", fontWeight: 800, color: C.accent, lineHeight: 1, marginBottom: 10, textShadow: `0 0 50px ${C.accentGlow}` }}>
                    {s.raw ? "0→1" : <Counter value={s.val} prefix={s.pre} suffix={s.suf} />}
                  </div>
                  <div style={{ fontSize: ".78rem", color: C.text3, letterSpacing: .5 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </section>



          {/* ═══ CASE STUDY: LIMPIAMAX ═══ */}
          <section style={{ padding: "130px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
            <SparklesCore className="absolute inset-0" particleColor={C.accent} particleCount={30} speed={0.5} />
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }} className="catalog-head">
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: "0.3em", color: `${C.accent}60`, marginBottom: 6, fontWeight: 700 }}>INTERVENTION_REPORT: 01</div>
                <h2 style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 24, fontStyle: "italic" }}>
                  Limpiamax<br />Barcelona.
                </h2>
                <p style={{ fontSize: "1.05rem", color: C.text2, lineHeight: 1.75, marginBottom: 40 }}>
                  Despliegue de infraestructura crítica: captación autónoma 24/7, carga de 0.8s y sellado de fugas en el flujo de reserva. Migración completa a Nexo-Portal Architecture.
                </p>
                <MagBtn href="https://limpiamaxbarcelona.com">AUDITAR_IMPLEMENTACIÓN →</MagBtn>
              </div>
              <div style={{ background: "rgba(0,0,0,0.4)", padding: "48px", borderRadius: 24, border: `1px solid ${C.border2}`, backdropFilter: "blur(20px)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                  {[
                    { label: "STATUS", val: "OPTIMIZED", color: C.accent },
                    { label: "LOAD_TIME", val: "0.8s", color: C.accent },
                    { label: "LEAKS_PATCHED", val: "94.2%", color: C.accent },
                    { label: "SEO_SCORE", val: "100/100", color: C.accent },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: "0.2em", color: C.text3, textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1.4rem", fontWeight: 700, color: s.color, textShadow: `0 0 30px ${s.color}40` }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══ CATALOG ═══ */}
          <section id="servicios" style={{ padding: "130px 0" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 48, marginBottom: 48, flexWrap: "wrap" }}
              >
                <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.08 }}>Capacidades<br />del sistema.</h2>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", color: C.text3, maxWidth: 360, lineHeight: 1.7, padding: "18px 22px", border: `1px dashed ${C.border2}`, borderRadius: 8 }}>
                  <span style={{ color: C.amber, fontWeight: 600 }}>aviso_técnico:</span> Módulos activados exclusivamente tras diagnóstico de compatibilidad.
                </div>
              </motion.div>
              <BentoGrid items={services} />
            </div>
          </section>

          {/* ═══ CTA: DIAGNOSTIC ═══ */}
          <section id="cta" style={{ padding: "160px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "-30%", left: "50%", width: 900, height: 900, background: `radial-gradient(circle,${C.accentGlow} 0%,transparent 60%)`, filter: "blur(100px)", pointerEvents: "none", animation: "glowPulse 7s ease-in-out infinite" }} />
            <SparklesCore className="absolute inset-0" particleColor={C.accent} particleCount={50} speed={0.7} />
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}
              >
                Tu negocio tiene fugas.<br />Vamos a encontrarlas.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                style={{ fontSize: "1.05rem", color: C.text2, lineHeight: 1.65, maxWidth: 500, margin: "0 auto 48px" }}
              >
                El diagnóstico es gratuito. En 30 minutos mapeamos tu operación y te mostramos la oportunidad real.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ maxWidth: 680, margin: "0 auto", background: "rgba(0,0,0,.5)", backdropFilter: "blur(20px)", padding: "40px", borderRadius: 24, border: `1px solid ${C.accentMid}`, boxShadow: `0 0 60px rgba(0,255,170,.06)`, textAlign: "left" }}
              >
                <DiagnosticForm />
              </motion.div>
              <div style={{ marginTop: 48, fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", color: C.text3 }}>
                gahenax@system:~$ <span style={{ color: C.accent, fontStyle: "italic" }}>iniciar_diagnostico --modo=profundo --output=json</span>
                <span style={{ display: "inline-block", width: 7, height: 14, background: C.accent, marginLeft: 4, verticalAlign: "text-bottom", animation: "statusBlink 1s step-end infinite" }} />
              </div>
            </div>
          </section>
        </TracingBeam>

        <footer style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", color: C.text3 }}>
              © 2026 GAHENAX — Cognitive Engineering Applied.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Términos", "Privacidad", "Audit"].map(t => (
                <a key={t} href="#" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", color: C.text3, transition: "color .3s" }}>{t}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
