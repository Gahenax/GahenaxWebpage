"use client";

import { useState } from "react";

export function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    annual_revenue: "",
    message: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: formData,
          context: {
            pageUri: window.location.href,
            pageName: document.title,
          }
        }),
      });

      if (response.ok) {
        setStep(3);
      } else {
        alert("Error al enviar diagnóstico. Intenta de nuevo.");
      }
    } catch (err) {
      console.error("SYSTEM_FAILURE:", err);
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="text-center p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h3 className="text-2xl font-bold text-[#00ffaa] mb-4 uppercase tracking-tighter">DIAGNOSTICO_RECIBIDO</h3>
        <p className="text-slate-400 mb-6 text-sm">
          Nuestro motor de análisis está procesando tu modelo de negocio.
        </p>
        <div className="p-4 border border-[#00ffaa]/20 bg-[#00ffaa]/5 rounded font-mono text-[10px] text-[#00ffaa] tracking-widest uppercase">
          ESTADO: EN_ESPERA_DE_EVALUACION
        </div>
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Nombre del Negocio</label>
            <input
              required
              type="text"
              placeholder="e.g. Limpiamax"
              className="w-full bg-background/50 border border-border p-4 rounded-lg focus:border-accent outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Facturación Mensual Aprox (USD)</label>
            <select
              required
              className="w-full bg-background/50 border border-border p-4 rounded-lg focus:border-accent outline-none transition-all appearance-none"
              onChange={(e) => setFormData({ ...formData, annual_revenue: e.target.value })}
            >
              <option value="">Seleccionar rango</option>
              <option value="low">Menos de $2,000</option>
              <option value="mid">$2,000 - $10,000</option>
              <option value="high">Más de $10,000</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => step === 1 && formData.company && formData.annual_revenue && setStep(2)}
            className="w-full py-4 bg-accent-secondary text-background font-black rounded-lg hover:shadow-glow-purple transition-all"
          >
            SIGUIENTE PASO
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Cual es tu mayor bloqueo hoy?</label>
            <textarea
              required
              placeholder="e.g. Mucha operacion manual y pocos cierres por falta de sistema..."
              className="w-full bg-background/50 border border-border p-4 rounded-lg focus:border-accent outline-none transition-all h-32"
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">WhatsApp / Email de contacto</label>
            <input
              required
              type="text"
              placeholder="+57..."
              className="w-full bg-background/50 border border-border p-4 rounded-lg focus:border-accent outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
             <button
              type="button"
              disabled={loading}
              onClick={() => setStep(1)}
              className="px-6 py-4 border border-border font-bold rounded-lg hover:bg-surface transition-all disabled:opacity-50"
            >
              ATRÁS
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-accent text-background font-black rounded-lg hover:shadow-glow-green transition-all disabled:opacity-50"
            >
              {loading ? "ENVIANDO..." : "SOLICITAR DIAGNÓSTICO GRATUITO"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
