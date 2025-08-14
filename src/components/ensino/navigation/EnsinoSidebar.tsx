import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  Library,
  Award,
  Home,
  Book
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard de Ensino',
    href: '/ensino',
    icon: Home,
  },
  {
    name: 'Meus Cursos',
    href: '/cursos',
    icon: BookOpen,
  },
  {
    name: 'Jornada Bíblica',
    href: '/ensino/biblia',
    icon: Book,
  },
  {
    name: 'Trilhas de Formação',
    href: '/ensino/trilhas',
    icon: GraduationCap,
  },
  {
    name: 'Turmas',
    href: '/ensino/turmas',
    icon: Users,
  },
  {
    name: 'Biblioteca de Recursos',
    href: '/ensino/biblioteca',
    icon: Library,
  },
  {
    name: 'Certificados',
    href: '/certificados',
    icon: Award,
  },
  {
    name: 'Relatórios',
    href: '/ensino/relatorios',
    icon: BarChart3,
  },
];

interface EnsinoSidebarProps {
  className?: string;
}

const EnsinoSidebar: React.FC<EnsinoSidebarProps> = ({ className }) => {
  const location = useLocation();

  return (
    <nav className={cn('space-y-1', className)}>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href || 
          (item.href !== '/ensino' && location.pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <item.icon
              className={cn(
                'mr-3 h-4 w-4 flex-shrink-0',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground'
              )}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default EnsinoSidebar;