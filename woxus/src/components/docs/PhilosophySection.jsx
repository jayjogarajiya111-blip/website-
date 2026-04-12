import React from 'react';
import { Zap, Activity, Cpu } from 'lucide-react';

const PhilosophySection = () => {
  const pillars = [
    {
      icon: <Zap size={24} className="text-cyan mb-3" />,
      title: "Immediacy",
      desc: "Ultra-low latency inference engines ensure WOXUS responds and acts faster than standard transactional models."
    },
    {
      icon: <Activity size={24} className="text-cyan mb-3" />,
      title: "Multimodality",
      desc: "Integrated sight and sound processing allows the agent to interpret screen content, voice nuances, and environmental context."
    },
    {
      icon: <Cpu size={24} className="text-cyan mb-3" />,
      title: "Agency",
      desc: "Not just a chatbox. WOXUS possesses the permissions to interact with OS-level APIs and external hardware to get work done."
    }
  ];

  return (
    <section id="philosophy" className="py-5 border-bottom" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="text-center mb-5">
        <div className="text-cyan small fw-bold mb-2" style={{ letterSpacing: '2px', fontSize: '0.7rem' }}>THE FOUNDATION</div>
        <h2 className="display-6 fw-bold text-white mb-0">Core Philosophy</h2>
      </div>

      <div className="row g-4">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="col-md-4">
            <div className="docs-card p-4 h-100">
              <div className="d-inline-flex align-items-center justify-content-center bg-docs-dark rounded p-3 mb-4" style={{ border: '1px solid var(--docs-border)' }}>
                {pillar.icon}
              </div>
              <h5 className="text-white fw-bold mb-3">{pillar.title}</h5>
              <p className="text-muted small lh-lg mb-0">{pillar.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;
