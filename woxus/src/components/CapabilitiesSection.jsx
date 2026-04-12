import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CapabilitiesSection = () => {
  const capabilities = [
    "Open applications instantly with a single command",
    "Control system settings and hardware interactively",
    "Chat with an advanced AI for complex problem solving",
    "Get real-time weather, news, and system updates",
    "Automate repetitive daily tasks and complex workflows"
  ];

  return (
    <section className="section-padding bg-dark position-relative" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h2 className="display-6 fw-bold text-white mb-4">
              What You Can Do <br/>
              <span className="text-gradient">With WOXUS</span>
            </h2>
            <p className="text-secondary lead mb-4">
              Our AI assistant is deeply integrated with your operating system to provide unparalleled control and automation.
            </p>
            <button className="btn btn-glow mt-2">Explore All Capabilities</button>
          </div>
          
          <div className="col-lg-6">
            <div className="glass-panel p-4 p-md-5">
              <ul className="list-unstyled mb-0 d-flex flex-column gap-4">
                {capabilities.map((item, idx) => (
                  <li key={idx} className="d-flex align-items-center text-white fs-5">
                    <CheckCircle2 className="text-info me-3 flex-shrink-0" size={24} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
