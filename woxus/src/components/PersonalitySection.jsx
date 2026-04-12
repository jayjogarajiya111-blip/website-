import React, { useState } from 'react';
import { Volume2, User, UserCheck } from 'lucide-react';

const PersonalitySection = () => {
  const [selected, setSelected] = useState('woxx');

  return (
    <section className="section-padding position-relative">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white mb-3">Select Your Assistant Personality</h2>
          <p className="text-secondary">Choose the voice and behavioral style that fits your workflow.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* WOXX Card */}
          <div className="col-lg-5 col-md-6">
            <div 
              className="glass-panel p-4 position-relative cursor-pointer h-100" 
              style={{ 
                cursor: 'pointer',
                border: selected === 'woxx' ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: selected === 'woxx' ? '0 0 20px rgba(0,229,255,0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelected('woxx')}
            >
              {selected === 'woxx' && (
                <span className="badge rounded-pill bg-info text-dark position-absolute top-0 end-0 m-3 px-3 py-2 fw-bold d-flex align-items-center">
                  <UserCheck size={16} className="me-1" /> Selected
                </span>
              )}
              
              <div className="d-flex align-items-center mb-4 mt-3">
                <div className="bg-dark rounded-circle p-4 border border-info d-flex align-items-center justify-content-center shadow-lg" style={{ width: '80px', height: '80px' }}>
                  <User size={40} color="#00e5ff" />
                </div>
                <div className="ms-4">
                  <h3 className="text-white fw-bold mb-1">WOXX</h3>
                  <span className="badge border border-secondary text-secondary">Male Voice</span>
                </div>
              </div>
              
              <p className="text-light mb-4 fs-5">
                <span className="fw-bold text-info">Professional, logical assistant.</span> <br/>
                Highly factual, direct, and efficient responses.
              </p>
              
              <button 
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center mt-auto"
                onClick={(e) => { e.stopPropagation(); alert("Previewing WOXX voice..."); }}
              >
                <Volume2 className="me-2" size={18} /> Preview Voice
              </button>
            </div>
          </div>

          {/* WOXIE Card */}
          <div className="col-lg-5 col-md-6">
            <div 
              className="glass-panel p-4 position-relative cursor-pointer h-100" 
              style={{ 
                cursor: 'pointer',
                border: selected === 'woxie' ? '2px solid #0077ff' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: selected === 'woxie' ? '0 0 20px rgba(0,119,255,0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelected('woxie')}
            >
              {selected === 'woxie' && (
                <span className="badge rounded-pill bg-primary position-absolute top-0 end-0 m-3 px-3 py-2 fw-bold d-flex align-items-center">
                  <UserCheck size={16} className="me-1" /> Selected
                </span>
              )}
              
              <div className="d-flex align-items-center mb-4 mt-3">
                <div className="bg-dark rounded-circle p-4 border border-primary d-flex align-items-center justify-content-center shadow-lg" style={{ width: '80px', height: '80px' }}>
                  <User size={40} color="#0077ff" />
                </div>
                <div className="ms-4">
                  <h3 className="text-white fw-bold mb-1">WOXIE</h3>
                  <span className="badge border border-secondary text-secondary">Female Voice</span>
                </div>
              </div>
              
              <p className="text-light mb-4 fs-5">
                <span className="fw-bold text-primary">Friendly and intuitive assistant.</span> <br/>
                Conversational, warm, and highly adaptive to your mood.
              </p>
              
              <button 
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center mt-auto"
                onClick={(e) => { e.stopPropagation(); alert("Previewing WOXIE voice..."); }}
              >
                <Volume2 className="me-2" size={18} /> Preview Voice
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalitySection;
