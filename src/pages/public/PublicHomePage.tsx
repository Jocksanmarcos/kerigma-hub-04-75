import React, { useEffect } from "react";
import PublicSiteLayout from "@/components/layout/PublicSiteLayout";
import { HeroSection } from "@/components/homepage/HeroSection";
import { WelcomeSection } from "@/components/homepage/WelcomeSection";
import { SermonSection } from "@/components/homepage/SermonSection";
import { CommunitySection } from "@/components/homepage/CommunitySection";

const PublicHomePage: React.FC = () => {
  useEffect(() => {
    // SEO Setup
    document.title = "Encontre o seu Lugar | Igreja em Células";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Uma igreja onde cada pessoa é valorizada e encontra sua família em Cristo. Venha descobrir o seu lugar em nossa comunidade acolhedora.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Uma igreja onde cada pessoa é valorizada e encontra sua família em Cristo. Venha descobrir o seu lugar em nossa comunidade acolhedora.';
      document.head.appendChild(meta);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin;

    // Keywords
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', 'igreja, células, comunidade, fé, Cristo, família, relacionamentos, crescimento espiritual');
  }, []);

  return (
    <PublicSiteLayout>
      {/* Hero Section - Full Screen Immersive */}
      <HeroSection />

      {/* Welcome Section - Alternating Background (Muted) */}
      <WelcomeSection />

      {/* Latest Sermons Section - Default Background */}
      <SermonSection />

      {/* Community Connect Section - Primary Background */}
      <CommunitySection />
    </PublicSiteLayout>
  );
};

export default PublicHomePage;