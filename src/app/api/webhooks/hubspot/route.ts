import { NextResponse } from "next/server";
import { sendAutoResponse } from "@/lib/outreach";

/**
 * GAHENAX — HUBSPOT WEBHOOK LISTENER
 * 
 * Este endpoint recibe señales de HubSpot cuando ocurre un evento (ej. nuevo contacto).
 * Si el lead es calificado, dispara el protocolo de auto-respuesta.
 */

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // HubSpot envía un array de eventos
    // Nota: En producción, deberías verificar la firma X-HubSpot-Signature
    for (const event of payload) {
      if (event.subscriptionType === "contact.creation" || event.subscriptionType === "contact.propertyChange") {
        const contactId = event.objectId;
        
        // Aquí podrías obtener más detalles del contacto vía HubSpot CRM API
        // Por ahora, simulamos la extracción del teléfono y empresa
        const phoneNumber = "+34000000000"; // Se extraería del CRM API usando contactId
        const companyName = "Empresa Detectada";
        
        console.log(`[WEBHOOK] Procesando evento para contacto ${contactId}`);
        
        // Disparamos el Outreach Autónomo
        await sendAutoResponse(phoneNumber, companyName);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[WEBHOOK_ERROR]", error);
    return NextResponse.json({ error: "Webhook Processing Failed" }, { status: 500 });
  }
}
