import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BookOpen,
  Calendar,
  FileText,
  Building,
  Settings,
  PieChart,
  MessagesSquare,
  Heart
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    group: "Principal",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Pessoas", url: "/dashboard/pessoas", icon: Users },
      { title: "Financeiro", url: "/dashboard/financeiro", icon: DollarSign },
      { title: "Ensino", url: "/ensino", icon: BookOpen },
    ]
  },
  {
    group: "Gestão",
    items: [
      { title: "Agenda", url: "/dashboard/agenda", icon: Calendar },
      { title: "Eventos", url: "/dashboard/eventos", icon: FileText },
      { title: "Patrimônio", url: "/dashboard/patrimonio", icon: Building },
      { title: "Ministérios", url: "/dashboard/ministerios", icon: MessagesSquare },
    ]
  },
  {
    group: "Relatórios",
    items: [
      { title: "Analytics", url: "/admin/analytics", icon: PieChart },
      { title: "Células", url: "/admin/celulas", icon: Users },
      { title: "Aconselhamento", url: "/admin/aconselhamento", icon: Heart },
    ]
  },
  {
    group: "Administração",
    items: [
      { title: "Configurações", url: "/admin/configuracoes", icon: Settings },
      { title: "Sistema", url: "/admin/system", icon: Settings },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard" || currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarContent className="bg-card border-r">
        {navigationItems.map((group) => {
          const hasActiveItem = group.items.some(item => isActive(item.url));
          
          return (
            <SidebarGroup
              key={group.group}
            >
              {!collapsed && (
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
                  {group.group}
                </SidebarGroupLabel>
              )}
              
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${getNavClass(item.url)}`}
                          title={collapsed ? item.title : undefined}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span className="truncate">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}