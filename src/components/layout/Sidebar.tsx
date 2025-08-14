import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  Music,
  Ticket,
  Landmark,
  Briefcase,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Layers,
  BarChart3,
  Brain,
  Clock,
  Palette,
  MessageSquare,
  UserPlus,
  Archive,
} from 'lucide-react';
import { useNewUserRole, newRolePermissions, UserRole } from '@/hooks/useNewRole';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, page: 'dashboard' },
  { title: 'Gestão de Pessoas', url: '/dashboard/pessoas', icon: Users, page: 'pessoas' },
  { title: 'Centro de Células', url: '/admin/celulas', icon: HeartHandshake, page: 'celulas' },
  { title: 'Centro de Ensino', url: '/ensino', icon: GraduationCap, page: 'ensino' },
  { title: 'Agenda & Cronogramas', url: '/dashboard/agenda', icon: Calendar, page: 'agenda' },
  { title: 'Escalas de Serviço', url: '/dashboard/escalas', icon: Clock, page: 'escalas' },
  { title: 'Ministérios & Louvor', url: '/dashboard/ministerios', icon: Layers, page: 'ministerios' },
  { title: 'Studio de Cultos', url: '/dashboard/cultos', icon: Music, page: 'cultos' },
  { title: 'Louvor & Ambiente', url: '/dashboard/louvor', icon: Palette, page: 'louvor' },
  { title: 'Central de Eventos', url: '/dashboard/eventos', icon: Ticket, page: 'eventos' },
  { title: 'Financeiro', url: '/dashboard/financeiro', icon: Landmark, page: 'financeiro' },
  { title: 'Patrimônio', url: '/dashboard/patrimonio', icon: Briefcase, page: 'patrimonio' },
  { title: 'Aconselhamento', url: '/admin/aconselhamento', icon: MessageSquare, page: 'aconselhamento', roles: ['pastor'] },
  { title: 'IA Pastoral', url: '/admin/ia-pastoral', icon: Brain, page: 'ia-pastoral', roles: ['pastor'] },
];

const analyticsNavItems = [
  { title: 'Analytics & Relatórios', url: '/admin/analytics', icon: BarChart3, page: 'analytics' },
];

const adminNavItems = [
  { title: 'Centro de Governança', url: '/admin/governanca', icon: ShieldCheck, page: 'governanca' },
  { title: 'Configurações', url: '/admin/configuracoes', icon: Settings, page: 'configuracoes' },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: userRole } = useNewUserRole();

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    return cn(
      'flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-kerigma transition-all duration-300',
      isActive(path)
        ? 'bg-primary/10 text-primary shadow-kerigma border-l-3 border-primary ml-1'
        : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground hover:shadow-kerigma'
    );
  };

  const filteredMainItems = mainNavItems.filter(item => {
    if (!userRole) return false;
    const permissions = newRolePermissions[userRole as UserRole];
    if (!permissions) return false;
    
    // Check role-specific items
    if (item.roles && !item.roles.includes(userRole)) return false;
    
    return permissions.pages.includes(item.page);
  });

  const filteredAnalyticsItems = analyticsNavItems.filter(item => {
    if (!userRole) return false;
    const permissions = newRolePermissions[userRole as UserRole];
    if (!permissions) return false;
    
    return permissions.pages.includes(item.page);
  });

  return (
    <div className={cn(
      "flex h-full min-h-0 flex-col border-r border-border bg-sidebar shadow-kerigma transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header with toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center overflow-hidden p-1">
            <img src="/lovable-uploads/57bb8965-c932-40db-a64b-c15a6d72d4b0.png" alt="Kerigma Hub" className="h-full w-full object-contain" />
          </div>
          {!collapsed && (
            <div className="text-lg font-semibold text-foreground">
              Kerigma Hub
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          {!collapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Principal
            </h3>
          )}
          <nav className="space-y-1">
            {filteredMainItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={getNavClasses(item.url)}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="flex-1">{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Analytics Navigation */}
        {filteredAnalyticsItems.length > 0 && (
          <div>
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Analytics
              </h3>
            )}
            <nav className="space-y-1">
              {filteredAnalyticsItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={getNavClasses(item.url)}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span className="flex-1">{item.title}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Admin Navigation */}
        {userRole === 'pastor' && (
          <div>
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Administração
              </h3>
            )}
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={getNavClasses(item.url)}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};