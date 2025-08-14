import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DatabaseCourse {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  nivel: string;
  carga_horaria: number;
  emite_certificado: boolean;
  ativo: boolean;
  destaque: boolean;
  pre_requisitos: string[];
  publico_alvo: string[];
  material_didatico: any[];
  created_at: string;
  slug: string;
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
    const categoria = url.searchParams.get('categoria');
    const nivel = url.searchParams.get('nivel');
    const destaque = url.searchParams.get('destaque') === 'true';

    let query = supabaseClient
      .from('cursos')
      .select('*')
      .eq('ativo', true)
      .order('created_at', { ascending: false });

    if (categoria && categoria !== 'all') {
      query = query.eq('categoria', categoria);
    }

    if (nivel && nivel !== 'all') {
      query = query.eq('nivel', nivel);
    }

    if (destaque) {
      query = query.eq('destaque', true);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data: courses, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao buscar cursos',
          details: error.message 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Transform the data to match expected format
    const formattedCourses = (courses || []).map((course: DatabaseCourse) => ({
      id: course.id,
      name: course.nome,
      description: course.descricao,
      category: course.categoria,
      level: course.nivel,
      workload: course.carga_horaria,
      certificateEnabled: course.emite_certificado,
      active: course.ativo,
      featured: course.destaque,
      prerequisites: course.pre_requisitos || [],
      targetAudience: course.publico_alvo || [],
      materials: course.material_didatico || [],
      createdAt: course.created_at,
      slug: course.slug,
    }));

    return new Response(
      JSON.stringify({
        courses: formattedCourses,
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