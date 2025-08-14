import React from 'react';
import PublicSiteLayout from '@/components/layout/PublicSiteLayout';
import { SolicitacaoAconselhamentoForm } from '@/components/aconselhamento/SolicitacaoAconselhamentoForm';
import { Section } from '@/components/public/Section';
import { HeartHandshake, Shield, Clock, Users } from 'lucide-react';

const PublicAconselhamentoPage = () => {
  return (
    <PublicSiteLayout>
      {/* Header Section */}
      <Section className="bg-gradient-to-b from-primary/5 to-transparent py-10 md:py-12">
        <div className="max-w-4xl mx-auto text-center py-8">
          <HeartHandshake className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Aconselhamento Pastoral</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em momentos de dificuldade, dúvida ou necessidade de orientação, nossa equipe pastoral 
            está aqui para caminhar ao seu lado com amor, sabedoria e confidencialidade.
          </p>
        </div>
      </Section>

      {/* Features Section */}
      <Section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Confidencial</h3>
              <p className="text-muted-foreground">
                Todas as conversas são tratadas com total sigilo e confidencialidade pastoral.
              </p>
            </div>
            
            <div className="text-center p-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Flexível</h3>
              <p className="text-muted-foreground">
                Agendamos horários que se adequem à sua disponibilidade e necessidade.
              </p>
            </div>
            
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Acolhedor</h3>
              <p className="text-muted-foreground">
                Nossa equipe está preparada para acolher com amor e sem julgamentos.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Form Section */}
      <Section className="bg-muted/20 py-10 md:py-12">
        <div className="max-w-4xl mx-auto">
          <SolicitacaoAconselhamentoForm />
        </div>
      </Section>

      {/* Information Section */}
      <Section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Como Funciona</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Envie sua Solicitação</h3>
                <p className="text-sm text-muted-foreground">
                  Preencha o formulário com suas informações e motivo do contato.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">Retorno Pastoral</h3>
                <p className="text-sm text-muted-foreground">
                  Um pastor entrará em contato para agendar o encontro.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Encontro Pastoral</h3>
                <p className="text-sm text-muted-foreground">
                  Momento de diálogo, oração e orientação pastoral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PublicSiteLayout>
  );
};

export default PublicAconselhamentoPage;