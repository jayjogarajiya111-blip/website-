import React from 'react';
import HeroDocs from './HeroDocs';
import EvolutionSection from './EvolutionSection';
import PhilosophySection from './PhilosophySection';
import ArchitectureSection from './ArchitectureSection';
import SensorySection from './SensorySection';
import ModulesSection from './ModulesSection';
import SecuritySection from './SecuritySection';
import TechStackSection from './TechStackSection';
import FutureVisionSection from './FutureVisionSection';
import DocsFooter from './DocsFooter';

const DocsContent = () => {
  return (
    <div className="px-4 px-md-5 mx-auto py-5" style={{ maxWidth: '1000px' }}>
      <HeroDocs />
      <EvolutionSection />
      <PhilosophySection />
      <ArchitectureSection />
      <SensorySection />
      <ModulesSection />
      <SecuritySection />
      <TechStackSection />
      <FutureVisionSection />
      <DocsFooter />
    </div>
  );
};

export default DocsContent;
