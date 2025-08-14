import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Package, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Patrimonio {
  id: string;
  codigo_patrimonio?: string;
  nome: string;
  descricao?: string;
  categoria_id: string;
  subcategoria_id?: string;
  quantidade: number;
  data_aquisicao?: string;
  valor_unitario?: number;
  valor_total?: number;
  nota_fiscal_url?: string;
  localizacao_atual?: string;
  responsavel_id?: string;
  ministerio_relacionado?: string;
  estado_conservacao: string;
  status: string;
  data_ultima_manutencao?: string;
  proxima_manutencao_prevista?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
  categorias_patrimonio?: { nome: string };
}

interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
}

export const PatrimonioInventory: React.FC = () => {
  const [patrimonios, setPatrimonios] = useState<Patrimonio[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategoria, setSelectedCategoria] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Patrimonio | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria_id: '',
    quantidade: '1',
    data_aquisicao: '',
    valor_unitario: '',
    valor_total: '',
    localizacao_atual: '',
    estado_conservacao: 'Bom',
    status: 'Disponível',
    observacoes: ''
  });

  useEffect(() => {
    loadPatrimonios();
    loadCategorias();
  }, []);

  const loadPatrimonios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('patrimonios')
        .select(`
          *,
          categorias_patrimonio(nome)
        `)
        .order('codigo_patrimonio');

      if (error) throw error;
      setPatrimonios((data as any) || []);
    } catch (error) {
      console.error('Erro ao carregar patrimônios:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os patrimônios.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCategorias = async () => {
    try {
      const { data, error } = await supabase
        .from('categorias_patrimonio')
        .select('*')
        .eq('ativa', true)
        .order('nome');

      if (error) throw error;
      setCategorias(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const patrimonioData = {
        ...formData,
        quantidade: parseInt(formData.quantidade) || 1,
        valor_unitario: formData.valor_unitario ? parseFloat(formData.valor_unitario) : null,
        valor_total: formData.valor_total ? parseFloat(formData.valor_total) : null,
        data_aquisicao: formData.data_aquisicao || null
      };

      if (editingItem) {
        const { error } = await supabase
          .from('patrimonios')
          .update(patrimonioData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({ title: 'Sucesso', description: 'Patrimônio atualizado com sucesso!' });
      } else {
        const { error } = await supabase
          .from('patrimonios')
          .insert([patrimonioData]);

        if (error) throw error;
        toast({ title: 'Sucesso', description: 'Patrimônio cadastrado com sucesso!' });
      }

      setShowForm(false);
      setEditingItem(null);
      resetForm();
      loadPatrimonios();
    } catch (error) {
      console.error('Erro ao salvar patrimônio:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o patrimônio.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      categoria_id: '',
      quantidade: '1',
      data_aquisicao: '',
      valor_unitario: '',
      valor_total: '',
      localizacao_atual: '',
      estado_conservacao: 'Bom',
      status: 'Disponível',
      observacoes: ''
    });
  };

  const handleEdit = (item: Patrimonio) => {
    setEditingItem(item);
    setFormData({
      nome: item.nome || '',
      descricao: item.descricao || '',
      categoria_id: item.categoria_id || '',
      quantidade: item.quantidade?.toString() || '1',
      data_aquisicao: item.data_aquisicao || '',
      valor_unitario: item.valor_unitario?.toString() || '',
      valor_total: item.valor_total?.toString() || '',
      localizacao_atual: item.localizacao_atual || '',
      estado_conservacao: item.estado_conservacao || 'Bom',
      status: item.status || 'Disponível',
      observacoes: item.observacoes || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este patrimônio?')) return;

    try {
      const { error } = await supabase
        .from('patrimonios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Sucesso', description: 'Patrimônio excluído com sucesso!' });
      loadPatrimonios();
    } catch (error) {
      console.error('Erro ao excluir patrimônio:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o patrimônio.',
        variant: 'destructive'
      });
    }
  };

  const generateQRCode = (codigo: string) => {
    // Implementação básica - seria ideal usar uma biblioteca específica
    toast({
      title: 'QR Code',
      description: `QR Code para ${codigo} seria gerado aqui.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível': return 'bg-green-100 text-green-800';
      case 'Em Uso': return 'bg-blue-100 text-blue-800';
      case 'Em Manutenção': return 'bg-yellow-100 text-yellow-800';
      case 'Baixado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatrimonios = patrimonios.filter(item => {
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.codigo_patrimonio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesCategoria = selectedCategoria === 'all' || item.categoria_id === selectedCategoria;
    
    return matchesSearch && matchesStatus && matchesCategoria;
  });

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Inventário de Patrimônio</h2>
          <p className="text-muted-foreground">Gerencie todos os ativos da igreja</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingItem(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Patrimônio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar Patrimônio' : 'Novo Patrimônio'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome*</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={formData.categoria_id} onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    min="1"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="valor_unitario">Valor Unitário</Label>
                  <Input
                    id="valor_unitario"
                    type="number"
                    step="0.01"
                    value={formData.valor_unitario}
                    onChange={(e) => setFormData({ ...formData, valor_unitario: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="valor_total">Valor Total</Label>
                  <Input
                    id="valor_total"
                    type="number"
                    step="0.01"
                    value={formData.valor_total}
                    onChange={(e) => setFormData({ ...formData, valor_total: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estado_conservacao">Estado de Conservação</Label>
                  <Select value={formData.estado_conservacao} onValueChange={(value) => setFormData({ ...formData, estado_conservacao: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Bom">Bom</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Ruim">Ruim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data_aquisicao">Data de Aquisição</Label>
                  <Input
                    id="data_aquisicao"
                    type="date"
                    value={formData.data_aquisicao}
                    onChange={(e) => setFormData({ ...formData, data_aquisicao: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponível">Disponível</SelectItem>
                      <SelectItem value="Em Uso">Em Uso</SelectItem>
                      <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
                      <SelectItem value="Baixado">Baixado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="localizacao_atual">Localização Atual</Label>
                  <Input
                    id="localizacao_atual"
                    value={formData.localizacao_atual}
                    onChange={(e) => setFormData({ ...formData, localizacao_atual: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome ou código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Disponível">Disponível</SelectItem>
                  <SelectItem value="Em Uso">Em Uso</SelectItem>
                  <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
                  <SelectItem value="Baixado">Baixado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoria-filter">Categoria</Label>
              <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedCategoria('all');
              }}>
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de patrimônios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Carregando patrimônios...</p>
          </div>
        ) : filteredPatrimonios.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">
              {patrimonios.length === 0 ? 'Nenhum patrimônio cadastrado' : 'Nenhum patrimônio encontrado com os filtros aplicados'}
            </p>
          </div>
        ) : (
          filteredPatrimonios.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.nome}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.codigo_patrimonio || 'Sem código'}
                    </p>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  {item.categorias_patrimonio && (
                    <p><span className="font-medium">Categoria:</span> {item.categorias_patrimonio.nome}</p>
                  )}
                  <p><span className="font-medium">Quantidade:</span> {item.quantidade}</p>
                  <p><span className="font-medium">Estado:</span> {item.estado_conservacao}</p>
                  {item.localizacao_atual && (
                    <p><span className="font-medium">Localização:</span> {item.localizacao_atual}</p>
                  )}
                  {item.valor_total && (
                    <p><span className="font-medium">Valor Total:</span> R$ {item.valor_total.toFixed(2)}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => generateQRCode(item.codigo_patrimonio || item.id)}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};