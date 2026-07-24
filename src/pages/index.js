import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import ArchDiagramSection from '@site/src/components/ArchDiagramSection';
import ValuePropsSection from '@site/src/components/ValuePropsSection';
import ProductHighlightsSection from '@site/src/components/ProductHighlightsSection';
import CLISection from '@site/src/components/CLISection';
import ContactSection from '@site/src/components/ContactSection';
import SocialProofSection from '@site/src/components/SocialProofSection';

export default function Home() {
  return (
    <Layout
      wrapperClassName="landingPage"
      title="autobase"
      description="Automated database platform for PostgreSQL">
      <HeroSection />
      <main>
        <ArchDiagramSection />
        <ValuePropsSection />
        <CLISection />
        {/* <ProductHighlightsSection /> */}
        <ContactSection />
        <SocialProofSection />
      </main>
    </Layout>
  );
}
