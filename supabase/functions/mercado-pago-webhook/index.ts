import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!MERCADO_PAGO_ACCESS_TOKEN) throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase env not configured");

    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const idParam = url.searchParams.get("id");

    let payload: any = {};
    try {
      payload = await req.json();
    } catch (_) {
      // some notifications send no JSON body, rely on query params
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Determine payment id
    const paymentId = payload?.data?.id || payload?.resource?.split("/").pop() || idParam;
    const notifType = payload?.type || payload?.topic || type;

    if (notifType && notifType.toString().includes("test")) {
      return new Response(JSON.stringify({ ok: true, test: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (notifType && notifType.toString().includes("payment") && paymentId) {
      const resp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}` },
      });
      const payment = await resp.json();

      if (!resp.ok) {
        console.error("Failed to fetch payment:", payment);
        return new Response(JSON.stringify({ error: "Payment fetch failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const status = payment.status as string; // approved, pending, rejected, canceled
      const amount = Number(payment.transaction_amount || 0);
      let ref = payment.external_reference as string | undefined;

      let inscricaoIds: string[] = [];
      try {
        if (ref) {
          const parsed = JSON.parse(ref);
          if (Array.isArray(parsed?.inscricao_ids)) inscricaoIds = parsed.inscricao_ids;
        }
      } catch (_) {
        // external_reference may be plain string (e.g., single id)
        if (ref) inscricaoIds = [ref];
      }

      if (inscricaoIds.length > 0) {
        const statusMap: Record<string, string> = {
          approved: "Confirmado",
          pending: "Pendente",
          in_process: "Pendente",
          rejected: "Cancelado",
          canceled: "Cancelado",
          refunded: "Cancelado",
          charged_back: "Cancelado",
        };

        const mappedStatus = statusMap[status] || "Pendente";

        const { error } = await supabase
          .from("evento_inscricoes")
          .update({ status_pagamento: mappedStatus, pagamento_valor: amount, pagamento_moeda: "BRL" })
          .in("id", inscricaoIds);

        if (error) {
          console.error("Failed to update inscricoes:", error);
        }
      }

      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Unknown notification type
    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("mercado-pago-webhook error:", e);
    return new Response(JSON.stringify({ error: e.message || "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
