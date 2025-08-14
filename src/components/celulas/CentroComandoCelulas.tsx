import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MapPin, TrendingUp, Target, AlertTriangle, BookOpen } from 'lucide-react';
import { DashboardLiderCelula } from './DashboardLiderCelula';
import { DashboardSupervisor } from './DashboardSupervisor';
import { BibliotecaRecursos } from './BibliotecaRecursos';
import { GestaoVisitantes } from './GestaoVisitantes';

export const CentroComandoCelulas: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lider');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-kerigma-gradient rounded-lg">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centro de Comando de Células</h1>
          <p className="text-muted-foreground">Gestão inteligente, pastoreio estratégico e multiplicação guiada por IA</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Células Ativas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saúde Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">87%</div>
            <p className="text-xs text-muted-foreground">Verde: 32 | Amarelo: 9 | Vermelho: 6</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prontas p/ Multiplicação</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">Meta: 12 célula/ano</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lider" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Minha Célula</span>
          </TabsTrigger>
          <TabsTrigger value="supervisor" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Supervisão</span>
          </TabsTrigger>
          <TabsTrigger value="recursos" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Recursos</span>
          </TabsTrigger>
          <TabsTrigger value="visitantes" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Visitantes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lider" className="space-y-6">
          <DashboardLiderCelula />
        </TabsContent>

        <TabsContent value="supervisor" className="space-y-6">
          <DashboardSupervisor />
        </TabsContent>

        <TabsContent value="recursos" className="space-y-6">
          <BibliotecaRecursos />
        </TabsContent>

        <TabsContent value="visitantes" className="space-y-6">
          <GestaoVisitantes />
        </TabsContent>
      </Tabs>
    </div>
  );
};