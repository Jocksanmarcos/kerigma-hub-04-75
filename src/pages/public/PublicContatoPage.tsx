import React, { FormEvent, useEffect } from "react";
import PublicSiteLayout from "@/components/layout/PublicSiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const PublicContatoPage: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Contato | CBN Kerigma";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Fale com a CBN Kerigma. Tire dúvidas, envie pedidos de oração e sugestões.");
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast({ title: "Mensagem enviada!", description: "Obrigado por entrar em contato. Em breve responderemos." });
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <PublicSiteLayout>
      <header className="bg-accent text-accent-foreground py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Contato</h1>
        <p className="mt-3 opacity-90">Estamos aqui para servir você e sua família</p>
      </header>

      <main className="py-12">
        <section className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">Fale Conosco</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Seu nome" required aria-label="Seu nome" />
                <Input type="email" name="email" placeholder="Seu e-mail" required aria-label="Seu e-mail" />
                <Textarea name="message" placeholder="Sua mensagem" rows={6} required aria-label="Sua mensagem" />
                <Button type="submit" className="w-full">Enviar</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2 text-muted-foreground">
              <h3 className="text-xl font-semibold text-foreground">Informações</h3>
              <p>📧 contato@igrejacelulas.com</p>
              <p>📞 (11) 99999-9999</p>
              <p>📍 Rua das Células, 123</p>
              <p>🕐 Domingos: 9h e 19h</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </PublicSiteLayout>
  );
};

export default PublicContatoPage;
