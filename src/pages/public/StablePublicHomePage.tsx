import React from 'react';
import PublicSiteLayout from '@/components/layout/PublicSiteLayout';
import { HeroSection } from '@/components/homepage/HeroSection';
import { WelcomeSection } from '@/components/homepage/WelcomeSection';
import { SermonSection } from '@/components/homepage/SermonSection';
import { CommunitySection } from '@/components/homepage/CommunitySection';

/**
 * Stable Public Home Page
 * 
 * Versão estável da página inicial que elimina loops de renderização:
 * 1. Sem useEffect para busca de dados
 * 2. Sem dependências que causam re-renderização
 * 3. Estrutura simples e direta
 */
const StablePublicHomePage: React.FC = () => {
  return (
    <PublicSiteLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Welcome Section */}
        <WelcomeSection />
        
        {/* Sermon Section */}
        <SermonSection />
        
        {/* Community Section */}
        <CommunitySection />
      </div>
    </PublicSiteLayout>
  );
};

export default StablePublicHomePage;