import { NextResponse } from "next/server";

// ══════════════════════════════════════════
// GAHENAX — HUBSPOT INGESTION PROXY
// ══════════════════════════════════════════

/**
 * PROTOCOLO DE INGESTIÓN:
 * Recibe datos del DiagnosticForm, enriquece con telemetría de sesión 
 * y despacha a HubSpot Forms API v3.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Configuración de GahenaxAI Solutions (Portal: 51005401)
    const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || "51005401";
    const FORM_ID = process.env.HUBSPOT_FORM_ID || "REEMPLAZAR_FORM_ID";

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

    const payload = {
      fields: Object.entries(data.fields).map(([name, value]) => ({
        name,
        value,
      })),
      context: {
        pageUri: data.context?.pageUri || "gahenax.com",
        pageName: data.context?.pageName || "Diagnostic Portal v4",
      },
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.HUBSPOT_ACCESS_TOKEN ? { "Authorization": `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}` } : {}),
      },
      body: JSON.stringify(payload),
    });


    if (!response.ok) {
      const errorData = await response.json();
      console.error("[HUBSPOT_ERROR]", errorData);
      return NextResponse.json({ error: "Failed to sync with CRM" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully" });
  } catch (error) {
    console.error("[SYSTEM_ERROR]", error);
    return NextResponse.json({ error: "Internal System Error" }, { status: 500 });
  }
}
