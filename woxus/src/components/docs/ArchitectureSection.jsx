import React from 'react';
import { BrainCircuit, MonitorSmartphone, Server } from 'lucide-react';

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="py-5 border-bottom" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="mb-5 d-flex justify-content-between align-items-end">
        <div>
          <h2 className="display-6 fw-bold text-white mb-2">System Architecture</h2>
          <p className="text-muted">A tri-nodal design untangles software into three primary layers of intelligence and execution.</p>
        </div>
        <div className="text-muted small d-none d-md-block">WOXUS_V.1_ARCH_VFINAL</div>
      </div>

      <div className="row g-4 mb-4">
        {/* Brain Card */}
        <div className="col-lg-8">
          <div className="docs-card p-4 h-100">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-docs-dark p-3 rounded me-3" style={{ border: '1px solid var(--docs-border)' }}>
                <BrainCircuit className="text-cyan" size={28} />
              </div>
              <div>
                <h4 className="text-white fw-bold d-flex align-items-center mb-1">
                  The Brain <span className="ms-3 badge bg-docs-dark text-cyan small fw-normal border border-cyan" style={{ fontSize: '0.7rem' }}>Gemini 2.0 Flash / Python / FastAPI</span>
                </h4>
              </div>
            </div>
            <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
              The central hub powered by Gemini 2.0 Flash. Orchestrates thought processes, intent recognition, and decision making matrices. Handles speech-to-speech processing and routes complex workflows natively.
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-docs-dark border border-secondary text-muted px-3 py-2">PYTHON 3.11+</span>
              <span className="badge bg-docs-dark border border-secondary text-muted px-3 py-2">FASTAPI</span>
              <span className="badge bg-docs-dark border border-secondary text-muted px-3 py-2">GEMINI 2.0 FLASH</span>
            </div>
          </div>
        </div>

        {/* Body Card */}
        <div className="col-lg-4">
          <div className="docs-card p-4 h-100">
            <div className="d-flex align-items-center mb-3">
              <MonitorSmartphone className="text-cyan me-3" size={24} />
              <h5 className="text-white fw-bold mb-0">The Body</h5>
            </div>
            <p className="text-muted small mb-4">The core interface and local execution environment.</p>
            <div className="d-flex justify-content-between small text-muted border-bottom pb-2 mb-2" style={{ borderColor: 'var(--docs-border) !important' }}>
              <span>Framework</span> <span className="text-white">React</span>
            </div>
            <div className="d-flex justify-content-between small text-muted border-bottom pb-2 mb-2" style={{ borderColor: 'var(--docs-border) !important' }}>
              <span>Runtime</span> <span className="text-white">Electron</span>
            </div>
            <div className="d-flex justify-content-between small text-muted">
              <span>Styling</span> <span className="text-white">Vite/CSS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Limb Card */}
      <div className="docs-card p-4">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <Server className="text-info me-3" size={24} />
              <h4 className="text-white fw-bold mb-0">The Limb</h4>
            </div>
            <p className="text-muted mb-4">
              Hardware bridges that connect the digital brain to the physical world via mobile sensors and camera arrays.
            </p>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2 d-flex align-items-center"><span className="text-success me-2">●</span> Flutter Android App</li>
              <li className="d-flex align-items-center"><span className="text-success me-2">●</span> Live video/audio streams</li>
            </ul>
          </div>
          <div className="col-md-6">
            <div className="bg-docs-dark p-3 rounded text-muted family-monospace" style={{ border: '1px solid var(--docs-border)', fontSize: '0.8rem' }}>
              <div className="text-primary mb-1">def initialize_limb_connection():</div>
              <div className="ms-3 mb-1">await woxus.connect(limb_id="MOBILE_1")</div>
              <div className="ms-3 mb-1">stream = woxus.request_camera_stream()</div>
              <div className="ms-3 text-cyan">return "CONNECTION_STABLE"</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
