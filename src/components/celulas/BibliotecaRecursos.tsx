import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Download, Upload, Search, Filter, Video, FileText, Users, Heart } from 'lucide-react';

export const BibliotecaRecursos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const recursos = [
    {
      id: 1,
      titulo: 'O Poder da Oração em Família',
      tipo: 'Estudo Semanal',
      categoria: 'Família',
      descricao: 'Estudo completo sobre a importância da oração familiar com dinâmicas práticas',
      downloads: 156,
      arquivo: 'estudo-oracao-familia.pdf',
      publicoAlvo: ['Líder', 'Co-líder'],
      tags: ['oração', 'família', 'dinâmica']
    },
    {
      id: 2,
      titulo: 'Quebra-Gelo: Conhecendo Nossos Sonhos',
      tipo: 'Quebra-Gelo',
      categoria: 'Integração',
      descricao: 'Dinâmica para início de reunião que promove integração e conhecimento mútuo',
      downloads: 89,
      arquivo: 'quebra-gelo-sonhos.pdf',
      publicoAlvo: ['Líder', 'Co-líder', 'Anfitrião'],
      tags: ['integração', 'sonhos', 'conhecimento']
    },
    {
      id: 3,
      titulo: 'Como Conduzir uma Célula - Básico',
      tipo: 'Vídeo de Treino',
      categoria: 'Treinamento',
      descricao: 'Vídeo-aula de 15 minutos com fundamentos para novos líderes',
      downloads: 234,
      arquivo: 'treino-lider-basico.mp4',
      publicoAlvo: ['Líder em Treinamento'],
      tags: ['liderança', 'treinamento', 'básico']
    },
    {
      id: 4,
      titulo: 'Dinâmica do Amor Ágape',
      tipo: 'Dinâmica',
      categoria: 'Crescimento Espiritual',
      descricao: 'Atividade prática para demonstrar o amor incondicional de Deus',
      downloads: 72,
      arquivo: 'dinamica-amor-agape.pdf',
      publicoAlvo: ['Líder', 'Co-líder'],
      tags: ['amor', 'ágape', 'dinâmica', 'Deus']
    },
    {
      id: 5,
      titulo: 'Devocional Semanal - Fé em Ação',
      tipo: 'Devocional',
      categoria: 'Discipulado',
      descricao: 'Roteiro de devocional para ser usado durante a semana pelos membros',
      downloads: 198,
      arquivo: 'devocional-fe-acao.pdf',
      publicoAlvo: ['Líder', 'Co-líder', 'Membro'],
      tags: ['fé', 'ação', 'devocional', 'discipulado']
    }
  ];

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case 'Vídeo de Treino':
        return <Video className="h-5 w-5" />;
      case 'Estudo Semanal':
      case 'Devocional':
        return <FileText className="h-5 w-5" />;
      case 'Quebra-Gelo':
        return <Users className="h-5 w-5" />;
      case 'Dinâmica':
        return <Heart className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'Estudo Semanal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Quebra-Gelo':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Vídeo de Treino':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Dinâmica':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'Devocional':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Upload */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Biblioteca de Recursos</h2>
          <p className="text-muted-foreground">
            Materiais aprovados para estudos, dinâmicas e treinamentos
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Enviar Recurso
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar recursos por título ou tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="estudo">Estudo Semanal</SelectItem>
                <SelectItem value="quebra-gelo">Quebra-Gelo</SelectItem>
                <SelectItem value="video">Vídeo de Treino</SelectItem>
                <SelectItem value="dinamica">Dinâmica</SelectItem>
                <SelectItem value="devocional">Devocional</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="familia">Família</SelectItem>
                <SelectItem value="integracao">Integração</SelectItem>
                <SelectItem value="treinamento">Treinamento</SelectItem>
                <SelectItem value="discipulado">Discipulado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Recursos */}
      <div className="grid gap-4">
        {recursos.map((recurso) => (
          <Card key={recurso.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {getIconByType(recurso.tipo)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{recurso.titulo}</CardTitle>
                    <CardDescription className="mt-1">
                      {recurso.descricao}
                    </CardDescription>
                    <div className="flex space-x-2 mt-2">
                      <Badge className={getTypeColor(recurso.tipo)}>
                        {recurso.tipo}
                      </Badge>
                      <Badge variant="outline">
                        {recurso.categoria}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    {recurso.downloads} downloads
                  </div>
                  <Button className="mt-2">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm text-muted-foreground mr-2">Público-alvo:</span>
                  {recurso.publicoAlvo.map((publico, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {publico}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {recurso.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas da Biblioteca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-muted-foreground">Total de Recursos</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <div className="text-sm text-muted-foreground">Downloads Este Mês</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-muted-foreground">Recursos Novos</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-muted-foreground">Aguardando Aprovação</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};