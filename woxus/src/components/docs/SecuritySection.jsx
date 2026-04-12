import React from 'react';
import { Shield } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section id="security" className="py-5 border-bottom" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="docs-card p-0 overflow-hidden">
        <div className="row g-0">
          
          {/* Main Security Block */}
          <div className="col-lg-5 bg-docs-dark p-5 d-flex flex-column justify-content-center border-end" style={{ borderColor: 'var(--docs-border) !important' }}>
            <div className="bg-danger bg-opacity-10 d-inline-flex p-3 rounded mb-4" style={{ width: 'fit-content' }}>
              <Shield className="text-danger" size={32} />
            </div>
            <h3 className="display-6 fw-bold text-white mb-3">Fortified Security</h3>
            <p className="text-muted lead mb-0">
              Primary by default. Cyber agent module is audited and filtered through our neural firewall.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="col-lg-7 p-5">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-danger me-2">●</span>
                  <h6 className="text-white fw-bold mb-0">Network Monitoring</h6>
                </div>
                <p className="text-muted small">Real-time analysis of every outgoing and incoming data architecture.</p>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-danger me-2">●</span>
                  <h6 className="text-white fw-bold mb-0">Vulnerability Detector</h6>
                </div>
                <p className="text-muted small">Automatic identification of unpatched local by those AI generated fixes.</p>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-danger me-2">●</span>
                  <h6 className="text-white fw-bold mb-0">Strict NMAP</h6>
                </div>
                <p className="text-muted small">Unrestricted parameters preventing harmful or illegal agentic actions.</p>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-danger me-2">●</span>
                  <h6 className="text-white fw-bold mb-0">Local Memory</h6>
                </div>
                <p className="text-muted small">All preferences and sensitive local vector DBs never let you sneak.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
