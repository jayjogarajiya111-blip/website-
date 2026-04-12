import React from 'react';
import { Mic, Rocket } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="d-flex align-items-center position-relative overflow-hidden" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <div className="bg-particles"></div>
      
      <div className="container position-relative z-1 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="badge border border-info text-info rounded-pill px-3 py-2 mb-4 animate-float" style={{ background: 'rgba(0, 229, 255, 0.1)' }}>
              v2.0 Beta Now Available
            </div>
            
            <h1 className="display-3 fw-bold mb-4 text-white">
              AI Assistant That <br/>
              <span className="text-gradient">Controls Your System</span>
            </h1>
            
            <p className="lead text-secondary mb-5 px-md-5">
              Run commands, automate tasks, and interact with your computer using voice or text. 
              The ultimate futuristic productivity bridge.
            </p>
            
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <button className="btn btn-glow btn-lg px-4 d-flex align-items-center justify-content-center">
                <Rocket className="me-2" size={20} /> Try Now
              </button>
              <button className="btn btn-outline-glow btn-lg px-4 d-flex align-items-center justify-content-center">
                <Mic className="me-2" size={20} /> Start Voice Assistant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
