import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import EnsinoSidebar from '../navigation/EnsinoSidebar';
import { Card, CardContent } from '@/components/ui/card';

interface EnsinoDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const EnsinoDashboardLayout: React.FC<EnsinoDashboardLayoutProps> = ({
  children,
  title,
  description
}) => {
  return (
    <AppLayout>
      <div className="h-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </header>
        <main>
          {children}
        </main>
      </div>
    </AppLayout>
  );
};

export default EnsinoDashboardLayout;