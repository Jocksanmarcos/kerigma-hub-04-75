import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PreferenceItem {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string; // default BRL
}

interface CreatePreferenceBody {
  items: PreferenceItem[];
  external_reference?: string; // we'll store inscricao_ids and context here
  back_urls?: { success: string; pending?: string; failure?: string };
  payer?: { name?: string; email?: string; phone?: string };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }

    const body: CreatePreferenceBody = await req.json();

    if (!body.items || body.items.length === 0) {
      return new Response(JSON.stringify({ error: "No items provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Ensure currency_id and sanitize values
    const items = body.items.map((it) => ({
      title: it.title?.slice(0, 250) || "Ingresso",
      quantity: Math.max(1, Math.floor(it.quantity)),
      unit_price: Number(it.unit_price.toFixed(2)),
      currency_id: it.currency_id || "BRL",
    }));

    const preferencePayload: Record<string, unknown> = {
      items,
      external_reference: body.external_reference,
      back_urls: body.back_urls,
      auto_return: "approved",
      notification_url: `${SUPABASE_URL}/functions/v1/mercado-pago-webhook`,
    };

    // Optional payer
    if (body.payer) {
      preferencePayload["payer"] = {
        name: body.payer.name,
        email: body.payer.email,
      };
    }

    const resp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferencePayload),
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.error("Mercado Pago error:", data);
      return new Response(JSON.stringify({ error: data?.message || "Failed to create preference" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ id: data.id, init_point: data.init_point, sandbox_init_point: data.sandbox_init_point }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("mercado-pago-create-preference error:", e);
    return new Response(JSON.stringify({ error: e.message || "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
