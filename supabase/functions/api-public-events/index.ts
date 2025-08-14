import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DatabaseEvent {
  id: string;
  titulo: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  local: string;
  endereco: string;
  tipo: string;
  publico: boolean;
  recorrente: boolean;
  inscricoes_abertas: boolean;
  valor_inscricao: number;
  banner_url: string;
  created_at: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    const tipo = url.searchParams.get('tipo');

    let query = supabaseClient
      .from('eventos')
      .select('*')
      .eq('publico', true)
      .gte('data_fim', new Date().toISOString())
      .order('data_inicio', { ascending: true });

    if (tipo && tipo !== 'all') {
      query = query.eq('tipo', tipo);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data: events, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao buscar eventos',
          details: error.message 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Transform the data to match expected format
    const formattedEvents = (events || []).map((event: DatabaseEvent) => ({
      id: event.id,
      title: event.titulo,
      description: event.descricao,
      startDate: event.data_inicio,
      endDate: event.data_fim,
      location: event.local,
      address: event.endereco,
      type: event.tipo,
      isPublic: event.publico,
      isRecurring: event.recorrente,
      registrationOpen: event.inscricoes_abertas,
      registrationFee: event.valor_inscricao,
      bannerUrl: event.banner_url,
      createdAt: event.created_at,
    }));

    return new Response(
      JSON.stringify({
        events: formattedEvents,
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit)
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});