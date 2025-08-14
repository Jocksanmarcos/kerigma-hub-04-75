import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, Target, MessageSquare, TrendingUp } from 'lucide-react';
import { AssistenteDiscipulado } from './AssistenteDiscipulado';
import { AnaliseEngajamento } from './AnaliseEngajamento';
import { SugestoesMinisterio } from './SugestoesMinisterio';
import { ChatPastoral } from './ChatPastoral';

export const IAPastoralCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assistente');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-kerigma-gradient rounded-lg">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centro de IA Pastoral</h1>
          <p className="text-muted-foreground">Inteligência artificial para apoio pastoral e discipulado</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análises Realizadas</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+8% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matches Ministério</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">+15% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Sucesso</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">+2% este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistente" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Assistente</span>
          </TabsTrigger>
          <TabsTrigger value="engajamento" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Engajamento</span>
          </TabsTrigger>
          <TabsTrigger value="ministerio" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Ministérios</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Chat Pastoral</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistente" className="space-y-6">
          <AssistenteDiscipulado />
        </TabsContent>

        <TabsContent value="engajamento" className="space-y-6">
          <AnaliseEngajamento />
        </TabsContent>

        <TabsContent value="ministerio" className="space-y-6">
          <SugestoesMinisterio />
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <ChatPastoral />
        </TabsContent>
      </Tabs>
    </div>
  );
};