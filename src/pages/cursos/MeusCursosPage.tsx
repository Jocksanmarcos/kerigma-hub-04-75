import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useLocation, Link } from 'react-router-dom';
import { ensinoAI } from '@/lib/ensinoAI';
import EnsinoDashboardLayout from '@/components/ensino/dashboard/EnsinoDashboardLayout';


const setMeta = (name: string, content: string) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

interface Matricula {
  id: string;
  status: string | null;
  curso_id: string;
  cursos?: {
    nome: string;
    categoria: string | null;
    carga_horaria: number | null;
    slug: string | null;
  } | null;
}

interface Curso {
  id: string;
  nome: string;
  categoria: string | null;
  carga_horaria: number | null;
  slug: string | null;
}

const LoadingList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const MeusCursosPage: React.FC = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [recs, setRecs] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);


  useEffect(() => {
    document.title = 'Meus Cursos | Kerigma Hub';
    setMeta('description', 'Acompanhe seus cursos, status e progresso.');
    setCanonical(window.location.origin + '/cursos');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [matRes, allCursos] = await Promise.all([
        supabase
          .from('matriculas')
          .select('id, status, curso_id, cursos ( nome, categoria, carga_horaria, slug )')
          .order('created_at', { ascending: false })
          .maybeSingle(), // may be no data
        supabase
          .from('cursos')
          .select('id, nome, categoria, carga_horaria, slug')
          .eq('ativo', true)
          .order('ordem', { ascending: true }),
      ]);

      // matriculas maybeSingle returns object or null
      if (!matRes.error) {
        const data = matRes.data;
        if (Array.isArray(data)) setMatriculas(data as any);
        else if (data) setMatriculas([data as any]);
        else setMatriculas([]);
      }
      if (!allCursos.error && allCursos.data) setCursos(allCursos.data as any);
      setLoading(false);
    };
    fetchData();
  }, []);

  const hasMatriculas = useMemo(() => matriculas.length > 0, [matriculas]);

  return (
    <EnsinoDashboardLayout 
      title="Meus Cursos"
      description="Inscrições, status e próximos passos."
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">Inscrições</h2>
          {loading ? (
            <LoadingList />
          ) : hasMatriculas ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {matriculas.map((m) => (
                <Card key={m.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{m.cursos?.nome || 'Curso'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      {m.cursos?.categoria && <Badge variant="outline">{m.cursos.categoria}</Badge>}
                      {m.cursos?.carga_horaria && <Badge variant="secondary">{m.cursos.carga_horaria}h</Badge>}
                    </div>
                    {m.status && <Badge variant="default">{m.status}</Badge>}
                    <div className="pt-2">
                      <Button asChild>
                        <Link to={`/cursos/${m.curso_id}`}>Continuar</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6">
                <p className="text-muted-foreground">Você ainda não possui cursos matriculados.</p>
                <div className="mt-3">
                  <Button asChild>
                    <Link to="/ensino">Explorar cursos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cursos em destaque</h2>
          {loading ? (
            <LoadingList />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cursos.slice(0, 6).map((c) => (
                <Card key={c.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{c.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      {c.categoria && <Badge variant="outline">{c.categoria}</Badge>}
                      {c.carga_horaria && <Badge variant="secondary">{c.carga_horaria}h</Badge>}
                    </div>
                    <Button asChild>
                      <Link to={`/cursos?inscrever=${c.id}`}>Inscrever-se</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Meus Cursos',
          provider: {
            '@type': 'Organization',
            name: 'Kerigma Hub',
          },
        })}
      </script>
    </EnsinoDashboardLayout>
  );
};

export default MeusCursosPage;
