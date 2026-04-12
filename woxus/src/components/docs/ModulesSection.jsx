import React from 'react';
import { Briefcase, Globe, TrendingUp, MessageCircle } from 'lucide-react';

const ModulesSection = () => {
  const modules = [
    {
      icon: <Briefcase size={20} className="text-cyan mb-2" />,
      title: "OFFICE AUTOMATION",
      desc: "Document execution & report generation."
    },
    {
      icon: <Globe size={20} className="text-cyan mb-2" />,
      title: "WEB AUTOMATION",
      desc: "Context - Navigation and scraping flows."
    },
    {
      icon: <TrendingUp size={20} className="text-cyan mb-2" />,
      title: "MARKET INTELLIGENCE",
      desc: "Real-time market UI sync (India and global)."
    },
    {
      icon: <MessageCircle size={20} className="text-cyan mb-2" />,
      title: "WHATSAPP INTEGRATION",
      desc: "Agentic messaging and document output."
    }
  ];

  return (
    <section id="modules" className="py-5 border-bottom" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="mb-5">
        <h2 className="display-6 fw-bold text-white mb-2">Execution Modules</h2>
      </div>

      <div className="row g-4">
        {modules.map((mod, idx) => (
          <div key={idx} className="col-md-3 col-sm-6">
            <div className="docs-card p-4 h-100 text-center">
              {mod.icon}
              <h6 className="text-white fw-bold small text-uppercase mt-2 mb-2" style={{ letterSpacing: '0.5px' }}>{mod.title}</h6>
              <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>{mod.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModulesSection;
