import React from 'react';
import { Search, User, MessageCircle } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-docs-dark sticky-top border-bottom" style={{ borderColor: 'var(--docs-border) !important', zIndex: 10 }}>
      {/* Mobile only logo space */}
      <div className="d-lg-none text-cyan fw-bold fs-5">WOXUS V1</div>
      
      {/* Search on desktop, icon on mobile */}
      <div className="d-none d-md-flex position-relative me-auto ms-lg-0" style={{ maxWidth: '300px', width: '100%' }}>
        <Search className="position-absolute top-50 translate-middle-y text-muted ms-3" size={16} />
        <input type="text" className="search-input w-100" placeholder="Search Documentation..." />
      </div>

      <div className="d-flex align-items-center gap-3 ms-auto">
        <a href="#" className="docs-nav-link text-muted m-0 p-0 text-decoration-none d-none d-sm-block">Discord</a>
        <a href="#" className="docs-nav-link text-muted m-0 p-0 text-decoration-none d-none d-sm-block">Support</a>
        <div className="d-flex align-items-center justify-content-center rounded-circle bg-docs-panel" style={{ width: 36, height: 36, border: '1px solid var(--docs-border)' }}>
          <User size={16} className="text-muted" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
