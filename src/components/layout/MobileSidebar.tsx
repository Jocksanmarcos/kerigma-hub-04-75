import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  BarChart3,
  Home,
  MessageSquare,
  Award,
  Shield,
  MapPin,
  Package,
  DollarSign,
  Menu,
  X,
  ChevronRight,
  LayoutTemplate,
  Layers,
} from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
];

const adminNavItems = [
  { title: 'Gestão de Pessoas', url: '/dashboard/pessoas', icon: Users },
  { title: 'Centro de Ensino', url: '/ensino', icon: GraduationCap },
  { title: 'Centro de Comando de Células', url: '/admin/celulas', icon: MapPin },
  { title: 'Ministérios & Louvor', url: '/dashboard/ministerios', icon: Layers },
  { title: 'Central de Eventos', url: '/dashboard/eventos', icon: Calendar },
  { title: 'Gestão de Patrimônio', url: '/dashboard/patrimonio', icon: Package },
  { title: 'Central Financeira', url: '/dashboard/financeiro', icon: DollarSign },
  { title: 'Relatórios Financeiros', url: '/dashboard/financeiro-relatorios', icon: BarChart3, desktopOnly: true },
  { title: 'Studio Digital', url: '/admin/studio-digital', icon: LayoutTemplate, desktopOnly: true },
  { title: 'Centro de Governança', url: '/admin/governanca', icon: Shield, desktopOnly: true },
];

const ensinoNavItems = [
  { title: 'Meus Cursos', url: '/cursos', icon: BookOpen },
  { title: 'Calendário', url: '/calendario', icon: Calendar },
  { title: 'Mensagens', url: '/mensagens', icon: MessageSquare },
  { title: 'Certificados', url: '/certificados', icon: Award },
  { title: 'Professores', url: '/admin/professores', icon: GraduationCap, desktopOnly: true },
  { title: 'Relatórios', url: '/admin/relatorios', icon: BarChart3, desktopOnly: true },
];

interface MobileSidebarProps {
  className?: string;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [ensinoOpen, setEnsinoOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string, desktopOnly = false) => {
    const baseClasses = 'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-kerigma transition-all duration-300 min-h-[48px]';
    const activeClasses = isActive(path)
      ? 'bg-primary/10 text-primary shadow-kerigma border-l-4 border-primary'
      : 'hover:bg-muted text-foreground';
    
    return cn(
      baseClasses,
      activeClasses,
      desktopOnly && 'opacity-50'
    );
  };

  const DesktopOnlyPlaceholder = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 px-4 py-3 text-sm rounded-kerigma bg-muted/50 min-h-[48px]">
      <div className="h-4 w-4 rounded bg-muted" />
      <div className="flex-1">
        <p className="text-muted-foreground text-xs">{title}</p>
        <p className="text-xs text-muted-foreground">Otimizado para desktop</p>
      </div>
    </div>
  );

  const NavItem = ({ item, onClick }: { item: any; onClick: () => void }) => {
    if (item.desktopOnly) {
      return <DesktopOnlyPlaceholder title={item.title} />;
    }

    return (
      <NavLink
        to={item.url}
        className={getNavClasses(item.url)}
        onClick={onClick}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <span className="flex-1">{item.title}</span>
      </NavLink>
    );
  };

  const ensinoPaths = ['/ensino', '/cursos', '/calendario', '/mensagens', '/certificados', '/admin/professores', '/admin/relatorios'];
  const ensinoActive = ensinoPaths.some((p) => currentPath.startsWith(p));

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("lg:hidden h-10 w-10", className)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[90vh] max-h-[90vh]">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center overflow-hidden p-1">
                <img src="/lovable-uploads/57bb8965-c932-40db-a64b-c15a6d72d4b0.png" alt="Kerigma Hub" className="h-full w-full object-contain" />
              </div>
              Kerigma Hub
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="px-4 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Principal
            </h3>
            <nav className="space-y-2">
              {mainNavItems.map((item) => (
                <NavItem key={item.title} item={item} onClick={() => setOpen(false)} />
              ))}
            </nav>
          </div>

          {/* Admin Navigation */}
          <div>
            <h3 className="px-4 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Administração
            </h3>
            <nav className="space-y-2">
              {adminNavItems.map((item) => (
                <NavItem key={item.title} item={item} onClick={() => setOpen(false)} />
              ))}
            </nav>
          </div>

          {/* Ensino Navigation */}
          <div>
            <button
              onClick={() => setEnsinoOpen(!ensinoOpen)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-kerigma transition-all duration-300 min-h-[48px] w-full',
                ensinoActive 
                  ? 'bg-primary/10 text-primary shadow-kerigma border-l-4 border-primary'
                  : 'hover:bg-muted text-foreground'
              )}
            >
              <GraduationCap className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1 text-left">Centro de Ensino</span>
              <ChevronRight className={cn('h-4 w-4 transition-transform', ensinoOpen && 'rotate-90')} />
            </button>
            
            {ensinoOpen && (
              <div className="mt-2 ml-4 pl-4 border-l border-border space-y-2">
                {ensinoNavItems.map((item) => (
                  <NavItem key={item.title} item={item} onClick={() => setOpen(false)} />
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="border-t border-border pt-4">
            <NavLink
              to="/configuracoes"
              className={getNavClasses('/configuracoes')}
              onClick={() => setOpen(false)}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              <span>Configurações</span>
            </NavLink>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};