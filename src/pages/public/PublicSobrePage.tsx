import React from "react";
import { DynamicPageRenderer } from "@/components/cms/DynamicPageRenderer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Target, Star, Heart } from "lucide-react";

const PublicSobrePage: React.FC = () => {
  return (
    <DynamicPageRenderer
      slug="sobre"
      defaultTitle="Sobre Nós"
      defaultDescription="Conheça a história, missão, visão e valores da CBN Kerigma."
      defaultHeroTitle="Nossa História"
      defaultHeroSubtitle="Conheça a trajetória da Comunidade Batista Nacional Kerigma"
      fallbackContent={
        <div className="bg-muted/30 py-16 space-y-16">
          {/* História */}
          <Card className="max-w-4xl mx-auto border border-border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">A História da CBN Kerigma</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-10">
                <article className="prose prose-lg max-w-none space-y-6">
                  <h3>Origem e propósito</h3>
                  <p>
                    A Comunidade Batista Nacional Kerigma nasceu em 2019 com o sonho de ser uma igreja diferente,
                    focada no modelo de células como estratégia de evangelismo e relacionamento. O nome "Kerigma" vem do
                    grego e significa "proclamação", refletindo nossa missão de proclamar o Evangelho através de relacionamentos autênticos.
                  </p>
                  <div className="space-y-4">
                    <h3>Crescimento em células</h3>
                    <p>
                      Iniciamos com um pequeno grupo de famílias comprometidas com a visão de crescer através de células. Hoje, somos uma
                      comunidade de mais de 200 membros ativos, organizados em mais de 15 células na região metropolitana de São Luís.
                    </p>
                    <p>
                      Cremos que cada pessoa importa para Deus e deve ser alcançada com amor e cuidado genuíno, promovendo relacionamentos profundos e duradouros.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3>Filosofia ministerial</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Amor e cuidado genuíno:</strong> cada pessoa é valorizada.</li>
                      <li><strong>Relacionamentos profundos:</strong> vida em comunidade.</li>
                      <li><strong>Crescimento espiritual contínuo:</strong> discipulado intencional.</li>
                    </ul>
                  </div>
                </article>
            </CardContent>
          </Card>

          {/* Pilares */}
          <section className="bg-muted/50 py-16 px-8 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-12">Nossos Pilares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              <Card className="border border-border">
                <CardHeader className="items-center text-center">
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Missão</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Formar discípulos de Jesus Cristo através do modelo de células, promovendo evangelismo relacional e crescimento espiritual em
                    comunidade.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader className="items-center text-center">
                  <Star className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Visão</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Ser uma igreja em células que transforma vidas e multiplica discípulos, impactando nossa cidade e região com o amor de Cristo.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader className="items-center text-center">
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Valores</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Amor genuíno</li>
                    <li>Comunhão verdadeira</li>
                    <li>Crescimento contínuo</li>
                    <li>Evangelismo relacional</li>
                    <li>Multiplicação saudável</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Liderança */}
          <div>
            <h2 className="text-3xl font-semibold text-center mb-8">Nossa Liderança</h2>
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              <Card>
                <CardHeader className="items-center">
                  <img
                    src="https://cbnkerigma.org.br/assets/pastor-joao-silva-BvhOAQ50.jpg"
                    alt="Pastor João Silva - Pastor Principal da CBN Kerigma"
                    loading="lazy"
                    className="w-32 h-32 rounded-full object-cover shadow-md"
                  />
                  <CardTitle className="mt-4">Pr. João Silva</CardTitle>
                  <CardDescription>Pastor Principal</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Liderando com amor e dedicação há 5 anos, focado no crescimento espiritual da igreja.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="items-center">
                  <img
                    src="https://cbnkerigma.org.br/assets/pastora-maria-santos-DNdEBuiZ.jpg"
                    alt="Pastora Maria Santos - Coordenação de Células da CBN Kerigma"
                    loading="lazy"
                    className="w-32 h-32 rounded-full object-cover shadow-md"
                  />
                  <CardTitle className="mt-4">Pr. Maria Santos</CardTitle>
                  <CardDescription>Coordenação de Células</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Responsável pelo desenvolvimento e crescimento do ministério de células.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="items-center">
                  <img
                    src="https://cbnkerigma.org.br/assets/pastor-carlos-lima-Cj7K1gMf.jpg"
                    alt="Pastor Carlos Lima - Ministério de Ensino da CBN Kerigma"
                    loading="lazy"
                    className="w-32 h-32 rounded-full object-cover shadow-md"
                  />
                  <CardTitle className="mt-4">Pr. Carlos Lima</CardTitle>
                  <CardDescription>Ministério de Ensino</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Dedicado ao ensino da Palavra e formação de novos líderes.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default PublicSobrePage;