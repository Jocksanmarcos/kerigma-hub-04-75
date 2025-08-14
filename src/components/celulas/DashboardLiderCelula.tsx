import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, AlertCircle, Plus, FileText, PhoneCall } from 'lucide-react';
import { RelatorioSemanalDialog } from './RelatorioSemanalDialog';

export const DashboardLiderCelula: React.FC = () => {
  const [showRelatorio, setShowRelatorio] = useState(false);

  return (
    <div className="space-y-6">
      {/* Próxima Reunião */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Próxima Reunião</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">Quinta-feira, 19:30</p>
              <p className="text-muted-foreground">Rua das Flores, 123 - Jardim Europa</p>
              <p className="text-sm text-muted-foreground mt-1">Tema: "O Poder da Oração"</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Presença esperada</p>
              <p className="text-xl font-bold text-emerald-600">12 pessoas</p>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Confirmar Reunião
            </Button>
            <Button variant="outline" size="sm">
              <PhoneCall className="h-4 w-4 mr-2" />
              Lembrete WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Meus Membros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Meus Membros</span>
              <Badge variant="secondary">14</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { nome: 'Maria Silva', funcao: 'Co-líder', status: 'ativo', telefone: '(11) 99999-9999' },
                { nome: 'João Santos', funcao: 'Anfitrião', status: 'ativo', telefone: '(11) 88888-8888' },
                { nome: 'Ana Costa', funcao: 'Membro', status: 'ausente', telefone: '(11) 77777-7777' },
                { nome: 'Pedro Lima', funcao: 'Membro', status: 'ativo', telefone: '(11) 66666-6666' },
              ].map((membro, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{membro.nome}</p>
                    <p className="text-sm text-muted-foreground">{membro.funcao}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={membro.status === 'ativo' ? 'default' : 'destructive'}>
                      {membro.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <PhoneCall className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Membro
            </Button>
          </CardContent>
        </Card>

        {/* Alertas Inteligentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Alertas Inteligentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800 dark:text-orange-200">Relatório Pendente</span>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  Relatório da reunião de quinta-feira ainda não foi enviado
                </p>
                <Button size="sm" className="mt-2" onClick={() => setShowRelatorio(true)}>
                  Enviar Agora
                </Button>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Aniversariante</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Ana Costa faz aniversário amanhã (15/12)
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Enviar Parabéns
                </Button>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-800 dark:text-red-200">Membro Ausente</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Pedro Lima está ausente há 3 semanas
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Fazer Contato
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <FileText className="h-6 w-6" />
              <span>Novo Relatório</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <Users className="h-6 w-6" />
              <span>Listar Membros</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <Calendar className="h-6 w-6" />
              <span>Agendar Visita</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <Clock className="h-6 w-6" />
              <span>Histórico</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <RelatorioSemanalDialog open={showRelatorio} onOpenChange={setShowRelatorio} />
    </div>
  );
};