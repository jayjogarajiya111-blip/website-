import React from 'react';

const HeroDocs = () => {
  return (
    <section id="introduction" className="pt-5 pb-4">
      <div className="d-flex align-items-center mb-3">
        <div className="text-cyan small fw-bold" style={{ letterSpacing: '1px', border: '1px solid rgba(34, 211, 238, 0.3)', padding: '4px 12px', borderRadius: '4px', backgroundColor: 'rgba(34, 211, 238, 0.05)' }}>
          ◆ INTRODUCTION TO THE ECOSYSTEM
        </div>
      </div>
      <h1 className="display-4 fw-bold text-white mb-4" style={{ letterSpacing: '-1px' }}>
        WOXUS V1 <br/>
        <span className="text-cyan">Documentation</span>
      </h1>
      <p className="lead text-muted mb-5" style={{ maxWidth: '700px', lineHeight: '1.6' }}>
        The definitive guide to a multimodal AI ecosystem. An assistant that sees, hears, and executes real-world tasks in real time.
      </p>
      <div className="d-flex gap-3">
        <button className="btn btn-cyan px-4 py-2">Get Started</button>
        <button className="btn btn-outline-search px-4 py-2" style={{ backgroundColor: 'transparent' }}>View GitHub</button>
      </div>
    </section>
  );
};

export default HeroDocs;
