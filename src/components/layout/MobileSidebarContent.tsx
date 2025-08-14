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
  HeartHandshake,
  Layers,
} from 'lucide-react';
import { useNewUserRole, newRolePermissions, UserRole } from '@/hooks/useNewRole';
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
  { title: 'Financeiro', url: '/dashboard/financeiro', icon: Landmark },
  { title: 'Património', url: '/dashboard/patrimonio', icon: Briefcase },
];

const adminNavItems = [
  { title: 'Segurança', url: '/admin/governanca', icon: ShieldCheck },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
];

export const MobileSidebarContent: React.FC = () => {
  const location = useLocation();
  const { data: userRole } = useNewUserRole();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    return cn(
      'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
      isActive(path)
        ? 'bg-primary/10 text-primary border-l-4 border-primary'
        : 'hover:bg-accent text-muted-foreground hover:text-foreground'
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
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center overflow-hidden p-1">
          <img src="/lovable-uploads/57bb8965-c932-40db-a64b-c15a6d72d4b0.png" alt="Kerigma Hub" className="h-full w-full object-contain" />
        </div>
        <div className="text-lg font-semibold text-foreground">
          Kerigma Hub
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="px-4 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Principal
          </h3>
          <nav className="space-y-1">
            {filteredMainItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={getNavClasses(item.url)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Admin Navigation */}
        {userRole === 'pastor' && (
          <div>
            <h3 className="px-4 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Administração
            </h3>
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={getNavClasses(item.url)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};