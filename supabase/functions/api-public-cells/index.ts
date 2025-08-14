import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DatabaseCell {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  dia_semana: string;
  horario: string;
  ativa: boolean;
  vagas_disponiveis: number;
  tipo_celula: string;
  publico_alvo: string;
  latitude: number;
  longitude: number;
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
    const cidade = url.searchParams.get('cidade');
    const bairro = url.searchParams.get('bairro');
    const dia_semana = url.searchParams.get('dia_semana');
    const tipo = url.searchParams.get('tipo');

    let query = supabaseClient
      .from('celulas')
      .select('*')
      .eq('ativa', true)
      .order('nome', { ascending: true });

    if (cidade && cidade !== 'all') {
      query = query.eq('cidade', cidade);
    }

    if (bairro && bairro !== 'all') {
      query = query.eq('bairro', bairro);
    }

    if (dia_semana && dia_semana !== 'all') {
      query = query.eq('dia_semana', dia_semana);
    }

    if (tipo && tipo !== 'all') {
      query = query.eq('tipo_celula', tipo);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data: cells, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao buscar células',
          details: error.message 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Transform the data to match expected format
    const formattedCells = (cells || []).map((cell: DatabaseCell) => ({
      id: cell.id,
      name: cell.nome,
      description: cell.descricao,
      address: cell.endereco,
      neighborhood: cell.bairro,
      city: cell.cidade,
      zipCode: cell.cep,
      dayOfWeek: cell.dia_semana,
      time: cell.horario,
      active: cell.ativa,
      availableSlots: cell.vagas_disponiveis,
      cellType: cell.tipo_celula,
      targetAudience: cell.publico_alvo,
      latitude: cell.latitude,
      longitude: cell.longitude,
      createdAt: cell.created_at,
    }));

    // Get unique values for filters
    const { data: filterData } = await supabaseClient
      .from('celulas')
      .select('cidade, bairro, dia_semana, tipo_celula')
      .eq('ativa', true);

    const filters = {
      cities: [...new Set((filterData || []).map(item => item.cidade).filter(Boolean))],
      neighborhoods: [...new Set((filterData || []).map(item => item.bairro).filter(Boolean))],
      weekDays: [...new Set((filterData || []).map(item => item.dia_semana).filter(Boolean))],
      types: [...new Set((filterData || []).map(item => item.tipo_celula).filter(Boolean))],
    };

    return new Response(
      JSON.stringify({
        cells: formattedCells,
        filters,
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