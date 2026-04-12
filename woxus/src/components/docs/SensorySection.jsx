import React from 'react';
import { Eye, Camera } from 'lucide-react';

const SensorySection = () => {
  return (
    <section id="sensory" className="py-5 border-bottom" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="mb-5">
        <h2 className="display-6 fw-bold text-white mb-2">Sensory Perception</h2>
      </div>

      <div className="row g-4">
        {/* Screen Vision */}
        <div className="col-md-6">
          <div className="docs-card p-4 h-100 d-flex gap-4 align-items-start">
            <div className="bg-docs-dark p-3 rounded text-cyan mt-1" style={{ border: '1px solid var(--docs-border)' }}>
              <Eye size={24} />
            </div>
            <div>
              <h5 className="text-white fw-bold mb-2">Screen Vision</h5>
              <p className="text-muted small mb-0 lh-lg">
                Real-time screen (MSS) and element detection. Debugs code as you write, reads live UI elements, and recognizes multiline log error traces.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Camera Vision */}
        <div className="col-md-6">
          <div className="docs-card p-4 h-100 d-flex gap-4 align-items-start">
            <div className="bg-docs-dark p-3 rounded text-cyan mt-1" style={{ border: '1px solid var(--docs-border)' }}>
              <Camera size={24} />
            </div>
            <div>
              <h5 className="text-white fw-bold mb-2">Mobile Camera Vision</h5>
              <p className="text-muted small mb-0 lh-lg">
                External object identification. Connect your phone to see parts, read serial numbers, or analyze real-world environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensorySection;
