import React from 'react';

const DocsFooter = () => {
  return (
    <footer className="py-4 border-top mt-5" style={{ borderColor: 'var(--docs-border) !important' }}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center container-fluid">
        <div className="mb-3 mb-md-0">
          <h6 className="text-cyan fw-bold mb-1">WOXUS V1</h6>
          <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
            &copy; 2026 Neural Execution Organization. All rights reserved.
          </div>
        </div>
        <div className="d-flex gap-4 small" style={{ fontSize: '0.75rem' }}>
          <a href="#" className="text-muted text-decoration-none docs-nav-link p-0">PRIVACY</a>
          <a href="#" className="text-muted text-decoration-none docs-nav-link p-0">TERMS</a>
          <a href="#" className="text-muted text-decoration-none docs-nav-link p-0">API</a>
          <a href="#" className="text-muted text-decoration-none docs-nav-link p-0">CONTACT</a>
        </div>
      </div>
    </footer>
  );
};

export default DocsFooter;
