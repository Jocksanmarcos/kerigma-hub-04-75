import React from "react";
import { DynamicPageRenderer } from "@/components/cms/DynamicPageRenderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const PublicContatoPageDynamic: React.FC = () => {
  return (
    <DynamicPageRenderer
      slug="contato"
      defaultTitle="Contato"
      defaultDescription="Entre em contato conosco. Estamos aqui para ajudar e orar por você."
      defaultHeroTitle="Fale Conosco"
      defaultHeroSubtitle="Estamos aqui para ajudar e orar por você"
      fallbackContent={
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome</label>
                  <Input placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Telefone</label>
                  <Input placeholder="(11) 99999-9999" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">E-mail</label>
                <Input type="email" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Assunto</label>
                <Input placeholder="Como podemos ajudar?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Mensagem</label>
                <Textarea 
                  placeholder="Conte-nos como podemos orar por você ou como podemos ajudar..."
                  rows={5}
                />
              </div>
              <Button className="w-full">
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-muted-foreground">(98) 99999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-muted-foreground">contato@cbnkerigma.org.br</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-muted-foreground">
                      Rua da Igreja, 123<br />
                      Bairro Centro<br />
                      São Luís - MA<br />
                      CEP: 65000-000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Horários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">Culto de Domingo</p>
                      <p className="text-muted-foreground">19h00</p>
                    </div>
                    <div>
                      <p className="font-medium">Células</p>
                      <p className="text-muted-foreground">Durante a semana em vários horários</p>
                    </div>
                    <div>
                      <p className="font-medium">Secretaria</p>
                      <p className="text-muted-foreground">Segunda a Sexta: 8h às 17h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Primeira vez aqui?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Conheça mais sobre nossa igreja e o que acreditamos.
                </p>
                <Button variant="secondary" className="w-full">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    />
  );
};

export default PublicContatoPageDynamic;