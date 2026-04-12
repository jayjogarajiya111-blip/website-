import React from 'react';

const EvolutionSection = () => {
  return (
    <section className="py-5 border-bottom" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="row align-items-center">
        <div className="col-lg-7 mb-4 mb-lg-0 pe-lg-5">
          <h3 className="h4 fw-bold text-white mb-3">The Evolution of Human-AI Interaction</h3>
          <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
            Traditional LLMs live in a vacuum. They process text but lack awareness of the environment. WOXUS shatters this ceiling by integrating vision and auditory systems directly into its reasoning core.
          </p>
          <div className="p-4 rounded border-cyan bg-docs-panel" style={{ borderLeft: '4px solid var(--docs-cyan)' }}>
            <p className="mb-0 text-cyan fst-italic fw-medium">
              "WOXUS is not just an assistant. It is a Multimodal AI Agent Operating System designed for high-agency execution."
            </p>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="docs-card p-2" style={{ height: '200px', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
            {/* Visual placeholder for the wavy cyan graphic from the image */}
            <div className="w-100 h-100 position-relative rounded" style={{ 
              backgroundImage: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.2) 0%, transparent 60%)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div className="position-absolute bottom-0 start-0 m-3 p-2 bg-docs-dark rounded text-cyan small border border-secondary border-opacity-25" style={{ fontSize: '0.75rem' }}>
                VISUAL CORTEX ACTIVE <br/>
                <span className="text-muted">Multimodal sync established</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvolutionSection;
