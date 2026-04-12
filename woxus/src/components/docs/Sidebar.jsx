import React from 'react';
import { 
  BookOpen, Droplet, ArrowRight, Eye, LayoutGrid, ShieldAlert, Heart, Code2, CheckCircle2 
} from 'lucide-react';
import '../styles/index.css';

const Sidebar = () => {
  return (
    <div className="docs-sidebar py-4 d-none d-lg-flex flex-column">
      <div className="px-4 mb-5">
        <h4 className="text-cyan fw-bold mb-0 d-flex align-items-center">
          WOXUS V1
        </h4>
        <div className="small text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Realtime Experience
        </div>
      </div>

      <nav className="d-flex flex-column px-3 gap-1">
        <a href="#introduction" className="docs-nav-link active">
          <BookOpen className="icon" size={16} /> Introduction
        </a>
        <a href="#philosophy" className="docs-nav-link">
          <Droplet className="icon" size={16} /> Core Philosophy
        </a>
        <a href="#architecture" className="docs-nav-link">
          <ArrowRight className="icon" size={16} /> Architecture V1
        </a>
        <a href="#sensory" className="docs-nav-link">
          <Eye className="icon" size={16} /> Sensory Perception
        </a>
        <a href="#modules" className="docs-nav-link">
          <LayoutGrid className="icon" size={16} /> Modules
        </a>
        <a href="#security" className="docs-nav-link">
          <ShieldAlert className="icon" size={16} /> Security
        </a>
        <a href="#ux" className="docs-nav-link">
          <Heart className="icon" size={16} /> User Experience
        </a>
        <a href="#tech" className="docs-nav-link">
          <Code2 className="icon" size={16} /> Tech Stack
        </a>
        <a href="#conclusion" className="docs-nav-link">
          <CheckCircle2 className="icon" size={16} /> Conclusion
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
