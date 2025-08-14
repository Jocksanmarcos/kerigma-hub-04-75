import React from 'react';
import { Header } from '@/components/layout/Header';
import { SimpleSidebar } from '@/components/layout/SimpleSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-muted/30">
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <SimpleSidebar />
        </div>
        
        {/* Main content with mobile-first padding */}
        <main className="flex-1 overflow-y-auto bg-surface-blue-soft/30">
          <div className="w-full max-w-none px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};