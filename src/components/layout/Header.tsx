import React, { useEffect, useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { ConsultaRapidaBiblia } from '@/components/biblia/ConsultaRapidaBiblia';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AdaptiveLogo } from '@/components/ui/adaptive-logo';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthed(!!session?.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setIsAuthed(!!session?.user));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Sessão encerrada' });
    navigate('/auth', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 h-header bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left section - Mobile menu + Search */}
        <div className="flex items-center gap-2">          
          {/* Mobile sidebar trigger */}
          <MobileSidebar />
          
          {/* Desktop search */}
          <div className="hidden lg:flex">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar cursos, recursos, alunos..."
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Center - Logo */}
        <div className="flex items-center">
          <AdaptiveLogo className="h-12 sm:h-14 lg:h-16 w-auto" />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search */}
          <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>

          {/* Consulta Bíblica */}
          <ConsultaRapidaBiblia />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications - usando NotificationCenter quando autenticado */}
          {isAuthed && (
            <NotificationCenter />
          )}

          {/* User / Auth */}
          {isAuthed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                  <div className="h-9 w-9 rounded-full bg-kerigma-gradient flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/configuracoes')}>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/auth">
              <Button size="sm" className="h-9">Entrar</Button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};