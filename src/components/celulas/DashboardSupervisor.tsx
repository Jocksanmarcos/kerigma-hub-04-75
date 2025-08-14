import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, TrendingUp, Users, AlertTriangle, Search, Filter, Eye } from 'lucide-react';

export const DashboardSupervisor: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Filtros Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros Rápidos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar célula por nome ou líder..."
                className="w-full"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Saúde" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="verde">Verde</SelectItem>
                <SelectItem value="amarelo">Amarelo</SelectItem>
                <SelectItem value="vermelho">Vermelho</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="centro">Centro</SelectItem>
                <SelectItem value="norte">Norte</SelectItem>
                <SelectItem value="sul">Sul</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grelha de Saúde das Células */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Grelha de Saúde das Células</span>
          </CardTitle>
          <CardDescription>
            Visão geral do status de todas as células sob sua supervisão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                nome: 'Célula Jardim Europa',
                lider: 'Maria Silva',
                membros: 14,
                presencaMedia: 12,
                visitantesUltimo: 2,
                saude: 'Verde',
                ultimoRelatorio: '2 dias atrás'
              },
              {
                nome: 'Célula Centro',
                lider: 'João Santos',
                membros: 8,
                presencaMedia: 6,
                visitantesUltimo: 0,
                saude: 'Amarelo',
                ultimoRelatorio: '1 semana atrás'
              },
              {
                nome: 'Célula Vila Nova',
                lider: 'Ana Costa',
                membros: 12,
                presencaMedia: 4,
                visitantesUltimo: 1,
                saude: 'Vermelho',
                ultimoRelatorio: '3 semanas atrás'
              },
              {
                nome: 'Célula Bela Vista',
                lider: 'Pedro Lima',
                membros: 16,
                presencaMedia: 14,
                visitantesUltimo: 3,
                saude: 'Verde',
                ultimoRelatorio: 'Hoje'
              },
              {
                nome: 'Célula São João',
                lider: 'Carlos Souza',
                membros: 10,
                presencaMedia: 8,
                visitantesUltimo: 1,
                saude: 'Verde',
                ultimoRelatorio: '1 dia atrás'
              },
              {
                nome: 'Célula Esperança',
                lider: 'Lucia Mendes',
                membros: 6,
                presencaMedia: 5,
                visitantesUltimo: 0,
                saude: 'Amarelo',
                ultimoRelatorio: '4 dias atrás'
              }
            ].map((celula, index) => (
              <Card key={index} className={`border-l-4 ${
                celula.saude === 'Verde' ? 'border-l-emerald-500' :
                celula.saude === 'Amarelo' ? 'border-l-yellow-500' :
                'border-l-red-500'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{celula.nome}</CardTitle>
                    <Badge 
                      variant={
                        celula.saude === 'Verde' ? 'default' :
                        celula.saude === 'Amarelo' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {celula.saude}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Líder: {celula.lider}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Membros:</span>
                      <span className="font-medium">{celula.membros}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Presença Média:</span>
                      <span className="font-medium">{celula.presencaMedia}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Visitantes (último):</span>
                      <span className="font-medium">{celula.visitantesUltimo}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Último Relatório:</span>
                      <span className="text-xs text-muted-foreground">{celula.ultimoRelatorio}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Células Prontas para Multiplicação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Células Prontas para Multiplicação</span>
          </CardTitle>
          <CardDescription>
            IA sugere células com potencial para multiplicação baseado em métricas de crescimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                nome: 'Célula Jardim Europa',
                lider: 'Maria Silva',
                membros: 16,
                crescimento: '+45%',
                pontuacao: 95,
                motivo: 'Crescimento constante, liderança madura, presença alta'
              },
              {
                nome: 'Célula Bela Vista',
                lider: 'Pedro Lima',
                membros: 14,
                crescimento: '+30%',
                pontuacao: 88,
                motivo: 'Muitos visitantes, líder em treinamento disponível'
              }
            ].map((celula, index) => (
              <div key={index} className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200">{celula.nome}</h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">Líder: {celula.lider}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{celula.motivo}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-800 dark:text-emerald-200">{celula.pontuacao}%</div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400">{celula.crescimento}</div>
                    <Badge variant="outline" className="mt-2">
                      {celula.membros} membros
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm">
                    Iniciar Multiplicação
                  </Button>
                  <Button variant="outline" size="sm">
                    Agendar Reunião
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações em Massa */}
      <Card>
        <CardHeader>
          <CardTitle>Ações em Massa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <AlertTriangle className="h-6 w-6" />
              <span>Lembrete Relatórios</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <MapPin className="h-6 w-6" />
              <span>Mapa de Células</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <TrendingUp className="h-6 w-6" />
              <span>Relatório Geral</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <Users className="h-6 w-6" />
              <span>Treinamento Líderes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};