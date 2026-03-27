"use client";

import { useState } from "react";

export function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    revenue: "",
    mainProblem: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate n8n webhook call
    console.log("SENDING_TO_N8N_PAYLOAD:", JSON.stringify(formData));
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="text-center p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h3 className="text-2xl font-bold text-accent mb-4">DIAGNOSTICO_EN_PROCESO</h3>
        <p className="text-muted mb-6">
          Hemos recibido tu información. Nuestro sistema está analizando las fugas de tu modelo de negocio.
        </p>
        <p className="text-xs font-mono text-accent-secondary uppercase tracking-widest">
          Recibirás contacto estratégico en menos de 24h.
        </p>
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
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Facturación Mensual Aprox (USD)</label>
            <select
              required
              className="w-full bg-background/50 border border-border p-4 rounded-lg focus:border-accent outline-none transition-all appearance-none"
              onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
            >
              <option value="">Seleccionar rango</option>
              <option value="low">Menos de $2,000</option>
              <option value="mid">$2,000 - $10,000</option>
              <option value="high">Más de $10,000</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => step === 1 && formData.businessName && formData.revenue && setStep(2)}
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
              onChange={(e) => setFormData({ ...formData, mainProblem: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">WhatsApp / Email de contacto</label>
            <input
              required
              type="text"
              placeholder="+57..."
              className="w-full bg-background/50 border border-border p-4 rounded-lg focus:border-accent outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
             <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-4 border border-border font-bold rounded-lg hover:bg-surface transition-all"
            >
              ATRÁS
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-accent text-background font-black rounded-lg hover:shadow-glow-green transition-all"
            >
              SOLICITAR DIAGNÓSTICO GRATUITO
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
