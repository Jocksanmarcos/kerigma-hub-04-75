import React from 'react';
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
  MessageSquare,
} from 'lucide-react';
import { useNewUserRole, newRolePermissions, UserRole } from '@/hooks/useNewRole';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Pessoas', url: '/dashboard/pessoas', icon: Users },
  { title: 'Células', url: '/admin/celulas', icon: HeartHandshake },
  { title: 'Ensino (EAD)', url: '/ensino', icon: GraduationCap },
  { title: 'Agenda', url: '/dashboard/agenda', icon: Calendar },
  { title: 'Ministérios & Louvor', url: '/dashboard/ministerios', icon: Layers },
  { title: 'Studio de Produção de Cultos', url: '/dashboard/cultos', icon: Music },
  { title: 'Eventos', url: '/dashboard/eventos', icon: Ticket },
  { title: 'Mensagens', url: '/mensagens', icon: MessageSquare },
  { title: 'Financeiro', url: '/dashboard/financeiro', icon: Landmark },
  { title: 'Património', url: '/dashboard/patrimonio', icon: Briefcase },
];

const adminNavItems = [
  { title: 'Segurança', url: '/admin/governanca', icon: ShieldCheck },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
];

export const SimpleSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: userRole } = useNewUserRole();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
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
    
    const pageName = item.url.split('/').pop() || 'dashboard';
    return permissions.pages.includes(pageName);
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