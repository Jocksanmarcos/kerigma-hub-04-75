import React from "react";
import { DynamicPageRenderer } from "@/components/cms/DynamicPageRenderer";
import CarouselEventos from "@/components/cms/blocks/CarouselEventos";

const PublicAgendaPage: React.FC = () => {
  return (
    <DynamicPageRenderer
      slug="agenda"
      defaultTitle="Nossa Agenda"
      defaultDescription="Confira os próximos eventos e atividades da nossa comunidade de fé."
      defaultHeroTitle="Nossa Agenda"
      defaultHeroSubtitle="Confira os próximos eventos e atividades da nossa comunidade"
      fallbackContent={
        <div className="space-y-8">
          <CarouselEventos />
          <div className="text-center">
            <p className="text-muted-foreground">
              Fique por dentro de todos os nossos eventos e participe da vida da nossa comunidade.
            </p>
          </div>
        </div>
      }
    />
  );
};

export default PublicAgendaPage;
