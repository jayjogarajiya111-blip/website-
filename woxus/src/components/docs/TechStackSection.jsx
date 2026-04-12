import React from 'react';
import { Layers } from 'lucide-react';

const TechStackSection = () => {
  const stack = [
    { name: 'PYTHON', icon: 'P' },
    { name: 'FASTAPI', icon: 'F' },
    { name: 'CHROMADB', icon: 'C' },
    { name: 'OPENCV', icon: 'O' },
    { name: 'ELECTRON', icon: 'E' },
    { name: 'MEDIAPIPE', icon: 'M' }
  ];

  return (
    <section id="tech" className="py-5 border-bottom" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="mb-5">
        <h2 className="display-6 fw-bold text-white mb-2">The Tech Stack</h2>
        <p className="text-muted">The standing angels of AI infrastructure.</p>
      </div>

      <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-start">
        {stack.map((tech, idx) => (
          <div key={idx} className="text-center" style={{ width: '100px' }}>
            <div className="tech-icon-box mb-3">
              <span className="text-muted fs-3 fw-bold">{tech.icon}</span>
            </div>
            <span className="small text-muted" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
