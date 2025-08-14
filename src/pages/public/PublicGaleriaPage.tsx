import React, { useEffect } from "react";
import PublicSiteLayout from "@/components/layout/PublicSiteLayout";
import { Card, CardContent } from "@/components/ui/card";

const PublicGaleriaPage: React.FC = () => {
  useEffect(() => {
    document.title = "Galeria de Fotos | CBN Kerigma";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Galeria de fotos e momentos da CBN Kerigma. Confira nossos eventos e atividades.");
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  return (
    <PublicSiteLayout>
      <header className="bg-accent text-accent-foreground py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Galeria</h1>
        <p className="mt-3 opacity-90">Momentos marcantes da nossa comunidade</p>
      </header>

      <main className="py-12">
        <section className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    alt={`Foto da galeria ${i + 1}`}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </PublicSiteLayout>
  );
};

export default PublicGaleriaPage;
